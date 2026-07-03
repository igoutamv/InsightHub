from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user

from app.models.user import User

from app.schemas.dashboard import DashboardResponse
from app.schemas.document import DocumentResponse
from app.schemas.response import ApiResponse

from app.services.document_service import search_documents
from app.services.dashboard_service import get_dashboard_stats

from app.utils.response import success_response

router = APIRouter(
    prefix="/api/v1/dashboard",
    tags=["Dashboard"],
)


@router.get(
    "/search",
    response_model=list[DocumentResponse],
)
def search(
    q: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return search_documents(
        db,
        q,
        current_user,
    )


@router.get(
    "/stats",
    response_model=ApiResponse,
)
def dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    stats = get_dashboard_stats(
        db,
        current_user,
    )

    return success_response(
        stats,
        "Dashboard statistics fetched",
    )