from typing import Generator
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import SessionLocal

# ✅ DB 세션 생성
def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ 사용자 인증 (추후 구현 예정 — 더미 코드)
def get_current_user():
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="인증 필요",
    )
