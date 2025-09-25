from fastapi import FastAPI, HTTPException, APIRouter, Query
from src.utils.rating_utils import derive_sentiment
from src.clients import DatabaseClient

reviews_router = APIRouter(prefix="/reviews", tags=["reviews"])

HOSTAWAY_REVIEWS_URL = "http://localhost:9000/hostaway/reviews"

@reviews_router.get("/hostaway")
async def get_hostaway_reviews(
    timeRange: str = Query(None, description="Filter reviews by time range: 7d, 30d, 3m, 6m, 1y, 2y"),
    property: str = Query(None, description="Name of the property. Will be changed to property id in future")
):
    db = DatabaseClient()
    try:
        rows = db.filter_reviews(timeRange, listingName=property)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    table_data = []
    for r in rows:
        table_data.append({
            "Id": r.Id,
            "property": r.listingName,
            "guest": r.guest,
            "rating": float(r.rating) if r.rating is not None else 0,
            "review": r.publicReview or "",
            "channel": r.channel,
            "submittedAt": r.submittedAt.isoformat() if r.submittedAt else "N/A",
            "isPublic": r.isPublic,
        })

    return {
        "timeRange": timeRange or "all",
        "reviews": table_data
    }

@reviews_router.post("/{review_id}/toggle-visibility")
def toggle_review_visibility(review_id: int):
    db = DatabaseClient()
    try:
        new_state = db.toggle_review_visibility(review_id)
        return {
            "reviewId": review_id,
            "isPublic": new_state,
            "message": f"Review {review_id} is now {'public' if new_state else 'private'}"
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")