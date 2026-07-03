from uuid import UUID
import mimetypes
import os

from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.models.user import User
from app.models.document import Document

from app.schemas.document import DocumentResponse
from app.schemas.response import ApiResponse

from app.services import document_service
from app.services.document_service import get_documents as get_documents_service

from app.utils.response import success_response

router = APIRouter(
    prefix="/api/v1/documents",
    tags=["Documents"],
)


@router.post(
    "/upload",
    response_model=ApiResponse,
)
def upload(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    document = document_service.upload_document(
        db,
        file,
        current_user,
    )


    return success_response(
        data=DocumentResponse.model_validate(document),
        message="Document uploaded successfully",
    )


@router.get(
    "",
    response_model=ApiResponse,
)
def get_documents(
    page: int = 1,
    limit: int = 5,
    search: str = "",
    sort: str = "newest",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    data = get_documents_service(
        db=db,
        user_id=current_user.id,
        page=page,
        limit=limit,
        search=search,
        sort=sort,
    )

    return success_response(
        data=data,
        message="Documents fetched",
    )


@router.get(
    "/search",
    response_model=ApiResponse,
)
def search(
    q: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    results = document_service.search_documents(
        db,
        q,
        current_user,
    )

    return success_response(
        data=results,
        message="Search completed",
    )


@router.get(
    "/{document_id}/download",
)
def download_document(
    document_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    document = (
        db.query(Document)
        .filter(
            Document.id == document_id,
            Document.user_id == current_user.id,
        )
        .first()
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found",
        )

    if not os.path.exists(document.file_path):
        raise HTTPException(
            status_code=404,
            detail="File not found on server",
        )

    media_type, _ = mimetypes.guess_type(document.original_name)
    media_type = media_type or "application/octet-stream"

    return FileResponse(
        path=document.file_path,
        filename=document.original_name,
        media_type=media_type,
    )


@router.get(
    "/{document_id}",
    response_model=ApiResponse,
)
def get_document(
    document_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    document = (
        db.query(Document)
        .filter(
            Document.id == document_id,
            Document.user_id == current_user.id,
        )
        .first()
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found",
        )

    return success_response(
        data=DocumentResponse.model_validate(document),
        message="Document fetched successfully",
    )


@router.delete(
    "/{document_id}",
)
def delete_document(
    document_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    document = (
        db.query(Document)
        .filter(
            Document.id == document_id,
            Document.user_id == current_user.id,
        )
        .first()
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found",
        )

    if os.path.exists(document.file_path):
        os.remove(document.file_path)

    db.delete(document)
    db.commit()

    return success_response(
        data=None,
        message="Document deleted successfully",
    )