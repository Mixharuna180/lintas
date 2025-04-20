#!/bin/bash

# Script Diagnosa Masalah untuk LINTAS FIBER Website
echo "====================================================="
echo "     PT. LINTAS FIBER NUSANTARA - Troubleshooting    "
echo "====================================================="
echo ""

# Cek apakah dijalankan sebagai root
if [ "$EUID" -ne 0 ]; then
  echo "Script ini memerlukan akses root."
  echo "Silakan jalankan dengan 'sudo ./troubleshoot.sh'"
  exit 1
fi

echo "Langkah 1: Cek status service..."
systemctl status lintasfiber

echo "Langkah 2: Cek log service..."
journalctl -u lintasfiber -n 50 --no-pager

echo "Langkah 3: Cek PATH dan lokasi Node.js..."
echo "Node.js path: $(which node)"
echo "Node.js version: $(node -v)"
echo "NPM path: $(which npm)"
echo "NPM version: $(npm -v)"

echo "Langkah 4: Cek direktori kerja dan file..."
echo "Current directory: $(pwd)"
echo "Build directory (dist) exists: $(if [ -d "dist" ]; then echo "Ya"; else echo "Tidak"; fi)"
echo "Entry file (dist/index.js) exists: $(if [ -f "dist/index.js" ]; then echo "Ya"; else echo "Tidak"; fi)"

echo "Langkah 5: Cek koneksi database..."
DATABASE_URL=$(grep DATABASE_URL .env | cut -d= -f2-)
if [ -z "$DATABASE_URL" ]; then
  echo "DATABASE_URL tidak ditemukan di file .env"
else
  echo "Database URL ditemukan"
  timeout 5s psql "$DATABASE_URL" -c "\conninfo" 2>&1 || echo "Gagal terhubung ke database"
fi

echo "Langkah 6: Cek port 80..."
NETSTAT_PATH=$(which netstat 2>/dev/null)
if [ -z "$NETSTAT_PATH" ]; then
  echo "netstat tidak ditemukan, menginstal net-tools..."
  apt-get install -y net-tools
fi
echo "Proses yang menggunakan port 80:"
netstat -tuln | grep ":80 "

echo ""
echo "====================================================="
echo "Solusi Umum untuk Masalah Service:"
echo "1. Jika Node.js tidak ditemukan, pastikan Node.js terinstal dengan benar"
echo "2. Jika file dist/index.js tidak ada, jalankan 'npm run build' terlebih dahulu"
echo "3. Jika database gagal terhubung, periksa DATABASE_URL di file .env"
echo "4. Jika port 80 sudah digunakan, hentikan layanan lain yang menggunakannya"
echo "5. Untuk mengatasi masalah systemd, coba modifikasi file lintasfiber.service"
echo ""
echo "Perintah Perbaikan Umum:"
echo "- Rebuild aplikasi: npm run build"
echo "- Restart service: systemctl restart lintasfiber"
echo "- Edit file service: nano /etc/systemd/system/lintasfiber.service"
echo "- Setelah edit service: systemctl daemon-reload && systemctl restart lintasfiber"
echo "====================================================="

# Buat file service yang lebih umum, menggunakan path absolut
echo ""
echo "Membuat file service alternatif..."
NODE_PATH=$(which node)
APP_PATH=$(pwd)

cat > lintasfiber-fixed.service << EOL
[Unit]
Description=Lintas Fiber Website
After=network.target postgresql.service

[Service]
WorkingDirectory=$APP_PATH
EnvironmentFile=$APP_PATH/.env
ExecStart=$NODE_PATH $APP_PATH/dist/index.js
Environment=NODE_ENV=production
Restart=always
User=root
Group=root

[Install]
WantedBy=multi-user.target
EOL

echo "File service alternatif telah dibuat: lintasfiber-fixed.service"
echo "Untuk menggunakan file ini, jalankan:"
echo "sudo cp lintasfiber-fixed.service /etc/systemd/system/lintasfiber.service"
echo "sudo systemctl daemon-reload"
echo "sudo systemctl restart lintasfiber"
echo "====================================================="