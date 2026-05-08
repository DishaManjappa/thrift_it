from pydantic import BaseModel, Field


class VisionResult(BaseModel):
    raw: str
    category: str = "Vintage clothing"
    color: str = "Mixed tones"
    condition: str = "Good"
    defects: list[str] = Field(default_factory=list)
    summary: str = "AI analysis completed."


class ListingRequest(BaseModel):
    vision_output: str


class ListingResult(BaseModel):
    raw: str
    title: str
    description: str
    tags: list[str]


class PriceRequest(BaseModel):
    condition: str


class PriceResult(BaseModel):
    price: str


class CheckoutItem(BaseModel):
    title: str
    price: float
    quantity: int = 1


class CheckoutRequest(BaseModel):
    items: list[CheckoutItem]
