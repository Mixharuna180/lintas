#!/bin/bash

# Fix service systemd untuk LINTAS FIBER Website
echo "====================================================="
echo "      PT. LINTAS FIBER NUSANTARA - Fix Service       "
echo "====================================================="
echo ""

# Cek apakah dijalankan sebagai root
if [ "$EUID" -ne 0 ]; then
  echo "Script ini memerlukan akses root."
  echo "Silakan jalankan dengan 'sudo ./fix-service.sh'"
  exit 1
fi

# Tentukan path absolut
APP_PATH=$(pwd)
NODE_PATH=$(which node)

echo "Membuat file service dengan path absolut..."
cat > /etc/systemd/system/lintasfiber.service << EOF
[Unit]
Description=Lintas Fiber Website
After=network.target postgresql.service

[Service]
WorkingDirectory=$APP_PATH
ExecStart=$NODE_PATH $APP_PATH/dist/index.js
Environment=NODE_ENV=production
Environment=DATABASE_URL=postgres://lintasfiber:lintas123@localhost:5432/lintasfiber
Restart=always
StandardOutput=journal
StandardError=journal
SyslogIdentifier=lintasfiber
User=root
Group=root

[Install]
WantedBy=multi-user.target
EOF

echo "Mengaktifkan dan menjalankan service yang diperbaiki..."
systemctl daemon-reload
systemctl restart lintasfiber

echo "Menunggu service dijalankan..."
sleep 3

echo "Status service:"
systemctl status lintasfiber

echo ""
echo "====================================================="
echo "Jika service masih gagal, coba gunakan run-direct.sh"
echo "Jalankan: sudo ./run-direct.sh"
echo "====================================================="
