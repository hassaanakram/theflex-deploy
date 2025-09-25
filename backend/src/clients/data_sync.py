import httpx
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from dateutil import parser as date_parser
from src.models.review import Review
from src.clients.db_client import DatabaseClient

# Channel mapping
CHANNEL_MAP = {
    2018: "airbnbOfficial",
    2002: "homeaway",
    2005: "bookingcom",
    2007: "expedia",
    2009: "homeawayical",
    2010: "vrboical",
    2000: "direct",
    2013: "bookingengine",
    2015: "customIcal",
    2016: "tripadvisorical",
    2017: "wordpress",
    2019: "marriott",
    2020: "partner",
    2021: "gds",
    2022: "google",
}

HOSTAWAY_REVIEWS_URL = "https://flextest.free.beeceptor.com/reviews"  # or real API

async def sync_reviews():
    db = DatabaseClient()
    async with httpx.AsyncClient() as client:
        response = await client.get(HOSTAWAY_REVIEWS_URL)
        response.raise_for_status()
        data = response.json()

    if data.get("status") != "success" or "result" not in data:
        raise RuntimeError("Invalid response from Hostaway API")

    reviews = data["result"]

    for r in reviews:
        # Check if review already exists
        exists = db.get_review_by_id(r.get("id"))
        if exists:
            continue

        # Determine rating: if `rating` is null, compute avg from reviewCategory
        rating = None
        if r.get("rating") is not None:
            rating = float(r["rating"])
        elif r.get("reviewCategory"):
            scores = [c["rating"] for c in r["reviewCategory"] if "rating" in c]
            if scores:
                rating = round(sum(scores) / len(scores), 1)  # keep 1 decimal, 0–10 scale

        # Parse submittedAt/departureDate
        date_str = r.get("departureDate") or r.get("submittedAt")
        review_date = None
        if date_str:
            review_date = date_parser.parse(date_str)
            if review_date.tzinfo is None:
                review_date = review_date.replace(tzinfo=timezone.utc)

        # Insert new review
        new_review = Review(
            listingId=r.get("listingMapId"),
            listingName=r.get("listingName"),
            Id=r.get("id"),
            guest=r.get("guestName", "Anonymous"),
            category=None,  # could pick one category or JSON serialize if needed
            rating=rating if rating else 0,
            publicReview=r.get("publicReview"),
            submittedAt=review_date,
            channel=CHANNEL_MAP.get(r.get("channelId"), "Unknown"),
            isPublic=False,  # NEW reviews default to false
        )
        db.add_review(new_review)