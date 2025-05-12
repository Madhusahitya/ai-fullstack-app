import axios from 'axios';

// Define the API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define types for API requests and responses
export interface QueryRequest {
  query: string;
  context?: string;
}

export interface QueryResponse {
  response: string;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  version: string;
  environment: string;
}

// API functions
export const sendQuery = async (data: QueryRequest): Promise<QueryResponse> => {
  try {
    const response = await api.post<QueryResponse>('/query', data);
    return response.data;
  } catch (error) {
    console.error('Error sending query:', error);
    throw error;
  }
};

export const checkHealth = async (): Promise<HealthResponse> => {
  try {
    const response = await api.get<HealthResponse>('/health');
    return response.data;
  } catch (error) {
    console.error('Error checking health:', error);
    throw error;
  }
};

export default api;
