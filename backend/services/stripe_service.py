import stripe

from backend.core.config import get_settings
from backend.models.schemas import CheckoutItem

settings = get_settings()


def _stripe_secret_key() -> str:
    key = settings.stripe_secret_key or ""
    return key


def create_checkout_session(items: list[CheckoutItem]) -> dict:
    secret_key = _stripe_secret_key()
    if not secret_key or "your_stripe" in secret_key:
        return {"url": f"{settings.frontend_url}/checkout/success?demo=true", "demo": True}

    stripe.api_key = secret_key
    stripe.api_version = "2026-02-25.clover"

    session = stripe.checkout.Session.create(
        mode="payment",
        success_url=f"{settings.frontend_url}/checkout/success?session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=f"{settings.frontend_url}/checkout/cancel",
        line_items=[
            {
                "quantity": item.quantity,
                "price_data": {
                    "currency": "usd",
                    "unit_amount": int(item.price * 100),
                    "product_data": {"name": item.title},
                },
            }
            for item in items
        ],
    )
    return {"url": session.url, "id": session.id}
