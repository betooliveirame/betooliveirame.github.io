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

// open tagged links in a background tab, keeping focus on the current tab
document.querySelectorAll('.post-content a.bg-tab[target="_blank"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.open(link.href, "_blank");
    window.focus();
  });
});
