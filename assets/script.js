/* ============================================================
   Divisorial Geometry Network — shared behavior
   Injects header/footer, wires nav + dark mode toggle.
   ============================================================ */

(function () {
  var LOGO = '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 20 C 14 20, 14 44, 22 44" /><path d="M6 44 C 14 44, 14 20, 22 20" /><circle cx="14" cy="32" r="1.8" fill="currentColor" stroke="none" /><path d="M27 32 H 37" /><path d="M33 28 L 37 32 L 33 36" /><line x1="42" y1="14" x2="42" y2="50" stroke-dasharray="3 3" opacity="0.55" /><path d="M42 20 C 50 20, 50 44, 58 44" /><circle cx="42" cy="20" r="1.8" fill="currentColor" stroke="none" /><circle cx="42" cy="44" r="1.8" fill="currentColor" stroke="none" /></g></svg>';

  var PAGES = [
    { href: "index.html", label: "Home" },
    { href: "members.html", label: "Members" },
    { href: "publications.html", label: "Publications" },
    { href: "seminars.html", label: "Seminars" },
    { href: "institutions.html", label: "Institutions" }
  ];

  function currentFile() {
    var path = window.location.pathname.split("/").pop();
    return path === "" ? "index.html" : path;
  }

  function buildHeader() {
    var current = currentFile();
    var links = PAGES.map(function (p) {
      var current_attr = p.href === current ? ' aria-current="page"' : "";
      return '<li><a href="' + p.href + '"' + current_attr + ">" + p.label + "</a></li>";
    }).join("");

    return (
      '<a class="skip-link" href="#main">Skip to content</a>' +
      '<header class="site-header">' +
      '<nav class="nav">' +
      '<a class="brand" href="index.html">' + LOGO +
      '<span><span class="brand-word-primary">Divisorial Geometry</span>' +
      '<span class="brand-word-secondary">Network</span></span></a>' +
      '<button class="nav-toggle" id="navToggle" aria-label="Toggle navigation" aria-expanded="false">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
      "</button>" +
      '<ul class="nav-links" id="navLinks">' + links + "</ul>" +
      '<button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">' +
      '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>' +
      '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.6A9 9 0 1 1 11.4 3 7 7 0 0 0 21 12.6Z"/></svg>' +
      "</button>" +
      "</nav>" +
      "</header>"
    );
  }

  function buildFooter() {
    var links = PAGES.map(function (p) {
      return '<li><a href="' + p.href + '">' + p.label + "</a></li>";
    }).join("");

    return (
      '<footer class="site-footer">' +
      '<div class="footer-inner">' +
      '<div class="footer-brand">' + LOGO + "<span>Divisorial Geometry Network</span></div>" +
      '<ul class="footer-links">' + links + "</ul>" +
      "</div>" +
      '<div class="footer-bottom container">' +
      "<span>Divisorial Geometry Network &bull; Brazil</span>" +
      '<span>Contact: <a href="mailto:njunior@icmc.usp.br">njunior@icmc.usp.br</a></span>' +
      "</div>" +
      "</footer>"
    );
  }

  function initTheme() {
    var stored = localStorage.getItem("dgn-theme");
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = stored || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  }

  function wireTheme() {
    var btn = document.getElementById("themeToggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      var next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("dgn-theme", next);
    });
  }

  function wireNavToggle() {
    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    var headerMount = document.getElementById("site-header");
    var footerMount = document.getElementById("site-footer");
    if (headerMount) headerMount.outerHTML = buildHeader();
    if (footerMount) footerMount.outerHTML = buildFooter();
    wireTheme();
    wireNavToggle();
  });
})();
