# InsightHub v1.0

AI Document Intelligence Platform for uploading, extracting, searching, and managing documents.

InsightHub is a full-stack web application that enables users to upload PDFs, Word documents, and images, automatically extract their contents using OCR/text extraction, and search documents using keywords found inside the document—not just by filename.
Unlike a traditional document management system, InsightHub focuses on making uploaded documents searchable and intelligent.

## Features

*  Secure JWT Authentication
*  Upload PDF, DOCX, JPG and PNG files
*  OCR/Text Extraction
*  Full-text Document Search
*  Dashboard Analytics
*  Download Documents
*  Delete Documents
*  User Profile
*  Pagination & Sorting
*  Keyword-based Search
*  Cloud Deployment


## Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS3
* Axios
* React Router
* React Hot Toast

### Backend

* FastAPI
* SQLAlchemy
* JWT Authentication
* Pydantic
* Python

### Database

* PostgreSQL (Neon or pgadmin 4)

### OCR & Text Extraction

* PyMuPDF
* python-docx
* Pillow
* pytesseract

### Deployment

* Vercel (Frontend)
* Render (Backend)
* Neon PostgreSQL (Database)


## Project Structure

```text
InsightHub
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── app
│   ├── storage
│   ├── requirements.txt
│   └── main.py
│
└── README.md
```


## Installation

### Clone Repository

```bash
git clone https://github.com/igoutamv/InsightHub.git
cd InsightHub
```

### Backend

```bash
cd backend

python -m venv venv
venv\Scripts\activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend

npm install
npm run dev
```


## Environment Variables

### Backend (.env)

```env
DATABASE_URL=YOUR_DATABASE_URL
SECRET_KEY=YOUR_SECRET_KEY
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

(check .env.example to get more clarity)
```

### Frontend (.env)

```env
VITE_API_URL=BACKEND_URL/api/v1
```


## API Overview

### Authentication

* POST `/api/v1/auth/register`
* POST `/api/v1/auth/login`
* GET `/api/v1/auth/me`

### Documents

* POST `/api/v1/documents/upload`
* GET `/api/v1/documents`
* GET `/api/v1/documents/search`
* GET `/api/v1/documents/{id}`
* GET `/api/v1/documents/{id}/download`
* DELETE `/api/v1/documents/{id}`


## Future Improvements

* AI-powered summaries using Google Gemini
* Semantic search
* Document chat
* Multi-language OCR
* Cloud file storage (AWS S3)


## Live Demo

Frontend:
https://insighthubai.vercel.app

Backend:
https://insighthub-backend-65ba.onrender.com/docs

## License

This project is licensed under the MIT License.


## Author

Developed by **igoutamv** as a portfolio project to demonstrate modern full-stack development using React, FastAPI, PostgreSQL, OCR, and cloud deployment.
Thank You:)
