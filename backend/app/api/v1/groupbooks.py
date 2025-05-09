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
