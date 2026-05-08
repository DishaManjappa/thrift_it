# ThriftIt AI

ThriftIt AI is a startup-style MVP for an AI-powered thrift marketplace. Users can browse demo thrift items publicly, sign in with Clerk, upload clothing photos, run the Python AI agents, review generated listing details, add items to a cart, and launch Stripe Checkout.

## Stack

- Frontend: Next.js 14, Tailwind CSS, Framer Motion, Clerk
- Backend: FastAPI, MongoDB Atlas via Motor, Stripe Checkout
- AI agents: `agents/vision_agent.py`, `agents/listing_agent.py`, `agents/pricing_agent.py`

## Project Structure

- `frontend/`: Next.js app router UI, reusable components, cart state, Clerk middleware
- `backend/`: FastAPI routers, Pydantic models, services, config, MongoDB helper
- `agents/`: existing Python AI agents used by the FastAPI service
- `app.py`: FastAPI compatibility entrypoint for `uvicorn app:app`

## Environment Setup

Copy the examples and fill in your keys:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

Backend variables:

```bash
FRONTEND_URL=http://localhost:3000
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/?retryWrites=true&w=majority
MONGO_DB_NAME=thriftit_ai
STRIPE_SECRET_KEY=sk_test_your_stripe_key
OPENROUTER_API_KEY=sk-or-v1-your-openrouter-key
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_MODEL=openai/gpt-4o-mini
```

Frontend variables:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key
CLERK_SECRET_KEY=sk_test_your_clerk_secret
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Run Locally

Install backend dependencies:

```bash
pip install -r requirements.txt
uvicorn app:app --reload
```

Install frontend dependencies:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## API Routes

- `POST /analyze-image`: accepts multipart image upload and runs the vision agent
- `POST /generate-listing`: generates title, description, and tags from vision output
- `POST /suggest-price`: suggests resale pricing from condition text
- `POST /create-checkout-session`: creates Stripe Checkout Session, or returns demo success URL without a Stripe key
- `GET /orders`: mock order data
- `GET /listings`: MongoDB listings when configured, otherwise demo listings

## MVP Notes

Marketplace browsing is public. Upload, cart, checkout, orders, and profile routes are protected by Clerk. Stripe uses Checkout Sessions for one-time payments and intentionally does not implement seller payouts, escrow, or logistics.
