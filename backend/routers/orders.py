from fastapi import APIRouter

from backend.services.order_service import get_orders

router = APIRouter(tags=["Orders"])


@router.get("/orders")
async def orders_route():
    return await get_orders()
