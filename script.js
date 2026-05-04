const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 900 && menu) {
      menu.classList.remove("open");
    }
  });
});

const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => observer.observe(el));

const matrixCanvas = document.getElementById("matrixCanvas");
if (matrixCanvas) {
  const ctx = matrixCanvas.getContext("2d");
  const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*@";
  const fontSize = 14;
  let columns = 0;
  let drops = [];

  const setupMatrix = () => {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    columns = Math.floor(matrixCanvas.width / fontSize);
    drops = Array(columns).fill(1);
  };

  const drawMatrix = () => {
    if (!ctx) return;
    ctx.fillStyle = "rgba(4, 8, 10, 0.08)";
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    ctx.fillStyle = "#52ffab";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i += 1) {
      const char = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i] += 1;
    }
    window.requestAnimationFrame(drawMatrix);
  };

  setupMatrix();
  window.addEventListener("resize", setupMatrix);
  window.requestAnimationFrame(drawMatrix);
}
