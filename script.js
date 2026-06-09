// Wait for DOM to load fully
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initMatrixBackground();
  initBlogModal();
  initContactForm();
});

/* ==========================================================================
   1. NAVIGATION MANAGEMENT
   ========================================================================== */
function initNavigation() {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  const sections = document.querySelectorAll("section");

  // Toggle mobile menu
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    const icon = menuToggle.querySelector("i");
    if (mobileMenu.classList.contains("open")) {
      icon.className = "fa-solid fa-xmark";
    } else {
      icon.className = "fa-solid fa-bars";
    }
  });

  // Close mobile menu when a link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuToggle.querySelector("i").className = "fa-solid fa-bars";
    });
  });

  // Track active section on scroll
  window.addEventListener("scroll", () => {
    let currentSection = "";
    const scrollPos = window.scrollY + 200; // Offset for headers

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });
}

/* ==========================================================================
   2. ARTICLE READER MODAL (BLOG)
   ========================================================================== */
function initBlogModal() {
  const modal = document.getElementById("articleModal");
  const closeBtn = document.getElementById("modalClose");
  const readButtons = document.querySelectorAll(".read-article-btn");

  if (!modal || !closeBtn) return;

  // Open modal
  readButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      modal.classList.add("show");
      document.body.style.overflow = "hidden"; // Prevent background scroll
    });
  });

  // Close modal
  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = ""; // Restore scroll
  }

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}





/* ==========================================================================
   4. CONTACT FORM AND INTERACTIVE SUCCESS LAYOUT
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const successOverlay = document.getElementById("successMessage");
  const closeSuccessBtn = document.getElementById("closeSuccessBtn");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Animate and show the success message
    successOverlay.classList.add("show");
  });

  closeSuccessBtn.addEventListener("click", () => {
    // Hide overlay and reset form
    successOverlay.classList.remove("show");
    form.reset();
  });
}

/* ==========================================================================
   5. MATRIX DIGITAL RAIN BACKGROUND
   ========================================================================== */
function initMatrixBackground() {
  const canvas = document.getElementById("matrixCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Economist-focused character set: Math symbols, financial items, numbers, and alphabets
  const chars = "ΔΣθλμπβσδαγΩ√∫≈≠≤≥∞$€¥฿£%0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charArray = chars.split("");

  const fontSize = 14;
  let columns = 0;
  let drops = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    
    // Maintain drop state on resize, fill gaps with random delay offset
    const oldDrops = [...drops];
    drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = oldDrops[i] !== undefined ? oldDrops[i] : Math.random() * -100;
    }
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Palette matching portfolio accents (greens and cyans)
  const colors = ["#10b981", "#06b6d4", "#059669", "#0891b2"];

  let lastTime = 0;
  const fpsInterval = 1000 / 30; // 30 FPS rate limit

  function draw(time) {
    requestAnimationFrame(draw);

    const elapsed = time - lastTime;
    if (elapsed < fpsInterval) return;
    lastTime = time - (elapsed % fpsInterval);

    // Overlay slightly translucent black background to fade older trails
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + "px 'JetBrains Mono', monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = charArray[Math.floor(Math.random() * charArray.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      if (drops[i] >= 0) {
        // Classic glowing matrix head: make the leading character white occasionally
        if (Math.random() > 0.98) {
          ctx.fillStyle = "#ffffff";
        } else {
          ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        }
        
        ctx.fillText(text, x, y);
      }

      // Reset drop to top with a delay factor once it reaches the bottom
      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  // Start loop
  requestAnimationFrame(draw);
}
