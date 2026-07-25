from .auth import router as auth_router
from .posts import router as posts_router, categories_router, tags_router
from .courses import courses_router, lessons_router
from .notes import router as notes_router
from .search import router as search_router

__all__ = [
    "auth_router",
    "posts_router",
    "categories_router",
    "tags_router",
    "courses_router",
    "lessons_router",
    "notes_router",
    "search_router",
]
