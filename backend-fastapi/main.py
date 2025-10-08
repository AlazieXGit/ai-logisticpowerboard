from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://www.alazie.express", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock DB
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

class UpgradeRequest(BaseModel):
    id: str | None = None
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

@app.get("/api/upgrade-requests")
def get_upgrade_requests():
    return upgrade_requests

@app.get("/api/ai-integrations")
def get_ai_integrations():
    return ai_integrations

@app.post("/api/upgrade-requests")
def create_upgrade_request(request: UpgradeRequest):
    request.id = str(len(upgrade_requests) + 1)
    upgrade_requests.append(request.dict())
    return request

@app.post("/api/ai-integrations")
def create_ai_integration(integration: AIIntegration):
    ai_integrations.append(integration.dict())
    return integration
