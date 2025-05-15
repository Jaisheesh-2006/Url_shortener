document.addEventListener("DOMContentLoaded", function () {
  // Get the hamburger menu and navbar links
  const hamburger = document.querySelector(".hamburger-menu");
  const navbarLinks = document.querySelector(".navbar-links");

  // Toggle navigation when hamburger is clicked
  if (hamburger) {
    hamburger.addEventListener("click", function () {
      navbarLinks.classList.toggle("active");

      // Animate hamburger to X
      const spans = hamburger.querySelectorAll("span");
      spans.forEach((span) => span.classList.toggle("active"));
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !event.target.closest(".navbar") &&
      navbarLinks.classList.contains("active")
    ) {
      navbarLinks.classList.remove("active");

      // Reset hamburger animation
      const spans = hamburger.querySelectorAll("span");
      spans.forEach((span) => span.classList.remove("active"));
    }
  });
});
