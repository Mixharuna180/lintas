@echo off
echo =====================================================
echo       PT. LINTAS FIBER NUSANTARA - Instalasi        
echo =====================================================
echo.

REM Cek apakah dijalankan sebagai administrator
NET SESSION >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Instalasi memerlukan akses administrator untuk port 80.
    echo Silakan klik kanan pada file ini dan pilih "Run as administrator"
    pause
    exit
)

echo Langkah 1: Menginstall dependensi...
call npm install

echo Langkah 2: Konfigurasi database...
call npm run db:push

echo Langkah 3: Build aplikasi...
call npm run build

echo Langkah 4: Menginstall node-windows...
call npm install -g node-windows

echo Langkah 5: Membuat service Windows...
call npx node-windows --install
call npx node-windows --add %CD%\install-service.js

echo.
echo =====================================================
echo           Instalasi Berhasil!                      
echo =====================================================
echo Website LINTAS FIBER sekarang berjalan di port 80
echo Anda dapat mengakses website di http://localhost atau IP server Anda
echo.
echo Service akan berjalan otomatis saat komputer dinyalakan
echo Anda dapat mengelola service di Windows Services Manager
echo =====================================================

pause