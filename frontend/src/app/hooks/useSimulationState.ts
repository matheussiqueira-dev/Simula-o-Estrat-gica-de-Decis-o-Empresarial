'use client';

import { useEffect, useReducer, useRef } from "react";

import {
  SimulationInput,
  SimulationResult,
  defaultSimulationInput,
  emptySimulationResult,
} from "../types";

type Status = "idle" | "connecting" | "live" | "error";

type State = {
  variables: SimulationInput;
  result: SimulationResult;
  status: Status;
  lastUpdated: number | null;
};

type Action =
  | { type: "setVar"; key: keyof SimulationInput; value: number }
  | { type: "setResult"; result: SimulationResult }
  | { type: "setStatus"; status: Status }
  | { type: "replaceVars"; vars: SimulationInput };

const initialState: State = {
  variables: defaultSimulationInput,
  result: emptySimulationResult,
  status: "idle",
  lastUpdated: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setVar": {
      const variables = { ...state.variables, [action.key]: action.value };
      return { ...state, variables, lastUpdated: Date.now() };
    }
    case "replaceVars":
      return { ...state, variables: action.vars, lastUpdated: Date.now() };
    case "setResult":
      return { ...state, result: action.result, lastUpdated: Date.now() };
    case "setStatus":
      return { ...state, status: action.status };
    default:
      return state;
  }
}

function simulateLocally(input: SimulationInput): SimulationResult {
  const payroll = input.employees * 4200;
  const revenue = input.price * input.demand;
  const variable = input.variable_cost * input.demand;
  const operating = payroll + input.fixed_cost + input.marketing_spend;
  const interest = 150_000 * input.interest_rate / 12;
  const ebit = revenue - variable - operating;
  const taxable = ebit - interest;
  const tax = Math.max(taxable, 0) * input.tax_rate;
  const net = taxable - tax;

  const monthly_profit = Number(net.toFixed(2));
  const annual_profit = Number((net * 12).toFixed(2));
  const cash_flow = Number((net + input.fixed_cost * 0.05).toFixed(2));

  const contribution = input.price - input.variable_cost || 1;
  const breakeven_units = (operating + interest) / contribution;
  const safety_margin = Number(
    ((input.demand - breakeven_units) / Math.max(input.demand, 1)).toFixed(3)
  );
  const risk_index = Number(Math.min(1, Math.max(0, 1 - safety_margin)).toFixed(3));
  const growth_rate = Number(
    (Math.log1p(input.marketing_spend) / 100 - input.churn_rate * 0.5).toFixed(3)
  );

  const labels = emptySimulationResult.month_labels.slice(0, input.period_months);
  const revenue_series = Array.from({ length: input.period_months }, (_, idx) =>
    Number(((revenue / input.period_months) * (1 + growth_rate * idx)).toFixed(2))
  );
  const profit_series = Array.from({ length: input.period_months }, (_, idx) =>
    Number(((monthly_profit) * (1 + growth_rate * idx * 0.5)).toFixed(2))
  );

  return {
    monthly_profit,
    annual_profit,
    cash_flow,
    safety_margin,
    growth_rate,
    risk_index,
    revenue_series,
    profit_series,
    month_labels: labels,
  };
}

export function useSimulationState() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const wsRef = useRef<WebSocket | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const variablesRef = useRef<SimulationInput>(defaultSimulationInput);

  useEffect(() => {
    dispatch({ type: "setResult", result: simulateLocally(defaultSimulationInput) });

    const wsUrl =
      process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:8000/ws/simulate";
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;
    dispatch({ type: "setStatus", status: "connecting" });

    ws.onopen = () => {
      dispatch({ type: "setStatus", status: "live" });
      ws.send(JSON.stringify(variablesRef.current));
    };

    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data) as SimulationResult;
        dispatch({ type: "setResult", result: parsed });
      } catch (err) {
        console.warn("Failed to parse simulation message", err);
      }
    };

    ws.onerror = () => dispatch({ type: "setStatus", status: "error" });
    ws.onclose = () => dispatch({ type: "setStatus", status: "idle" });

    return () => {
      ws.close();
    };
  }, []);

  const sendVariables = (vars: SimulationInput) => {
    variablesRef.current = vars;
    const socket = wsRef.current;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(vars));
    } else {
      // Keep UI responsive even without the backend.
      dispatch({ type: "setResult", result: simulateLocally(vars) });
      dispatch({ type: "setStatus", status: "error" });
    }
  };

  const updateVariable = (key: keyof SimulationInput, value: number) => {
    const nextVars = { ...variablesRef.current, [key]: value };
    dispatch({ type: "setVar", key, value });

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => sendVariables(nextVars), 160);
  };

  return {
    state,
    updateVariable,
  };
}
