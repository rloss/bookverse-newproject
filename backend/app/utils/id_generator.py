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
