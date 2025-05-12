.PHONY: install test run clean dev-install

# Install dependencies
install:
	pip install -r requirements.txt

# Install in development mode
dev-install:
	pip install -e .

# Run tests
test:
	python -m pytest tests/ -v

# Run the application
run:
	uvicorn app:app --reload

# Clean up cache files
clean:
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -type d -name .pytest_cache -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
