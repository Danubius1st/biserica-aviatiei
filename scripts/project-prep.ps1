$cmds = @(
  'docker-compose up -d\; npm run dev.local',
  'npm run build.local',
  # 'docker-compose up --build',
  'docker-compose up -d',
  'docker-compose stop',
  'npx prisma studio --schema=prisma/db-app/schema.prisma'
)

$workingDir = "D:\Adi\projects\biserica-aviatiei\"
# $workingDir = "D:\Adi\projects\test\yt-better-authy\"

foreach ($cmd in $cmds) {
  $fullCommand = @"
  cd '$workingDir'
  Write-Host '$cmd' -ForegroundColor Blue
"@

  Start-Process wt -ArgumentList @(
    '-w', '0', 'nt', # Tab nou în fereastra curentă
    'powershell', '-NoExit', # Nu închide după execuție
    '-Command', $fullCommand  # Pasează comanda
  )
  # Start-Sleep -Seconds 1 # Așteaptă 1 secundă între deschideri
  Start-Sleep -Milliseconds 300
}

$cmd = 'npm outdated'
$fullCommand = @"
  cd '$workingDir'
  Write-Host '$cmd' -ForegroundColor Blue
  Invoke-Expression '$cmd'
"@

$wtCommand = "wt -w 0 nt powershell -NoExit -Command `"$fullCommand`""
Invoke-Expression $wtCommand

# Start-Process -FilePath "C:\Program Files\Docker\Docker\Docker Desktop.exe"

Start-Process -FilePath "C:\Users\adria\AppData\Local\SourceTree\SourceTree.exe"

Start-Process -FilePath "C:\Users\adria\AppData\Local\Programs\Warp\Warp.exe"

Start-Process -FilePath "C:\Users\adria\AppData\Local\Programs\Microsoft VS Code\Code.exe"

Start-Process -FilePath "C:\Users\adria\AppData\Local\Postman\Postman.exe"
