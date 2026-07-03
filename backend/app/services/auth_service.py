from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)


def create_user(db: Session, user: UserCreate):

    existing = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing:
        return None

    new_user = User(
        username=user.username,
        email=user.email,
        password_hash=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def login_user(
    db: Session,
    email: str,
    password: str
):

    user = db.query(User).filter(
        User.email == email
    ).first()

    if user is None:
        return None

    if not verify_password(
        password,
        user.password_hash
    ):
        return None

    token = create_access_token(
        {
            "user_id": str(user.id)
        }
    )

    return token