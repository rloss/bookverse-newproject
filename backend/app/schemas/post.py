from pydantic import BaseModel, Field, model_validator
from typing import Optional, Literal
from uuid import UUID
from datetime import datetime

# ✅ 글 생성 시 사용하는 스키마
class PostCreate(BaseModel):
    context: Literal["review", "community", "announcement"]
    type: Literal["note", "quote", "discussion", "free"]
    title: str
    content: str
    group_id: Optional[UUID] = None
    book_id: Optional[UUID] = None
    book_scope: Optional[Literal["shared", "private"]] = None
    pinned: Optional[bool] = False

    @model_validator(mode="after")
    def check_group_for_announcement(self) -> 'PostCreate':
        if self.context == "announcement" and not self.group_id:
            raise ValueError("📢 공지글은 반드시 그룹 내에서만 작성해야 합니다.")
        return self


# ✅ 글 응답 시 사용하는 스키마
class PostResponse(BaseModel):
    id: UUID
    display_id: str
    author_id: UUID
    group_id: Optional[UUID]
    book_id: Optional[UUID]
    context: str
    type: str
    book_scope: Optional[str]
    title: str
    content: str
    pinned: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True  # ✅ Pydantic v2 방식 ORM 모드

