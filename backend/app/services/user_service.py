from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.utils.hashing import get_password_hash

def create_user(db: Session, data: UserCreate) -> User:
    hashed_pw = get_password_hash(data.password)
    user = User(
        email=data.email,
        username=data.username,
        hashed_password=hashed_pw
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()

def get_user_by_id(db: Session, user_id: str) -> User | None:
    return db.query(User).filter(User.id == user_id).first()
