from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

# Allow frontend to call backend API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock DB - In production, use PostgreSQL
upgrade_requests = [
    {
        "id": "1",
        "type": "AI Integration",
        "title": "GPT-4 Turbo Integration",
        "status": "Pending",
        "priority": "High",
        "description": "Advanced AI processing for load matching",
        "estimatedCost": "$2,500/month",
    },
    {
        "id": "2",
        "type": "Synthetic AI",
        "title": "Neural Network Optimization",
        "status": "In Progress",
        "priority": "Critical",
        "description": "Real-time decision making AI",
        "estimatedCost": "$5,000/month",
    },
    {
        "id": "3",
        "type": "API Enhancement",
        "title": "Quantum Computing API",
        "status": "Approved",
        "priority": "Medium",
        "description": "Ultra-fast computational processing",
        "estimatedCost": "$10,000/month",
    }
]

ai_integrations = [
    {
        "name": "OpenAI GPT-4",
        "status": "Active",
        "usage": "85%",
        "performance": "Excellent",
    },
    {
        "name": "Claude AI Assistant",
        "status": "Active",
        "usage": "72%",
        "performance": "Good",
    },
    {
        "name": "Synthetic Neural Network",
        "status": "Deploying",
        "usage": "0%",
        "performance": "Testing",
    },
]

# Pydantic models for request/response validation
class UpgradeRequest(BaseModel):
    id: Optional[str] = None
    type: str
    title: str
    status: str
    priority: str
    description: str
    estimatedCost: str

class AIIntegration(BaseModel):
    name: str
    status: str
    usage: str
    performance: str

# GET endpoints
@app.get("/")
def read_root():
    return {"message": "FastAPI Backend is running", "status": "ok"}

@app.get("/api/upgrade-requests")
def get_upgrade_requests():
    return upgrade_requests

@app.get("/api/ai-integrations")
def get_ai_integrations():
    return ai_integrations

# POST endpoints
@app.post("/api/upgrade-requests")
def create_upgrade_request(request: UpgradeRequest):
    request.id = str(len(upgrade_requests) + 1)
    upgrade_requests.append(request.dict())
    return request

@app.post("/api/ai-integrations")
def create_ai_integration(integration: AIIntegration):
    ai_integrations.append(integration.dict())
    return integration
