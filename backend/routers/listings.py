from fastapi import APIRouter

from backend.services.listing_service import get_listings

router = APIRouter(tags=["Listings"])


@router.get("/listings")
async def listings_route():
    return await get_listings()
