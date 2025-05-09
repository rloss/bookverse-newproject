from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_comments():
    return [{"id": 1, "content": "좋은 글입니다!"}]
