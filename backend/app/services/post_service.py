from uuid import UUID
from app.models.post import Post
from app.schemas.post import PostCreate
from app.db.session import SessionLocal
from app.utils.id_generator import generate_display_id

def create_post(db: Session, data: PostCreate, author_id: UUID):
    post = Post(
        author_id=author_id,
        group_id=data.group_id,
        context=data.context,
        type=data.type,
        title=data.title,
        content=data.content,
        book_id=data.book_id,
        book_scope=data.book_scope,
        pinned=data.pinned,
    )
    db.add(post)
    db.commit()
    db.refresh(post)
    return post
