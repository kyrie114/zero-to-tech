from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Course, Lesson, Tag, Category
from ..schemas import (
    CourseCreate, CourseUpdate, CourseOut,
    LessonCreate, LessonUpdate, LessonOut, LessonListItem,
)
from ..auth import require_admin

# ==================== 课程管理 ====================
courses_router = APIRouter(prefix="/api/courses", tags=["课程"])


@courses_router.get("", response_model=list[CourseOut])
def list_courses(db: Session = Depends(get_db)):
    return db.query(Course).order_by(Course.sort_order).all()


@courses_router.get("/{course_id}", response_model=CourseOut)
def get_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="课程不存在")
    return course


@courses_router.get("/slug/{slug}", response_model=CourseOut)
def get_course_by_slug(slug: str, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.slug == slug).first()
    if not course:
        raise HTTPException(status_code=404, detail="课程不存在")
    return course


@courses_router.post("", response_model=CourseOut, status_code=201)
def create_course(data: CourseCreate, db: Session = Depends(get_db), _=Depends(require_admin)):
    if db.query(Course).filter(Course.slug == data.slug).first():
        raise HTTPException(status_code=400, detail="课程 slug 已存在")
    course = Course(**data.model_dump())
    db.add(course)
    db.commit()
    db.refresh(course)
    return course


@courses_router.put("/{course_id}", response_model=CourseOut)
def update_course(course_id: int, data: CourseUpdate, db: Session = Depends(get_db), _=Depends(require_admin)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="课程不存在")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(course, key, value)
    db.commit()
    db.refresh(course)
    return course


@courses_router.delete("/{course_id}", status_code=204)
def delete_course(course_id: int, db: Session = Depends(get_db), _=Depends(require_admin)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="课程不存在")
    db.delete(course)
    db.commit()


# ==================== 课时管理 ====================
lessons_router = APIRouter(prefix="/api/lessons", tags=["课时"])


@lessons_router.get("", response_model=list[LessonListItem])
def list_lessons(
    course_id: int = Query(None, description="按课程 ID 过滤"),
    category: str = Query(None, description="按分类 slug 过滤"),
    db: Session = Depends(get_db),
):
    query = db.query(Lesson).filter(Lesson.is_published == True)
    if course_id:
        query = query.filter(Lesson.course_id == course_id)
    if category:
        cat = db.query(Category).filter(Category.slug == category).first()
        if cat:
            query = query.filter(Lesson.category_id == cat.id)
    return query.order_by(Lesson.sort_order).all()


@lessons_router.get("/all", response_model=list[LessonOut])
def list_all_lessons(db: Session = Depends(get_db), _=Depends(require_admin)):
    return db.query(Lesson).order_by(Lesson.sort_order).all()


@lessons_router.get("/{lesson_id}", response_model=LessonOut)
def get_lesson(lesson_id: int, db: Session = Depends(get_db)):
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="课时不存在")
    lesson.view_count += 1
    db.commit()
    db.refresh(lesson)
    return lesson


@lessons_router.get("/slug/{slug}", response_model=LessonOut)
def get_lesson_by_slug(slug: str, db: Session = Depends(get_db)):
    lesson = db.query(Lesson).filter(Lesson.slug == slug).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="课时不存在")
    lesson.view_count += 1
    db.commit()
    db.refresh(lesson)
    return lesson


@lessons_router.post("", response_model=LessonOut, status_code=201)
def create_lesson(data: LessonCreate, db: Session = Depends(get_db), _=Depends(require_admin)):
    if db.query(Lesson).filter(Lesson.slug == data.slug).first():
        raise HTTPException(status_code=400, detail="课时 slug 已存在")
    tags = db.query(Tag).filter(Tag.id.in_(data.tag_ids)).all() if data.tag_ids else []
    lesson = Lesson(
        title=data.title,
        slug=data.slug,
        module_number=data.module_number,
        lesson_number=data.lesson_number,
        description=data.description,
        content=data.content,
        author=data.author,
        cover_image=data.cover_image,
        is_published=data.is_published,
        sort_order=data.sort_order,
        course_id=data.course_id,
        category_id=data.category_id,
        tags=tags,
    )
    db.add(lesson)
    db.commit()
    db.refresh(lesson)
    return lesson


@lessons_router.put("/{lesson_id}", response_model=LessonOut)
def update_lesson(lesson_id: int, data: LessonUpdate, db: Session = Depends(get_db), _=Depends(require_admin)):
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="课时不存在")
    update_data = data.model_dump(exclude_unset=True)
    tag_ids = update_data.pop("tag_ids", None)
    if tag_ids is not None:
        lesson.tags = db.query(Tag).filter(Tag.id.in_(tag_ids)).all()
    for key, value in update_data.items():
        setattr(lesson, key, value)
    db.commit()
    db.refresh(lesson)
    return lesson


@lessons_router.delete("/{lesson_id}", status_code=204)
def delete_lesson(lesson_id: int, db: Session = Depends(get_db), _=Depends(require_admin)):
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="课时不存在")
    db.delete(lesson)
    db.commit()
