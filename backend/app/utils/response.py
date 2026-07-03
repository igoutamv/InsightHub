from app.schemas.response import ApiResponse


def success_response(

    data,

    message="Success"

):

    return ApiResponse(

        success=True,

        message=message,

        data=data

    )


def error_response(

    message,

    detail=None

):

    return {

        "success": False,

        "message": message,

        "detail": detail

    }