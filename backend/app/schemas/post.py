from pydantic import BaseModel, root_validator
from typing import Optional, Literal
from uuid import UUID
from datetime import datetime

class PostCreate(BaseModel):
    context: Literal["review", "community", "announcement"]
    type: Literal["note", "quote", "discussion", "free"]
    title: str
    content: str
    group_id: Optional[UUID] = None
    book_id: Optional[UUID] = None
    book_scope: Optional[Literal["shared", "private"]] = None
    pinned: Optional[bool] = False

    @root_validator
    def validate_announcement_group(cls, values):
        if values["context"] == "announcement" and not values.get("group_id"):
            raise ValueError("공지글은 반드시 그룹 내에서만 작성 가능합니다.")
        return values

class PostResponse(BaseModel):
    id: UUID
    display_id: str
    title: str
    content: str
    context: str
    type: str
    book_scope: Optional[str]
    author_id: UUID
    group_id: Optional[UUID]
    book_id: Optional[UUID]
    pinned: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
