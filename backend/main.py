import sys
sys.path.append("..")

import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers import auth_router, reviews_router, properties_router, analytics_router
from starlette.middleware.sessions import SessionMiddleware
from src.env import SESSION_KEY, DATABASE_URL
from apscheduler.schedulers.background import BackgroundScheduler
from sqlalchemy.orm import sessionmaker
from src.clients import sync_reviews
from sqlalchemy import create_engine
from src.clients.db_client import DatabaseClient

logging.basicConfig(level=logging.DEBUG,
                    format='%(filename)s - %(funcName)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

logger.info(f"Flex Review Management Backend...")

app = FastAPI(
    title="The Flex Review Management Backend"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Frontend URL in development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(SessionMiddleware, secret_key=SESSION_KEY)

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/api/hello")
async def hello_world():
    """Sample API endpoint."""
    return {"message": "Hello from FastAPI!"}

app.include_router(auth_router, prefix='/api')
app.include_router(reviews_router, prefix='/api')
app.include_router(properties_router, prefix='/api')
app.include_router(analytics_router, prefix='/api')

def start_scheduler():
    scheduler = BackgroundScheduler()

    def job():
        db = DatabaseClient()
        try:
            import asyncio
            asyncio.run(sync_reviews())
        except Exception as e:
            raise e

    scheduler.add_job(job, "interval", minutes=30)
    scheduler.start()

# Example DB URL (Postgres)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

@app.on_event("startup")
def startup_event():
    # Start background sync scheduler when the app boots
    start_scheduler()
