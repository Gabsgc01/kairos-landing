// Kairos landing — waveform + reveal-on-scroll + live clock
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- build hero waveform bars ----------------------------------------
  var wf = document.querySelector("[data-waveform]");
  if (wf) {
    var heights = [0.35, 0.55, 0.4, 0.7, 0.5, 0.85, 0.6, 1, 0.65, 0.45, 0.75, 0.5, 0.38, 0.6, 0.42];
    var peakIndex = 7;
    heights.forEach(function (h, i) {
      var bar = document.createElement("span");
      bar.style.setProperty("--h", h);
      bar.style.animationDelay = (-1 * (i % 5) * 0.4) + "s";
      if (i === peakIndex) bar.classList.add("is-peak");
      wf.appendChild(bar);
    });
  }

  // ---- reveal-on-scroll --------------------------------------------------
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // ---- fake live clock in hero signal panel ------------------------------
  var clock = document.querySelector("[data-clock]");
  if (clock && !reduceMotion) {
    var totalSeconds = 14 * 60 + 7; // starts at 00:14:07
    setInterval(function () {
      totalSeconds += 1;
      var h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
      var m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
      var s = String(totalSeconds % 60).padStart(2, "0");
      clock.textContent = h + ":" + m + ":" + s;
    }, 1000);
  }
})();
