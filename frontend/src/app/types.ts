export type SimulationInput = {
  price: number;
  variable_cost: number;
  fixed_cost: number;
  employees: number;
  interest_rate: number;
  tax_rate: number;
  demand: number;
  marketing_spend: number;
  churn_rate: number;
  price_sensitivity: number;
  period_months: number;
};

export type SimulationResult = {
  monthly_profit: number;
  annual_profit: number;
  cash_flow: number;
  safety_margin: number;
  growth_rate: number;
  risk_index: number;
  revenue_series: number[];
  profit_series: number[];
  month_labels: string[];
};

export type SimulationResponse = {
  inputs: SimulationInput;
  result: SimulationResult;
};

export const defaultSimulationInput: SimulationInput = {
  price: 120,
  variable_cost: 45,
  fixed_cost: 25000,
  employees: 12,
  interest_rate: 0.08,
  tax_rate: 0.27,
  demand: 1200,
  marketing_spend: 12000,
  churn_rate: 0.04,
  price_sensitivity: 0.18,
  period_months: 12,
};

export const emptySimulationResult: SimulationResult = {
  monthly_profit: 0,
  annual_profit: 0,
  cash_flow: 0,
  safety_margin: 0,
  growth_rate: 0,
  risk_index: 0,
  revenue_series: Array.from({ length: 12 }, () => 0),
  profit_series: Array.from({ length: 12 }, () => 0),
  month_labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};
