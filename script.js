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
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const closeBtn = document.getElementById("modalClose");
  const readButtons = document.querySelectorAll(".read-article-btn");

  if (!modal || !closeBtn) return;

  const articlesData = {
    article1: {
      title: "Part 1: Inside the Human Mind — How People Make Decisions",
      content: `
        <p>To understand a massive global economy, we must start with the smallest unit: ourselves. Economists often assume humans are logical decision-makers. While we are not always perfect, the first four principles show how we weigh our options every day.</p>
        
        <h3>Principle 1: There Is No Such Thing as a Free Lunch (People Face Trade-offs)</h3>
        <p>To get something we like, we usually have to give up something else we also like. Every choice has a cost.</p>
        <ul>
          <li><strong>The Personal Level:</strong> If you choose to study for an exam on a Friday night, you give up a fun night out with friends. You cannot have both the social time and the study time at the exact same moment.</li>
          <li><strong>The National Level:</strong> Governments face a classic trade-off between <strong>"Efficiency"</strong> (making the economic pie as big as possible) and <strong>"Equality"</strong> (dividing the pie fairly among all citizens).</li>
        </ul>
        <p>When a government tries to cut the economic pie into more equal slices—for example, by taxing the rich to help the poor—it reduces the reward for working hard. As a result, people may work less, and the economic pie becomes smaller.</p>

        <h3>Principle 2: The Real Cost Is What You Give Up (Opportunity Cost)</h3>
        <p>Because we face trade-offs, making decisions requires us to compare the costs and benefits of our choices. But the true cost of an item is not just the money you pay for it. It is what we call <strong>"Opportunity Cost"</strong>—the next best thing you had to give up.</p>
        <p>If an athlete decides to go to university for four years, they do not just pay for tuition and books. Their biggest cost is the millions of dollars in salary they <em>could</em> have earned if they had played professionally instead. This is why tech giants like Bill Gates and Mark Zuckerberg dropped out of college. For them, staying in school was simply too "expensive" in terms of missed opportunities.</p>

        <h3>Principle 3: Rational People Think "at the Margin" (Think of Small Steps)</h3>
        <p>In real life, decisions are rarely "all-or-nothing." You do not choose between starving yourself or eating a giant buffet. Instead, you ask yourself: <em>"Should I study for one more hour?"</em> or <em>"Should I eat one more slice of pizza?"</em></p>
        <p>Economists call these small adjustments <strong>"Marginal Changes."</strong> A rational person makes a decision by comparing the <strong>Marginal Benefit</strong> (what they gain) and the <strong>Marginal Cost</strong> (what they lose) of that specific step.</p>
        <p>Imagine an airplane is about to take off. It costs $20,000 to fly the plane, and there are 100 seats, meaning the average cost per seat is $200. If there are empty seats, should the airline sell a last-minute ticket for $100?</p>
        <p><strong>Yes, absolutely.</strong> The cost of adding one extra passenger (the marginal cost) is nearly zero—just a tiny bit of extra fuel and a bag of peanuts. Since the marginal benefit ($100) is much higher than the marginal cost ($0), selling the ticket is a smart decision.</p>

        <h3>Principle 4: People Respond to Incentives (We React to Rewards and Punishments)</h3>
        <p>An <strong>incentive</strong> is something that induces a person to act—like a reward or a punishment. Because humans naturally want to maximize their happiness and minimize their pain, we react to incentives.</p>
        <p>When the price of oil goes up, car buyers naturally start looking at electric vehicles (EVs) because gasoline has become too expensive. At the same time, car companies start building more EVs because they see a chance to make higher profits.</p>
        <p>However, policies can sometimes create <strong>unintended consequences</strong> because of incentives. In the 1960s, the US government passed a law requiring all cars to have seatbelts. The goal was to save lives. But economists noticed an interesting shift: because drivers felt safer with seatbelts, they drove faster and more recklessly. The result? Driver deaths stayed about the same, but pedestrian deaths went <em>up</em> because drivers were less careful.</p>
      `
    },
    article2: {
      title: "Part 2: The Social Dance — How People Interact",
      content: `
        <p>We do not live alone on an island. Our daily choices affect other people. The next three principles explain how we trade and work together.</p>

        <h3>Principle 5: Trade Can Make Everyone Better Off (Trade Is Not a War)</h3>
        <p>In the news, international trade is often described as a competition where one country wins and another loses. For example, if China sells more goods to the US, people think China "wins" and the US "loses." But this is wrong.</p>
        <p><strong>Trade is not a sports game with a winner and a loser.</strong> It is a system where both sides can win.</p>
        <p>If there were no trade, your family would have to grow their own food, make their own clothes, and build their own house. Life would be incredibly difficult. Trade allows countries and people to <strong>specialize</strong> in what they do best (for example, Germany making cars, and Brazil growing coffee) and exchange them. In the end, everyone gets better products at lower prices.</p>

        <h3>Principle 6: The "Invisible Hand" of the Market (Markets Work)</h3>
        <p>The collapse of communist economies in the 1990s proved a major point: a central government cannot successfully decide what goods to make, how many to produce, and who gets them. Instead, we use a <strong>Market Economy</strong>, where decisions are made by millions of individual firms and households.</p>
        <p>Even though everyone is acting in their own self-interest, markets are incredibly organized. As the famous philosopher Adam Smith wrote, it is as if an <strong>"Invisible Hand"</strong> is guiding the economy.</p>
        <p>The magic tool used by this invisible hand is <strong>Price</strong>. Prices adjust naturally to guide buyers and sellers. For example, if a cold frost destroys orange crops, the supply of oranges drops. The price goes up. This higher price does two things automatically without any government order:</p>
        <ol>
          <li>It tells consumers to buy fewer oranges and eat apples instead.</li>
          <li>It tells farmers elsewhere to grow more oranges because they can make a high profit.</li>
        </ol>

        <h3>Principle 7: Governments Can Sometimes Help (The Market Is Not Perfect)</h3>
        <p>If markets are so great, why do we need a government? The answer is that the invisible hand is powerful, but it is not magic. It needs protection, and sometimes it fails.</p>
        <p>First, the market only works if the government protects <strong>Property Rights</strong>. A farmer will not grow food if they think someone will steal it without consequence.</p>
        <p>Second, we sometimes face <strong>Market Failures</strong>—situations where the market, left on its own, fails to allocate resources efficiently. This happens for two main reasons:</p>
        <ol>
          <li><strong>Externalities:</strong> When one person's action affects bystanders (for example, a factory polluting a river). The market does not naturally punish the factory, so the government must step in with environmental regulations.</li>
          <li><strong>Market Power:</strong> When a single company controls the entire market (a monopoly) and charges unfairly high prices. The government must step in with anti-monopoly laws to keep competition fair.</li>
        </ol>
        <p>Finally, the market does not guarantee that everyone has food, healthcare, or shelter. Governments step in with social welfare programs to ensure basic human dignity.</p>
      `
    },
    article3: {
      title: "Part 3: The Big Picture — How the Whole Economy Works",
      content: `
        <p>The final three principles look at the "macro" level—the forces that move entire nations and shape global history.</p>

        <h3>Principle 8: Productivity Determines Wealth (A Nation's Standard of Living)</h3>
        <p>Why does an average citizen in Switzerland enjoy a much higher standard of living than an average citizen in Burundi? The answer is not luck or politics. It is <strong>Productivity</strong>.</p>
        <p><strong>Productivity is the amount of goods and services produced by a worker in one hour.</strong></p>
        <p>In wealthy countries, workers have access to advanced technology, high-quality education, and excellent tools. They can produce a lot of value very quickly, which leads to high wages and a comfortable life. In poor nations, workers must rely on simple tools and manual labor, which produces less value per hour. If a country wants to raise its citizens' living standards, it must invest in education, technology, and better tools.</p>

        <h3>Principle 9: Too Much Money Causes Inflation (Prices Rise When We Print Cash)</h3>
        <p>In Germany after World War I, money became so worthless that children used blocks of cash as toys, and housewives used money to start fires for cooking. This is an extreme example of <strong>Hyperinflation</strong>.</p>
        <p>The rule of inflation is simple: <strong>when a government prints too much money, the value of the money falls.</strong></p>
        <p>Money is like any other product. If it becomes too common, its value drops. When there is too much money chasing the same amount of goods, sellers raise their prices, and your savings lose their purchasing power.</p>

        <h3>Principle 10: The Short-Run Choice Between Inflation and Unemployment (The Balancing Act)</h3>
        <p>In the short run, governments face a difficult balancing act. Trying to fix one economic problem often makes another one worse.</p>
        <p>If the government injects more money into the economy and lowers interest rates to stimulate business:</p>
        <ol>
          <li>People have more money to spend, so they buy more goods.</li>
          <li>Businesses hire more workers to keep up with the demand (<strong>Unemployment goes down</strong>).</li>
          <li>But because demand is so high, prices go up (<strong>Inflation goes up</strong>).</li>
        </ol>
        <p>If the government tries to stop inflation by raising interest rates, people spend less, businesses lay off workers, and <strong>unemployment goes up</strong>.</p>
        <p>This short-run trade-off creates the <strong>Business Cycle</strong>—the natural ups and downs of the economy that policymakers must constantly navigate.</p>

        <h3>Conclusion: The Lens of Economics</h3>
        <p>These ten principles show us that economics is not just about charts and numbers. It is a set of tools to help us see the invisible threads connecting our world.</p>
        <p>It teaches us that good intentions do not always lead to good results, and that human behavior is guided by the incentives we create. The next time you hold an apple from New Zealand, remember: you are not just holding fruit. You are holding a tiny piece of a beautiful, global system of human cooperation, bound together by the laws of economics.</p>
      `
    }
  };

  readButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const artKey = btn.getAttribute("data-article");
      const data = articlesData[artKey];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalText.innerHTML = data.content;
      modal.classList.add("show");
      document.body.style.overflow = "hidden"; // Prevent background scroll
    });
  });

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
