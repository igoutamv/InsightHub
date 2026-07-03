import math
from uuid import UUID

from fastapi import HTTPException, UploadFile
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.document import Document
from app.models.user import User
from app.schemas.document import DocumentResponse
from app.services.ai_service import (
    classify_document,
    extract_text,
    generate_summary,
)
from app.utils.file_handler import save_uploaded_file


def upload_document(
    db: Session,
    file: UploadFile,
    current_user: User,
):
    print("Uploading called")

    existing = (
        db.query(Document)
        .filter(
            Document.user_id == current_user.id,
            Document.original_name == file.filename,
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="File with the same name already exists.",
        )

    file_data = save_uploaded_file(file)

    # Extract text
    text = extract_text(file_data["file_path"])

    # Generate AI outputs
    summary = generate_summary(text)
    category = classify_document(text)

    # Save document
    document = Document(
        user_id=current_user.id,
        original_name=file.filename,
        stored_name=file_data["stored_name"],
        file_path=file_data["file_path"],
        file_type=file_data["extension"],
        file_size=file_data["file_size"],
        extracted_text=text,
        summary=summary,
        category=category,
        status="COMPLETED",
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return document


def get_documents(
    db: Session,
    user_id: UUID,
    page: int,
    limit: int,
    search: str = "",
    sort: str = "newest",
):
    query = db.query(Document).filter(Document.user_id == user_id)

    if search:
        query = query.filter(
            or_(
                Document.original_name.ilike(f"%{search}%"),
                Document.extracted_text.ilike(f"%{search}%"),
                Document.summary.ilike(f"%{search}%"),
                Document.category.ilike(f"%{search}%"),
            )
        )

    if sort == "oldest":
        query = query.order_by(Document.upload_date.asc())
    elif sort == "name":
        query = query.order_by(Document.original_name.asc())
    elif sort == "size":
        query = query.order_by(Document.file_size.desc())
    else:
        query = query.order_by(Document.upload_date.desc())

    total = query.count()

    documents = (
        query.offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return {
        "documents": [
            DocumentResponse.model_validate(doc)
            for doc in documents
        ],
        "page": page,
        "limit": limit,
        "total": total,
        "total_pages": max(1, math.ceil(total / limit)),
    }


def search_documents(
    db: Session,
    query: str,
    current_user: User,
):
    return (
        db.query(Document)
        .filter(
            Document.user_id == current_user.id,
            or_(
                Document.original_name.ilike(f"%{query}%"),
                Document.category.ilike(f"%{query}%"),
                Document.summary.ilike(f"%{query}%"),
                Document.extracted_text.ilike(f"%{query}%"),
            ),
        )
        .all()
    )