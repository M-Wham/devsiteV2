
document.addEventListener("DOMContentLoaded", initThemeToggle);

function initThemeToggle() {
  const root = document.documentElement;
  let storedTheme = localStorage.getItem("theme");

  if (!storedTheme) {
    storedTheme = "dark";
    localStorage.setItem("theme", "dark");
  }
  root.setAttribute("data-theme", storedTheme);
  updateIcons(storedTheme);

  requestAnimationFrame(() => {
    root.classList.add("theme-transition");
  });

  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  // Remove any existing event listeners by cloning
  const newBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(newBtn, btn);

  newBtn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateIcons(next);
  });
}

function updateIcons(theme) {
  const moon = document.querySelector(".moon-icon");
  const sun = document.querySelector(".sun-icon");
  if (!moon || !sun) return;

  if (theme === "dark") {
    moon.style.display = "block";
    sun.style.display = "none";
  } else {
    moon.style.display = "none";
    sun.style.display = "block";
  }
}
