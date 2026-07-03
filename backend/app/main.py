from time import time

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.dashboard import router as dashboard_router
from app.api.documents import router as document_router
from app.api.health import router as health_router
from app.core.exceptions import global_exception_handler
from app.utils.logger import logger

app = FastAPI(
    title="InsightHub",
    description="AI Document Intelligence Platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
           "http://localhost:5173",
            "http://127.0.0.1:5173",
            "https://insighthub-app.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(
    Exception,
    global_exception_handler,
)

app.include_router(auth_router)
app.include_router(document_router)
app.include_router(dashboard_router)
app.include_router(health_router)


@app.middleware("http")
async def log_requests(request, call_next):
    start = time()

    response = await call_next(request)

    duration = time() - start

    logger.info(
        f"{request.method} {request.url.path} | "
        f"{response.status_code} | "
        f"{duration:.3f}s"
    )

    return response


@app.get("/")
def root():
    return {"message": "InsightHub backend running"}