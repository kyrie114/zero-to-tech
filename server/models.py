from sqlalchemy import Table, Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from .database import Base

# 多对多关联表：文章-标签
post_tags = Table(
    "post_tags",
    Base.metadata,
    Column("post_id", Integer, ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True),
)

# 多对多关联表：课程-标签
lesson_tags = Table(
    "lesson_tags",
    Base.metadata,
    Column("lesson_id", Integer, ForeignKey("lessons.id", ondelete="CASCADE"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True),
)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(120), unique=True, nullable=False)
    hashed_password = Column(String(128), nullable=False)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False)
    slug = Column(String(80), unique=True, nullable=False)

    posts = relationship("Post", back_populates="category")
    lessons = relationship("Lesson", back_populates="category")


class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False)
    slug = Column(String(80), unique=True, nullable=False)

    posts = relationship("Post", secondary=post_tags, back_populates="tags")
    lessons = relationship("Lesson", secondary=lesson_tags, back_populates="tags")


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(250), unique=True, nullable=False)
    excerpt = Column(Text)
    content = Column(Text, nullable=False)
    author = Column(String(50), default="Kyrie")
    cover_image = Column(String(500))
    is_published = Column(Boolean, default=False)
    view_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    category = relationship("Category", back_populates="posts")
    tags = relationship("Tag", secondary=post_tags, back_populates="posts")


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(250), unique=True, nullable=False)
    description = Column(Text)
    badge = Column(String(20), default="soon")  # active / soon
    badge_text = Column(String(50), default="筹备中")
    tech_stack = Column(Text)  # JSON string: ["React", "Next.js"]
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    lessons = relationship("Lesson", back_populates="course", order_by="Lesson.sort_order")


class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(250), unique=True, nullable=False)
    module_number = Column(Integer, default=1)
    lesson_number = Column(Integer, default=1)
    description = Column(Text)
    content = Column(Text)
    author = Column(String(50), default="Li Bo")
    cover_image = Column(String(500))
    is_published = Column(Boolean, default=False)
    view_count = Column(Integer, default=0)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    course = relationship("Course", back_populates="lessons")
    category = relationship("Category", back_populates="lessons")
    tags = relationship("Tag", secondary=lesson_tags, back_populates="lessons")
