from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "ThriftIt AI API"
    frontend_url: str = "http://localhost:3000"
    mongo_uri: str | None = None
    mongo_db_name: str = "thriftit_ai"
    stripe_secret_key: str | None = None
    openrouter_api_key: str | None = None
    openrouter_base_url: str = "https://openrouter.ai/api/v1"
    openrouter_model: str = "openai/gpt-4o-mini"

    class Config:
        env_file = ("backend/.env", ".env")
        extra = "ignore"


@lru_cache
def get_settings() -> Settings:
    return Settings()
