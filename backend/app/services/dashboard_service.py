from datetime import datetime, timedelta
from sqlalchemy.orm import Session

from app.models.document import Document
from app.models.user import User


def get_dashboard_stats(
    db: Session,
    current_user: User
):

    documents = db.query(Document).filter(
        Document.user_id == current_user.id
    ).all()

    total_documents = len(documents)

    total_storage = sum(
        doc.file_size or 0
        for doc in documents
    )

    pdf_count = sum(
        1 for doc in documents
        if doc.file_type == ".pdf"
    )

    docx_count = sum(
        1 for doc in documents
        if doc.file_type == ".docx"
    )

    image_count = sum(
        1 for doc in documents
        if doc.file_type in [
            ".png",
            ".jpg",
            ".jpeg"
        ]
    )

    last_week = datetime.utcnow() - timedelta(days=7)

    recent_uploads = sum(
        1
        for doc in documents
        if doc.upload_date >= last_week
    )

    return {
        "total_documents": total_documents,
        "total_storage": total_storage,
        "pdf_count": pdf_count,
        "docx_count": docx_count,
        "image_count": image_count,
        "recent_uploads": recent_uploads
    }