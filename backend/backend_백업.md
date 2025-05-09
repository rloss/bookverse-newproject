# 📁 프로젝트 구조

```
├── 📄 .env
├── 📁 alembic
│   ├── 📄 env.py
│   └── 📁 versions
├── 📁 app
│   ├── 📄 __init__.py
│   ├── 📁 api
│   │   ├── 📄 __init__.py
│   │   ├── 📄 deps.py
│   │   └── 📁 v1
│   │       ├── 📄 __init__.py
│   │       ├── 📄 auth.py
│   │       ├── 📄 books.py
│   │       ├── 📄 comments.py
│   │       ├── 📄 groupbooks.py
│   │       ├── 📄 groups.py
│   │       ├── 📄 posts.py
│   │       ├── 📄 schedules.py
│   │       └── 📄 users.py
│   ├── 📁 core
│   │   ├── 📄 config.py
│   │   ├── 📄 exceptions.py
│   │   ├── 📄 logging.py
│   │   └── 📄 security.py
│   ├── 📁 db
│   │   ├── 📄 base.py
│   │   ├── 📄 init_db.py
│   │   └── 📄 session.py
│   ├── 📄 main.py
│   ├── 📁 models
│   │   ├── 📄 __init__.py
│   │   ├── 📄 base.py
│   │   ├── 📄 book.py
│   │   ├── 📄 comment.py
│   │   ├── 📄 group.py
│   │   ├── 📄 group_book.py
│   │   ├── 📄 group_user.py
│   │   ├── 📄 post.py
│   │   ├── 📄 schedule.py
│   │   └── 📄 user.py
│   ├── 📁 schemas
│   │   ├── 📄 __init__.py
│   │   ├── 📄 auth.py
│   │   ├── 📄 book.py
│   │   ├── 📄 comment.py
│   │   ├── 📄 group.py
│   │   ├── 📄 group_book.py
│   │   ├── 📄 group_user.py
│   │   ├── 📄 post.py
│   │   ├── 📄 schedule.py
│   │   └── 📄 user.py
│   ├── 📁 services
│   │   ├── 📄 __init__.py
│   │   ├── 📄 auth_service.py
│   │   ├── 📄 book_service.py
│   │   ├── 📄 comment_service.py
│   │   ├── 📄 group_book_service.py
│   │   ├── 📄 group_service.py
│   │   ├── 📄 post_service.py
│   │   ├── 📄 schedule_service.py
│   │   └── 📄 user_service.py
│   └── 📁 utils
│       ├── 📄 datetime.py
│       ├── 📄 enums.py
│       ├── 📄 hashing.py
│       └── 📄 id_generator.py
├── 📄 backend_boost.py
├── 📄 backend_백업.md
├── 📄 requirements.txt
├── 📄 test_main.py
└── 📁 tests
    ├── 📄 conftest.py
    ├── 📄 test_auth.py
    ├── 📄 test_groupbooks.py
    ├── 📄 test_groups.py
    ├── 📄 test_posts.py
    └── 📄 test_users.py
```

## 📄 `.env`

```
DATABASE_URL=sqlite:///./test.db
```

## 📄 `backend_boost.py`

```python

```

## 📄 `backend_백업.md`

```markdown

```

## 📄 `requirements.txt`

```
fastapi
uvicorn[standard]
sqlalchemy
alembic
pydantic>=2.0
pydantic-settings
python-dotenv
psycopg2-binary
passlib[bcrypt]
python-jose[cryptography]
email-validator
httpx

# 테스트 및 개발용 (선택)
pytest
pytest-asyncio
black
isort
mypy

```

## 📄 `test_main.py`

```python

```

## 📄 `alembic\env.py`

```python

```

## 📄 `app\main.py`

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import posts, users, groups, books, comments, schedules, groupbooks
from app.core.config import settings

