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
