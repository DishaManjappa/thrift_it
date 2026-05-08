from fastapi import APIRouter, HTTPException, Request

from backend.models.schemas import CheckoutRequest
from backend.services.stripe_service import create_checkout_session

router = APIRouter(tags=["Checkout"])


@router.post("/create-checkout-session")
async def create_checkout_session_route(payload: CheckoutRequest, request: Request):
    try:
        frontend_origin = request.headers.get("origin")
        return create_checkout_session(payload.items, frontend_origin=frontend_origin)
    except Exception as error:
        raise HTTPException(status_code=400, detail=f"Stripe checkout failed: {error}") from error
