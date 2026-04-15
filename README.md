🍓 NutriBlend — Virtual Smoothie Nutrition Calculator

> Racik smoothie impianmu, pantau nutrisinya secara real-time!

NutriBlend adalah aplikasi web interaktif yang memungkinkan pengguna meramu kombinasi buah-buahan, menghitung total nutrisi, dan mendapatkan skor kesehatan — semuanya berbasis data langsung dari [Fruityvice API](https://www.fruityvice.com/).

---

✨ Fitur Utama

- Katalog Buah Lengkap — Menampilkan ratusan buah dari Fruityvice API dengan info kalori, gula, karbohidrat, protein, dan lemak
- Preset Smoothie — 12 preset siap pakai (Sunrise Boost, Berry Blast, Green Power, dll.) untuk inspirasi cepat
- Virtual Blender — Tambah buah ke blender, atur kuantitas, lalu animasikan proses blending
- Kalkulator Nutrisi Real-Time — Total nutrisi dihitung otomatis saat komposisi bahan berubah, dilengkapi progress bar visual
- Health Score — Skor kesehatan 0–100 ditampilkan dalam bentuk ring animasi berdasarkan komposisi nutrisi
- Peringatan Cerdas — Notifikasi otomatis jika gula terlalu tinggi, kalori berlebih, atau pujian jika pilihan sangat sehat
- Filter & Sort — Cari buah berdasarkan nama, filter per family, dan urutkan berdasarkan kalori atau kadar gula
- Detail Buah — Klik kartu buah untuk melihat info lengkap sebelum ditambahkan ke blender
- Responsif — Layout menyesuaikan layar mobile dan desktop

---

🛠️ Teknologi yang Digunakan

- HTML5 — Struktur halaman
- CSS3 — Styling & animasi (tanpa framework)
- Vanilla JavaScript — Logika aplikasi
- Axios](https://axios-http.com/) — HTTP request ke API
- [Fruityvice API](https://www.fruityvice.com/) — Data nutrisi buah
- AllOrigins](https://allorigins.win/) — CORS proxy untuk Fruityvice
- Google Fonts — Playfair Display, Poppins, Plus Jakarta Sans

---

 📁 Struktur Proyek

```
NutriBlend/
├── index.html     # Struktur halaman utama
├── style.css      # Seluruh styling & animasi
└── app.js         # Logika aplikasi (API, blender, nutrisi, skor)
```

---

 🚀 Cara Menjalankan

Karena proyek ini menggunakan Axios via CDN dan mengakses API eksternal, cukup buka file HTML langsung di browser — tidak perlu build tool atau instalasi apapun.

```bash
# Clone repository
git clone https://github.com/nailakeisha/NutriBlend.git

# Masuk ke folder
cd NutriBlend

# Buka di browser
# Double-click index.html, atau gunakan ekstensi Live Server di VS Code
```

> Catatan: Pastikan koneksi internet aktif agar data buah dari Fruityvice API dapat dimuat.

---

🎨 Panduan Penggunaan

1. *Pilih buah* dari katalog atau gunakan tombol *Preset Smoothie*
2. *Klik kartu buah* untuk melihat detail nutrisi, atau langsung klik tombol **+** untuk menambahkan ke blender
3. *Atur kuantitas* masing-masing bahan di panel blender menggunakan tombol `−` dan `+`
4. Pantau *Total Nutrisi* dan *Health Score* yang diperbarui secara real-time
5. Klik *BLEND IT!*  untuk animasi blending
6. Gunakan *Kosongkan Blender* untuk mereset dan mencoba kombinasi baru

---

 📊 Sistem Penilaian (Health Score)

- 🌿 80 – 100→ Sangat Sehat
- 🙂 55 – 79→ Cukup Sehat
- ⚠️ 35 – 54→ Perlu Diperhatikan
- ❌ 0 – 34→ Tidak Disarankan

Skor dipengaruhi oleh kadar gula, kalori total, kandungan protein, dan keragaman buah dalam blender.

---

🌐 API Reference

Proyek ini menggunakan **[Fruityvice API](https://www.fruityvice.com/)** — API publik gratis yang menyediakan data nutrisi buah.

```
GET https://www.fruityvice.com/api/fruit/all
```

Data yang digunakan: `name`, `family`, `genus`, `nutritions` (calories, sugar, carbohydrates, protein, fat)

> Request diproksikan melalui `allorigins.win` untuk mengatasi batasan CORS.

---

 👥 Tim Pengembang
* Naila Keisha
* Nikita Salsabila
* Anggita Putri
- Sefina Ayudia

---

📄 Lisensi

Proyek ini dibuat untuk keperluan pembelajaran. Bebas digunakan dan dimodifikasi dengan tetap mencantumkan kredit.
