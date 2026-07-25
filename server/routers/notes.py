from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Note, Tag
from ..schemas import NoteCreate, NoteUpdate, NoteOut, NoteListItem
from ..auth import require_admin

router = APIRouter(prefix="/api/notes", tags=["笔记"])


# ==================== 公开接口 ====================
@router.get("", response_model=list[NoteListItem])
def list_notes(
    tag: str = Query(None, description="按标签 slug 过滤"),
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=50),
    db: Session = Depends(get_db),
):
    query = db.query(Note).filter(Note.is_published == True)

    if tag:
        t = db.query(Tag).filter(Tag.slug == tag).first()
        if t:
            query = query.filter(Note.tags.any(Tag.id == t.id))

    return query.order_by(Note.is_pinned.desc(), Note.created_at.desc()).offset((page - 1) * size).limit(size).all()


@router.get("/all", response_model=list[NoteOut])
def list_all_notes(db: Session = Depends(get_db), _=Depends(require_admin)):
    return db.query(Note).order_by(Note.is_pinned.desc(), Note.created_at.desc()).all()


@router.get("/{note_id}", response_model=NoteOut)
def get_note(note_id: int, db: Session = Depends(get_db)):
    note = db.query(Note).filter(Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="笔记不存在")
    note.view_count += 1
    db.commit()
    db.refresh(note)
    return note


# ==================== 管理接口 ====================
@router.post("", response_model=NoteOut, status_code=201)
def create_note(data: NoteCreate, db: Session = Depends(get_db), _=Depends(require_admin)):
    tags = db.query(Tag).filter(Tag.id.in_(data.tag_ids)).all() if data.tag_ids else []
    note = Note(
        title=data.title,
        content=data.content,
        author=data.author,
        is_pinned=data.is_pinned,
        is_published=data.is_published,
        tags=tags,
    )
    db.add(note)
    db.commit()
    db.refresh(note)
    return note


@router.put("/{note_id}", response_model=NoteOut)
def update_note(note_id: int, data: NoteUpdate, db: Session = Depends(get_db), _=Depends(require_admin)):
    note = db.query(Note).filter(Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="笔记不存在")

    update_data = data.model_dump(exclude_unset=True)
    tag_ids = update_data.pop("tag_ids", None)

    if tag_ids is not None:
        note.tags = db.query(Tag).filter(Tag.id.in_(tag_ids)).all()

    for key, value in update_data.items():
        setattr(note, key, value)

    db.commit()
    db.refresh(note)
    return note


@router.delete("/{note_id}", status_code=204)
def delete_note(note_id: int, db: Session = Depends(get_db), _=Depends(require_admin)):
    note = db.query(Note).filter(Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="笔记不存在")
    db.delete(note)
    db.commit()
