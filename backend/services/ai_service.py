import re
from pathlib import Path

from agents.listing_agent import generate_listing
from agents.pricing_agent import suggest_price
from agents.vision_agent import analyze_image
from backend.models.schemas import ListingResult, VisionResult


def _pick(pattern: str, text: str, fallback: str) -> str:
    match = re.search(pattern, text, re.IGNORECASE)
    return match.group(1).strip(" :-\n") if match else fallback


def _tags(text: str) -> list[str]:
    found = re.findall(r"#?([a-zA-Z][a-zA-Z0-9-]{2,})", text)
    ignored = {"product", "title", "short", "description", "tags", "based", "this", "clothing", "analysis"}
    tags = [tag.lower() for tag in found if tag.lower() not in ignored]
    return list(dict.fromkeys(tags))[:6] or ["thrift", "vintage", "resale"]


def run_vision_agent(image_path: Path) -> VisionResult:
    raw = analyze_image(str(image_path))
    return VisionResult(
        raw=raw,
        category=_pick(r"category[:\s]+(.+)", raw, "Vintage clothing"),
        color=_pick(r"color[:\s]+(.+)", raw, "Mixed tones"),
        condition=_pick(r"condition[:\s]+(.+)", raw, "Good"),
        defects=[] if "no defect" in raw.lower() else [_pick(r"defects?[:\s]+(.+)", raw, "Light signs of wear")],
        summary=raw[:220],
    )


def run_listing_agent(vision_output: str) -> ListingResult:
    raw = generate_listing(vision_output)
    title = _pick(r"title[:\s]+(.+)", raw, "AI-Curated Vintage Find")
    description = _pick(r"description[:\s]+(.+)", raw, raw[:240])
    return ListingResult(raw=raw, title=title, description=description, tags=_tags(raw))


def run_pricing_agent(condition: str) -> str:
    return suggest_price(condition)
