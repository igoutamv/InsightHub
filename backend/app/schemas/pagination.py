from math import ceil
from pydantic import BaseModel
from typing import List

from app.schemas.document import DocumentResponse


class PaginatedDocuments(BaseModel):
    page: int
    limit: int
    total: int
    total_pages: int
    documents: List[DocumentResponse]