@echo off
REM Docker Quick Start Script for Windows

echo 🐳 Docker Quick Start for ArchitectUI
echo ======================================
echo.
echo Choose an option:
echo 1) Build and run production
echo 2) Run development with hot reload
echo 3) Stop all containers
echo 4) View logs
echo 5) Clean up (remove containers and images)
echo.
set /p option="Enter option (1-5): "

if "%option%"=="1" (
    echo Building production image...
    docker-compose build app
    echo Starting production container...
    docker-compose up -d app
    echo ✅ Production server running at http://localhost:8080
    start http://localhost:8080
) else if "%option%"=="2" (
    echo Starting development server...
    docker-compose up dev
    echo ✅ Development server running at http://localhost:3001
) else if "%option%"=="3" (
    echo Stopping all containers...
    docker-compose down
    echo ✅ All containers stopped
) else if "%option%"=="4" (
    echo Showing logs (Ctrl+C to exit)...
    docker-compose logs -f
) else if "%option%"=="5" (
    echo Cleaning up...
    docker-compose down -v
    docker rmi architectui-app architectui-app:dev 2>nul
    echo ✅ Cleanup complete
) else (
    echo ❌ Invalid option
    exit /b 1
)
