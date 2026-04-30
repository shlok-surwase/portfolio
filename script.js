/* ============================================================
   Shlok Surwase Portfolio — script.js
   ============================================================ */

/* ── Custom Cursor ── */
const dot  = document.getElementById("cursorDot");
const ring = document.getElementById("cursorRing");
let rx = 0, ry = 0;

document.addEventListener("mousemove", e => {
  dot.style.left  = e.clientX + "px";
  dot.style.top   = e.clientY + "px";
  rx += (e.clientX - rx) * 0.1;
  ry += (e.clientY - ry) * 0.1;
});

function animateRing() {
  if (ring) {
    ring.style.left = rx + "px";
    ring.style.top  = ry + "px";
    rx += (parseFloat(dot.style.left || 0) - rx) * 0.08;
    ry += (parseFloat(dot.style.top  || 0) - ry) * 0.08;
  }
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll("a, button, .gallery-item, .cert-card, .project-card").forEach(el => {
  el.addEventListener("mouseenter", () => {
    if (dot)  dot.style.transform  = "translate(-50%,-50%) scale(2)";
    if (ring) ring.style.transform = "translate(-50%,-50%) scale(1.5)";
  });
  el.addEventListener("mouseleave", () => {
    if (dot)  dot.style.transform  = "translate(-50%,-50%) scale(1)";
    if (ring) ring.style.transform = "translate(-50%,-50%) scale(1)";
  });
});

/* ── Dark / Light Mode Toggle ── */
const themeToggle = document.getElementById("themeToggle");
const toggleIcon  = themeToggle.querySelector(".toggle-icon");
let isDark = true;

themeToggle.addEventListener("click", () => {
  isDark = !isDark;
  document.body.classList.toggle("dark-mode",  isDark);
  document.body.classList.toggle("light-mode", !isDark);
  toggleIcon.textContent = isDark ? "☀" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

/* Restore saved theme */
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  isDark = false;
  document.body.classList.remove("dark-mode");
  document.body.classList.add("light-mode");
  toggleIcon.textContent = "🌙";
}

/* ── Navbar scroll effect + active link ── */
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
  updateActiveNav();
});

function updateActiveNav() {
  const sections = document.querySelectorAll(".section");
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.id;
    }
  });
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
}

/* ── Smooth scroll for nav links ── */
document.querySelectorAll(".nav-scroll").forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // Close mobile menu if open
        mobileMenu.classList.remove("open");
      }
    }
  });
});

/* ── Mobile burger menu ── */
const burger     = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");

burger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  const spans = burger.querySelectorAll("span");
  const isOpen = mobileMenu.classList.contains("open");
  if (isOpen) {
    spans[0].style.transform = "rotate(45deg) translate(5px,5px)";
    spans[1].style.opacity   = "0";
    spans[2].style.transform = "rotate(-45deg) translate(5px,-5px)";
  } else {
    spans[0].style.transform = "";
    spans[1].style.opacity   = "";
    spans[2].style.transform = "";
  }
});

/* ── Scroll Reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });

document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = (i % 6) * 0.07 + "s";
  revealObserver.observe(el);
});

/* ── Gallery Filter ── */
const filterBtns  = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      if (filter === "all" || item.dataset.cat === filter) {
        item.classList.remove("hidden");
        item.style.animation = "fadeIn 0.4s ease both";
      } else {
        item.classList.add("hidden");
      }
    });
  });
});

/* ── Contact Form ── */
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    if (formSuccess) {
      formSuccess.style.display = "block";
      formSuccess.style.animation = "fadeIn 0.5s ease both";
      contactForm.reset();
      setTimeout(() => {
        formSuccess.style.display = "none";
      }, 5000);
    }
  });
}

/* ── Stagger animation for cards on scroll ── */
function staggerCards(selector, delay = 0.1) {
  const cards = document.querySelectorAll(selector);
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.querySelectorAll(selector.split(" ").pop());
        children.forEach((child, i) => {
          child.style.transitionDelay = i * delay + "s";
          child.classList.add("visible");
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
}

/* ── Parallax on home orbs ── */
document.addEventListener("mousemove", e => {
  const orb1 = document.querySelector(".orb-1");
  const orb2 = document.querySelector(".orb-2");
  if (!orb1 || !orb2) return;
  const xPos = (e.clientX / window.innerWidth - 0.5) * 30;
  const yPos = (e.clientY / window.innerHeight - 0.5) * 30;
  orb1.style.transform = `translate(${xPos * 0.5}px, ${yPos * 0.5}px)`;
  orb2.style.transform = `translate(${-xPos * 0.3}px, ${-yPos * 0.3}px)`;
});

/* ── Photo tilt effect ── */
const photoFrame = document.querySelector(".photo-frame");
if (photoFrame) {
  photoFrame.addEventListener("mousemove", e => {
    const rect = photoFrame.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    photoFrame.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  photoFrame.addEventListener("mouseleave", () => {
    photoFrame.style.transform = "";
    photoFrame.style.transition = "transform 0.6s ease";
  });
}

/* ── Typing effect on tagline ── */
function typeWriter(element, text, speed = 50) {
  if (!element) return;
  element.textContent = "";
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  setTimeout(type, 800);
}

const tagline = document.querySelector(".home-tagline");
if (tagline) {
  const originalText = tagline.textContent;
  const tagObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      typeWriter(tagline, originalText, 40);
      tagObs.disconnect();
    }
  }, { threshold: 0.5 });
  tagObs.observe(tagline);
}

/* ── CSS fadeIn keyframe injection ── */
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
