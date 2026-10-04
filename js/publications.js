/* ==========================================================================
   publications.js — port of the former <Publications> component.
   Keeps the type tab filter and the free-text search, with the same
   filtering / sorting behaviour (Array.prototype.sort is stable, so entries
   sharing a year keep their original order).
   ========================================================================== */
(function (global) {
  "use strict";

  var D = global.SITE_DATA;
  var esc = global.Components.esc;

  function init() {
    var filtersEl = document.getElementById("pub-filters");
    var searchEl = document.getElementById("pub-search");
    var listEl = document.getElementById("pub-list");
    if (!filtersEl || !listEl) return;

    var state = { filter: "All", q: "" };

    /* Filter tabs */
    filtersEl.innerHTML = D.FILTERS.map(function (f) {
      return (
        '<button type="button" role="tab" class="filter-btn" data-filter="' +
        esc(f) +
        '" aria-selected="' +
        (state.filter === f ? "true" : "false") +
        '">' +
        esc(f) +
        "</button>"
      );
    }).join("");

    filtersEl.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-filter]");
      if (!btn) return;
      state.filter = btn.getAttribute("data-filter");
      Array.prototype.forEach.call(filtersEl.querySelectorAll("[data-filter]"), function (b) {
        b.setAttribute("aria-selected", b === btn ? "true" : "false");
      });
      draw();
    });

    /* Search box */
    if (searchEl) {
      searchEl.addEventListener("input", function () {
        state.q = searchEl.value;
        draw();
      });
    }

    function draw() {
      var t = state.q.toLowerCase();

      var list = D.publications
        .filter(function (p) {
          return state.filter === "All" || p.type === state.filter;
        })
        .filter(function (p) {
          return !t || [p.title, p.authors, p.venue].join(" ").toLowerCase().indexOf(t) !== -1;
        })
        .sort(function (a, b) {
          return b.year - a.year;
        });

      if (list.length === 0) {
        listEl.innerHTML =
          '<li class="pub-empty">No publications match. More entries will be added.</li>';
        return;
      }

      listEl.innerHTML = list.map(renderItem).join("");
    }

    draw();
  }

  function renderItem(p) {
    var authors = p.authors ? '<p class="pub-authors">' + esc(p.authors) + "</p>" : "";
    var venue = "";

    if (p.venue) {
      venue =
        '<p class="pub-venue">' +
        esc(p.venue) +
        (p.volume ? ", " + esc(p.volume) : "") +
        (p.pages ? ", " + esc(p.pages) : "") +
        "</p>";
    }

    var doi = p.doi
      ? '<a class="pub-doi" href="https://doi.org/' +
        esc(p.doi) +
        '" target="_blank" rel="noreferrer">DOI: ' +
        esc(p.doi) +
        "</a>"
      : "";

    return (
      '<li class="pub-item">' +
      '<span class="pub-year">' +
      esc(p.year) +
      "</span>" +
      "<div>" +
      '<h3 class="pub-title">' +
      esc(p.title) +
      "</h3>" +
      authors +
      venue +
      doi +
      "</div>" +
      '<span class="eyebrow gold pub-type">' +
      esc(p.type) +
      "</span>" +
      "</li>"
    );
  }

  global.Publications = { init: init };
})(window);
