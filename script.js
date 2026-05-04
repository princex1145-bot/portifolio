const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("siteNav");
const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 860 && nav) {
      nav.classList.remove("open");
    }
  });
});
