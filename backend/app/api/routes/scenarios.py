from fastapi import APIRouter
from pydantic import BaseModel

from app.simulation.engine import SimulationEngine
from app.simulation.schemas import SimulationInput, SimulationResponse

router = APIRouter()
engine = SimulationEngine()


class Scenario(BaseModel):
    id: int
    name: str
    variables: SimulationInput


class ScenarioListResponse(BaseModel):
    scenarios: list[Scenario]


SCENARIOS: list[Scenario] = [
    Scenario(id=1, name="Base case", variables=SimulationInput()),
    Scenario(
        id=2,
        name="High marketing",
        variables=SimulationInput(marketing_spend=18000, price=115, demand=1400),
    ),
]


@router.get("/", response_model=ScenarioListResponse, summary="List demo scenarios")
async def list_scenarios():
    return {"scenarios": SCENARIOS}


@router.post(
    "/run",
    response_model=SimulationResponse,
    summary="Run a one-off simulation without persisting it",
)
async def run_scenario(payload: SimulationInput):
    result = engine.run(payload)
    return SimulationResponse(inputs=payload, result=result)
