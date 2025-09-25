from pydantic import BaseModel, ConfigDict
import humps

class CamelModel(BaseModel):
    model_config = ConfigDict(
        alias_generator=humps.camelize,
        populate_by_name=True,
        str_strip_whitespace=True,
        extra="forbid"
    )

class Property(CamelModel):
    property: str
    average_rating: float
    review_count: int