
/*
 * Sabour Axiom Excellence
 * Lightweight Website Interactions
 *
 * Features:
 * 1. Smooth internal navigation
 * 2. Accessibility and reduced-motion support
 * 3. Sticky header scroll state
 * 4. Mobile navigation menu (optional)
 * 5. Automatic footer year
 * 6. Safe handling of missing elements
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // --------------------------------------------------
  // 1. Accessibility: respect reduced-motion settings
  // --------------------------------------------------

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  // --------------------------------------------------
  // 2. Smooth navigation for internal anchor links
  // --------------------------------------------------

  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      // Ignore empty anchors.
      if (!targetId || targetId === "#") {
        return;
      }

      let target;

      // Safely handle invalid CSS selectors.
      try {
        target = document.querySelector(targetId);
      } catch {
        return;
      }

      // Allow normal browser behaviour if the target is absent.
      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: prefersReducedMotion.matches ? "auto" : "smooth",
        block: "start"
      });
    });
  });

  // --------------------------------------------------
  // 3. Header state when scrolling
  // --------------------------------------------------

  const header = document.querySelector(".site-header");

  if (header) {
    const updateHeader = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    // Set the correct state immediately on page load.
    updateHeader();

    // Update the header while scrolling.
    window.addEventListener("scroll", updateHeader, {
      passive: true
    });
  }

  // --------------------------------------------------
  // 4. Optional mobile navigation menu
  //
  // Expected HTML:
  // <button class="menu-toggle"
  //         aria-controls="site-navigation"
  //         aria-expanded="false">
  //   Menu
  // </button>
  //
  // <nav id="site-navigation">
  //   ...
  // </nav>
  //
  // Expected CSS:
  // .site-navigation.is-open { display: flex; }
  // --------------------------------------------------

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#site-navigation");

  if (menuToggle && navigation) {
    const closeMenu = () => {
      menuToggle.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    };

    menuToggle.addEventListener("click", () => {
      const isExpanded =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute(
        "aria-expanded",
        String(!isExpanded)
      );

      navigation.classList.toggle("is-open", !isExpanded);
    });

    // Close the menu after selecting an internal link.
    navigation.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close the menu with the Escape key.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  // --------------------------------------------------
  // 5. Automatic copyright year
  //
  // Expected HTML:
  // <span class="footer-year"></span>
  // --------------------------------------------------

  const footerYear = document.querySelector(".footer-year");

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
});
