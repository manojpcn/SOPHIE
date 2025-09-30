from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import dashboard
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="SOPHIE")

# Enable CORS for React frontend
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:5050",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard.router)

@app.get("/")
def root():
    logger.info("Root endpoint called")
    return {"message": "Server running"}
