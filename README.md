# Business Decision Simulator

Plataforma interativa para testar decisões estratégicas (preço, custos, marketing, equipe) e ver o impacto imediato em lucro, caixa, crescimento e risco.

## Estrutura
- `frontend/` – Next.js 16 + Tailwind + Recharts. UI responsiva, com sliders, KPIs e gráficos em tempo real.
- `backend/` – FastAPI + WebSocket. Exposição de endpoints REST e motor de simulação vetorizado com NumPy/Pandas.

## Como rodar
### Backend
```bash
cd backend
python -m venv .venv
. .venv/Scripts/activate    # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

O frontend espera o WebSocket em `ws://localhost:8000/ws/simulate` (configure via `NEXT_PUBLIC_WS_URL` se necessário).

## Fluxo de simulação
1. Usuário move um slider → `useSimulationState` envia variáveis via WebSocket.
2. Backend processa em `SimulationEngine.run` e devolve KPIs + séries.
3. Front atualiza cards e gráficos em tempo real; se o socket cair, calcula localmente para manter a responsividade.

## Próximos passos sugeridos
- Persistência real no PostgreSQL (SQLAlchemy + Alembic migrations).
- Autenticação completa (refresh tokens e autorização por cenário).
- Testes automatizados (PyTest para engine e Playwright/React Testing Library para UI).
