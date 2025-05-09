from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_books():
    return [{"id": 1, "title": "데미안"}]
