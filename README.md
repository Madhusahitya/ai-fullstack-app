# AI Full-Stack App

A modern AI chat application with a FastAPI backend and React frontend.

## Features

- **Backend**: FastAPI (Python) with OpenAI integration
- **Frontend**: React + TypeScript with a modern UI
- **Styling**: Tailwind CSS for responsive design
- **API**: RESTful API for communication between frontend and backend
- **Dockerized**: Easy deployment with Docker Compose

## Screenshots

![AI Chat Interface](https://via.placeholder.com/800x450.png?text=AI+Chat+Interface)

## Setup

### Prerequisites

- Python 3.8+
- Node.js 14+
- Docker and Docker Compose (optional)

### Running Locally

#### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Create a `.env` file with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Start the server:
   ```
   uvicorn app:app --reload
   ```

The backend will be available at http://localhost:8000

#### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

The frontend will be available at http://localhost:3000

### Using Docker

1. Run the entire stack with Docker Compose:
   ```
   docker-compose up --build
   ```

2. Access:
   - Backend: http://localhost:8000
   - Frontend: http://localhost:3000

## Project Structure

- `backend/`: FastAPI backend with OpenAI integration
- `frontend/`: React frontend with TypeScript and Tailwind CSS

## API Endpoints

- `POST /query`: Send a query to the AI
- `GET /health`: Check the health of the backend
