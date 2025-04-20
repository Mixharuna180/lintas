#!/bin/bash

# Script untuk menjalankan LINTAS FIBER Website langsung (tanpa systemd)
echo "====================================================="
echo "   PT. LINTAS FIBER NUSANTARA - Menjalankan Langsung "
echo "====================================================="
echo ""

# Tentukan variabel lingkungan
export NODE_ENV=production
# Harus dijalankan sebagai root untuk port 80
if [ "$EUID" -ne 0 ]; then
  echo "Script ini memerlukan akses root untuk port 80."
  echo "Silakan jalankan dengan 'sudo ./run-direct.sh'"
  exit 1
fi

# Pastikan tidak ada layanan lain yang menggunakan port 80
echo "Memeriksa penggunaan port 80..."
PORT_IN_USE=$(netstat -tuln | grep ':80 ' | wc -l)
if [ "$PORT_IN_USE" -gt 0 ]; then
  echo "PERINGATAN: Port 80 sudah digunakan oleh layanan lain."
  echo "Berikut adalah layanan yang menggunakan port 80:"
  netstat -tuln | grep ':80 '
  echo ""
  echo "Hentikan layanan tersebut terlebih dahulu atau gunakan port lain."
  echo "Contoh: untuk menghentikan nginx: sudo systemctl stop nginx"
  echo ""
  read -p "Lanjutkan mencoba menggunakan port 80? (y/n): " -n 1 -r
  echo ""
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Cek atau build aplikasi jika diperlukan
if [ ! -f "dist/index.js" ]; then
  echo "File dist/index.js tidak ditemukan. Melakukan build aplikasi..."
  npm run build
fi

# Siapkan variabel lingkungan database
export DATABASE_URL="postgres://lintasfiber:lintas123@localhost:5432/lintasfiber"
export SESSION_SECRET="lintasfibersessionsecret$(openssl rand -hex 6)"

# Pastikan database ada dan berjalan
if command -v psql &> /dev/null; then
  echo "Memeriksa koneksi database..."
  if ! sudo -u postgres psql -c '\l' | grep -q lintasfiber; then
    echo "Database lintasfiber tidak ditemukan. Membuat database..."
    sudo -u postgres psql -c "CREATE USER lintasfiber WITH PASSWORD 'lintas123';"
    sudo -u postgres psql -c "CREATE DATABASE lintasfiber OWNER lintasfiber;"
  fi
fi

echo "Melakukan setup database..."
npm run db:push

echo "Menjalankan aplikasi secara langsung..."
echo "Website akan berjalan di port 80"
echo "Menggunakan NODE_ENV=production"
echo "Menjalankan aplikasi di background dengan nohup..."
echo "Log akan disimpan di nohup.out"
echo ""

# Jalankan aplikasi di background dengan nohup
nohup node dist/index.js > nohup.out 2>&1 &
PID=$!

echo "Aplikasi berhasil dijalankan dengan PID: $PID"
echo ""
echo "Untuk melihat log: tail -f nohup.out"
echo "Untuk menghentikan: kill $PID"
echo ""
echo "Website sekarang tersedia di http://localhost atau IP server Anda"
echo "====================================================="