from unittest.mock import patch
import pytest

@patch('services.llm_services.OpenAI')
def test_query_endpoint(mock_openai, client):
    """
    Test the /query endpoint with a mocked OpenAI response.

    Args:
        mock_openai: Mocked OpenAI client
        client: TestClient fixture from conftest.py
    """
    # Mock the OpenAI client and response
    mock_client = mock_openai.return_value
    mock_chat = mock_client.chat
    mock_completions = mock_chat.completions
    mock_create = mock_completions.create

    # Set up the mock response
    mock_response = mock_create.return_value
    mock_response.choices = [
        type('obj', (object,), {
            'message': type('obj', (object,), {
                'content': 'Python is a programming language.'
            })
        })
    ]

    # Make the request
    response = client.post(
        "/query",
        json={"query": "What is Python?"}
    )

    # Assertions
    assert response.status_code == 200
    assert "response" in response.json()
    assert response.json()["response"] == "Python is a programming language."

def test_health_check(client):
    """
    Test the /health endpoint.

    Args:
        client: TestClient fixture from conftest.py
    """
    response = client.get("/health")

    # Assertions
    assert response.status_code == 200
    assert "status" in response.json()
    assert response.json()["status"] == "healthy"
    assert "timestamp" in response.json()
    assert "version" in response.json()
    assert "environment" in response.json()
