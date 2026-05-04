const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const year = document.getElementById("year");
const entryGate = document.getElementById("entryGate");
const entryForm = document.getElementById("entryForm");
const visitorNameInput = document.getElementById("visitorName");
const welcomeText = document.getElementById("welcomeText");
const themeToggle = document.getElementById("themeToggle");
const resetEntry = document.getElementById("resetEntry");
const downloadContact = document.getElementById("downloadContact");
const ENTRY_KEY = "portfolioVisitorName";
const THEME_KEY = "portfolioTheme";

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

const setWelcomeName = (name) => {
  if (welcomeText) {
    welcomeText.textContent = `Welcome, ${name}`;
  }
};

const unlockPortfolio = (name) => {
  localStorage.setItem(ENTRY_KEY, name);
  setWelcomeName(name);
  if (entryGate) {
    entryGate.classList.add("hidden");
  }
  document.body.classList.remove("locked");
};

const storedName = localStorage.getItem(ENTRY_KEY);
if (storedName) {
  unlockPortfolio(storedName);
} else {
  document.body.classList.add("locked");
}

if (entryForm && visitorNameInput) {
  entryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = visitorNameInput.value.trim();
    if (!name) return;
    unlockPortfolio(name);
    visitorNameInput.value = "";
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

const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme === "light") {
  document.body.classList.add("light-mode");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    localStorage.setItem(THEME_KEY, document.body.classList.contains("light-mode") ? "light" : "dark");
  });
}

if (resetEntry) {
  resetEntry.addEventListener("click", () => {
    localStorage.removeItem(ENTRY_KEY);
    if (entryGate) {
      entryGate.classList.remove("hidden");
    }
    document.body.classList.add("locked");
    if (welcomeText) {
      welcomeText.textContent = "Welcome, Guest";
    }
  });
}

if (downloadContact) {
  downloadContact.addEventListener("click", () => {
    const cardData = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "FN:Teppala Abhilash",
      "TEL;TYPE=CELL:9392138419",
      "EMAIL:netaji1145@gmail.com",
      "URL:https://www.linkedin.com/in/teppala-abhilash-66278b289",
      "END:VCARD",
    ].join("\n");
    const blob = new Blob([cardData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "teppala-abhilash-contact.vcf";
    a.click();
    URL.revokeObjectURL(url);
  });
}

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
