import statistics
from dateutil import parser as date_parser
from datetime import timezone, timedelta

TIME_RANGES = {
    "7d": timedelta(days=7),
    "30d": timedelta(days=30),
    "3m": timedelta(days=90),
    "6m": timedelta(days=180),
    "1y": timedelta(days=365),
    "2y": timedelta(days=720)
}

def derive_rating(review: dict) -> int | None:
    """Normalize rating to 1–5 scale"""
    if review.get("rating") is not None:
        return review["rating"]

    categories = review.get("reviewCategory", [])
    if categories:
        scores = [c["rating"] for c in categories if "rating" in c]
        if scores:
            avg_10_scale = statistics.mean(scores)  # 1–10
            return round(avg_10_scale / 2)          # normalize 1–5
    return None

def derive_sentiment(rating: float | None) -> str:
    if rating is None:
        return "neutral"
    if rating >= 4:
        return "positive"
    if rating == 3:
        return "neutral"
    return "negative"

def filter_reviews_by_range(reviews, start, end):
    """Return only reviews whose date is within [start, end)."""
    result = []
    for r in reviews:
        date_str = r.get("departureDate") or r.get("submittedAt")
        if not date_str:
            continue
        try:
            review_date = date_parser.parse(date_str)
            if review_date.tzinfo is None:
                review_date = review_date.replace(tzinfo=timezone.utc)
            else:
                review_date = review_date.astimezone(timezone.utc)
        except Exception:
            continue

        if start <= review_date < end:
            result.append(r)
    return result