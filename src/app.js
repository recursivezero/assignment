(function () {
  "use strict";

  const quoteInput   = document.getElementById("quoteInput");
  const authorInput  = document.getElementById("authorInput");
  const canvasEl     = document.getElementById("wallpaperCanvas");
  const canvasQuote  = document.getElementById("canvasQuote");
  const canvasAuthor = document.getElementById("canvasAuthor");
  const downloadBtn  = document.getElementById("downloadBtn");
  const randomBtn    = document.getElementById("randomQuoteBtn");

  const state = {
    bg:     "gradient-dusk",
    layout: "centered",
    font:   "playfair",
    size:   "16x9",
    decor:  "line",
  };

  const SIZES = {
    "16x9": { w: 1920, h: 1080 },
    "9x16": { w: 1080, h: 1920 },
    "1x1":  { w: 1080, h: 1080 },
    "4x3":  { w: 1440, h: 1080 },
  };

  function applyClasses() {
    canvasEl.className = [
      "wallpaper-canvas",
      state.bg,
      "layout-" + state.layout,
      "font-"   + state.font,
      state.size !== "16x9" ? "size-" + state.size : "",
      "decor-"  + state.decor,
    ].filter(Boolean).join(" ");
  }

  function updatePreview() {
    canvasQuote.textContent  = quoteInput.value.trim()  || "Enter a quote…";
    canvasAuthor.textContent = authorInput.value.trim() || "";
  }

  function bindGroup(containerId, stateKey) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.querySelectorAll("[data-" + stateKey + "]").forEach(btn => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".active").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state[stateKey] = btn.dataset[stateKey];
        applyClasses();
      });
    });
  }

  function download() {
    const { w } = SIZES[state.size] || SIZES["16x9"];
    const scale = w / canvasEl.offsetWidth;

    downloadBtn.textContent = "Preparing…";
    downloadBtn.disabled = true;

    html2canvas(canvasEl, {
      scale,
      useCORS:    true,
      allowTaint: true,
      logging:    false,
      width:      canvasEl.offsetWidth,
      height:     canvasEl.offsetHeight,
    })
      .then(canvas => {
        const link     = document.createElement("a");
        const slug     = quoteInput.value.trim().slice(0, 30).replace(/\s+/g, "-").toLowerCase();
        link.download  = "quotepaper-" + (slug || "wallpaper") + ".png";
        link.href      = canvas.toDataURL("image/png");
        link.click();
      })
      .catch(() => alert("Download failed. Please try again."))
      .finally(() => {
        downloadBtn.innerHTML = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 2v8M5 7l3 3 3-3"/><path d="M3 12h10"/></svg> Download';
        downloadBtn.disabled = false;
      });
  }

  function loadRandom() {
    const q = getRandomQuote(quoteInput.value.trim());
    quoteInput.value  = q.text;
    authorInput.value = "— " + q.author;
    updatePreview();
  }

  function init() {
    applyClasses();

    quoteInput.addEventListener("input",  updatePreview);
    authorInput.addEventListener("input", updatePreview);

    bindGroup("bgOptions",     "bg");
    bindGroup("layoutOptions", "layout");
    bindGroup("fontOptions",   "font");
    bindGroup("sizeOptions",   "size");
    bindGroup("decorOptions",  "decor");

    downloadBtn.addEventListener("click", download);
    randomBtn.addEventListener("click",   loadRandom);

    document.addEventListener("keydown", e => {
      if ((e.ctrlKey || e.metaKey) && e.key === "d") {
        e.preventDefault();
        download();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
