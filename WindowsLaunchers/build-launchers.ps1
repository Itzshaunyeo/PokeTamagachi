$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$compiler = 'C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe'
$icon = Join-Path $projectRoot 'assets\poketamagachi.ico'

if (-not (Test-Path -LiteralPath $compiler)) {
    throw 'The Windows C# compiler was not found.'
}

& $compiler /nologo /target:exe "/win32icon:$icon" "/out:$projectRoot\PokeTamagachi Installer.exe" (Join-Path $PSScriptRoot 'InstallerLauncher.cs')
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

& $compiler /nologo /target:winexe /reference:System.Windows.Forms.dll "/win32icon:$icon" "/out:$projectRoot\PokeTamagachi.exe" (Join-Path $PSScriptRoot 'AppLauncher.cs')
exit $LASTEXITCODE
