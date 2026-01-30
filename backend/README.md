# Business Decision Simulator API

FastAPI backend that exposes REST endpoints and a WebSocket for real-time simulation results.

## Quick start
```bash
cd backend
python -m venv .venv
. .venv/Scripts/activate    # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Notable endpoints
- `GET /api/health/health` – liveness check
- `POST /api/auth/login` – demo JWT token (no persistence yet)
- `GET /api/scenarios/` – demo scenarios
- `POST /api/scenarios/run` – run a one-off simulation
- `WS /ws/simulate` – send simulation variables, receive computed KPIs and series

## Environment
Copy `.env.example` to `.env` and adjust credentials. For a local Postgres instance you can change `DATABASE_URL` accordingly; routes are currently in-memory but the SQLAlchemy engine is wired for future persistence.
