from pydantic import BaseModel

class QueryRequest(BaseModel):
    query: str           # User question
    context: str = None  # Optional context

class QueryResponse(BaseModel):
    response: str        # AI response