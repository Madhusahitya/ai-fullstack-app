import pytest
from fastapi.testclient import TestClient
from app import app

@pytest.fixture
def client():
    """
    Create a test client for the FastAPI application.
    This fixture can be used in tests to make requests to the API.
    """
    return TestClient(app)
