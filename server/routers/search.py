from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from ..database import get_db
from ..models import Post, Lesson
from ..schemas import SearchResult, SearchResponse

router = APIRouter(prefix="/api/search", tags=["搜索"])


@router.get("", response_model=SearchResponse)
def search(
    q: str = Query(..., min_length=1, description="搜索关键词"),
    db: Session = Depends(get_db),
):
    pattern = f"%{q}%"
    results = []

    # 搜索已发布的文章
    posts = (
        db.query(Post)
        .filter(
            Post.is_published == True,
            or_(Post.title.like(pattern), Post.content.like(pattern), Post.excerpt.like(pattern)),
        )
        .limit(20)
        .all()
    )
    for p in posts:
        results.append(SearchResult(
            type="post",
            id=p.id,
            title=p.title,
            slug=p.slug,
            excerpt=p.excerpt,
            category=p.category.name if p.category else None,
        ))

    # 搜索已发布的课时
    lessons = (
        db.query(Lesson)
        .filter(
            Lesson.is_published == True,
            or_(Lesson.title.like(pattern), Lesson.content.like(pattern), Lesson.description.like(pattern)),
        )
        .limit(20)
        .all()
    )
    for l in lessons:
        results.append(SearchResult(
            type="lesson",
            id=l.id,
            title=l.title,
            slug=l.slug,
            excerpt=l.description,
            category=l.category.name if l.category else None,
        ))

    return SearchResponse(query=q, results=results, total=len(results))
