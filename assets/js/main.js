// Hey Consumer Lab — shared site behavior

(function () {
  var toggle = document.querySelector(".nav-toggle");
  var body = document.body;

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

  // Publications filter (only present on publications.html)
  var filters = document.querySelectorAll(".pub-filter");
  var pubItems = document.querySelectorAll(".pub-item");
  var filterNote = document.querySelector(".pub-filter-note");
  var filterNoteKeyword = document.querySelector(".pub-filter-note .keyword");
  var filterReset = document.querySelector(".pub-filter-reset");

  function applyFilter(topic) {
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

    if (filterNote) {
      if (topic === "all") {
        filterNote.classList.remove("is-active");
      } else {
        filterNote.classList.add("is-active");
        if (filterNoteKeyword) {
          var activeBtn = document.querySelector('.pub-filter[data-filter="' + topic + '"]');
          filterNoteKeyword.textContent = activeBtn ? activeBtn.textContent : topic;
        }
      }
    }
  }

  if (filters.length && pubItems.length) {
    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filters.forEach(function (b) {
          b.classList.remove("is-active");
        });
        btn.classList.add("is-active");
        applyFilter(btn.getAttribute("data-filter"));
      });
    });

    if (filterReset) {
      filterReset.addEventListener("click", function (e) {
        e.preventDefault();
        filters.forEach(function (b) {
          b.classList.remove("is-active");
        });
        applyFilter("all");
      });
    }
  }
})();
