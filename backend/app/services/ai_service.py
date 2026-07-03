import os
import fitz
from docx import Document
import pytesseract
from PIL import Image

pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)


def extract_text(file_path: str):
    try:
        extension = os.path.splitext(file_path)[1].lower()

        if extension == ".pdf":
            with fitz.open(file_path) as doc:
                return "".join(page.get_text() for page in doc)

        elif extension == ".docx":
            doc = Document(file_path)
            return "\n".join(p.text for p in doc.paragraphs)

        elif extension in [".png", ".jpg", ".jpeg"]:
            image = Image.open(file_path).convert("L")
            return pytesseract.image_to_string(image)

        return ""

    except Exception as e:
        print(f"Error extracting text: {e}")
        return ""



def generate_summary(text: str):

    if not text:
        return "No summary available."

    sentences = text.split(".")

    return ".".join(sentences[:3]).strip()

def classify_document(text: str):
    text = text.lower()

    categories = {
        "Resume": [
            "resume", "curriculum vitae", "cv", "experience", "skills"
        ],
        "Invoice": [
            "invoice", "tax invoice", "gst", "amount due"
        ],
        "Receipt": [
            "receipt", "payment received", "receipt no"
        ],
        "Research Paper": [
            "abstract", "methodology", "references", "research"
        ],
        "Notes": [
            "lecture", "semester", "college", "chapter", "unit", "notes"
        ],
        "Assignment": [
            "assignment", "submitted by", "course"
        ],
        "Bank Statement": [
            "bank", "account number", "transaction", "balance"
        ],
        "Medical Report": [
            "patient", "diagnosis", "hospital"
        ],
        "Certificate": [
            "certificate", "awarded", "certified"
        ],
        "Offer Letter": [
            "offer letter", "joining", "salary"
        ]
    }

    for category, keywords in categories.items():
        if any(keyword in text for keyword in keywords):
            return category

    return "General Document"