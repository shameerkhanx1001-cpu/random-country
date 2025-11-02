@echo off
SET ROOT=%~dp0
cd /d "%ROOT%"
PowerShell -ExecutionPolicy Bypass -File "%ROOT%run_project.ps1"
pause