from sqlalchemy import Column, String, DateTime, Text, BigInteger, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime

from app.core.database import Base


class Document(Base):
    __tablename__ = "documents"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False,
    )

    original_name = Column(String, nullable=False)
    stored_name = Column(String, nullable=False)

    file_path = Column(String, nullable=False)
    file_type = Column(String, nullable=False)
    file_size = Column(BigInteger)

    text = Column(Text, nullable=True)
    extracted_text = Column(Text, nullable=True)

    summary = Column(Text, nullable=True)
    category = Column(String, nullable=True)

    status = Column(String, default="UPLOADING")

    upload_date = Column(DateTime, default=datetime.utcnow)