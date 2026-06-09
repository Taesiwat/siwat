// Wait for DOM to load fully
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initMatrixBackground();
  initMacroDashboard();
  initRiceForecaster();
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
   2. THAILAND MACROECONOMIC DASHBOARD
   ========================================================================== */
function initMacroDashboard() {
  const ctx = document.getElementById("macroChart").getContext("2d");
  if (!ctx) return;

  // Chart configuration defaults
  Chart.defaults.color = '#94a3b8';
  Chart.defaults.font.family = "'JetBrains Mono', monospace";
  Chart.defaults.font.size = 10;

  // Datasets for macroeconomic indicators
  const macroData = {
    gdp: {
      labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025 (E)", "2026 (F)"],
      values: [2.2, -6.1, 1.5, 2.5, 1.9, 2.6, 2.8, 3.1],
      label: "GDP Growth (YoY %)",
      color: "#10b981",
      current: "+2.6%",
      target: "2.5% - 3.5%",
      gradientStart: "rgba(16, 185, 129, 0.2)",
      gradientEnd: "rgba(16, 185, 129, 0.0)"
    },
    cpi: {
      labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025 (E)", "2026 (F)"],
      values: [0.7, -0.8, 1.2, 6.1, 1.2, 0.6, 1.1, 1.5],
      label: "Headline Inflation (CPI %)",
      color: "#06b6d4",
      current: "+0.6%",
      target: "1.0% - 3.0%",
      gradientStart: "rgba(6, 182, 212, 0.2)",
      gradientEnd: "rgba(6, 182, 212, 0.0)"
    },
    rate: {
      labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025 (E)", "2026 (F)"],
      values: [1.25, 0.50, 0.50, 1.25, 2.50, 2.50, 2.25, 2.00],
      label: "BoT Policy Interest Rate (%)",
      color: "#f59e0b",
      current: "2.50%",
      target: "Flexible Inflation Target",
      gradientStart: "rgba(245, 158, 11, 0.2)",
      gradientEnd: "rgba(245, 158, 11, 0.0)"
    }
  };

  // Helper to create gradient background
  function getGradient(colorStart, colorEnd) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);
    return gradient;
  }

  // Initial setup: GDP
  let activeMetric = "gdp";
  let chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: macroData[activeMetric].labels,
      datasets: [{
        label: macroData[activeMetric].label,
        data: macroData[activeMetric].values,
        borderColor: macroData[activeMetric].color,
        backgroundColor: getGradient(macroData[activeMetric].gradientStart, macroData[activeMetric].gradientEnd),
        borderWidth: 2.5,
        fill: true,
        tension: 0.35,
        pointBackgroundColor: macroData[activeMetric].color,
        pointBorderColor: '#070b13',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.04)' },
          ticks: {
            callback: function(value) { return value + '%'; }
          }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });

  // Switch tabs
  const tabs = document.querySelectorAll(".db-tab");
  const currentValEl = document.getElementById("currentVal");
  const targetValEl = document.getElementById("targetVal");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // Toggle active classes
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      // Update charts
      activeMetric = tab.getAttribute("data-metric");
      const metric = macroData[activeMetric];

      chart.data.labels = metric.labels;
      chart.data.datasets[0].label = metric.label;
      chart.data.datasets[0].data = metric.values;
      chart.data.datasets[0].borderColor = metric.color;
      chart.data.datasets[0].backgroundColor = getGradient(metric.gradientStart, metric.gradientEnd);
      chart.data.datasets[0].pointBackgroundColor = metric.color;
      chart.update();

      // Update UI Stats
      currentValEl.textContent = metric.current;
      targetValEl.textContent = metric.target;
    });
  });
}

/* ==========================================================================
   3. AGRICULTURAL PRICE FORECASTING MODEL
   ========================================================================== */
function initRiceForecaster() {
  const ctx = document.getElementById("forecastChart").getContext("2d");
  if (!ctx) return;

  // Sliders and Display Elements
  const demandSlider = document.getElementById("demandSlider");
  const demandVal = document.getElementById("demandVal");
  
  const climateSlider = document.getElementById("climateSlider");
  const climateVal = document.getElementById("climateVal");
  
  const costSlider = document.getElementById("costSlider");
  const costVal = document.getElementById("costVal");
  
  const predictedPriceEl = document.getElementById("predictedPrice");

  // Timeline labels (Next 12 Months)
  const labels = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  
  // Baseline trajectory values for Jasmine Rice ($/Ton)
  const baselinePrices = [780, 785, 792, 805, 810, 822, 830, 825, 818, 820, 835, 842];

  // Helper to create gradient background
  function getGradient() {
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(6, 182, 212, 0.15)');
    gradient.addColorStop(1, 'rgba(6, 182, 212, 0.0)');
    return gradient;
  }

  // Create chart
  let chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: "Forecasted Price ($/Ton)",
          data: [...baselinePrices],
          borderColor: "#06b6d4",
          backgroundColor: getGradient(),
          borderWidth: 2,
          borderDash: [5, 5],
          fill: true,
          tension: 0.3,
          pointBackgroundColor: "#06b6d4",
          pointRadius: 3
        },
        {
          label: "Baseline Price",
          data: [...baselinePrices],
          borderColor: "rgba(255, 255, 255, 0.15)",
          borderWidth: 1,
          pointRadius: 0,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.03)' },
          min: 550,
          max: 1200,
          ticks: {
            callback: function(value) { return '$' + value; }
          }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });

  // Calculate & Update simulation
  function updateSimulation() {
    const demand = parseFloat(demandSlider.value);
    const climate = parseInt(climateSlider.value);
    const cost = parseInt(costSlider.value);

    // Update Slider UI labels
    demandVal.textContent = demand.toFixed(1) + "x";
    climateVal.textContent = (climate > 0 ? "+" : "") + climate + "%";
    costVal.textContent = cost.toString();

    // Economic formula for simulated price:
    // P = P_base * DemandFactor * (1 - ClimateYieldImpact) * (CostFactor)
    // Climate yield impact drops supply, pushing price up. Hence, a negative yield impact raises prices.
    const climateImpactFactor = 1 - (climate / 100);
    const costFactor = 1 + ((cost - 100) / 400);

    let sum = 0;
    const simulatedPrices = baselinePrices.map(basePrice => {
      const calculated = Math.round(basePrice * demand * climateImpactFactor * costFactor);
      sum += calculated;
      return calculated;
    });

    // Update chart
    chart.data.datasets[0].data = simulatedPrices;
    chart.update('none'); // Update without full redraw animation for smoothness

    // Update UI average display
    const averagePrice = Math.round(sum / baselinePrices.length);
    predictedPriceEl.textContent = `$${averagePrice} / Ton`;
  }

  // Attach listeners to sliders
  demandSlider.addEventListener("input", updateSimulation);
  climateSlider.addEventListener("input", updateSimulation);
  costSlider.addEventListener("input", updateSimulation);

  // Run initial simulation calculation
  updateSimulation();
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
