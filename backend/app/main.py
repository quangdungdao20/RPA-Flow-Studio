from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.nats import nats_manager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Connect to NATS
    await nats_manager.connect()
    yield
    # Shutdown: Close NATS connection
    await nats_manager.disconnect()

app = FastAPI(
    title=settings.PROJECT_NAME,
    lifespan=lifespan,
)

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "status": "healthy",
        "project": settings.PROJECT_NAME,
        "version": "1.0.0-MVP"
    }
