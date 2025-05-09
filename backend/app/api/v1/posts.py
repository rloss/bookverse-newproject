from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.deps import get_db, get_current_user
from app.schemas.post import PostCreate
from app.services.post_service import create_post
from app.schemas.user import UserResponse
from app.models.user import User

router = APIRouter()

@router.post("/")
def create_new_post(
    data: PostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return create_post(db, data, author_id=current_user.id)

