from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="LoadBoard AI API",
    description="Backend API for LoadBoard AI logistics platform",
    version="1.0.0"
)

# CORS middleware configuration
# Note: allow_origins cannot include "*" when allow_credentials is True
# This ensures secure cross-origin requests with credentials
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://www.alazie.express", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "LoadBoard AI API is running"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}
