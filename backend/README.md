# AI Fullstack App Backend

This is the backend for the AI Fullstack App, built with FastAPI.

## Setup

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Madhusahitya/ai-fullstack-app.git
   cd ai-fullstack-app/backend
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. For development, install the package in development mode:
   ```
   pip install -e .
   ```

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
OPENAI_API_KEY=your_openai_api_key
```

## Running the Application

Start the FastAPI server:

```
uvicorn app:app --reload
```

The API will be available at http://localhost:8000

## API Documentation

Once the server is running, you can access the auto-generated API documentation at:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Running Tests

To run the tests:

```
# Set PYTHONPATH to include the current directory
# On Windows:
$env:PYTHONPATH = "."

# On Linux/Mac:
# export PYTHONPATH=.

# Run tests
python -m pytest tests/
```

## Project Structure

- `app.py`: Main FastAPI application
- `models/`: Data models and schemas
- `services/`: Business logic and external service integrations
- `tests/`: Test cases
