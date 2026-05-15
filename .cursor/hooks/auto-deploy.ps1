# Cursor stop hook — auto git push after each agent run (Vercel deploys from main).
$ErrorActionPreference = "Continue"
$null = [Console]::In.ReadToEnd()

$root = $PSScriptRoot | Split-Path -Parent | Split-Path -Parent
$deployScript = Join-Path $root "scripts\deploy.ps1"

if (-not (Test-Path -LiteralPath $deployScript)) {
    Write-Host "auto-deploy: scripts/deploy.ps1 not found"
    exit 0
}

& powershell -NoProfile -ExecutionPolicy Bypass -File $deployScript
exit $LASTEXITCODE
