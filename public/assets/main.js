// Keyora tanıtım sayfası — kaydırma efektleri ve video sesi. Dış istek yok.
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    // Üst çubuk: kaydırınca cam zemin
    var bar = document.querySelector(".topbar");
    function onScroll() { if (bar) bar.classList.toggle("scrolled", window.scrollY > 12); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Kaydırınca belirme
    var items = document.querySelectorAll(".reveal, .questions li");
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.18, rootMargin: "0px 0px -40px 0px" });
      items.forEach(function (el) { io.observe(el); });
    }

    // Video: hareket azaltma açıksa otomatik oynatma yok, tarayıcının kendi kontrolleri görünür
    var video = document.getElementById("promo");
    var sound = document.getElementById("sound");
    var toggle = document.getElementById("playpause");
    var stage = video && video.closest(".stage");
    function play() { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
    function setPaused(paused) {
      if (!toggle) return;
      toggle.dataset.state = paused ? "paused" : "playing";
      toggle.setAttribute("aria-label", paused ? toggle.dataset.play : toggle.dataset.pause);
      if (stage) stage.classList.toggle("paused", paused);
    }
    if (video) {
      if (reduce) {
        video.removeAttribute("autoplay");
        video.pause();
        video.controls = true;
        if (sound) sound.hidden = true;
        if (toggle) toggle.hidden = true;
      }
      video.addEventListener("play", function () { setPaused(false); });
      video.addEventListener("pause", function () { setPaused(true); });
      // Tarayıcı otomatik oynatmayı engellerse "pause" olayı gelmez; durumu yüklenince eşitle
      video.addEventListener("loadeddata", function () { setPaused(video.paused); });
      setTimeout(function () { setPaused(video.paused); }, 1500);
      if (toggle) {
        toggle.addEventListener("click", function () {
          if (video.paused) play(); else video.pause();
        });
      }
      if (sound) {
        // Etiket sabit ("Ses"); açık/kapalı durumu aria-pressed ile bildirilir
        sound.addEventListener("click", function () {
          var on = sound.getAttribute("aria-pressed") !== "true";
          video.muted = !on;
          if (on) { video.currentTime = 0; play(); }
          sound.setAttribute("aria-pressed", on ? "true" : "false");
        });
      }
    }
  });
})();
