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

> **PENTING**: Jika Anda mengalami masalah dengan systemd service, tersedia metode alternatif menggunakan eksekusi langsung. Lihat bagian "Metode Alternatif Tanpa Systemd" di bawah.

### Metode 1: Khusus untuk Ubuntu

#### A. Ubuntu Desktop

```bash
# Clone repository
git clone https://github.com/Mixharuna180/lintas.git
cd lintas

# Berikan izin eksekusi pada skrip instalasi
chmod +x install-ubuntu.sh

# Jalankan instalasi (perlu akses root untuk port 80)
sudo ./install-ubuntu.sh
```

#### B. Ubuntu Server (Headless)

```bash
# Clone repository
git clone https://github.com/Mixharuna180/lintas.git
cd lintas

# Berikan izin eksekusi pada skrip instalasi
chmod +x install-ubuntu-headless.sh

# Jalankan instalasi (perlu akses root untuk port 80)
sudo ./install-ubuntu-headless.sh
```

Script ini akan otomatis menginstall Node.js dan PostgreSQL jika belum ada, membuat database, mengkonfigurasi variabel lingkungan, dan menyiapkan layanan systemd. Versi headless juga mengkonfigurasi Nginx sebagai reverse proxy dan mendeteksi alamat IP server.

### Metode 2: Menggunakan systemd (untuk sistem Linux modern lainnya)

```bash
# Clone repository
git clone https://github.com/Mixharuna180/lintas.git
cd lintas

# Berikan izin eksekusi pada skrip instalasi
chmod +x install.sh

# Jalankan instalasi (perlu akses root untuk port 80)
sudo ./install.sh
```

### Metode 3: Menggunakan PM2 (alternatif)

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

## Metode Alternatif Tanpa Systemd

Jika Anda mengalami masalah dengan systemd service, gunakan metode eksekusi langsung berikut:

```bash
# Clone repository
git clone https://github.com/Mixharuna180/lintas.git
cd lintas

# Berikan izin eksekusi pada skrip
chmod +x run-direct.sh status.sh stop.sh

# Jalankan aplikasi (perlu akses root untuk port 80)
sudo ./run-direct.sh
```

Skrip ini akan menjalankan aplikasi secara langsung di background dan menyimpan log di file `nohup.out`. 

### Mengelola Aplikasi

Setelah menjalankan dengan metode langsung, Anda dapat menggunakan skrip berikut:

- Memeriksa status: `./status.sh`
- Menghentikan aplikasi: `sudo ./stop.sh`
- Melihat log: `tail -f nohup.out`

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