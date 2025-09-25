from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from passlib.context import CryptContext
from typing import Optional
from src.clients.auth_client import AuthClient
from src.models.auth import UserLogin

# Router
auth_router = APIRouter(prefix="/auth", tags=["auth"])

@auth_router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    auth_client = AuthClient()
    return await auth_client.user_login(UserLogin(email=form_data.username, password=form_data.password))