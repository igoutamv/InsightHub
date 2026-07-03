from fastapi import APIRouter
from app.utils.response import success_response

router = APIRouter(
    prefix="/api/v1",
    tags=["System"]
)


@router.get("/health")
def health():

    return success_response(

        {

            "status":"healthy",

            "service":"InsightHub API",

            "version":"1.0.0"

        },

        "API is running"

    )