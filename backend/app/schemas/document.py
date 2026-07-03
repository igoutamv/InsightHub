from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class DocumentResponse(BaseModel):
    id: UUID
    original_name: str
    file_type: str
    file_size: int
    summary: str | None = None
    extracted_text: str | None = None
    category: str | None = None
    status: str
    upload_date: datetime

    class Config:
        from_attributes = True