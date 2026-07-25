from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


# ==================== 用户 ====================
class UserCreate(BaseModel):
    username: str
    email: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class UserOut(BaseModel):
    id: int
    username: str
    email: str
    is_admin: bool
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


# ==================== 分类 ====================
class CategoryCreate(BaseModel):
    name: str
    slug: str


class CategoryOut(BaseModel):
    id: int
    name: str
    slug: str

    class Config:
        from_attributes = True


class CategoryWithCount(CategoryOut):
    post_count: int = 0
    lesson_count: int = 0


# ==================== 标签 ====================
class TagCreate(BaseModel):
    name: str
    slug: str


class TagOut(BaseModel):
    id: int
    name: str
    slug: str

    class Config:
        from_attributes = True


# ==================== 博客文章 ====================
class PostCreate(BaseModel):
    title: str
    slug: str
    excerpt: Optional[str] = None
    content: str
    author: str = "Kyrie"
    cover_image: Optional[str] = None
    is_published: bool = False
    category_id: Optional[int] = None
    tag_ids: list[int] = []


class PostUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    author: Optional[str] = None
    cover_image: Optional[str] = None
    is_published: Optional[bool] = None
    category_id: Optional[int] = None
    tag_ids: Optional[list[int]] = None


class PostOut(BaseModel):
    id: int
    title: str
    slug: str
    excerpt: Optional[str]
    content: str
    author: str
    cover_image: Optional[str]
    is_published: bool
    view_count: int
    created_at: datetime
    updated_at: datetime
    category: Optional[CategoryOut]
    tags: list[TagOut]

    class Config:
        from_attributes = True


class PostListItem(BaseModel):
    id: int
    title: str
    slug: str
    excerpt: Optional[str]
    author: str
    cover_image: Optional[str]
    is_published: bool
    view_count: int
    created_at: datetime
    category: Optional[CategoryOut]
    tags: list[TagOut]

    class Config:
        from_attributes = True


# ==================== 课程 ====================
class CourseCreate(BaseModel):
    title: str
    slug: str
    description: Optional[str] = None
    badge: str = "soon"
    badge_text: str = "筹备中"
    tech_stack: Optional[str] = None
    sort_order: int = 0


class CourseUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    badge: Optional[str] = None
    badge_text: Optional[str] = None
    tech_stack: Optional[str] = None
    sort_order: Optional[int] = None


class CourseOut(BaseModel):
    id: int
    title: str
    slug: str
    description: Optional[str]
    badge: str
    badge_text: str
    tech_stack: Optional[str]
    sort_order: int
    created_at: datetime

    class Config:
        from_attributes = True


# ==================== 课时 ====================
class LessonCreate(BaseModel):
    title: str
    slug: str
    module_number: int = 1
    lesson_number: int = 1
    description: Optional[str] = None
    content: Optional[str] = None
    author: str = "Li Bo"
    cover_image: Optional[str] = None
    is_published: bool = False
    sort_order: int = 0
    course_id: int
    category_id: Optional[int] = None
    tag_ids: list[int] = []


class LessonUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    module_number: Optional[int] = None
    lesson_number: Optional[int] = None
    description: Optional[str] = None
    content: Optional[str] = None
    author: Optional[str] = None
    cover_image: Optional[str] = None
    is_published: Optional[bool] = None
    sort_order: Optional[int] = None
    course_id: Optional[int] = None
    category_id: Optional[int] = None
    tag_ids: Optional[list[int]] = None


class LessonOut(BaseModel):
    id: int
    title: str
    slug: str
    module_number: int
    lesson_number: int
    description: Optional[str]
    content: Optional[str]
    author: str
    cover_image: Optional[str]
    is_published: bool
    view_count: int
    sort_order: int
    created_at: datetime
    updated_at: datetime
    course_id: int
    category: Optional[CategoryOut]
    tags: list[TagOut]

    class Config:
        from_attributes = True


class LessonListItem(BaseModel):
    id: int
    title: str
    slug: str
    module_number: int
    lesson_number: int
    description: Optional[str]
    author: str
    cover_image: Optional[str]
    is_published: bool
    view_count: int
    sort_order: int
    created_at: datetime
    course_id: int
    category: Optional[CategoryOut]
    tags: list[TagOut]

    class Config:
        from_attributes = True


# ==================== 搜索 ====================
class SearchResult(BaseModel):
    type: str  # "post" or "lesson"
    id: int
    title: str
    slug: str
    excerpt: Optional[str]
    category: Optional[str]


class SearchResponse(BaseModel):
    query: str
    results: list[SearchResult]
    total: int
