@echo off
echo 生成 TabBar 图标...

cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File generate-icons.ps1

pause
