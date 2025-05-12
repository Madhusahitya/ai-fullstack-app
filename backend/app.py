from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models.schemas import QueryRequest, QueryResponse
from services.llm_services import generate_response
import logging
import os
from datetime import datetime

# Initialize app
app = FastAPI(
    title="AI Agent Backend",
    description="Backend API for the AI Fullstack Application",
    version="0.1.0"
)

# CORS (Allow frontend connections)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logger setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.post("/query", response_model=QueryResponse)
async def handle_query(request: QueryRequest):
    """Endpoint to process user queries with AI"""
    try:
        logger.info(f"Processing query: {request.query}")

        # Generate AI response
        response = generate_response(
            prompt=request.query,
            context=request.context
        )

        return {"response": response}

    except Exception as e:
        logger.error(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail="AI processing failed")

@app.get("/")
async def root():
    """Root endpoint that redirects to docs"""
    return {
        "message": "Welcome to AI Chat API",
        "documentation": "/docs",
        "health": "/health",
        "query_endpoint": "/query (POST)"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": app.version,
        "environment": os.getenv("ENVIRONMENT", "development")
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", "8888")))