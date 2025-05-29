@echo off
echo.
echo ========================================
echo   Adventure Gallery Import Utility
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if utils directory exists
if not exist "_utils" (
    mkdir _utils
)

REM Check if gallery-import.js exists
if not exist "_utils\gallery-import.js" (
    echo Error: gallery-import.js not found
    echo Please ensure the gallery import utility is in _utils/ directory
    pause
    exit /b 1
)

REM Run the gallery import utility
echo Running gallery import...
echo.
node _utils/gallery-import.js %*

echo.
echo ========================================
echo Import complete! Check the output files:
echo - gallery-sections.html (for copy-paste)
echo - life-template.md (full page template)
echo ========================================
echo.
pause 