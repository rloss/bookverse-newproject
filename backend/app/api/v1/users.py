from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserResponse
from app.services.user_service import create_user
from app.api.deps import get_db

router = APIRouter()

@router.post("/", response_model=UserResponse)
def register_user(data: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, data)

from fastapi import Request
from app.core.security import decode_access_token
from app.models.user import User
from app.schemas.user import UserResponse
from app.services.user_service import get_user_by_id

@router.get("/me", response_model=UserResponse)
def read_current_user(request: Request, db: Session = Depends(get_db)):
    try:
        token = request.headers.get("Authorization").split(" ")[1]
        payload = decode_access_token(token)
        user_id = payload.get("sub")
        user = get_user_by_id(db, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
