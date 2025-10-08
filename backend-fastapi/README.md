# LoadBoard AI - FastAPI Backend

This is the FastAPI backend for the LoadBoard AI logistics platform.

## CORS Configuration

The backend is configured with the following CORS settings:

- **allow_origins**: `["https://www.alazie.express", "http://localhost:3000"]`
- **allow_credentials**: `True`
- **allow_methods**: `["*"]`
- **allow_headers**: `["*"]`

**Important**: The `allow_origins` does not include `"*"` because when `allow_credentials` is set to `True`, Starlette's CORSMiddleware does not allow wildcard origins. This is a security requirement to prevent credentials from being sent to any origin.

## Setup

1. Create a virtual environment (optional but recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the development server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

- `GET /` - Root endpoint, returns API status
- `GET /health` - Health check endpoint
- `GET /docs` - Interactive API documentation (Swagger UI)
- `GET /redoc` - Alternative API documentation (ReDoc)

## Production Deployment

For production, use:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```
