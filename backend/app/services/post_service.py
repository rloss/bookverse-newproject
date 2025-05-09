from app.models.post import Post
from app.schemas.post import PostCreate
from app.db.session import SessionLocal
from app.utils.id_generator import generate_display_id

def create_post(db: SessionLocal, data: PostCreate, author_id: UUID):
    display_id = generate_display_id(data.context, data.group_id)
    new_post = Post(
        display_id=display_id,
        author_id=author_id,
        group_id=data.group_id,
        book_id=data.book_id,
        context=data.context,
        type=data.type,
        book_scope=data.book_scope,
        title=data.title,
        content=data.content,
        pinned=data.pinned
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post
