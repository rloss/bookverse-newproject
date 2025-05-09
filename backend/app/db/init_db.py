from app.db.session import engine
from app.db.base import Base
from app.models import post, user, group, book, comment  # 모델 전부 import

def init_db():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()
