# Langkah-Langkah Install Project Ini Bolo (Biar Bisa Praktikum)
- Jalankan perintah `npm install`
- Lalu buat sertifikasi HTTPS Lokal
    - Jalankan perintah `New-Item -ItemType Directory -Force cert`
    - Lalu buat private key dan sertifikat self-signed `openssl req -x509 -newkey rsa:2048 -keyout cert/key.pem -out cert/cert.pem -days 365 -nodes -subj "/CN=localhost"
    - Jika openssl tidak dikenali di windows tetapi Git for windows sudah terpasang, coba jalankan `& "C:\Program Files\Git\usr\bin\openssl.exe" req -x509 -newkey rsa:2048 -keyout cert\key.pem -out cert\cert.pem -days 365 -nodes -subj "/CN=localhost`

# Catatan : 
- Kalo mau nge run, pake perintah `npm start`
- API Key Demo nya ini `POLIWANGI-API-2026`