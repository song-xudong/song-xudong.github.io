$ErrorActionPreference = "Stop"

$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $projectRoot

$env:ASTRO_TELEMETRY_DISABLED = "1"

Write-Host "Starting Fuwari local preview at http://127.0.0.1:4321/" -ForegroundColor Cyan
Write-Host "Keep this window open while previewing. Close it to stop the preview server." -ForegroundColor DarkGray

pnpm dev --host 127.0.0.1 --port 4321
