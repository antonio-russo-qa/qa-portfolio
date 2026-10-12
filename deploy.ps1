<#
  Pubblica il sito su GitHub Pages.

  COME SI USA
  1. Estrai lo zip in una cartella qualsiasi.
  2. Apri PowerShell in quella cartella (Shift + tasto destro > "Apri finestra PowerShell qui").
  3. Lancia:  powershell -ExecutionPolicy Bypass -File .\deploy.ps1
#>

$Repo = 'https://github.com/antonio-russo-qa/qa-portfolio.git'
$Url  = 'https://antonio-russo-qa.github.io/qa-portfolio/'
$Src  = $PSScriptRoot
$Work = Join-Path $env:TEMP 'qa-portfolio-deploy'

function Fail($msg) {
    Write-Host ""
    Write-Host "[ERRORE] $msg" -ForegroundColor Red
    Read-Host 'Premi Invio per chiudere'
    exit 1
}

# Esegue git e mostra l'output; si ferma se git restituisce un errore
function Invoke-Git {
    & git.exe @args 2>&1 | ForEach-Object { Write-Host "   $_" -ForegroundColor DarkGray }
    if ($LASTEXITCODE -ne 0) { Fail ("git " + ($args -join ' ') + " non e riuscito.") }
}

Write-Host ""
Write-Host "=== Pubblicazione del sito su GitHub Pages ===" -ForegroundColor Cyan

# 0. Controlli iniziali
if (-not (Get-Command git.exe -ErrorAction SilentlyContinue)) {
    Fail 'Git non e installato. Scaricalo da https://git-scm.com/download/win e rilancia lo script.'
}
if (-not (Test-Path (Join-Path $Src 'index.html'))) { Fail 'Non trovo index.html accanto allo script.' }
if (-not (Test-Path (Join-Path $Src 'images')))     { Fail 'Non trovo la cartella images accanto allo script.' }

# 1. Scarico il repository in una cartella temporanea
Write-Host "1/5 Scarico il repository..." -ForegroundColor Cyan
if (Test-Path $Work) { Remove-Item $Work -Recurse -Force }
Invoke-Git clone $Repo $Work
Set-Location $Work
$Branch = (& git.exe rev-parse --abbrev-ref HEAD).Trim()

# Identita per i commit (se Git non ne ha una gia configurata)
if (-not (& git.exe config user.name))  { Invoke-Git config user.name 'Antonio Russo' }
if (-not (& git.exe config user.email)) { Invoke-Git config user.email 'antonio-russo-qa@users.noreply.github.com' }

# 2. Copio i nuovi file
Write-Host "2/5 Copio i nuovi file..." -ForegroundColor Cyan
Copy-Item (Join-Path $Src 'index.html') (Join-Path $Work 'index.html') -Force
if (-not (Test-Path (Join-Path $Work 'images'))) { New-Item (Join-Path $Work 'images') -ItemType Directory | Out-Null }
Copy-Item (Join-Path $Src 'images\*') (Join-Path $Work 'images') -Force
if (-not (Test-Path (Join-Path $Work '.nojekyll'))) { New-Item (Join-Path $Work '.nojekyll') -ItemType File | Out-Null }

# 3. Mostro cosa cambia
Write-Host "3/5 Modifiche da pubblicare:" -ForegroundColor Cyan
& git.exe add -A
& git.exe status --short | ForEach-Object { Write-Host "   $_" }
if (-not (& git.exe status --porcelain)) {
    Write-Host "Nessuna modifica: il sito e gia aggiornato." -ForegroundColor Yellow
    Read-Host 'Premi Invio per chiudere'
    exit 0
}
$ok = Read-Host 'Pubblico online? (s/n)'
if ($ok -notmatch '^[sSyY]') {
    Write-Host 'Annullato: non ho pubblicato nulla.' -ForegroundColor Yellow
    exit 0
}

# 4. Commit
Write-Host "4/5 Creo il commit..." -ForegroundColor Cyan
Invoke-Git commit -m ("Nuovo sito dark - " + (Get-Date -Format 'yyyy-MM-dd HH:mm'))

# 5. Push (se serve, si apre il login di GitHub nel browser)
Write-Host "5/5 Invio a GitHub (puo aprirsi la finestra di login)..." -ForegroundColor Cyan
Invoke-Git push origin $Branch

Write-Host ""
Write-Host "FATTO! Il sito sara online tra 1-2 minuti qui:" -ForegroundColor Green
Write-Host "   $Url" -ForegroundColor Green
Write-Host "Se vedi ancora la versione vecchia, ricarica con Ctrl + F5."
Write-Host ""
Write-Host "Per tornare alla versione precedente, nella cartella $Work lancia:  git revert HEAD  e poi  git push" -ForegroundColor DarkGray
Read-Host 'Premi Invio per chiudere'
