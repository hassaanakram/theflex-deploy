from fastapi import APIRouter, HTTPException, Query
from src.clients import DatabaseClient
import logging

logger = logging.getLogger(__name__)

properties_router = APIRouter(prefix="/properties", tags=["properties"])

@properties_router.get("/list")
async def list_properties(
    timeRange: str = Query("30d", description="Time range: 7d, 30d, 3m, 6m, 1y, 2y")
):
    db = DatabaseClient()
    try:
        property_list = db.get_property_reviews_summary(timeRange)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return {
        "timeRange": timeRange or "all",
        "properties": property_list
    }