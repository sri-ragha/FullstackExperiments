// main.js
// You can add interactivity here if needed.

document.addEventListener('DOMContentLoaded', () => {
  // Example: handle contact form submission (no backend, just UI feedback)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! (This is a static demo)');
      form.reset();
    });
  }
}); 