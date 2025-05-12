import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

def generate_response(prompt: str, context: str = None) -> str:
    """Generate AI response using LLM"""
    try:
        # Build the prompt
        full_prompt = f"""
        Context: {context or "No additional context"}
        Question: {prompt}
        Answer:
        """

        # Check if DeepInfra API key is set
        deepinfra_api_key = os.getenv("DEEPINFRA_API_KEY")

        # If API key is not set, return a mock response
        if not deepinfra_api_key:
            return f"This is a mock response to your question: '{prompt}'. To get real AI responses, please set your DeepInfra API key in the backend/.env file."

        # Call DeepInfra API
        headers = {
            "Authorization": f"Bearer {deepinfra_api_key}",
            "Content-Type": "application/json"
        }

        # Using Mistral 7B model from DeepInfra
        url = "https://api.deepinfra.com/v1/inference/mistralai/Mistral-7B-Instruct-v0.2"

        payload = {
            "input": {
                "messages": [
                    {"role": "user", "content": full_prompt}
                ]
            },
            "max_new_tokens": 512,
            "temperature": 0.7
        }

        response = requests.post(url, headers=headers, json=payload)

        # Check if the request was successful
        if response.status_code == 200:
            result = response.json()
            return result["output"]["choices"][0]["message"]["content"]
        else:
            # If there's an error, return the error message
            error_message = f"DeepInfra API Error: {response.status_code} - {response.text}"
            print(error_message)
            return generate_mock_response(prompt)

    except Exception as e:
        # Return a friendly error message
        error_str = str(e)
        print(f"Error: {error_str}")
        return f"Sorry, I encountered an error: {error_str}. If this is an API key issue, please check your DeepInfra API key in the backend/.env file."

def generate_mock_response(prompt: str) -> str:
    """Generate a mock response for testing purposes"""
    prompt_lower = prompt.lower()

    if "hello" in prompt_lower or "hi" in prompt_lower:
        return "Hello! How can I help you today?"

    elif "how are you" in prompt_lower:
        return "I'm just a computer program, but I'm functioning well! How can I assist you?"

    elif "what can you do" in prompt_lower:
        return "I can answer questions, provide information, help with various tasks, and engage in conversation. What would you like help with?"

    elif "weather" in prompt_lower:
        return "I don't have real-time access to weather data. You might want to check a weather service or app for the most current information."

    elif "joke" in prompt_lower:
        return "Why don't scientists trust atoms? Because they make up everything!"

    elif "thank" in prompt_lower:
        return "You're welcome! Feel free to ask if you need anything else."

    else:
        return f"This is a mock response to your question about '{prompt}'. The OpenAI API key has insufficient quota. To use the real AI, please update your OpenAI account with a valid payment method or use a different API key."