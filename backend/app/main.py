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