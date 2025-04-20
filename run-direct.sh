#!/bin/bash

# Script untuk menjalankan LINTAS FIBER Website langsung (tanpa systemd)
echo "====================================================="
echo "   PT. LINTAS FIBER NUSANTARA - Menjalankan Langsung "
echo "====================================================="
echo ""

# Tentukan variabel lingkungan
export NODE_ENV=production
export PORT=80

# Cek apakah dijalankan sebagai root (diperlukan untuk port 80)
if [ "$EUID" -ne 0 ]; then
  echo "Script ini memerlukan akses root untuk port 80."
  echo "Silakan jalankan dengan 'sudo ./run-direct.sh'"
  exit 1
fi

# Cek apakah aplikasi sudah di-build
if [ ! -f "dist/index.js" ]; then
  echo "File dist/index.js tidak ditemukan. Melakukan build aplikasi..."
  npm run build
fi

# Cek variabel lingkungan database
if [ ! -f ".env" ]; then
  echo "File .env tidak ditemukan. Membuat file .env baru..."
  echo "DATABASE_URL=postgres://lintasfiber:lintas123@localhost:5432/lintasfiber" > .env
  echo "SESSION_SECRET=lintasfibersessionsecret$(openssl rand -hex 12)" >> .env
fi

# Load variabel dari .env
source .env

echo "Menjalankan aplikasi secara langsung..."
echo "Website akan berjalan di port 80"
echo "Tekan Ctrl+C untuk menghentikan"
echo ""

# Jalankan aplikasi
node dist/index.js

echo ""
echo "====================================================="
echo "Aplikasi dihentikan."
echo "====================================================="