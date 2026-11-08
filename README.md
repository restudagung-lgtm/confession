# 💌 Web Confession

Halaman web interaktif untuk menyatakan perasaan. Murni HTML, CSS, dan JavaScript
(tanpa framework, tanpa build), jadi bisa langsung di-upload ke GitHub Pages.

## Alur

1. **Welcome**: sambutan, klik di mana saja untuk lanjut (musik mulai di sini).
2. **Input nama**: isi nama lalu tekan *Kirim* (bisa dilewati lewat `presetName`).
3. **Pertanyaan**: "{nama}, mau nggak jadi pacarku?" dengan tombol *Mau* dan *Nggak*.
   Tombol *Nggak* kabur ke posisi acak dan makin kecil setiap disentuh,
   sementara tombol *Mau* makin besar.
4. **Ucapan**: konfeti, foto utama (opsional), surat singkat, galeri foto,
   dan tombol kirim jawaban lewat WhatsApp.

## Struktur

```
confession/
├── index.html
├── css/style.css      # tampilan & animasi
├── js/
│   ├── config.js      # semua teks & pengaturan (edit di sini)
│   └── script.js      # logika alur, musik, efek
├── images/            # taruh foto di sini
├── music/             # (opsional) taruh file lagu sendiri di sini
└── README.md
```

## Kustomisasi (semua di `js/config.js`)

- **Teks**: ubah langsung; `{nama}` otomatis diganti nama dia.
- **Nama**: isi `presetName` jika nama sudah pasti, kosongkan untuk layar input nama.
- **Foto & galeri**: simpan file di `images/`, lalu daftarkan di `success.photo` (foto utama)
  dan `gallery` (polaroid; klik untuk memperbesar). Caption bisa diganti atau dikosongkan.
- **Surat**: edit `letter.paragraphs`.
- **WhatsApp**: isi `whatsapp.number` (format `08...` atau `+62...`). Dia tetap
  harus menekan tombol kirim di WhatsApp.
- **Musik**: taruh 1 file mp3 bernama `lagu.mp3` di folder `music/` (diputar berulang). Jika file tidak ada, web tetap jalan tanpa suara.
  Untuk lagu sendiri, taruh file di `music/` dan isi `music.src`
  (pastikan kamu berhak memakai lagunya).
- **Warna**: variabel di bagian atas `css/style.css`.

## Menjalankan di lokal

```bash
python3 -m http.server 8000
# buka http://localhost:8000
```

## Deploy ke GitHub Pages

1. Buat repository baru, lalu upload semua isi folder ini.
2. **Settings → Pages**, pilih branch `main` dan folder `/ (root)`, lalu **Save**.
3. Situs aktif di `https://<username>.github.io/<nama-repo>/`.

> **Privasi:** semua isi repo (termasuk nomor WhatsApp di `config.js`) bisa dilihat
> publik jika repository-nya public.

## Catatan

- Browser hanya mengizinkan suara setelah ada klik, makanya musik mulai di layar welcome.
- Animasi dimatikan otomatis untuk pengguna dengan *reduced motion*.
