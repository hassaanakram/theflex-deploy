from datetime import datetime
from pydantic import BaseModel
from typing import Optional
from enum import Enum

class UserRole(str, Enum):
    """Enumeration for user roles."""
    FLEX_ADMIN = "flexAdmin"
    LANDLORD = "landlord"

class User(BaseModel):
    Id: int
    username: str
    email: str
    password: str
    role: UserRole = UserRole.FLEX_ADMIN
    createdAt: datetime
    updatedAt: datetime