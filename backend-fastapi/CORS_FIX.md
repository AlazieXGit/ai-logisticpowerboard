# CORS Configuration Fix

## Problem
Previously, the CORS middleware was configured with:
```python
allow_origins=["*", "https://www.alazie.express", "http://localhost:3000"]
allow_credentials=True
```

This is **invalid** because Starlette's CORSMiddleware does not allow wildcard origins (`"*"`) when `allow_credentials=True`. This would cause a runtime error.

## Solution
The configuration has been updated to:
```python
allow_origins=["https://www.alazie.express", "http://localhost:3000"]
allow_credentials=True
allow_methods=["*"]
allow_headers=["*"]
```

## Why This Is Secure
- Credentials (cookies, authorization headers) can only be sent from specific trusted origins
- Wildcard origin (`"*"`) would allow any website to make credentialed requests
- This protects user data and prevents CSRF attacks

## Testing
The configuration has been tested and verified to:
1. Accept requests from `https://www.alazie.express`
2. Accept requests from `http://localhost:3000`
3. Reject requests from unauthorized origins
4. Properly set the `access-control-allow-credentials: true` header

## References
- [MDN: CORS and credentials](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#credentialed_requests_and_wildcards)
- [FastAPI CORS documentation](https://fastapi.tiangolo.com/tutorial/cors/)
- [Starlette CORSMiddleware](https://www.starlette.io/middleware/#corsmiddleware)
