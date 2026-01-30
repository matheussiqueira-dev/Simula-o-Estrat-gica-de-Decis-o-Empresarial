from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr

from app.core.config import get_settings
from app.services.auth import create_access_token

router = APIRouter()
settings = get_settings()


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int


@router.post(
    "/login",
    response_model=TokenResponse,
    summary="Demo login that issues a short-lived JWT",
)
async def login(payload: LoginRequest):
    if not payload.password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password is required in this demo login.",
        )

    token = create_access_token(payload.email)
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        expires_in=settings.access_token_expire_minutes * 60,
    )
