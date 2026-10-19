import { readKeyFromURL, installLinkInterceptor, getKey, setKey } from './js/key-manager.js';

// Read API key from ?key= URL parameter (strips from address bar)
readKeyFromURL();

// Propagate key to interactive links on click
installLinkInterceptor();

// Expose key manager for inline scripts (e.g., index.html key input)
window.__keyManager = { getKey, setKey };

// Scroll-reveal animations
const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -5% 0px",
    }
  );

  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add("is-visible"));
}
