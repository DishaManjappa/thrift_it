import shutil
from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, File, UploadFile

from backend.models.schemas import ListingRequest, ListingResult, PriceRequest, PriceResult, VisionResult
from backend.services.ai_service import run_listing_agent, run_pricing_agent, run_vision_agent

router = APIRouter(tags=["AI Agents"])
UPLOAD_DIR = Path("temp")


@router.post("/analyze-image", response_model=VisionResult)
async def analyze_image_route(file: UploadFile = File(...)):
    UPLOAD_DIR.mkdir(exist_ok=True)
    suffix = Path(file.filename or "upload.jpg").suffix or ".jpg"
    image_path = UPLOAD_DIR / f"{uuid4()}{suffix}"
    with image_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return run_vision_agent(image_path)


@router.post("/generate-listing", response_model=ListingResult)
async def generate_listing_route(payload: ListingRequest):
    return run_listing_agent(payload.vision_output)


@router.post("/suggest-price", response_model=PriceResult)
async def suggest_price_route(payload: PriceRequest):
    return PriceResult(price=run_pricing_agent(payload.condition))
