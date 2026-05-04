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
  { threshold: 0.14 }
);

revealEls.forEach((el) => observer.observe(el));
