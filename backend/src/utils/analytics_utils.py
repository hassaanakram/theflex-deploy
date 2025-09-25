from datetime import timezone, timedelta, datetime
from dateutil.relativedelta import relativedelta
from src.clients import DatabaseClient
from src.models import ReviewTrend, ReviewTrendResponse

TIME_RANGES = {
    "7d": timedelta(days=7),
    "30d": timedelta(days=30),
    "3m": timedelta(days=90),
    "6m": timedelta(days=180),
    "1y": timedelta(days=365),
    "2y": timedelta(days=720)
}

def get_review_trend(time_range: str = "2y") -> ReviewTrendResponse:
    """
    Returns cumulative monthly trend:
    - totalReviews keeps growing
    - avgRating is running average
    - if no new reviews in a month, carry forward previous values
    """
    if time_range not in TIME_RANGES:
        raise ValueError("Invalid timeRange. Use one of: 7d, 30d, 3m, 6m, 1y, 2y")

    db = DatabaseClient()
    reviews = db.get_reviews(time_range)

    now = datetime.now(timezone.utc)
    start_date = now - TIME_RANGES[time_range]

    # Group reviews by month (YYYY-MM)
    monthly_data = {}
    for r in reviews:
        if not r.submittedAt:
            continue
        month_key = r.submittedAt.strftime("%Y-%m")
        if month_key not in monthly_data:
            monthly_data[month_key] = {"ratings": [], "count": 0}
        if r.rating is not None:
            monthly_data[month_key]["ratings"].append(float(r.rating))
        monthly_data[month_key]["count"] += 1

    # Build cumulative trend
    trend: list[ReviewTrend] = []
    current = start_date.replace(day=1)
    total_count = 0
    all_ratings = []

    while current <= now:
        key = current.strftime("%Y-%m")

        # Add reviews from this month
        month_ratings = monthly_data.get(key, {}).get("ratings", [])
        month_count = monthly_data.get(key, {}).get("count", 0)

        if month_count > 0:
            total_count += month_count
            all_ratings.extend(month_ratings)

        # Running average
        avg_rating = round(sum(all_ratings) / len(all_ratings), 1) if all_ratings else 0

        t = ReviewTrend(
            month=key,
            average_rating=avg_rating,
            total_reviews=total_count
        )

        trend.append(t)

        current += relativedelta(months=1)

    return ReviewTrendResponse.model_validate({
        "time_range": time_range,
        "trend": trend
    })
