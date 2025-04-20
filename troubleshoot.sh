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

# Periksa mode operasi
echo "Langkah 1: Periksa mode operasi aplikasi..."
# Cek direct mode
PID_DIRECT=$(ps aux | grep "node.*dist/index.js" | grep -v grep | awk '{print $2}')
if [[ ! -z "$PID_DIRECT" ]]; then
  echo "✅ Mode Eksekusi Langsung TERDETEKSI dengan PID: $PID_DIRECT"
  echo "   Log aplikasi dapat diperiksa dengan: tail -f nohup.out"
  echo ""
  tail -n 20 nohup.out || echo "File log nohup.out tidak ditemukan"
else
  echo "❌ Mode Eksekusi Langsung TIDAK TERDETEKSI"
  
  # Cek systemd
  echo "Langkah 2: Cek status systemd service..."
  systemctl status lintasfiber || echo "Service systemd lintasfiber tidak terdaftar"

  echo "Langkah 3: Cek log service..."
  journalctl -u lintasfiber -n 20 --no-pager || echo "Log systemd tidak tersedia"
fi

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
echo "5. Jika systemd service bermasalah, gunakan metode alternatif"
echo ""
echo "METODE ALTERNATIF TANPA SYSTEMD:"
echo "Jika metode systemd tidak berfungsi di sistem Anda, gunakan metode eksekusi langsung:"
echo "1. Pastikan script alternatif memiliki izin eksekusi:"
echo "   chmod +x run-direct.sh status.sh stop.sh"
echo "2. Jalankan aplikasi langsung dengan:"
echo "   sudo ./run-direct.sh"
echo "3. Periksa status aplikasi dengan:"
echo "   ./status.sh"
echo "4. Hentikan aplikasi dengan:"
echo "   sudo ./stop.sh"
echo ""
echo "Perintah Perbaikan Umum:"
echo "- Rebuild aplikasi: npm run build"
echo "- Restart service: systemctl restart lintasfiber"
echo "- Edit file service: nano /etc/systemd/system/lintasfiber.service"
echo "- Setelah edit service: systemctl daemon-reload && systemctl restart lintasfiber"
echo "- Log aplikasi direct mode: tail -f nohup.out"
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