# Siwat Teimtad — Economist & Data Analyst Portfolio

A minimalist, modern portfolio website built for **Siwat Teimtad** (Economist & Data Analyst), styled with a high-contrast dark theme, a customized Matrix code rain background, and a copywriting layout inspired by Dan Koe.

Live Site: [https://taesiwat.github.io/siwat/](https://taesiwat.github.io/siwat/)

---

## 🎨 Key Features & Design Details

* **Dan Koe Aesthetic**: A clean, centered typography grid with high-impact copywriting, strong visual hierarchy, and breathing room for maximum content clarity.
* **Custom Matrix Digital Rain**: An HTML5 Canvas-based background animation displaying falling columns of numbers, letters, mathematical operators ($\Delta$, $\Sigma$, $\beta$, $\lambda$), and financial/currency signs ($, €, ¥, ฿).
* **Selected Blog Deep Dives**:
  * **The Economic Pulse (Thailand Macroeconomic Dashboard)**: An interactive visualizer powered by **Chart.js** displaying Thailand's YoY GDP Growth, Headline Inflation (CPI), and Bank of Thailand Policy Interest Rate trend lines.
  * **Simulating Commodity Markets (Jasmine Rice Price Forecaster)**: An interactive econometric model allowing readers to slide variables (Global Demand Factor, Climate Yield Impact, Fertilizer Cost Index) and run simulated 12-month Jasmine Rice export price projections in real-time.
* **Clean Code Stack**: 
  * Written in semantic HTML5, vanilla CSS3 variables, and vanilla Javascript.
  * Typography powered by `JetBrains Mono` from Google Fonts.
  * Vector symbols powered by FontAwesome.

---

## 📂 Project Structure

```text
dataxbysiwat/
├── index.html        # Main webpage layout (Hero, Blog, Contact, Footer)
├── index.css         # Styling system (Variables, Animations, Responsive layouts)
├── script.js         # Interactive components (Chart.js dashboard, simulator logic, Matrix rain)
├── README.md         # Project documentation (this file)
├── st_logo.png       # Header branding logo asset
└── boat.jpg          # Cover image for the Everyday Economics article
```

---

## 💻 Running the Project Locally

No build steps are required. You can preview the page locally using a static web server:

**Using Python:**
```bash
python -m http.server 8000
```
Open your browser and navigate to `http://localhost:8000`.

---

## 🚀 Deployment to GitHub Pages

To deploy updates, commit your changes and push to the GitHub repository:

1. **Add and commit your changes**:
   ```bash
   git add .
   git commit -m "Your update message"
   ```
2. **Push to GitHub**:
   ```bash
   git push origin main
   ```
3. GitHub Actions will compile and host the files automatically on the configured branch.
