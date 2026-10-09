/**
 * VBridge Landing Page Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAudioVisualizer();
  initStepTabs();
  initFaqAccordion();
  initQrGenerator();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   NAVBAR & SCROLL SPY
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.header-nav');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   REAL-TIME AUDIO VISUALIZER (Canvas Waveform Simulation)
   -------------------------------------------------------------------------- */
function initAudioVisualizer() {
  const canvas = document.getElementById('audioCanvas');
  const volumeSlider = document.getElementById('mockVolumeSlider');
  const volumeVal = document.getElementById('mockVolumeVal');
  const latencyVal = document.getElementById('mockLatencyVal');
  const bitrateVal = document.getElementById('mockBitrateVal');
  const pcmVal = document.getElementById('mockPcmVal');

  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationId;
  let volume = 0.85;
  let step = 0;

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = (rect.width - 32) * window.devicePixelRatio || 500;
    canvas.height = 90 * window.devicePixelRatio;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  if (volumeSlider && volumeVal) {
    volumeSlider.addEventListener('input', (e) => {
      const v = parseInt(e.target.value);
      volume = v / 100;
      volumeVal.textContent = `${v}%`;
    });
  }

  // Periodic simulated latency & bitrate micro-jitter
  setInterval(() => {
    if (latencyVal) {
      const lat = (3.2 + Math.random() * 0.9).toFixed(1);
      latencyVal.textContent = `${lat} ms`;
    }
    if (bitrateVal) {
      const br = (1534 + Math.floor(Math.random() * 6)).toLocaleString();
      bitrateVal.textContent = `${br} kbps`;
    }
  }, 1200);

  function draw() {
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const numBars = 48;
    const barWidth = width / numBars - 4;
    const centerY = height / 2;

    // Draw center guideline
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    step += 0.05;

    for (let i = 0; i < numBars; i++) {
      // Harmonic wave synthesis for rich audio simulation
      const wave1 = Math.sin(step + i * 0.25);
      const wave2 = Math.cos(step * 1.5 + i * 0.15);
      const wave3 = Math.sin(step * 0.8 + i * 0.4);
      
      let magnitude = Math.abs(wave1 * 0.5 + wave2 * 0.35 + wave3 * 0.25) * volume;
      magnitude = Math.max(0.08, magnitude); // baseline floor

      const barHeight = magnitude * (height * 0.85);
      const x = i * (barWidth + 4);
      const y = centerY - barHeight / 2;

      // Gradient from Moz Cyan to Electric Blue
      const grad = ctx.createLinearGradient(0, y, 0, y + barHeight);
      grad.addColorStop(0, '#00D1FF');
      grad.addColorStop(0.5, '#0088FF');
      grad.addColorStop(1, '#0033AA');

      ctx.fillStyle = grad;
      ctx.beginPath();
      // Rounded bar
      const radius = Math.min(barWidth / 2, 4);
      ctx.roundRect(x, y, barWidth, barHeight, radius);
      ctx.fill();
    }

    animationId = requestAnimationFrame(draw);
  }

  draw();
}

/* --------------------------------------------------------------------------
   INTERACTIVE 3-STEP WALKTHROUGH TABS
   -------------------------------------------------------------------------- */
