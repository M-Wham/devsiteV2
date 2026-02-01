
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initTerminalToggles();
});

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

function initTerminalToggles() {
  const headers = document.querySelectorAll(".terminal-header");

  headers.forEach(header => {
    header.addEventListener("click", (e) => {
      // Don't toggle if clicking specific buttons (unless we want to override them, but buttons usually have their own logic)
      if (e.target.closest('.terminal-button')) {
        // If the button is minimize or maximize, we might want to handle it specifically
        // For now, let's just let the header click handle toggle
        return;
      }

      const window = header.closest(".terminal-window");
      if (window) {
        window.classList.toggle("minimized");
      }
    });

    // Also handle minimize/maximize buttons specifically if needed, 
    // but the header click covers the requirement "click it to open/ drop the box down".
    // Let's ensure the minimize button works explicitly too if clicked directly.
    const minBtn = header.querySelector(".terminal-minimize");
    if (minBtn) {
      minBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent double toggle
        const window = header.closest(".terminal-window");
        if (window) {
          window.classList.toggle("minimized");
        }
      });
    }

    const maxBtn = header.querySelector(".terminal-maximize");
    if (maxBtn) {
      maxBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent double toggle
        const window = header.closest(".terminal-window");
        if (window) {
          window.classList.remove("minimized");
        }
      });
    }
  });
}
