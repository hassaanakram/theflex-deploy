from pydantic import BaseModel, ConfigDict
import humps

class CamelModel(BaseModel):
    model_config = ConfigDict(
        alias_generator=humps.camelize,
        populate_by_name=True,
        str_strip_whitespace=True,
        extra="forbid"
    )

class ReviewTrend(CamelModel):
    month: str
    average_rating: float
    total_reviews: int

class ReviewTrendResponse(CamelModel):
    time_range: str
    trend: list[ReviewTrend]

class ChannelDistribution(BaseModel):
    name: str
    percent: float
    count: int

class ChannelDistributionResponse(CamelModel):
    time_range: str
    distribution: list[ChannelDistribution]