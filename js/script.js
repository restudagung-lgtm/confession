/**
 * script.js
 * Alur: Welcome -> (Input nama) -> Pertanyaan -> Ucapan + surat + galeri.
 * Semua teks diambil dari CONFIG (js/config.js).
 */
(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);

  const screens = {
    welcome: $("screen-welcome"),
    name: $("screen-name"),
    question: $("screen-question"),
    success: $("screen-success"),
  };

  const nameInput = $("name-input");
  const nameError = $("name-error");
  const btnYes = $("btn-yes");
  const btnNo = $("btn-no");
  const musicToggle = $("music-toggle");

  let userName = (CONFIG.presetName || "").trim();
  let noCount = 0;
  let current = "welcome";
  let baseYesSize = 0;
  let baseNoSize = 0;

  const fill = (tpl) => String(tpl).replace(/\{nama\}/g, userName);

  /* ---------- Isi teks dari config ---------- */
  function applyTexts() {
    $("welcome-title").textContent = CONFIG.welcome.title;
    $("welcome-text").textContent = CONFIG.welcome.text;
    $("welcome-hint").textContent = CONFIG.welcome.hint;

    $("name-title").textContent = CONFIG.name.title;
    nameInput.placeholder = CONFIG.name.placeholder;
    $("name-submit").textContent = CONFIG.name.button;

    btnYes.textContent = CONFIG.question.yes;
    btnNo.textContent = CONFIG.question.no;
  }

  /* ---------- Pindah layar ---------- */
  function show(name) {
    Object.values(screens).forEach((s) => s.classList.remove("active"));
    screens[name].classList.add("active");
    current = name;
  }

  function showQuestion() {
    $("question-text").textContent = fill(CONFIG.question.text);
    show("question");
    // ukuran dasar tombol dibaca setelah layar tampil
    requestAnimationFrame(() => {
      baseYesSize = parseFloat(getComputedStyle(btnYes).fontSize);
      baseNoSize = parseFloat(getComputedStyle(btnNo).fontSize);
    });
  }

  /* ---------- Layar 1: klik di mana saja ---------- */
  function goNext() {
    if (current !== "welcome") return;
    startMusic(); // harus dipanggil dari aksi pengguna
    if (userName) {
      showQuestion();
    } else {
      show("name");
      setTimeout(() => nameInput.focus(), 400);
    }
  }
  document.addEventListener("click", goNext);
  document.addEventListener("keydown", (e) => {
    if (current === "welcome" && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      goNext();
    }
  });

  /* ---------- Layar 2: kirim nama ---------- */
  $("name-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const value = nameInput.value.trim();
    if (!value) {
      nameError.textContent = CONFIG.name.errorEmpty;
      return;
    }
    nameError.textContent = "";
    userName = value;
    showQuestion();
  });

  /* ---------- Layar 3: tombol "Nggak" yang kabur ---------- */
  function resizeButtons() {
    const s = CONFIG.buttonScale;
    const noScale = Math.max(s.noMin, Math.pow(s.noShrink, noCount + 1));
    const yesScale = Math.min(s.yesMax, Math.pow(s.yesGrow, noCount + 1));
    if (baseNoSize) btnNo.style.fontSize = baseNoSize * noScale + "px";
    if (baseYesSize) btnYes.style.fontSize = baseYesSize * yesScale + "px";
  }

  function moveNoButton() {
    resizeButtons();

    const texts = CONFIG.noEscapeTexts;
    if (texts && texts.length) {
      btnNo.textContent = texts[noCount % texts.length];
    }
    noCount++;

    const pad = 12;
    const w = btnNo.offsetWidth;
    const h = btnNo.offsetHeight;
    const maxX = Math.max(window.innerWidth - w - pad, pad);
    const maxY = Math.max(window.innerHeight - h - pad, pad);
    const yes = btnYes.getBoundingClientRect();

    let x, y, tries = 0;
    do {
      x = pad + Math.random() * (maxX - pad);
      y = pad + Math.random() * (maxY - pad);
      tries++;
    } while (
      tries < 40 &&
      x < yes.right + 10 &&
      x + w > yes.left - 10 &&
      y < yes.bottom + 10 &&
      y + h > yes.top - 10
    );

    btnNo.classList.add("runaway");
    btnNo.style.left = x + "px";
    btnNo.style.top = y + "px";
  }

  ["mouseenter", "pointerdown", "touchstart", "focus"].forEach((evt) => {
    btnNo.addEventListener(
      evt,
      (e) => {
        e.preventDefault();
        moveNoButton();
      },
      { passive: false }
    );
  });
  btnNo.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    moveNoButton();
  });

  window.addEventListener("resize", () => {
    if (btnNo.classList.contains("runaway")) moveNoButton();
  });

  /* ---------- Layar 4: ucapan ---------- */
  function buildSuccess() {
    $("success-title").textContent = fill(CONFIG.success.title);
    $("success-text").textContent = fill(CONFIG.success.text);

    // foto utama
    const photo = $("success-photo");
    if (CONFIG.success.photo) {
      photo.src = CONFIG.success.photo;
      photo.onload = () => (photo.hidden = false);
      photo.onerror = () => (photo.hidden = true);
    }

    // surat
    const L = CONFIG.letter;
    if (L && L.paragraphs && L.paragraphs.length) {
      $("letter-title").textContent = fill(L.title || "");
      const body = $("letter-body");
      body.textContent = "";
      L.paragraphs.forEach((t) => {
        const p = document.createElement("p");
        p.textContent = fill(t);
        body.appendChild(p);
      });
      $("letter-sign").textContent = fill(L.signature || "");
      $("letter").hidden = false;
    }

    // galeri polaroid
    const G = CONFIG.gallery;
    if (G && G.length) {
      const box = $("gallery");
      box.textContent = "";

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const io =
        !reduce && "IntersectionObserver" in window
          ? new IntersectionObserver(
              (entries) =>
                entries.forEach((en) => {
                  if (en.isIntersecting) {
                    en.target.classList.add("in");
                    io.unobserve(en.target);
                  }
                }),
              { root: screens.success, threshold: 0.12 }
            )
          : null;

      G.forEach((item) => {
        const fig = document.createElement("figure");
        const caption = item.caption ? fill(item.caption) : "";
        const img = document.createElement("img");
        img.src = item.src;
        img.alt = caption || "Foto kenangan";
        img.onerror = () => fig.remove(); // file belum ada -> sembunyikan
        fig.appendChild(img);
        if (caption) {
          const cap = document.createElement("figcaption");
          cap.textContent = caption;
          fig.appendChild(cap);
        }
        fig.tabIndex = 0;
        fig.setAttribute("role", "button");
        fig.addEventListener("click", () => openLightbox(item.src, caption));
        fig.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openLightbox(item.src, caption);
          }
        });
        box.appendChild(fig);
        if (io) io.observe(fig);
        else fig.classList.add("in");
      });

      if (CONFIG.galleryTitle) {
        $("gallery-title").textContent = fill(CONFIG.galleryTitle);
        $("gallery-title").hidden = false;
      }
      box.hidden = false;
    }

    // WhatsApp
    const wa = CONFIG.whatsapp;
    if (wa && wa.number) {
      let n = String(wa.number).replace(/\D/g, "");
      if (n.startsWith("0")) n = "62" + n.slice(1);
      $("wa-btn").href =
        "https://wa.me/" + n + "?text=" + encodeURIComponent(fill(wa.message || ""));
      $("wa-btn").textContent = wa.button;
      $("wa-btn").hidden = false;
    }
  }

  btnYes.addEventListener("click", () => {
    btnNo.style.display = "none";
    buildSuccess();
    show("success");
    screens.success.scrollTop = 0;
    launchConfetti();
  });

  /* ---------- Lightbox ---------- */
  const lightbox = $("lightbox");
  function openLightbox(src, caption) {
    $("lightbox-img").src = src;
    $("lightbox-img").alt = caption || "Foto kenangan";
    $("lightbox-caption").textContent = caption || "";
    lightbox.hidden = false;
  }
  function closeLightbox() {
    lightbox.hidden = true;
    $("lightbox-img").removeAttribute("src");
  }
  lightbox.addEventListener("click", closeLightbox);
  $("lightbox-close").addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });

  /* ---------- Efek visual ---------- */
  function spawnHeart() {
    const el = document.createElement("span");
    el.className = "heart";
    el.textContent =
      CONFIG.heartEmojis[Math.floor(Math.random() * CONFIG.heartEmojis.length)];
    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = 14 + Math.random() * 22 + "px";
    el.style.animationDuration = 6 + Math.random() * 6 + "s";
    $("hearts").appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }

  function launchConfetti() {
    const colors = ["#e63e6d", "#ffb3c6", "#ffd166", "#06d6a0", "#118ab2"];
    for (let i = 0; i < CONFIG.confettiCount; i++) {
      const c = document.createElement("span");
      c.className = "confetti";
      c.style.left = Math.random() * 100 + "vw";
      c.style.background = colors[Math.floor(Math.random() * colors.length)];
      c.style.animationDuration = 2.5 + Math.random() * 2.5 + "s";
      c.style.animationDelay = Math.random() * 0.8 + "s";
      document.body.appendChild(c);
      c.addEventListener("animationend", () => c.remove());
    }
  }

  /* ---------- Musik latar ---------- */
  // Melodi bawaan: music-box lembut (C - Am - F - G), dibuat lewat Web Audio.
  const ARP = [
    [261.63, 329.63, 392.0, 523.25, 392.0, 329.63, 392.0, 329.63],
    [220.0, 261.63, 329.63, 440.0, 329.63, 261.63, 329.63, 261.63],
    [174.61, 220.0, 261.63, 349.23, 261.63, 220.0, 261.63, 220.0],
    [196.0, 246.94, 293.66, 392.0, 293.66, 246.94, 293.66, 246.94],
  ];
  const MELODY = [
    [659.25, null, null, null, 523.25, null, 587.33, null],
    [523.25, null, null, null, 440.0, null, 523.25, null],
    [440.0, null, 523.25, null, 587.33, null, null, null],
    [587.33, null, 493.88, null, 392.0, null, null, null],
  ];
  const STEP_SEC = 0.42;

  let musicStarted = false;
  let muted = false;
  let ctx = null;
  let master = null;
  let fileAudio = null;
  let step = 0;
  let nextTime = 0;

  function note(freq, t, dur, gain, type) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(gain, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g);
    g.connect(master);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  }

  function schedule() {
    while (nextTime < ctx.currentTime + 0.6) {
      const bar = Math.floor(step / 8) % 4;
      const i = step % 8;
      note(ARP[bar][i], nextTime, 1.2, 0.12, "triangle");
      if (MELODY[bar][i]) note(MELODY[bar][i], nextTime, 1.8, 0.15, "sine");
      nextTime += STEP_SEC;
      step = (step + 1) % 32;
    }
  }

  function startMusic() {
    const M = CONFIG.music;
    if (musicStarted || !M || !M.enabled) return;
    musicStarted = true;

    if (M.src) {
      fileAudio = new Audio(M.src);
      fileAudio.loop = true;
      fileAudio.volume = M.volume;
      // file lagu belum ada / gagal dimuat -> tidak ada suara dan tombol musik disembunyikan
      fileAudio.addEventListener("error", () => {
        musicToggle.hidden = true;
        fileAudio = null;
      });
      fileAudio.play().catch(() => {});
    } else {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = M.volume;
      // gema lembut
      const delay = ctx.createDelay();
      delay.delayTime.value = 0.34;
      const fb = ctx.createGain();
      fb.gain.value = 0.35;
      delay.connect(fb);
      fb.connect(delay);
      master.connect(delay);
      delay.connect(ctx.destination);
      master.connect(ctx.destination);
      ctx.resume();
      nextTime = ctx.currentTime + 0.1;
      schedule();
      setInterval(schedule, 150);
    }
    musicToggle.hidden = false;
  }

  function applyMute() {
    musicToggle.textContent = muted ? "🔇" : "🔊";
    if (fileAudio) fileAudio.muted = muted;
    if (ctx) master.gain.value = muted ? 0 : CONFIG.music.volume;
  }

  musicToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    muted = !muted;
    applyMute();
  });

  // hentikan saat tab disembunyikan
  document.addEventListener("visibilitychange", () => {
    if (ctx) document.hidden ? ctx.suspend() : ctx.resume();
    if (fileAudio) document.hidden ? fileAudio.pause() : !muted && fileAudio.play().catch(() => {});
  });

  /* ---------- Start ---------- */
  applyTexts();
  setInterval(spawnHeart, CONFIG.heartsIntervalMs);
})();
