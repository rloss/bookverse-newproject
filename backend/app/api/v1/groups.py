from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_groups():
    return [{"id": 1, "name": "철학모임"}]
