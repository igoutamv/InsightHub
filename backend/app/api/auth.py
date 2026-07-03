from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.models.user import User

from app.schemas.auth import TokenResponse
from app.schemas.response import ApiResponse
from app.schemas.user import UserCreate, UserResponse

from app.services.auth_service import (
    create_user,
    login_user,
)

from app.utils.response import success_response

router = APIRouter(
    prefix="/api/v1/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=ApiResponse,
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    created = create_user(db, user)

    if created is None:
        raise HTTPException(
            status_code=400,
            detail="Email already exists",
        )

    return success_response(
        UserResponse.model_validate(created),
        "User registered successfully",
    )


@router.post(
    "/login",
    response_model=ApiResponse,
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    token = login_user(
        db,
        form_data.username,
        form_data.password,
    )

    if token is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    return success_response(
        TokenResponse(
            access_token=token,
            token_type="bearer",
        ),
        "Login successful",
    )


@router.get(
    "/me",
    response_model=ApiResponse,
)
def current_user(
    user: User = Depends(get_current_user),
):
    return success_response(
        UserResponse.model_validate(user),
        "User fetched successfully",
    )