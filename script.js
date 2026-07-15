const buttons = document.querySelectorAll(".theme-button");
const heroArt = document.querySelector(".hero-art");
const themeKeys = ["theme-light", "theme-dark"];
const themeImages = {
  "theme-light": "assets/hero-earth-light.png",
  "theme-dark": "assets/hero-earth-dark.png",
};

if (!sessionStorage.getItem("portfolio-about-seen")) {
  sessionStorage.setItem("portfolio-about-seen", "true");
  history.replaceState(null, "", "#about");
  window.requestAnimationFrame(() => {
    document.getElementById("about").scrollIntoView({ behavior: "auto", block: "start" });
  });
}

function setTheme(nextTheme) {
  document.body.classList.remove(...themeKeys);
  document.body.classList.add(nextTheme);
  heroArt.src = themeImages[nextTheme];
  buttons.forEach((button) => {
    const isActive = button.dataset.theme === nextTheme;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  localStorage.setItem("portfolio-theme", nextTheme);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => setTheme(button.dataset.theme));
});

const profilePanel = document.querySelector(".profile-panel");
const profileToggle = document.querySelector(".profile-toggle");

profileToggle.addEventListener("click", () => {
  const isCollapsed = profilePanel.classList.toggle("is-collapsed");
  profileToggle.setAttribute("aria-expanded", String(!isCollapsed));
  profileToggle.setAttribute(
    "aria-label",
    isCollapsed ? "Expand profile card" : "Collapse profile card"
  );
  profileToggle.title = isCollapsed ? "Expand profile card" : "Collapse profile card";
});

document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const slides = Array.from(gallery.querySelectorAll(".gallery-slide"));
  const previousButton = gallery.querySelector(".gallery-control.previous");
  const nextButton = gallery.querySelector(".gallery-control.next");
  let activeIndex = 0;

  function showSlide(nextIndex) {
    activeIndex = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });
  }

  previousButton.addEventListener("click", () => showSlide(activeIndex - 1));
  nextButton.addEventListener("click", () => showSlide(activeIndex + 1));
  showSlide(0);
});

document.querySelectorAll(".detail-toggle").forEach((toggle) => {
  const panel = document.getElementById(toggle.getAttribute("aria-controls"));

  toggle.addEventListener("click", () => {
    const willExpand = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(willExpand));
    panel.hidden = !willExpand;
  });
});

const savedTheme = localStorage.getItem("portfolio-theme");
if (themeKeys.includes(savedTheme)) {
  setTheme(savedTheme);
} else {
  setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "theme-dark" : "theme-light");
}

const typedName = document.querySelector(".typed-name");
const fullName = "Chenyu Zhao";

window.addEventListener("beforeprint", () => {
  typedName.textContent = fullName;
});

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  typedName.textContent = fullName;
} else {
  let characterIndex = 0;
  typedName.textContent = "";

  function typeNextCharacter() {
    typedName.textContent = fullName.slice(0, characterIndex + 1);
    characterIndex += 1;
    if (characterIndex < fullName.length) {
      window.setTimeout(typeNextCharacter, 110);
    }
  }

  window.setTimeout(typeNextCharacter, 420);
}
