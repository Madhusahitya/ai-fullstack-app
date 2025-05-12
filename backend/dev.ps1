# PowerShell script for development tasks

param (
    [string]$task = "help"
)

function Show-Help {
    Write-Host "Usage: .\dev.ps1 [task]"
    Write-Host ""
    Write-Host "Available tasks:"
    Write-Host "  install     - Install dependencies"
    Write-Host "  dev-install - Install package in development mode"
    Write-Host "  test        - Run tests"
    Write-Host "  run         - Run the application"
    Write-Host "  clean       - Clean up cache files"
    Write-Host "  help        - Show this help message"
}

function Install-Dependencies {
    Write-Host "Installing dependencies..."
    pip install -r requirements.txt
}

function Install-Dev {
    Write-Host "Installing package in development mode..."
    pip install -e .
}

function Run-Tests {
    Write-Host "Running tests..."
    $env:PYTHONPATH = "."
    python -m pytest tests/ -v
}

function Run-App {
    Write-Host "Running application..."
    $env:PYTHONPATH = "."
    uvicorn app:app --reload
}

function Clean-Cache {
    Write-Host "Cleaning cache files..."
    Get-ChildItem -Path . -Include __pycache__, .pytest_cache -Directory -Recurse | Remove-Item -Recurse -Force
    Get-ChildItem -Path . -Include *.pyc -File -Recurse | Remove-Item -Force
}

# Execute the requested task
switch ($task) {
    "install" { Install-Dependencies }
    "dev-install" { Install-Dev }
    "test" { Run-Tests }
    "run" { Run-App }
    "clean" { Clean-Cache }
    default { Show-Help }
}