function initStepTabs() {
  const stepButtons = document.querySelectorAll('.step-tab-btn');
  const previewPanels = document.querySelectorAll('.step-preview-content');

  stepButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const stepTarget = btn.getAttribute('data-step');

      // Update active button
      stepButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update active preview
      previewPanels.forEach(panel => {
        if (panel.getAttribute('data-step-content') === stepTarget) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all
      faqItems.forEach(other => other.classList.remove('active'));

      // Toggle current
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   QR CODE SVG GENERATOR FOR MOBILE APK DOWNLOAD
   -------------------------------------------------------------------------- */
function initQrGenerator() {
  // Generate crisp QR code SVGs using pure mathematical matrix representation
  const qrContainers = document.querySelectorAll('.qr-code-target');
  
  // High-fidelity stylized SVG QR pattern for VBridge APK direct link
  const sampleSvgQr = `
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- QR Finder Top-Left -->
      <rect x="5" y="5" width="28" height="28" rx="4" fill="#001433" />
      <rect x="9" y="9" width="20" height="20" rx="2" fill="#FFFFFF" />
      <rect x="13" y="13" width="12" height="12" rx="2" fill="#0066FF" />

      <!-- QR Finder Top-Right -->
      <rect x="67" y="5" width="28" height="28" rx="4" fill="#001433" />
      <rect x="71" y="9" width="20" height="20" rx="2" fill="#FFFFFF" />
      <rect x="75" y="13" width="12" height="12" rx="2" fill="#0066FF" />

      <!-- QR Finder Bottom-Left -->
      <rect x="5" y="67" width="28" height="28" rx="4" fill="#001433" />
      <rect x="9" y="71" width="20" height="20" rx="2" fill="#FFFFFF" />
      <rect x="13" y="75" width="12" height="12" rx="2" fill="#0066FF" />

      <!-- Data Dots Matrix -->
      <rect x="38" y="8" width="6" height="6" rx="1.5" fill="#001433" />
      <rect x="48" y="8" width="6" height="6" rx="1.5" fill="#00D1FF" />
      <rect x="56" y="14" width="6" height="6" rx="1.5" fill="#001433" />
      
      <rect x="38" y="20" width="6" height="6" rx="1.5" fill="#0066FF" />
      <rect x="48" y="24" width="6" height="6" rx="1.5" fill="#001433" />
      <rect x="56" y="24" width="6" height="6" rx="1.5" fill="#00D1FF" />

      <rect x="8" y="38" width="6" height="6" rx="1.5" fill="#001433" />
      <rect x="18" y="38" width="6" height="6" rx="1.5" fill="#00D1FF" />
      <rect x="28" y="44" width="6" height="6" rx="1.5" fill="#001433" />
      <rect x="38" y="38" width="6" height="6" rx="1.5" fill="#0066FF" />
      <rect x="48" y="38" width="6" height="6" rx="1.5" fill="#001433" />
      <rect x="58" y="38" width="6" height="6" rx="1.5" fill="#0066FF" />
      <rect x="68" y="38" width="6" height="6" rx="1.5" fill="#001433" />
      <rect x="78" y="44" width="6" height="6" rx="1.5" fill="#00D1FF" />
      <rect x="88" y="38" width="6" height="6" rx="1.5" fill="#001433" />

      <rect x="14" y="48" width="6" height="6" rx="1.5" fill="#0066FF" />
      <rect x="24" y="54" width="6" height="6" rx="1.5" fill="#001433" />
      <rect x="38" y="48" width="6" height="6" rx="1.5" fill="#00D1FF" />
      <rect x="48" y="52" width="6" height="6" rx="1.5" fill="#001433" />
      <rect x="58" y="48" width="6" height="6" rx="1.5" fill="#0066FF" />
      <rect x="70" y="54" width="6" height="6" rx="1.5" fill="#001433" />
      <rect x="82" y="48" width="6" height="6" rx="1.5" fill="#0066FF" />

      <rect x="38" y="66" width="6" height="6" rx="1.5" fill="#001433" />
      <rect x="48" y="66" width="6" height="6" rx="1.5" fill="#00D1FF" />
      <rect x="58" y="72" width="6" height="6" rx="1.5" fill="#001433" />
      <rect x="72" y="66" width="6" height="6" rx="1.5" fill="#0066FF" />
      <rect x="84" y="66" width="6" height="6" rx="1.5" fill="#001433" />

      <rect x="38" y="78" width="6" height="6" rx="1.5" fill="#0066FF" />
      <rect x="48" y="82" width="6" height="6" rx="1.5" fill="#001433" />
      <rect x="58" y="82" width="6" height="6" rx="1.5" fill="#00D1FF" />
      <rect x="72" y="78" width="6" height="6" rx="1.5" fill="#001433" />
      <rect x="84" y="84" width="6" height="6" rx="1.5" fill="#0066FF" />

      <!-- Center Logo Accent -->
      <circle cx="50" cy="50" r="10" fill="#001433" stroke="#00D1FF" stroke-width="2" />
      <path d="M46 47L50 54L54 47" stroke="#00D1FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;

  qrContainers.forEach(container => {
    container.innerHTML = sampleSvgQr;
  });
}

/* --------------------------------------------------------------------------
   SMOOTH SCROLL & TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Utility Toast function
window.showToast = function(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#00D1FF;"></i> ${message}`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
};

// Copy link function
window.copyDownloadLink = function(url, label) {
  const fullUrl = window.location.origin + '/' + url;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(fullUrl).then(() => {
      showToast(`Copied ${label} download link to clipboard!`);
    });
  } else {
    showToast(`Download link: ${url}`);
  }
};
