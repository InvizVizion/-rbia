/* RBIA — интерактив портала */
(function () {
  "use strict";

  /* Год в подвале */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Мобильное меню */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      var open = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  /* Подсветка активной ссылки по имени файла */
  var path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) a.classList.add("active");
  });

  /* Аккордеон */
  document.querySelectorAll(".acc-head").forEach(function (head) {
    head.addEventListener("click", function () {
      var item = head.closest(".acc-item");
      var body = item.querySelector(".acc-body");
      var isOpen = item.classList.contains("open");
      if (isOpen) {
        item.classList.remove("open");
        body.style.maxHeight = null;
      } else {
        item.classList.add("open");
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });

  /* Фильтры проектов / секторов */
  document.querySelectorAll("[data-filter-group]").forEach(function (group) {
    var buttons = group.querySelectorAll(".filter-btn");
    var targets = document.querySelectorAll("[data-cat]");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var f = btn.getAttribute("data-filter");
        targets.forEach(function (t) {
          var cats = (t.getAttribute("data-cat") || "").split(" ");
          var show = f === "all" || cats.indexOf(f) !== -1;
          t.style.display = show ? "" : "none";
        });
      });
    });
  });

  /* Появление при прокрутке */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* Форма обратной связи (демо, без бэкенда) */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = form.querySelector(".form-ok");
      if (ok) ok.classList.remove("hidden");
      form.reset();
      if (ok) ok.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
})();
