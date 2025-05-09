from sqlalchemy import Column, String, Text, Boolean, DateTime, Enum, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

from app.db.base import Base
from app.utils.enums import PostContext, PostType, BookScope

class Post(Base):
    __tablename__ = "posts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    display_id = Column(String, unique=True, index=True)

    author_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    group_id = Column(UUID(as_uuid=True), ForeignKey("groups.id"), nullable=True)
    book_id = Column(UUID(as_uuid=True), ForeignKey("books.id"), nullable=True)

    context = Column(Enum(PostContext), nullable=False)
    type = Column(Enum(PostType), nullable=False)
    book_scope = Column(Enum(BookScope), nullable=True)

    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    pinned = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    author = relationship("User", back_populates="posts")
    group = relationship("Group", back_populates="posts")
    book = relationship("Book", back_populates="posts")
