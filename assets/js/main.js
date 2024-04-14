// back to top button
const backToTopButton = document.getElementById("btn-back-to-top");

function toggleButtonVisibility() {
  backToTopButton.style.display = (window.scrollY > 20) ? "block" : "none";
}

window.addEventListener("scroll", toggleButtonVisibility);

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scrolling to the top
});

toggleButtonVisibility();
