import os

class Settings:
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    API_PORT = int(os.getenv("PORT", 8000))