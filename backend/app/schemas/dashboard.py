from pydantic import BaseModel


class DashboardResponse(BaseModel):
    total_documents: int
    total_storage: int
    pdf_count: int
    docx_count: int
    image_count: int
    recent_uploads: int