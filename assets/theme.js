// Tema düğmesi: sistem temasını izler, seçim yalnızca bu tarayıcıda hatırlanır.
(function () {
  var root = document.documentElement;
  var KEY = "keyora-theme";

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function store(value) {
    try { localStorage.setItem(KEY, value); } catch (e) { /* gizli pencere vb. */ }
  }
  function current() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  var saved = stored();
  if (saved === "dark" || saved === "light") root.setAttribute("data-theme", saved);

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    function label() {
      var dark = current() === "dark";
      btn.textContent = dark ? "☀" : "☾";
      btn.setAttribute("aria-label", dark ? btn.dataset.light : btn.dataset.dark);
      btn.title = btn.getAttribute("aria-label");
    }
    label();
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      store(next);
      label();
    });
  });
})();
