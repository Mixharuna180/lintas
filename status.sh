#!/bin/bash

# Script untuk memeriksa status aplikasi yang dijalankan dengan run-direct.sh
echo "====================================================="
echo "  PT. LINTAS FIBER NUSANTARA - Status Aplikasi      "
echo "====================================================="
echo ""

# Cek apakah aplikasi berjalan berdasarkan proses node dengan dist/index.js
PID=$(ps aux | grep "node.*dist/index.js" | grep -v grep | awk '{print $2}')

if [ -z "$PID" ]; then
  echo "Status: APLIKASI TIDAK BERJALAN"
  echo ""
  echo "Untuk menjalankan aplikasi, jalankan:"
  echo "sudo ./run-direct.sh"
else
  echo "Status: APLIKASI BERJALAN"
  echo "Process ID: $PID"
  echo ""
  echo "Port yang digunakan:"
  netstat -tuln | grep -E ':(80|5000) ' || echo "Tidak ada port yang terbuka pada port 80 atau 5000"
  echo ""
  echo "Untuk melihat log aplikasi, jalankan:"
  echo "tail -f nohup.out"
  echo ""
  echo "Untuk menghentikan aplikasi, jalankan:"
  echo "sudo ./stop.sh"
fi

echo "====================================================="