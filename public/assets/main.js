// Keyora tanıtım sayfası — adres çubuğu yazımı, video düğmeleri, tur ekranı. Dış istek yok.
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    // Adres çubuğu: yol harf harf yazılır (sayfanın tek gösterişli anı). HTML'de yol zaten tam;
    // betik yoksa ya da hareket azaltma açıksa olduğu gibi görünür.
    var path = document.querySelector("[data-type] .path");
    if (path && !reduce) {
      var parts = [];
      (function walk(node, wrap) {
        node.childNodes.forEach(function (n) {
          if (n.nodeType === 3) parts.push({ text: n.textContent, wrap: wrap });
          else walk(n, n);
        });
      })(path, null);
      var html = path.innerHTML;
      path.textContent = "";
      var caret = document.createElement("span");
      caret.className = "caret";
      caret.setAttribute("aria-hidden", "true");
      // yazılırken ekran okuyucu tam yolu okur, yarım metni değil
      var sr = document.createElement("span");
      sr.className = "sr";
      sr.textContent = parts.map(function (p) { return p.text; }).join("");
      path.parentNode.insertBefore(sr, path);
      path.setAttribute("aria-hidden", "true");
      var i = 0, j = 0, target = null;
      var done = function () { path.innerHTML = html; path.removeAttribute("aria-hidden"); sr.remove(); };
      var tick = function () {
        if (i >= parts.length) { path.appendChild(caret); setTimeout(function () { caret.remove(); done(); }, 1400); return; }
        var p = parts[i];
        if (j === 0) {
          if (p.wrap) { target = p.wrap.cloneNode(false); path.appendChild(target); }
          else { target = document.createTextNode(""); path.appendChild(target); }
        }
        var ch = p.text.charAt(j);
        target.textContent += ch;
        path.appendChild(caret);
        j++;
        if (j >= p.text.length) { i++; j = 0; }
        setTimeout(tick, ch === "\\" ? 90 : 38);
      };
      setTimeout(tick, 450);
    }

    // Video: hareket azaltma açıksa otomatik oynatma yok, tarayıcının kendi kontrolleri görünür
    var video = document.getElementById("promo");
    var sound = document.getElementById("sound");
    var toggle = document.getElementById("playpause");
    function play() { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
    function setPaused(paused) {
      if (!toggle) return;
      toggle.setAttribute("data-state", paused ? "paused" : "playing");
      toggle.setAttribute("aria-label", toggle.getAttribute(paused ? "data-play" : "data-pause"));
    }
    if (video) {
      if (reduce) {
        video.removeAttribute("autoplay");
        video.pause();
        video.controls = true;
        if (toggle) toggle.hidden = true;
        if (sound) sound.hidden = true;
      }
      video.addEventListener("play", function () { setPaused(false); });
      video.addEventListener("pause", function () { setPaused(true); });
      video.addEventListener("loadeddata", function () { setPaused(video.paused); });
      if (toggle) toggle.addEventListener("click", function () { if (video.paused) play(); else video.pause(); });
      if (sound) sound.addEventListener("click", function () {
        var on = sound.getAttribute("aria-pressed") !== "true";
        video.muted = !on;
        sound.setAttribute("aria-pressed", on ? "true" : "false");
        if (on) { video.currentTime = 0; play(); }
      });
    }

    // Tur: ortaya gelen adımın ekranı sağdaki pencerede gösterilir (yalnızca geniş ekranda görünür)
    var steps = document.querySelectorAll(".step[data-pane]");
    var panes = document.querySelectorAll(".pane");
    if (steps.length && panes.length && "IntersectionObserver" in window) {
      var show = function (step) {
        steps.forEach(function (s) { s.classList.toggle("on", s === step); });
        var n = +step.getAttribute("data-pane");
        panes.forEach(function (p, k) { p.classList.toggle("on", k === n); });
      };
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) show(e.target); });
      }, { rootMargin: "-45% 0px -45% 0px" });
      steps.forEach(function (s) { io.observe(s); });
    }
  });
})();
