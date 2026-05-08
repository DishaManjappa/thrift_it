from motor.motor_asyncio import AsyncIOMotorClient
from backend.core.config import get_settings

settings = get_settings()
client: AsyncIOMotorClient | None = None

if settings.mongo_uri:
    client = AsyncIOMotorClient(settings.mongo_uri)


def get_database():
    if not client:
        return None
    return client[settings.mongo_db_name]
