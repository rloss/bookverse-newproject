from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_schedules():
    return [{"id": 1, "date": "2025-05-01"}]
