#!/bin/bash

# Instalasi Satu Klik untuk LINTAS FIBER Website (Ubuntu Server/Headless)
echo "====================================================="
echo "PT. LINTAS FIBER NUSANTARA - Instalasi (Ubuntu Server)"
echo "====================================================="
echo ""

# Cek apakah dijalankan sebagai root (diperlukan untuk port 80)
if [ "$EUID" -ne 0 ]; then
  echo "Instalasi memerlukan akses root untuk port 80."
  echo "Silakan jalankan dengan 'sudo ./install-ubuntu-headless.sh'"
  exit 1
fi

# Tentukan alamat IP server
IP_ADDRESS=$(hostname -I | awk '{print $1}')

echo "Langkah 1: Mengupdate sistem..."
apt-get update

echo "Langkah 2: Menginstall Node.js dan npm (jika belum ada)..."
if ! command -v node &> /dev/null; then
  # Tambahkan repository Node.js
  curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
  apt-get install -y nodejs
fi

echo "Langkah 3: Menginstall PostgreSQL (jika belum ada)..."
if ! command -v psql &> /dev/null; then
  apt-get install -y postgresql postgresql-contrib
  # Mulai layanan PostgreSQL
  systemctl start postgresql
  systemctl enable postgresql
fi

# Instal paket tambahan yang mungkin diperlukan di server headless
echo "Langkah 4: Menginstall dependensi server tambahan..."
apt-get install -y build-essential nginx

echo "Langkah 5: Konfigurasi PostgreSQL..."
# Buat database dan user untuk aplikasi
sudo -u postgres psql -c "CREATE USER lintasfiber WITH PASSWORD 'lintas123';"
sudo -u postgres psql -c "CREATE DATABASE lintasfiber OWNER lintasfiber;"

# Export variabel lingkungan untuk koneksi database
export DATABASE_URL="postgres://lintasfiber:lintas123@localhost:5432/lintasfiber"
# Simpan variabel lingkungan ke dalam .env file
echo "DATABASE_URL=postgres://lintasfiber:lintas123@localhost:5432/lintasfiber" > .env
echo "SESSION_SECRET=lintasfibersessionsecret$(openssl rand -hex 12)" >> .env

echo "Langkah 6: Menginstall dependensi aplikasi..."
npm install

echo "Langkah 7: Konfigurasi database aplikasi..."
npm run db:push

echo "Langkah 8: Build aplikasi..."
npm run build

echo "Langkah 9: Konfigurasi service systemd..."

# Buat service file systemd untuk aplikasi Node.js
cat > /etc/systemd/system/lintasfiber.service << EOL
[Unit]
Description=Lintas Fiber Website
After=network.target postgresql.service

[Service]
WorkingDirectory=$(pwd)
EnvironmentFile=$(pwd)/.env
ExecStart=$(which node) $(pwd)/dist/index.js
Environment=NODE_ENV=production
Restart=always
User=root
Group=root

[Install]
WantedBy=multi-user.target
EOL

# Konfigurasi Nginx sebagai reverse proxy (opsional, tapi berguna untuk kemudahan)
echo "Langkah 10: Konfigurasi Nginx sebagai reverse proxy..."

cat > /etc/nginx/sites-available/lintasfiber << EOL
server {
    listen 80;
    server_name $IP_ADDRESS;

    location / {
        proxy_pass http://localhost:80;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL

# Aktifkan konfigurasi Nginx
ln -sf /etc/nginx/sites-available/lintasfiber /etc/nginx/sites-enabled/
systemctl restart nginx

# Mengaktifkan dan menjalankan service
systemctl daemon-reload
systemctl enable lintasfiber
systemctl start lintasfiber

echo ""
echo "====================================================="
echo "           Instalasi Berhasil!                      "
echo "====================================================="
echo "Website LINTAS FIBER sekarang berjalan di port 80"
echo "Anda dapat mengakses website di:"
echo "- http://$IP_ADDRESS"
echo ""
echo "Informasi Tambahan:"
echo "- Database PostgreSQL 'lintasfiber' telah dibuat"
echo "- Username database: lintasfiber"
echo "- Password database: lintas123"
echo ""
echo "Untuk mengelola service:"
echo "- Cek status: sudo systemctl status lintasfiber"
echo "- Restart: sudo systemctl restart lintasfiber"
echo "- Hentikan: sudo systemctl stop lintasfiber"
echo "- Lihat log: sudo journalctl -u lintasfiber"
echo "====================================================="