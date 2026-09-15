// Sabour Axiom Excellence — lightweight website interactions

document.addEventListener("DOMContentLoaded", () => {
  // Smooth navigation for internal links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // Subtle header state while scrolling
  const header = document.querySelector(".site-header");

  if (header) {
    const updateHeader = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  // Keep the footer year current
  const footerYear = document.querySelector(".footer-year");

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
});
