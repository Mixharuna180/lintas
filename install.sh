#!/bin/bash

# Instalasi Satu Klik untuk LINTAS FIBER Website
echo "====================================================="
echo "      PT. LINTAS FIBER NUSANTARA - Installasi        "
echo "====================================================="
echo ""

# Cek apakah dijalankan sebagai root (diperlukan untuk port 80)
if [ "$EUID" -ne 0 ]; then
  echo "Instalasi memerlukan akses root untuk port 80."
  echo "Silakan jalankan dengan 'sudo ./install.sh'"
  exit 1
fi

echo "Langkah 1: Menginstall dependensi..."
npm install

echo "Langkah 2: Konfigurasi database..."
npm run db:push

echo "Langkah 3: Build aplikasi..."
npm run build

echo "Langkah 4: Konfigurasi service untuk menjalankan aplikasi pada port 80..."

# Buat service file systemd untuk menjalankan aplikasi sebagai service
cat > /etc/systemd/system/lintasfiber.service << EOL
[Unit]
Description=Lintas Fiber Website
After=network.target

[Service]
WorkingDirectory=$(pwd)
ExecStart=/usr/bin/env NODE_ENV=production node $(pwd)/dist/index.js
Restart=always
Environment=NODE_ENV=production
User=root

[Install]
WantedBy=multi-user.target
EOL

# Mengaktifkan dan menjalankan service
systemctl daemon-reload
systemctl enable lintasfiber
systemctl start lintasfiber

echo ""
echo "====================================================="
echo "           Instalasi Berhasil!                      "
echo "====================================================="
echo "Website LINTAS FIBER sekarang berjalan di port 80"
echo "Anda dapat mengakses website di http://localhost atau IP server Anda"
echo ""
echo "Untuk memeriksa status service: systemctl status lintasfiber"
echo "Untuk menghentikan website: systemctl stop lintasfiber"
echo "Untuk menjalankan kembali: systemctl start lintasfiber"
echo "====================================================="