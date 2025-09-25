from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Review(BaseModel):
    Id: int
    listingId: int
    listingName: str
    guest: str
    category: Optional[str] = None
    rating: float
    publicReview: Optional[str] = None
    submittedAt: Optional[datetime] = None
    channel: Optional[str] = None
    isPublic: bool = True