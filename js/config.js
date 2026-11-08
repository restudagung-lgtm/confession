/**
 * config.js
 * Semua teks & pengaturan ada di sini, jadi kamu cukup edit file ini
 * tanpa menyentuh kode di script.js.
 *
 * Gunakan {nama} di teks mana pun untuk menyisipkan nama dia.
 *
 * PENTING: kalau di-upload ke GitHub Pages, isi file ini bisa dilihat siapa saja
 * (termasuk nomor WhatsApp di bawah).
 */
const CONFIG = {
  // Kosongkan ("") agar muncul layar isi nama.
  // Isi nama (mis. "Sinta") untuk melewati layar itu.
  presetName: "",

  welcome: {
    title: "Hai 👋",
    text: "Ada sesuatu yang mau aku sampaikan ke kamu…",
    hint: "Klik di mana saja untuk lanjut",
  },

  name: {
    title: "Sebelum itu, siapa namamu?",
    placeholder: "Ketik namamu di sini",
    button: "Kirim",
    errorEmpty: "Namanya diisi dulu ya 🙂",
  },

  question: {
    text: "{nama}, mau nggak jadi pacarku? 💖",
    yes: "Mau 💕",
    no: "Nggak",
  },

  // Teks tombol "Nggak" berubah setiap kali dia kabur (berputar berurutan)
  noEscapeTexts: [
    "Yakin?",
    "Coba pikir lagi…",
    "Jangan gitu dong 🥺",
    "Klik yang satunya aja",
    "Tombol ini rusak 😅",
  ],

  // Tombol "Nggak" makin kecil, tombol "Mau" makin besar tiap "Nggak" disentuh
  buttonScale: {
    noShrink: 0.86, // dikali setiap kali
    noMin: 0.4, // batas terkecil (dari ukuran awal)
    yesGrow: 1.18, // dikali setiap kali
    yesMax: 2.6, // batas terbesar (dari ukuran awal)
  },

  success: {
    title: "Yeay! Terima kasih, {nama} 🎉",
    text: "Aku seneng banget. Mulai sekarang, kita jalani bareng ya 💗",
    // Foto utama di atas ucapan, mis. "images/foto-utama.jpg". Kosongkan jika tidak ada.
    photo: "images/foto-02.jpg",
  },

  // Surat singkat (kosongkan paragraphs: [] untuk menyembunyikan)
  letter: {
    title: "Untuk kamu, seseorang yang tanpa sadar menjadi bagian dari hari-hariku.",
    paragraphs: [
      "Jujur, awalnya aku cuma punya niat sederhana, yaitu pengen chatan sama kamu. Nggak ada pikiran atau perasaan lebih dari itu. Aku juga nggak pernah menyangka kalau dari obrolan-obrolan kecil yang awalnya biasa saja, semuanya bisa berubah menjadi sesuatu yang ternyata berarti buat aku.",
      "Mungkin karena kita satu kelas, aku jadi punya lebih banyak kesempatan buat melihat dan memperhatikan kamu. Awalnya cuma sekadar melirik, memperhatikan dari kejauhan, atau tanpa sadar mencari keberadaan kamu di antara banyaknya orang di kelas. Entah sejak kapan, hal-hal kecil tentang kamu mulai menarik perhatianku.",
      "Lama-kelamaan, kita mulai sering ngobrol. Dari yang awalnya cuma basa-basi, sampai akhirnya bisa membicarakan banyak hal. Dari obrolan yang nggak penting, candaan sederhana, sampai hal-hal kecil yang mungkin buat kamu biasa saja, tapi entah kenapa selalu berhasil membuat hariku terasa lebih menyenangkan.",
      "Sampai pada suatu titik, aku mulai menyadari kalau ada sesuatu yang berbeda. Aku nggak tahu tepatnya sejak kapan, tapi aku mulai merasa nyaman setiap kali dekat sama kamu. Mulai terbiasa mencari kamu, mulai menunggu kesempatan buat ngobrol sama kamu, bahkan mulai berharap bisa menghabiskan lebih banyak waktu bareng kamu.",
      "Anehnya, sekarang hal sesederhana melihat kamu saja sudah bisa membuat aku senang. Ketika masuk kelas, ada bagian dari diriku yang tanpa sadar mencari kamu. Ketika kita nggak sempat ngobrol, rasanya ada sesuatu yang kurang. Bahkan setelah hari berakhir, terkadang aku masih kepikiran tentang obrolan kita dan berharap besok bisa bertemu kamu lagi.",
      "Aku mulai suka dengan kehadiran kamu, dengan cara kamu berbicara, cara kamu tertawa, dan hal-hal kecil lainnya yang mungkin nggak pernah kamu sadari. Aku juga nggak tahu bagaimana menjelaskannya, tapi semakin hari aku semakin ingin dekat dengan kamu. Semakin sering bertemu, justru semakin ingin bertemu lagi.",
      "Sampai akhirnya aku sadar, ternyata aku bukan cuma ingin sekadar chatan atau ngobrol sama kamu. Aku ingin menjadi seseorang yang bisa lebih dekat dengan kamu. Seseorang yang bisa mendengarkan cerita-cerita kamu, menemani hari-hari kamu, berbagi banyak hal, dan menjadi salah satu alasan kecil di balik senyum kamu.",
      "Mungkin terdengar sederhana, tapi kehadiran kamu perlahan menjadi sesuatu yang aku tunggu-tunggu. Aku nggak pernah merencanakan untuk sampai di titik ini, semuanya mengalir begitu saja. Dari sekadar ingin mengenal, menjadi terbiasa, lalu nyaman, sampai akhirnya muncul perasaan yang sekarang rasanya semakin sulit untuk disembunyikan.",
      "Aku nggak tahu bagaimana perasaan kamu setelah membaca ini. Aku juga nggak ingin membuat kamu merasa terbebani atau harus membalas perasaan yang sama. Aku cuma ingin kamu tahu bahwa ada seseorang yang diam-diam merasa beruntung karena bisa mengenal kamu lebih dekat.",
      "Dan kalau boleh jujur, aku berharap cerita kita nggak berhenti sampai di sini. Aku masih ingin mengenal kamu lebih jauh, menciptakan lebih banyak cerita, dan menghabiskan lebih banyak waktu bersama kamu.",
      "Karena ternyata, seseorang yang awalnya cuma ingin aku ajak ngobrol, sekarang justru menjadi seseorang yang paling ingin aku temui.",
      "Udah, mungkin itu aja yang bisa aku sampaikan. Singkatnya, aku suka sama kamu. Lebih dari yang awalnya pernah aku bayangkan.",
    ],
    signature: "— dari aku",
  },

  // Galeri foto (tampil sebagai polaroid; klik untuk memperbesar).
  // Taruh file di folder images/ lalu daftarkan di sini. caption boleh dikosongkan.
  galleryTitle: "Kenangan kita 💞",
  gallery: [
    { src: "images/foto-08.jpg", caption: "Senyum yang bikin betah" },
    { src: "images/foto-05.jpg", caption: "Kita, di hari itu" },
    { src: "images/foto-03.jpg", caption: "Pelan-pelan, makin dekat" },
    { src: "images/foto-01.jpg", caption: "Selfie di lift ✨" },
    { src: "images/foto-07.jpg", caption: "Dekat banget 🙈" },
    { src: "images/foto-04.jpg", caption: "Cerita kecil di jalan" },
    { src: "images/foto-06.jpg", caption: "Tenang kalau sama kamu" },
  ],

  // Tombol "kirim jawaban lewat WhatsApp" di layar ucapan.
  // number: boleh format 08xxx atau +62xxx. Kosong = tombol disembunyikan.
  whatsapp: {
    number: "083843370101",
    button: "Kabari aku lewat WhatsApp 💬",
    message: "Halo, ini {nama}. Jawabanku: MAU 💕",
  },

  // Musik latar. Browser baru mengizinkan suara setelah ada klik,
  // jadi musik mulai saat klik pertama di layar welcome.
  music: {
    enabled: true,
    // Taruh 1 file lagu (mp3) di folder music/ dengan nama lagu.mp3.
    // Kalau namanya beda, ubah di sini. File akan diputar berulang.
    // Kosongkan ("") untuk memakai melodi bawaan sederhana.
    src: "music/lagu.mp3",
    volume: 0.5, // 0 sampai 1
  },

  // Pengaturan animasi
  heartsIntervalMs: 600,
  confettiCount: 80,
  heartEmojis: ["💖", "💗", "💕", "💘", "🌸"],
};
