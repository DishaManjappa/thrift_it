from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.core.config import get_settings
from backend.routers import ai, checkout, listings, orders

settings = get_settings()

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai.router)
app.include_router(checkout.router)
app.include_router(listings.router)
app.include_router(orders.router)


@app.get("/")
async def health_check():
    return {"status": "ok", "app": settings.app_name}
