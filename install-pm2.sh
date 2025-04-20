#!/bin/bash

# Instalasi Satu Klik untuk LINTAS FIBER Website menggunakan PM2
echo "====================================================="
echo "  PT. LINTAS FIBER NUSANTARA - Installasi dengan PM2 "
echo "====================================================="
echo ""

# Cek apakah dijalankan sebagai root (diperlukan untuk port 80)
if [ "$EUID" -ne 0 ]; then
  echo "Instalasi memerlukan akses root untuk port 80."
  echo "Silakan jalankan dengan 'sudo ./install-pm2.sh'"
  exit 1
fi

echo "Langkah 1: Menginstall dependensi..."
npm install

echo "Langkah 2: Konfigurasi database..."
npm run db:push

echo "Langkah 3: Build aplikasi..."
npm run build

echo "Langkah 4: Instalasi PM2 (process manager)..."
npm install -g pm2

echo "Langkah 5: Konfigurasi PM2 untuk menjalankan aplikasi pada port 80..."
# Konfigurasikan dan jalankan aplikasi dengan PM2
pm2 start dist/index.js --name "lintasfiber" --env production
pm2 save
pm2 startup

echo ""
echo "====================================================="
echo "           Instalasi Berhasil!                      "
echo "====================================================="
echo "Website LINTAS FIBER sekarang berjalan di port 80"
echo "Anda dapat mengakses website di http://localhost atau IP server Anda"
echo ""
echo "Untuk memeriksa status service: pm2 status"
echo "Untuk menghentikan website: pm2 stop lintasfiber"
echo "Untuk menjalankan kembali: pm2 start lintasfiber"
echo "Untuk melihat log: pm2 logs lintasfiber"
echo "====================================================="