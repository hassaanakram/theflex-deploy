import sys
sys.path.append("..")

from fastapi import HTTPException, status
import jwt
import logging
from datetime import datetime, timezone, timedelta
import bcrypt
from src.models.auth import UserLogin, AuthResponse, UserResponse
from .db_client import DatabaseClient
from src.env import AUTH_KEY, ACCESS_TOKEN_EXPIRY
from src.models.auth import UserResponse

logger = logging.getLogger(__name__)

class AuthClient:
    ALGORITHM = 'HS256'

    def __init__(self):
        if AUTH_KEY.strip() == '':
            raise ValueError("AUTH_KEY environment variable is not set or is empty")
        if ACCESS_TOKEN_EXPIRY.strip() == '' or not ACCESS_TOKEN_EXPIRY.isdigit():
            raise ValueError("ACCESS_TOKEN_EXPIRY environment variable is not set or is not a valid integer")
        
        self.jwt_secret = AUTH_KEY
        self.jwt_expiry_hours = int(ACCESS_TOKEN_EXPIRY)
        self.db_handler = DatabaseClient()

    def get_jwt_token(self, user: UserResponse):
        token_payload = {
            "user_id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role,
            "exp": datetime.now(timezone.utc) + timedelta(hours=self.jwt_expiry_hours),
            "iat": datetime.now(timezone.utc)
        }
        
        token = jwt.encode(token_payload, self.jwt_secret, algorithm='HS256')

        return token

    def _verify_password(self, provided_password: str, stored_password_hash: str):
        """Verify a user's password against the stored hash."""
        return bcrypt.checkpw(provided_password.encode('utf-8'), stored_password_hash.encode('utf-8'))
    
    def hash_password(self, password: str):
        """Hash a password using bcrypt."""
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    async def user_login(self, login_data: UserLogin) -> AuthResponse:
        """
        Authenticate user login

        Args:
            login_data: UserLogin model containing username/email and password
            
        Returns:
            AuthResponse: Authentication result with token and user data
            
        Raises:
            HTTPException: For various authentication failures
        """
        try:
            logger.info(f"Login attempt for user: {login_data.email}")
            
            # Validate input data
            if not login_data.email.strip():
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Username or email cannot be empty"
                )
            
            if not login_data.password.strip():
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Password cannot be empty"
                )
            
            # Fetch user details from db for login
            user = self.db_handler.get_user_by_email(login_data.email)
            if not user:
                logger.warning(f"Failed login attempt for user: {login_data.email}")
                
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid credentials",
                    headers={"WWW-Authenticate": "Bearer"}
                )
            
            # Verify password
            if not self._verify_password(login_data.password, user.password):
                return AuthResponse(
                success=False,
                message="Login unsuccessful",
                token=None,
                user=None
            )

            user_response = UserResponse(
                username=user.username, 
                email=user.email,
                role=user.role,
                id=user.Id,
                created_at=user.createdAt,
                updated_at=user.updatedAt
            )
        
            token = self.get_jwt_token(user_response)
            response = AuthResponse(
                success=True,
                message="Login successful",
                token=token,
                user=user_response
            )
            
            logger.info(f"Successful login for user: {user_response.username} (ID: {user_response.id})")
            
            return response
            
        except HTTPException:
            # Re-raise HTTP exceptions
            raise
            
        except Exception as e:
            logger.error(f"Unexpected error during login: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal server error during authentication"
            )
