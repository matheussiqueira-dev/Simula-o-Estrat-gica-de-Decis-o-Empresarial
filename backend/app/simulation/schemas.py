from typing import List

from pydantic import BaseModel, Field


class SimulationInput(BaseModel):
    price: float = Field(120.0, gt=0, description="Sale price per unit")
    variable_cost: float = Field(45.0, gt=0, description="Variable cost per unit")
    fixed_cost: float = Field(25000.0, ge=0, description="Monthly fixed costs")
    employees: int = Field(12, ge=1, description="Headcount on payroll")
    interest_rate: float = Field(0.08, ge=0, description="Annual interest rate (decimal)")
    tax_rate: float = Field(0.27, ge=0, le=1, description="Effective tax rate")
    demand: float = Field(1200.0, ge=0, description="Expected monthly demand units")
    marketing_spend: float = Field(12000.0, ge=0, description="Monthly marketing investment")
    churn_rate: float = Field(0.04, ge=0, le=1, description="Customer churn rate (decimal)")
    price_sensitivity: float = Field(0.18, ge=0, le=2, description="Demand elasticity to price")
    period_months: int = Field(12, ge=1, le=24, description="Projection horizon in months")


class SimulationResult(BaseModel):
    monthly_profit: float
    annual_profit: float
    cash_flow: float
    safety_margin: float
    growth_rate: float
    risk_index: float
    revenue_series: List[float]
    profit_series: List[float]
    month_labels: List[str]


class SimulationResponse(BaseModel):
    inputs: SimulationInput
    result: SimulationResult
