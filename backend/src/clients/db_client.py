import sys
sys.path.append("..")

from contextlib import contextmanager
from psycopg2 import pool
from psycopg2 import sql
from collections import namedtuple
from src.models import ChannelDistribution
from src.models.user import User 
from src.models.review import Review
from src.models.property import Property
from src.utils.rating_utils import TIME_RANGES
from src.env import DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT
import logging
from datetime import datetime, timezone

logger = logging.getLogger(__name__)

class DatabaseClient:
    UserRow = namedtuple('UserRow', ['Id', 'username', 'email', 'password', 'role', 'createdAt', 'updatedAt'])
    ReviewRow = namedtuple('ReviewRow', ['Id', 'listingId', 'listingName', 'guest', 'category', 'rating', 'publicReview', 'submittedAt', 'channel', 'isPublic'])

    _connection = None

    def __init__(self):
        if DatabaseClient._connection is None:
            DatabaseClient._connection = self.connect()

    @classmethod
    def connect(cls):
        connection = pool.ThreadedConnectionPool(
                    minconn=1,
                    maxconn=10,
                    user=DB_USERNAME,
                    password=DB_PASSWORD,
                    host=DB_HOST,
                    port=DB_PORT,
                    database=DB_NAME
        )

        return connection

    @contextmanager
    def get_connection(self):
        conn = DatabaseClient._connection.getconn() #type: ignore
        try:
            yield conn
        finally:
            DatabaseClient._connection.putconn(conn) #type: ignore       

    def get_user_by_email(self, email: str) -> User | None:
        with self.get_connection() as conn: #type: ignore
            with conn.cursor() as cursor:
                cursor.execute(sql.SQL("SELECT * FROM users WHERE email = %s OR username = %s"), (email,))
                row = cursor.fetchone()
                return self.map_row_to_user(row) if row else None
            
    def map_row_to_user(self, row) -> User | None:
        if row:
            user_row = self.UserRow(*row)  # Unpack the row into the named tuple
            return User(
                username=user_row.username,
                password=user_row.password,
                email=user_row.email,
                role=user_row.role,
                Id=user_row.Id,
                createdAt=user_row.createdAt,
                updatedAt=user_row.updatedAt
            )
        return None
    
    def get_reviews(self, time_range: str | None = None) -> list[ReviewRow]:
        query = "SELECT * FROM Reviews"
        params = []

        if time_range:
            if time_range not in TIME_RANGES:
                raise ValueError("Invalid time range. Use one of: 7d, 30d, 3m, 6m, 1y, 2y")

            now = datetime.now(timezone.utc)
            start = now - TIME_RANGES[time_range]

            query += " WHERE submittedAt >= %s AND submittedAt < %s"
            params = [start, now]

        with self.get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, params)
                rows = cursor.fetchall()
                return [self.ReviewRow(*row) for row in rows]
            
    def get_review_by_id(self, id: int) -> list[ReviewRow]:
        query = "SELECT * FROM Reviews WHERE id = %s"
        params = [id]

        with self.get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, params)
                rows = cursor.fetchall()
                return [self.ReviewRow(*row) for row in rows]
            
    def add_review(
        self,
        review: Review
    ) -> int:
        """
        Insert a new review into the DB.
        Returns the inserted review Id.
        """
        query = """
            INSERT INTO Reviews (
                id, listingId, listingName, guest, category, rating,
                publicReview, submittedAt, channel, isPublic
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING Id;
        """

        params = (
            review.Id,
            review.listingId,
            review.listingName,
            review.guest,
            review.category,
            review.rating,
            review.publicReview,
            review.submittedAt,
            review.channel,
            review.isPublic
        )

        with self.get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, params)
                new_id = cursor.fetchone()[0]
                conn.commit()
                return new_id

    def toggle_review_visibility(self, review_id: int) -> bool:
        """
        Toggle the isPublic flag for a review by Id.
        Returns the new state (True/False).
        """
        query = """
            UPDATE Reviews
            SET isPublic = NOT isPublic
            WHERE Id = %s
            RETURNING isPublic;
        """

        with self.get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (review_id,))
                row = cursor.fetchone()
                if not row:
                    raise ValueError(f"Review with Id {review_id} not found")
                conn.commit()
                return row[0]  # new isPublic state
            
    def get_property_reviews_summary(self, time_range: str | None = None) -> list[Property]:

        """
        Returns aggregated review summary per property:
        - listingId
        - listingName
        - avgRating (0–10 scale)
        - reviewCount
        """
        query = """
            SELECT listingName,
                   COUNT(*) AS reviewCount,
                   AVG(rating) AS avgRating
            FROM Reviews
        """
        params = []

        # Apply time range filter if present
        if time_range:
            if time_range not in TIME_RANGES:
                raise ValueError("Invalid time range. Use one of: 7d, 30d, 3m, 6m, 1y, 2y")

            now = datetime.now(timezone.utc)
            start = now - TIME_RANGES[time_range]

            query += " WHERE submittedAt >= %s AND submittedAt < %s"
            params = [start, now]

        query += " GROUP BY listingName"

        with self.get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, params)
                rows = cursor.fetchall()

                results: list[Property] = []
                for row in rows:
                    listingName, reviewCount, avgRating = row
                    p = Property(
                        property=listingName,
                        average_rating=float(avgRating) if avgRating is not None else 0,
                        review_count=reviewCount
                    )
                    results.append(p)
                return results
            
    def filter_reviews(
        self,
        time_range: str | None = None,
        listingName: str | None = None,
        listingNames: list[str] | None = None,
        start_date: datetime | None = None,
        end_date: datetime | None = None,
    ) -> list[ReviewRow]:
        """
        Flexible review filtering:
        - by timeRange (7d, 30d, 3m, 6m, 1y, 2y)
        - by single listingName
        - by multiple listingNames
        - by explicit start/end dates
        """

        query = "SELECT * FROM Reviews"
        params = []
        conditions = []

        # Time range (if explicit start/end not provided)
        if time_range:
            if time_range not in TIME_RANGES:
                raise ValueError("Invalid timeRange. Use one of: 7d, 30d, 3m, 6m, 1y, 2y")

            now = datetime.now(timezone.utc)
            start = now - TIME_RANGES[time_range]
            conditions.append("submittedAt >= %s AND submittedAt < %s")
            params.extend([start, now])

        # Explicit start/end dates override timeRange if provided
        if start_date and end_date:
            conditions.append("submittedAt >= %s AND submittedAt < %s")
            params.extend([start_date, end_date])

        # Single property filter
        if listingName:
            conditions.append("listingName = %s")
            params.append(listingName)

        # Multiple properties filter
        if listingNames:
            placeholders = ", ".join(["%s"] * len(listingNames))
            conditions.append(f"listingName IN ({placeholders})")
            params.extend(listingNames)

        # Build WHERE clause
        if conditions:
            query += " WHERE " + " AND ".join(conditions)

        with self.get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, params)
                rows = cursor.fetchall()
                return [self.ReviewRow(*row) for row in rows]

    def get_channel_distribution(self, time_range: str | None = None) -> list[ChannelDistribution]:
        """
        Returns the count of reviews per channel and percentage distribution.
        """
        query = "SELECT channel, COUNT(*) FROM Reviews"
        params = []
        conditions = []

        # Optional time filtering
        if time_range:
            if time_range not in TIME_RANGES:
                raise ValueError("Invalid timeRange. Use 7d, 30d, 3m, 6m, 1y, 2y")

            now = datetime.now(timezone.utc)
            start = now - TIME_RANGES[time_range]
            conditions.append("submittedAt >= %s AND submittedAt < %s")
            params.extend([start, now])

        if conditions:
            query += " WHERE " + " AND ".join(conditions)

        query += " GROUP BY channel"

        with self.get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, params)
                rows = cursor.fetchall()

        total = sum([row[1] for row in rows]) or 1  # avoid division by zero
        result: list[ChannelDistribution] = []
        
        for row in rows:
            c = ChannelDistribution(
                name=row[0] or "Unknown",
                percent=round((row[1] / total), 2),
                count=row[1]
            )
            result.append(c)
        return result