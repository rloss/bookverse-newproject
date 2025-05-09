from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.post import PostCreate, PostResponse
from app.services.post_service import create_post
from app.api.deps import get_db, get_current_user

router = APIRouter()

@router.post("/", response_model=PostResponse)
def write_post(post_in: PostCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    try:
        return create_post(db, post_in, author_id=current_user.id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
