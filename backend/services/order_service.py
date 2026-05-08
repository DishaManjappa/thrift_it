MOCK_ORDERS = [
    {"id": "ORD-1042", "item": "Cropped Vintage Denim Jacket", "status": "processing", "total": "$42"},
    {"id": "ORD-1031", "item": "Cherry Silk Scarf", "status": "shipped", "total": "$18"},
    {"id": "ORD-0988", "item": "Hand-Knit Moss Cardigan", "status": "delivered", "total": "$49"},
]


async def get_orders():
    return MOCK_ORDERS
