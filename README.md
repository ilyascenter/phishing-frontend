#  Phishing URL Detection - Frontend

Frontend web sederhana untuk mendeteksi URL phishing menggunakan Machine Learning.

---

##  Fitur

*  Input URL
*  Menampilkan:

  * Prediction (Phishing / Suspicious / Legit)
  * Confidence (%)
  * Risk Level (LOW / MEDIUM / HIGH)
  * Penjelasan (alasan deteksi)
*  UI sederhana dan ringan
*  Terhubung ke backend API
*  Deploy di Vercel

---

##  Teknologi

* HTML
* CSS
* JavaScript (Vanilla)
* Vercel Serverless Function

---

##  Cara Kerja

1. User memasukkan URL
2. Frontend mengirim request ke:

/api/predict

3. Vercel API meneruskan ke backend VPS
4. Backend memproses dan mengembalikan hasil
5. Hasil ditampilkan ke user

---

##  Konfigurasi API

Di Vercel, tambahkan Environment Variable:

API_URL = http://IP_VPS_KAMU:5000/predict

---

##  Deployment (Vercel)

1. Push project ke GitHub
2. Import repository ke Vercel
3. Setting:

   * Framework: Other
   * Root Directory: ./
4. Tambahkan Environment Variable:

   * API_URL
5. Klik Deploy 

---

##  Tampilan

Menampilkan hasil seperti:

Phishing (82%)

 URL ini berbahaya

Alasan:

* Mengandung kata 'login'
* URL terlalu panjang

---

##  Keamanan

* IP VPS tidak langsung terekspos
* Menggunakan proxy Vercel (`/api/predict`)

---

##  Catatan

* Semua analisis dilakukan di backend
* Frontend hanya sebagai interface

---

