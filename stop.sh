#!/bin/bash

# Script untuk menghentikan aplikasi yang dijalankan dengan run-direct.sh
echo "====================================================="
echo "  PT. LINTAS FIBER NUSANTARA - Menghentikan Aplikasi "
echo "====================================================="
echo ""

# Cek apakah dijalankan sebagai root
if [ "$EUID" -ne 0 ]; then
  echo "Script ini memerlukan akses root."
  echo "Silakan jalankan dengan 'sudo ./stop.sh'"
  exit 1
fi

# Cek apakah aplikasi berjalan
PID=$(ps aux | grep "node.*dist/index.js" | grep -v grep | awk '{print $2}')

if [ -z "$PID" ]; then
  echo "Aplikasi tidak sedang berjalan."
  exit 0
fi

echo "Menghentikan aplikasi dengan PID: $PID"
kill $PID

# Tunggu hingga proses benar-benar berakhir
echo "Menunggu proses berakhir..."
for i in {1..5}; do
  if ! ps -p $PID > /dev/null; then
    echo "Aplikasi berhasil dihentikan."
    exit 0
  fi
  sleep 1
done

# Jika proses masih berjalan setelah 5 detik, paksa hentikan
if ps -p $PID > /dev/null; then
  echo "Aplikasi tidak merespons, mencoba kill -9..."
  kill -9 $PID
  sleep 1
  if ! ps -p $PID > /dev/null; then
    echo "Aplikasi berhasil dihentikan dengan paksa."
  else
    echo "GAGAL menghentikan aplikasi."
  fi
fi

echo "====================================================="