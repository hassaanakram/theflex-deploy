from fastapi import APIRouter, HTTPException, Query
from src.utils.analytics_utils import get_review_trend
from src.clients import DatabaseClient
from src.models import ChannelDistributionResponse, ReviewTrendResponse

analytics_router = APIRouter(prefix="/analytics", tags=["analytics"])

@analytics_router.get("/trend/reviews", response_model=ReviewTrendResponse)
def review_trend(
    timeRange: str = Query("2y", description="7d, 30d, 3m, 6m, 1y, 2y"),
    listingName: str | None = Query(None, description="Filter by listing name")
):
    try:
        result = get_review_trend(timeRange)
        return ReviewTrendResponse.model_validate(result)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analytics error: {str(e)}")
    

@analytics_router.get("/distribution/channels", response_model=ChannelDistributionResponse)
def channel_distribution(timeRange: str | None = Query(None, description="7d, 30d, 3m, 6m, 1y, 2y")):
    db = DatabaseClient()
    try:
        result = db.get_channel_distribution(timeRange)
        return ChannelDistributionResponse.model_validate({"timeRange": timeRange or "all", "distribution": result})
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"DB error: {str(e)}")
