// ====== ONLY EDIT THESE ======
const HER_NAME = "Khusboo";
const OUR_SONG_URL = "https://open.spotify.com/"; // optional

// March 11 (month is 0-based → 2 = March)
const TARGET_DATE = new Date(2026, 2, 11, 0, 0, 0);

// Your message
const LETTER = `
Today is yours — and I hope it feels calm, warm, and full of happiness.

Khusboo, thank you for being you. For your kindness, your strength,
and the way you make ordinary moments feel special.
I’m proud of you, and I’m grateful for you — always.

May this year bring you peace, growth, and many reasons to smile.
Happy Birthday ❤️
`.trim();
// ============================

const el = (id) => document.getElementById(id);

const heroTitle = el("heroTitle");
const heroSubtitle = el("heroSubtitle");
const countdownEl = el("countdown");
const openBtn = el("openBtn");
const peekBtn = el("peekBtn");
const messageCard = el("messageCard");
const lockedActions = el("lockedActions");
const statusText = el("statusText");

el("herName").textContent = HER_NAME;
el("letterText").textContent = LETTER;

function isUnlocked() {
  return Date.now() >= TARGET_DATE.getTime();
}

function pill(n, label) {
  return `
    <div class="pill">
      <div class="num">${String(n).padStart(2, "0")}</div>
      <div class="lab">${label}</div>
    </div>
  `;
}

function renderCountdown() {
  const diff = TARGET_DATE.getTime() - Date.now();
  const total = Math.max(0, diff);

  const sec = Math.floor(total / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;

  countdownEl.innerHTML = [
    pill(days, "Days"),
    pill(hours, "Hours"),
    pill(mins, "Minutes"),
    pill(secs, "Seconds"),
  ].join("");
}

function showLocked() {
  messageCard.classList.add("hidden");
  lockedActions.classList.remove("hidden");
  openBtn.disabled = true;

  heroTitle.textContent = "A small surprise is waiting…";
  heroSubtitle.textContent =
    "Open this page on your birthday — it will unlock something special.";

  openBtn.textContent = "🔒 Locked until March 11";
  statusText.textContent = "Locked 🔒";
}

function showUnlocked() {
  messageCard.classList.remove("hidden");
  lockedActions.classList.add("hidden");
  openBtn.disabled = false;

  heroTitle.textContent = "It’s your day ✨";
  heroSubtitle.textContent = "I made this just for you.";

  statusText.textContent = "Unlocked ✅";
}

peekBtn.addEventListener("click", async () => {
  messageCard.classList.remove("hidden");
  lockedActions.classList.add("hidden");
  heroTitle.textContent = "Okay… a quick preview 😌";
  heroSubtitle.textContent = "Just a little peek.";

  burstConfetti(80);
  await new Promise((r) => setTimeout(r, 7000));
  sync();
});

openBtn.addEventListener("click", () => {
  if (!isUnlocked()) return;
  showUnlocked();
  burstConfetti(160);
});

el("songBtn").addEventListener("click", () => {
  window.open(OUR_SONG_URL, "_blank");
});

el("confettiBtn").addEventListener("click", () => burstConfetti(160));

function sync() {
  renderCountdown();
  isUnlocked() ? showUnlocked() : showLocked();
}

setInterval(sync, 1000);
sync();

// -------- CONFETTI --------
const canvas = el("fx");
const ctx = canvas.getContext("2d");
let particles = [];

function resize() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
}
addEventListener("resize", resize);
resize();

function burstConfetti(count = 120) {
  const cx = canvas.width / 2;
  const cy = canvas.height / 3;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: cx,
      y: cy,
      vx: (Math.random() - 0.5) * 12 * devicePixelRatio,
      vy: (Math.random() - 1.2) * 14 * devicePixelRatio,
      g: 0.35 * devicePixelRatio,
      r: 4 * devicePixelRatio,
      a: 1,
      hue: Math.random() * 360,
    });
  }
  animate();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter((p) => p.a > 0.02);

  for (const p of particles) {
    p.vy += p.g;
    p.x += p.vx;
    p.y += p.vy;
    p.a *= 0.98;

    ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${p.a})`;
    ctx.fillRect(p.x, p.y, p.r, p.r);
  }

  if (particles.length) requestAnimationFrame(animate);
}