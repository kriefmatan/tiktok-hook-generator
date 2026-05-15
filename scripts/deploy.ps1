# Push to main → Vercel auto-deploys. Skips commit if working tree is clean.
param(
    [string]$CommitMessage = "changed practice data format"
)

$ErrorActionPreference = "Stop"
$root = if ($PSScriptRoot) { Split-Path $PSScriptRoot -Parent } else { Get-Location }
Set-Location -LiteralPath $root

git add .

foreach ($name in @(".env", ".env.local")) {
    if (Test-Path -LiteralPath (Join-Path $root $name)) {
        git reset HEAD -- $name 2>$null | Out-Null
    }
}

$status = git status --porcelain
if (-not $status) {
    Write-Host "deploy: nothing to commit."
    exit 0
}

git commit -m $CommitMessage
git push
Write-Host "deploy: pushed to origin. Vercel will deploy from main."
