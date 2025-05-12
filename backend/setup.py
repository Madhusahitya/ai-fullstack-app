from setuptools import setup, find_packages

setup(
    name="ai-fullstack-backend",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "fastapi>=0.95.0",
        "uvicorn>=0.21.0",
        "python-dotenv>=0.21.0",
        "openai>=0.27.0",
        "pydantic>=1.10.0",
    ],
    python_requires=">=3.8",
)