app = FastAPI(
    title="Bookverse API",
    version="1.0.0",
    description="📚 독서모임 플랫폼 Bookverse의 백엔드 API입니다."
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 배포 시에는 실제 도메인으로 제한
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 기본 헬스 체크
@app.get("/")
def root():
    return {"message": "📦 Bookverse API is running!"}

# 라우터 등록
app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(posts.router, prefix="/api/v1/posts", tags=["Posts"])
app.include_router(groups.router, prefix="/api/v1/groups", tags=["Groups"])
app.include_router(books.router, prefix="/api/v1/books", tags=["Books"])
app.include_router(comments.router, prefix="/api/v1/comments", tags=["Comments"])
app.include_router(schedules.router, prefix="/api/v1/schedules", tags=["Schedules"])
app.include_router(groupbooks.router, prefix="/api/v1/groupbooks", tags=["GroupBooks"])
```

## 📄 `app\__init__.py`

```python

```

## 📄 `app\api\deps.py`

```python
from typing import Generator
from fastapi import Depends, HTTPException, Request
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.core.security import decode_access_token
from app.models.user import User
from app.services.user_service import get_user_by_id
from jose import JWTError

# ✅ DB 세션 생성
def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ 사용자 인증 (추후 구현 예정 — 더미 코드)
def get_current_user(request: Request, db: Session = Depends(get_db)) -> User:
    token = request.headers.get("Authorization", "").replace("Bearer ", "")
    payload = decode_access_token(token)
    user_id = payload.get("sub")
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

```

## 📄 `app\api\__init__.py`

```python

```

## 📄 `app\api\v1\auth.py`

```python
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app.api.deps import get_db
from app.services.user_service import get_user_by_email
from app.utils.hashing import verify_password
from app.core.security import create_access_token
from app.schemas.auth import Token

router = APIRouter()

@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = get_user_by_email(db, form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}

```

## 📄 `app\api\v1\books.py`

```python
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_books():
    return [{"id": 1, "title": "데미안"}]

```

## 📄 `app\api\v1\comments.py`

```python
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_comments():
    return [{"id": 1, "content": "좋은 글입니다!"}]

```

## 📄 `app\api\v1\groupbooks.py`

```python
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_group_books():
    return [
        {
            "group_id": 1,
            "book_id": 10,
            "title": "총, 균, 쇠",
            "scope": "shared"
        }
    ]

@router.post("/")
def add_group_book():
    return {"message": "그룹에 공통 도서가 성공적으로 추가되었습니다."}

```

## 📄 `app\api\v1\groups.py`

```python
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_groups():
    return [{"id": 1, "name": "철학모임"}]

```

## 📄 `app\api\v1\posts.py`

```python
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


```

## 📄 `app\api\v1\schedules.py`

```python
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_schedules():
    return [{"id": 1, "date": "2025-05-01"}]

```

## 📄 `app\api\v1\users.py`

```python
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

```

## 📄 `app\api\v1\__init__.py`

```python

```

## 📄 `app\core\config.py`

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./test.db"

    class Config:
        env_file = ".env"

settings = Settings()

```

## 📄 `app\core\exceptions.py`

```python

```

## 📄 `app\core\logging.py`

```python

```

## 📄 `app\core\security.py`

```python
from datetime import datetime, timedelta
from jose import JWTError, jwt

# 시크릿 키 (임시값 → .env로 빼는게 좋음)
SECRET_KEY = "super-secret"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_access_token(token: str):
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

```

## 📄 `app\db\base.py`

```python
from sqlalchemy.orm import declarative_base

Base = declarative_base()

```

## 📄 `app\db\init_db.py`

```python
from app.db.session import engine
from app.db.base import Base
from app.models import post, user, group, book, comment  # 모델 전부 import

def init_db():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()

```

## 📄 `app\db\session.py`

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

engine = create_engine(settings.DATABASE_URL, future=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

```

## 📄 `app\models\base.py`

```python

```

## 📄 `app\models\book.py`

```python

```

## 📄 `app\models\comment.py`

```python

```

## 📄 `app\models\group.py`

```python

```

## 📄 `app\models\group_book.py`

```python

```

## 📄 `app\models\group_user.py`

```python

```

## 📄 `app\models\post.py`

```python
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

```

## 📄 `app\models\schedule.py`

```python

```

## 📄 `app\models\user.py`

```python
from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from app.db.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

```

## 📄 `app\models\__init__.py`

```python

```

## 📄 `app\schemas\auth.py`

```python
from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenPayload(BaseModel):
    sub: str

```

## 📄 `app\schemas\book.py`

```python

```

## 📄 `app\schemas\comment.py`

```python

```

## 📄 `app\schemas\group.py`

```python

```

## 📄 `app\schemas\group_book.py`

```python

```

## 📄 `app\schemas\group_user.py`

```python

```

## 📄 `app\schemas\post.py`

```python
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

class PostCreate(BaseModel):
    context: Literal["review", "community", "announcement"]
    type: Literal["note", "quote", "discussion", "free"]
    title: str
    content: str
    group_id: Optional[UUID] = None
    book_id: Optional[UUID] = None
    book_scope: Optional[Literal["shared", "private"]] = None
    pinned: Optional[bool] = False
```

## 📄 `app\schemas\schedule.py`

```python

```

## 📄 `app\schemas\user.py`

```python
from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: UUID
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

```

## 📄 `app\schemas\__init__.py`

```python

```

## 📄 `app\services\auth_service.py`

```python

```

## 📄 `app\services\book_service.py`

```python

```

## 📄 `app\services\comment_service.py`

```python

```

## 📄 `app\services\group_book_service.py`

```python

```

## 📄 `app\services\group_service.py`

```python

```

## 📄 `app\services\post_service.py`

```python
from uuid import UUID
from app.models.post import Post
from app.schemas.post import PostCreate
from app.db.session import SessionLocal
from app.utils.id_generator import generate_display_id
from sqlalchemy.orm import Session

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

```

## 📄 `app\services\schedule_service.py`

```python

```

## 📄 `app\services\user_service.py`

```python
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.utils.hashing import get_password_hash

def create_user(db: Session, data: UserCreate) -> User:
    hashed_pw = get_password_hash(data.password)
    user = User(
        email=data.email,
        username=data.username,
        hashed_password=hashed_pw
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()

def get_user_by_id(db: Session, user_id: str) -> User | None:
    return db.query(User).filter(User.id == user_id).first()

```

## 📄 `app\services\__init__.py`

```python

```

## 📄 `app\utils\datetime.py`

```python

```

## 📄 `app\utils\enums.py`

```python
from enum import Enum

class PostContext(str, Enum):
    review = "review"
    community = "community"
    announcement = "announcement"

class PostType(str, Enum):
    note = "note"
    quote = "quote"
    discussion = "discussion"
    free = "free"

class BookScope(str, Enum):
    shared = "shared"
    private = "private"

```

## 📄 `app\utils\hashing.py`

```python
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

```

## 📄 `app\utils\id_generator.py`

```python
import random

def generate_display_id(context: str, group_id: str | None) -> str:
    prefix = {
        "review": "RV",
        "community": "CM",
        "announcement": "AN"
    }.get(context, "XX")

    group_part = group_id.hex[:4].upper() if group_id else "PERS"
    random_part = str(random.randint(1000, 9999))

    return f"{prefix}-{group_part}-{random_part}"

```

## 📄 `tests\conftest.py`

```python

```

## 📄 `tests\test_auth.py`

```python

```

## 📄 `tests\test_groupbooks.py`

```python

```

## 📄 `tests\test_groups.py`

```python

```

## 📄 `tests\test_posts.py`

```python

```

## 📄 `tests\test_users.py`

```python

```

