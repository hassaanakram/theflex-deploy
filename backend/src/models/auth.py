from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from .user import UserRole

class UserBase(BaseModel):
    """Base user model with common fields."""
    username: str = Field(..., min_length=3, max_length=50, description="Username must be 3-50 characters")
    email: EmailStr = Field(..., description="Valid email address")
    role: UserRole = Field(default=UserRole.FLEX_ADMIN, description="User role")

class UserLogin(BaseModel):
    """Model for user login."""
    email: str = Field(..., min_length=1, description="Email address")
    password: str = Field(..., min_length=1, description="User password")

class UserResponse(UserBase):
    """Model for user data in responses (without sensitive info)."""
    id: int = Field(..., description="User ID")
    created_at: datetime = Field(..., description="User creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")

class AuthResponse(BaseModel):
    """Model for authentication responses."""
    success: bool = Field(..., description="Authentication success status")
    message: str = Field(..., description="Response message")
    token: Optional[str] = Field(None, description="JWT token if authentication successful")
    user: Optional[UserResponse] = Field(None, description="User data if authentication successful")

class TokenPayload(BaseModel):
    """Model for JWT token payload."""
    user_id: int
    username: str
    email: str
    role: UserRole
    exp: datetime
    iat: datetime

# Usage examples for FastAPI integration:
"""
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer

app = FastAPI()
security = HTTPBearer()

@app.post("/register", response_model=AuthResponse)
async def register(user_data: UserCreate):
    # Use with AuthHandler
    auth_handler = AuthHandler(db_config, jwt_secret)
    result = auth_handler.register_user(
        username=user_data.username,
        email=user_data.email,
        password=user_data.password,
        role=user_data.role
    )
    return result

@app.post("/login", response_model=AuthResponse)
async def login(login_data: UserLogin):
    auth_handler = AuthHandler(db_config, jwt_secret)
    result = auth_handler.login_user(
        username_or_email=login_data.username_or_email,
        password=login_data.password
    )
    return result

@app.get("/users", response_model=UserListResponse)
async def get_users(query: UserQuery = Depends()):
    # Implementation for getting users with pagination and filtering
    pass

@app.put("/users/{user_id}", response_model=ApiResponse)
async def update_user(user_id: int, user_data: UserUpdate):
    # Implementation for updating user
    pass

@app.put("/users/{user_id}/password", response_model=ApiResponse)
async def update_password(user_id: int, password_data: PasswordUpdate):
    # Implementation for updating password
    pass
"""