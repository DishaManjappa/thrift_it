from backend.core.database import get_database

DEMO_LISTINGS = [
    {"id": "vintage-denim-jacket", "title": "Cropped Vintage Leather Jacket", "price": 42, "condition": "Excellent", "tags": ["leather", "90s", "oversized"]},
    {"id": "silk-scarf", "title": "Cherry Silk Scarf", "price": 18, "condition": "Good", "tags": ["silk", "coquette", "red"]},
]


async def get_listings():
    db = get_database()
    if db is None:
        return DEMO_LISTINGS
    listings = await db.listings.find().to_list(length=50)
    for listing in listings:
        listing["id"] = str(listing.pop("_id"))
    return listings or DEMO_LISTINGS
