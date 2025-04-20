# PT. LINTAS FIBER NUSANTARA - Website

Website profesional untuk PT. LINTAS FIBER NUSANTARA, menampilkan layanan internet LINTAS FIBER.

## Fitur

- Tampilan paket internet lengkap dengan harga
- Cek area jangkauan layanan
- Formulir kontak untuk permintaan informasi
- Halaman khusus member dengan login dan registrasi
- Integrasi dengan database PostgreSQL

## Instalasi Satu Klik

Website ini dapat diinstal dengan mudah menggunakan skrip instalasi satu klik yang disediakan. Skrip ini akan mengatur semua yang diperlukan, termasuk dependensi, database, dan konfigurasi untuk menjalankan website di port 80.

### Metode 1: Menggunakan systemd (untuk sistem Linux modern)

```bash
# Clone repository
git clone https://github.com/Mixharuna180/lintas.git
cd lintas

# Berikan izin eksekusi pada skrip instalasi
chmod +x install.sh

# Jalankan instalasi (perlu akses root untuk port 80)
sudo ./install.sh
```

### Metode 2: Menggunakan PM2 (alternatif)

```bash
# Clone repository
git clone https://github.com/Mixharuna180/lintas.git
cd lintas

# Berikan izin eksekusi pada skrip instalasi
chmod +x install-pm2.sh

# Jalankan instalasi (perlu akses root untuk port 80)
sudo ./install-pm2.sh
```

## Konfigurasi Manual

Jika Anda ingin mengkonfigurasi secara manual, ikuti langkah-langkah berikut:

1. Instal dependensi:
   ```bash
   npm install
   ```

2. Konfigurasi database:
   ```bash
   npm run db:push
   ```

3. Build aplikasi:
   ```bash
   npm run build
   ```

4. Jalankan aplikasi:
   ```bash
   NODE_ENV=production npm start
   ```

## Variabel Lingkungan

Aplikasi memerlukan beberapa variabel lingkungan untuk dikonfigurasi:

- `DATABASE_URL`: URL koneksi database PostgreSQL
- `SESSION_SECRET`: String rahasia untuk enkripsi sesi

## Pengembangan

Untuk pengembangan lokal, jalankan:

```bash
npm run dev
```

Server pengembangan akan berjalan di http://localhost:5000

## Lisensi

Copyright © 2023 PT. LINTAS FIBER NUSANTARA. Hak Cipta Dilindungi.