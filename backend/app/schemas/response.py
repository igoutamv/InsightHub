from pydantic import BaseModel
from typing import Any


class ApiResponse(BaseModel):
    success: bool = True
    message: str
    data: Any