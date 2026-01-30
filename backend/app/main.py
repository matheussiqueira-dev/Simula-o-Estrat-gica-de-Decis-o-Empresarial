from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import auth, health, scenarios
from app.core.config import get_settings
from app.simulation.engine import SimulationEngine
from app.simulation.schemas import SimulationInput

settings = get_settings()
app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix=f"{settings.api_prefix}/auth", tags=["auth"])
app.include_router(
    scenarios.router, prefix=f"{settings.api_prefix}/scenarios", tags=["scenarios"]
)
app.include_router(health.router, prefix=settings.api_prefix, tags=["health"])

engine = SimulationEngine()


@app.get("/")
async def index():
    return {
        "name": settings.app_name,
        "docs": "/docs",
        "websocket": settings.websocket_route,
    }


@app.websocket(settings.websocket_route)
async def simulation_socket(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            payload = await websocket.receive_json()
            variables = SimulationInput.model_validate(payload)
            result = engine.run(variables)
            await websocket.send_json(result.model_dump())
    except WebSocketDisconnect:
        # Client closed the connection; nothing to do.
        return
    except Exception:
        await websocket.close()
        raise
