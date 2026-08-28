// Hey Consumer Lab — shared site behavior

(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var body = document.body;

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 12) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = body.classList.toggle("menu-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        body.classList.remove("menu-open");
        toggle.classList.remove("is-open");
      });
    });
  }

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // Publications filter (only present on publications.html)
  var filters = document.querySelectorAll(".pub-filter");
  var pubItems = document.querySelectorAll(".pub-item");
  if (filters.length && pubItems.length) {
    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filters.forEach(function (b) {
          b.classList.remove("is-active");
        });
        btn.classList.add("is-active");
        var topic = btn.getAttribute("data-filter");

        pubItems.forEach(function (item) {
          var topics = (item.getAttribute("data-topics") || "").split(",");
          var show = topic === "all" || topics.indexOf(topic) !== -1;
          item.style.display = show ? "" : "none";
        });

        document.querySelectorAll(".pub-year").forEach(function (yearEl) {
          var next = yearEl.nextElementSibling;
          var hasVisible = false;
          while (next && !next.classList.contains("pub-year")) {
            if (next.classList.contains("pub-item") && next.style.display !== "none") {
              hasVisible = true;
            }
            next = next.nextElementSibling;
          }
          yearEl.style.display = hasVisible ? "" : "none";
        });
      });
    });
  }
})();
