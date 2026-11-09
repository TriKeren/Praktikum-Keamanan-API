# Langkah-Langkah Install Project Ini Bolo (Biar Bisa Praktikum)
- Jalankan perintah `npm install`
- Lalu buat sertifikasi HTTPS Lokal
    - Jalankan perintah `New-Item -ItemType Directory -Force cert`
    - Lalu buat private key dan sertifikat self-signed `openssl req -x509 -newkey rsa:2048 -keyout cert/key.pem -out cert/cert.pem -days 365 -nodes -subj "/CN=localhost"`
    - Jika openssl tidak dikenali di windows tetapi Git for windows sudah terpasang, coba jalankan `& "C:\Program Files\Git\usr\bin\openssl.exe" req -x509 -newkey rsa:2048 -keyout cert\key.pem -out cert\cert.pem -days 365 -nodes -subj "/CN=localhost`

# Catatan : 
- Kalo mau nge run, pake perintah `npm start`
- API Key Demo nya ini `POLIWANGI-API-2026` dengan key nya `x-api-key`

# Method serta URL nya
- POST `https://localhost:3000/api/login` (Login)
- GET `https://localhost:3000/api/profile` (Akses Profil)
- GET `https://localhost:3000/api/mahasiswa/1` (Mahasiswa Melihat Anggota UKM)
- GET `https://localhost:3000/api/ukm/anggota` (Pengurus Melihat Anggota UKM)
- GET `https://localhost:3000/api/admin/konfigurasi` (Admin Akses Konfigurasi)
- GET `https://localhost:3000/api/admin/konfigurasi` (Mahasiswa Akses Konfigurasi Admin)