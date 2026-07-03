import os
import uuid
import shutil

from fastapi import UploadFile, HTTPException

UPLOAD_DIR = "storage/uploads"

ALLOWED_EXTENSIONS = {
    ".pdf",
    ".docx",
    ".png",
    ".jpg",
    ".jpeg"
}


def create_upload_folder():

    os.makedirs(
        UPLOAD_DIR,
        exist_ok=True
    )


def save_uploaded_file(
    file: UploadFile
):

    create_upload_folder()

    extension = os.path.splitext(
        file.filename
    )[1].lower()

    if extension not in ALLOWED_EXTENSIONS:

        raise HTTPException(
            status_code=400,
            detail="Unsupported file type"
        )

    unique_name = (
        f"{uuid.uuid4()}{extension}"
    )

    file_path = os.path.join(
        UPLOAD_DIR,
        unique_name
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    return {
        "stored_name": unique_name,
        "file_path": file_path,
        "extension": extension,
        "file_size": os.path.getsize(file_path)
    }