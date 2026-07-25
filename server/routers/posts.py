from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..database import get_db
from ..models import Post, Category, Tag
from ..schemas import (
    PostCreate, PostUpdate, PostOut, PostListItem,
    CategoryCreate, CategoryOut, CategoryWithCount,
    TagCreate, TagOut,
)
from ..auth import require_admin

router = APIRouter(prefix="/api/posts", tags=["博客文章"])


# ==================== 公开接口 ====================
@router.get("", response_model=list[PostListItem])
def list_posts(
    category: str = Query(None, description="按分类 slug 过滤"),
    tag: str = Query(None, description="按标签 slug 过滤"),
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db),
):
    query = db.query(Post).filter(Post.is_published == True)

    if category:
        cat = db.query(Category).filter(Category.slug == category).first()
        if cat:
            query = query.filter(Post.category_id == cat.id)

    if tag:
        t = db.query(Tag).filter(Tag.slug == tag).first()
        if t:
            query = query.filter(Post.tags.any(Tag.id == t.id))

    return query.order_by(Post.created_at.desc()).offset((page - 1) * size).limit(size).all()


@router.get("/all", response_model=list[PostOut])
def list_all_posts(db: Session = Depends(get_db), _=Depends(require_admin)):
    return db.query(Post).order_by(Post.created_at.desc()).all()


@router.get("/{post_id}", response_model=PostOut)
def get_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="文章不存在")
    post.view_count += 1
    db.commit()
    db.refresh(post)
    return post


@router.get("/slug/{slug}", response_model=PostOut)
def get_post_by_slug(slug: str, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.slug == slug).first()
    if not post:
        raise HTTPException(status_code=404, detail="文章不存在")
    post.view_count += 1
    db.commit()
    db.refresh(post)
    return post


# ==================== 管理接口 ====================
@router.post("", response_model=PostOut, status_code=201)
def create_post(data: PostCreate, db: Session = Depends(get_db), _=Depends(require_admin)):
    if db.query(Post).filter(Post.slug == data.slug).first():
        raise HTTPException(status_code=400, detail="slug 已存在")

    tags = db.query(Tag).filter(Tag.id.in_(data.tag_ids)).all() if data.tag_ids else []
    post = Post(
        title=data.title,
        slug=data.slug,
        excerpt=data.excerpt,
        content=data.content,
        author=data.author,
        cover_image=data.cover_image,
        is_published=data.is_published,
        category_id=data.category_id,
        tags=tags,
    )
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


@router.put("/{post_id}", response_model=PostOut)
def update_post(post_id: int, data: PostUpdate, db: Session = Depends(get_db), _=Depends(require_admin)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="文章不存在")

    update_data = data.model_dump(exclude_unset=True)
    tag_ids = update_data.pop("tag_ids", None)

    if tag_ids is not None:
        post.tags = db.query(Tag).filter(Tag.id.in_(tag_ids)).all()

    for key, value in update_data.items():
        setattr(post, key, value)

    db.commit()
    db.refresh(post)
    return post


@router.delete("/{post_id}", status_code=204)
def delete_post(post_id: int, db: Session = Depends(get_db), _=Depends(require_admin)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="文章不存在")
    db.delete(post)
    db.commit()


# ==================== 分类管理 ====================
categories_router = APIRouter(prefix="/api/categories", tags=["分类"])


@categories_router.get("", response_model=list[CategoryWithCount])
def list_categories(db: Session = Depends(get_db)):
    cats = db.query(Category).all()
    result = []
    for cat in cats:
        post_count = db.query(Post).filter(Post.category_id == cat.id, Post.is_published == True).count()
        from ..models import Lesson
        lesson_count = db.query(Lesson).filter(Lesson.category_id == cat.id, Lesson.is_published == True).count()
        result.append(CategoryWithCount(
            id=cat.id, name=cat.name, slug=cat.slug,
            post_count=post_count, lesson_count=lesson_count,
        ))
    return result


@categories_router.post("", response_model=CategoryOut, status_code=201)
def create_category(data: CategoryCreate, db: Session = Depends(get_db), _=Depends(require_admin)):
    if db.query(Category).filter(Category.slug == data.slug).first():
        raise HTTPException(status_code=400, detail="分类 slug 已存在")
    cat = Category(name=data.name, slug=data.slug)
    db.add(cat)
    db.commit()
    db.refresh(cat)
    return cat


@categories_router.delete("/{cat_id}", status_code=204)
def delete_category(cat_id: int, db: Session = Depends(get_db), _=Depends(require_admin)):
    cat = db.query(Category).filter(Category.id == cat_id).first()
    if not cat:
        raise HTTPException(status_code=404, detail="分类不存在")
    db.delete(cat)
    db.commit()


# ==================== 标签管理 ====================
tags_router = APIRouter(prefix="/api/tags", tags=["标签"])


@tags_router.get("", response_model=list[TagOut])
def list_tags(db: Session = Depends(get_db)):
    return db.query(Tag).order_by(Tag.name).all()


@tags_router.post("", response_model=TagOut, status_code=201)
def create_tag(data: TagCreate, db: Session = Depends(get_db), _=Depends(require_admin)):
    if db.query(Tag).filter(Tag.slug == data.slug).first():
        raise HTTPException(status_code=400, detail="标签 slug 已存在")
    tag = Tag(name=data.name, slug=data.slug)
    db.add(tag)
    db.commit()
    db.refresh(tag)
    return tag


@tags_router.delete("/{tag_id}", status_code=204)
def delete_tag(tag_id: int, db: Session = Depends(get_db), _=Depends(require_admin)):
    tag = db.query(Tag).filter(Tag.id == tag_id).first()
    if not tag:
        raise HTTPException(status_code=404, detail="标签不存在")
    db.delete(tag)
    db.commit()
