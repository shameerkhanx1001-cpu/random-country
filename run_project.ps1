$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $root

function Open-Url($u){ try { Start-Process $u } catch { Write-Host "Open $u in browser" } }

# 1) Static site
$index = Get-ChildItem -Recurse -File -Filter index.html -ErrorAction SilentlyContinue | Select-Object -First 1
if ($index) {
    $dir = $index.DirectoryName
    if (Get-Command python -ErrorAction SilentlyContinue) {
        Write-Host "Serving $dir on http://localhost:8000 ..."
        Start-Process -NoNewWindow -FilePath python -ArgumentList "-m","http.server","8000","--directory",$dir
        Start-Sleep -Milliseconds 500
        Open-Url "http://localhost:8000"
        exit 0
    } else {
        Write-Host "index.html found but python not available. Opening file directly."
        Start-Process $index.FullName
        exit 0
    }
}

# 2) Node project
if (Test-Path package.json) {
    if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
        if (Get-Command winget -ErrorAction SilentlyContinue) {
            Write-Host "Installing NodeJS (OpenJS.NodeJS.LTS) via winget..."
            winget install --id OpenJS.NodeJS.LTS -e
        } else {
            Write-Host "npm not found and winget not available. Please install Node.js and re-run."
            exit 1
        }
    }
    Write-Host "Running npm install..."
    npm install
    Write-Host "Starting Node app (npm start || npm run dev)..."
    try { npm start } catch { npm run dev }
    exit 0
}

# 3) Flask app
if (Test-Path app.py) {
    if (-not (Test-Path .venv)) { python -m venv .venv }
    $venvPython = Join-Path $root ".venv\Scripts\python.exe"
    if (-not (Test-Path $venvPython)) { $venvPython = "python" }

    & $venvPython -m pip --version 2>$null
    if ($LASTEXITCODE -ne 0) {
        python -m ensurepip --upgrade
        python -m pip install --upgrade pip setuptools wheel
    }

    if (Test-Path requirements.txt) { & $venvPython -m pip install -r requirements.txt }
    $env:FLASK_APP = "app.py"
    & $venvPython -m flask run
    exit 0
}

# 4) Django app
if (Test-Path manage.py) {
    if (-not (Test-Path .venv)) { python -m venv .venv }
    $venvPython = Join-Path $root ".venv\Scripts\python.exe"
    if (-not (Test-Path $venvPython)) { $venvPython = "python" }

    if (Test-Path requirements.txt) { & $venvPython -m pip install -r requirements.txt }
    & $venvPython "$root\manage.py" migrate
    & $venvPython "$root\manage.py" runserver
    exit 0
}

Write-Host "No recognized start file found (index.html, package.json, app.py, manage.py). Run 'Get-ChildItem -Recurse -File' to inspect the project."