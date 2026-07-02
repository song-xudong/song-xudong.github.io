$ErrorActionPreference = "Stop"

$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$gitSafePath = ($projectRoot.Path -replace "\\", "/")
$previewUrl = "http://127.0.0.1:4321/"
$githubAccount = "song-xudong"
$autoUploadDelaySeconds = 5

function Write-Step {
	param([string]$Message)
	Write-Host ""
	Write-Host "==> $Message" -ForegroundColor Cyan
}

function Invoke-Git {
	param([Parameter(ValueFromRemainingArguments = $true)][string[]]$GitArgs)
	& git -c "safe.directory=$gitSafePath" -c "http.sslBackend=openssl" -c "credential.https://github.com.username=$githubAccount" @GitArgs
	if ($LASTEXITCODE -ne 0) {
		throw "Git command failed: git $($GitArgs -join ' ')"
	}
}

function Wait-ForPreview {
	for ($i = 0; $i -lt 30; $i++) {
		try {
			$response = Invoke-WebRequest -Uri $previewUrl -UseBasicParsing -TimeoutSec 2
			if ($response.StatusCode -eq 200) {
				return
			}
		}
		catch {
			Start-Sleep -Seconds 1
		}
	}

	throw "Local preview did not respond at $previewUrl"
}

try {
	Set-Location $projectRoot
	$env:ASTRO_TELEMETRY_DISABLED = "1"

	Write-Host "Fuwari preview and automatic GitHub upload tool" -ForegroundColor Green
	Write-Host "Project: $($projectRoot.Path)"
	Write-Host "GitHub account: $githubAccount"

	Write-Step "Starting local preview"
	$listener = Get-NetTCPConnection -LocalPort 4321 -State Listen -ErrorAction SilentlyContinue
	if (-not $listener) {
		$previewScript = Join-Path $PSScriptRoot "start-preview.ps1"
		Start-Process -FilePath "powershell.exe" -ArgumentList @(
			"-NoProfile",
			"-ExecutionPolicy",
			"Bypass",
			"-NoExit",
			"-File",
			$previewScript
		) -WorkingDirectory $projectRoot.Path
	}
	else {
		Write-Host "Port 4321 is already listening; reusing the current preview server." -ForegroundColor DarkGray
	}

	Wait-ForPreview
	Start-Process $previewUrl
	Write-Host "Preview opened: $previewUrl" -ForegroundColor Green

	Write-Host ""
	Write-Host "Auto upload will start in $autoUploadDelaySeconds seconds. Close this window now to cancel." -ForegroundColor Yellow
	for ($remaining = $autoUploadDelaySeconds; $remaining -gt 0; $remaining--) {
		Write-Host "Starting in $remaining..."
		Start-Sleep -Seconds 1
	}

	Write-Step "Checking GitHub remote"
	Invoke-Git config credential.https://github.com.username $githubAccount
	Invoke-Git fetch origin main
	$behind = (& git -c "safe.directory=$gitSafePath" -c "credential.https://github.com.username=$githubAccount" rev-list --count HEAD..origin/main).Trim()
	if ([int]$behind -gt 0) {
		throw "Local branch is behind origin/main by $behind commit(s). Pull or resolve this before uploading."
	}

	Write-Step "Running Astro check"
	pnpm astro check
	if ($LASTEXITCODE -ne 0) {
		throw "pnpm astro check failed."
	}

	Write-Step "Building production site"
	pnpm build
	if ($LASTEXITCODE -ne 0) {
		throw "pnpm build failed."
	}

	Write-Step "Preparing Git commit"
	$status = (& git -c "safe.directory=$gitSafePath" status --porcelain)
	if ($status) {
		Write-Host $status
		Invoke-Git add -A
		$stamp = Get-Date -Format "yyyy-MM-dd HH:mm"
		Invoke-Git commit -m "Update site $stamp"
	}
	else {
		Write-Host "No local changes to commit." -ForegroundColor DarkGray
	}

	Write-Step "Uploading to GitHub"
	Invoke-Git push -u origin main

	Write-Host ""
	Write-Host "Done. GitHub Pages will update shortly:" -ForegroundColor Green
	Write-Host "https://song-xudong.github.io/"
	Write-Host ""
	Read-Host "Press Enter to close this window"
}
catch {
	Write-Host ""
	Write-Host "Failed: $($_.Exception.Message)" -ForegroundColor Red
	Write-Host ""
	Read-Host "Press Enter to close this window"
	exit 1
}
