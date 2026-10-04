/* ==========================================================================
   components.js — vanilla renderers for every data-driven region of the page.
   Each function replaces the original component's `.map()` output with
   equivalent markup built from SITE_DATA.
   ========================================================================== */
(function (global) {
  "use strict";

  var D = global.SITE_DATA;

  /* --- helpers ------------------------------------------------------------- */

  function esc(value) {
    if (value === null || value === undefined) return "";
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* Mirrors String.prototype.padStart(2, "0") used by the original index. */
  function pad2(n) {
    var s = String(n);
    return s.length < 2 ? "0" + s : s;
  }

  function setHTML(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
    return el;
  }

  /* --- hero --------------------------------------------------------------- */

  function renderMetrics() {
    setHTML(
      "metrics-grid",
      D.metrics
        .map(function (m) {
          return (
            '<div class="metric-cell">' +
            '<dt class="metric-label">' +
            esc(m.label) +
            "</dt>" +
            '<dd class="metric-value">' +
            esc(m.value) +
            "</dd>" +
            '<dd class="metric-source">Source: ' +
            esc(m.source) +
            "</dd>" +
            "</div>"
          );
        })
        .join(""),
    );
  }

  /* Replaces the dashed placeholder tile with the real portrait. */
  function renderPortrait() {
    var P = D.professorProfile;
    if (!P.portraitUrl) return;
    var holder = document.getElementById("portrait");
    if (!holder) return;
    var img = document.createElement("img");
    img.className = "portrait-img";
    img.src = P.portraitUrl;
    img.alt = "Portrait of " + P.name;
    img.width = 301;
    img.height = 402;
    img.decoding = "async";
    img.fetchPriority = "high";
    holder.parentNode.replaceChild(img, holder);
  }

  /* cvUrl is null in the data; keep both CTA slots in sync. */
  function renderCvButtons() {
    var P = D.professorProfile;
    var buttons = document.querySelectorAll("[data-cv]");
    Array.prototype.forEach.call(buttons, function (el) {
      if (P.cvUrl) {
        var link = document.createElement("a");
        link.href = P.cvUrl;
        link.className = "btn-cv is-primary";
        link.setAttribute("download", "");
        link.textContent = "Download CV";
        el.parentNode.replaceChild(link, el);
      }
    });
  }

  /* --- about -------------------------------------------------------------- */

  function renderAbout() {
    var P = D.professorProfile;

    /* The bio paragraphs are inserted as the first children of .about-bio so
       the `space-y-5` rhythm and the drop cap keep matching the original. */
    var bio = document.getElementById("bio-list");
    if (bio) {
      bio.insertAdjacentHTML(
        "afterbegin",
        P.bio
          .map(function (b, i) {
            return '<p class="' + (i === 0 ? "dropcap" : "") + '">' + esc(b) + "</p>";
          })
          .join(""),
      );
    }

    setHTML(
      "methodology-value",
      esc(P.methodology.join(" + ")),
    );

    setHTML(
      "lifecycle-list",
      P.lifecycle.map(function (x) {
        return '<li class="chip">' + esc(x) + "</li>";
      }).join(""),
    );

    setHTML(
      "themes-list",
      P.themes
        .map(function (x) {
          return '<li><span class="theme-mark">§</span>' + esc(x) + "</li>";
        })
        .join(""),
    );
  }

  /* --- research ----------------------------------------------------------- */

  function renderResearchAreas() {
    setHTML(
      "research-grid",
      D.researchAreas
        .map(function (r, i) {
          return (
            '<article class="research-card">' +
            '<span class="research-index" aria-hidden="true">' +
            pad2(i + 1) +
            "</span>" +
            "<h3>" +
            esc(r.title) +
            "</h3>" +
            "<p>" +
            esc(r.text) +
            "</p>" +
            "</article>"
          );
        })
        .join(""),
    );
  }

  /* Former <ImpactFlow> component: staggered reveal on scroll. */
  function renderImpactFlowSteps() {
    var el = setHTML(
      "ecosystem-flow",
      D.ecosystem
        .map(function (s, i) {
          var arrow = i < D.ecosystem.length - 1 ? '<span class="flow-arrow" aria-hidden="true">⟶</span>' : "";
          return (
            '<li class="flow-step" style="--flow-delay:' +
            i * 140 +
            'ms"><span class="flow-chip">' +
            esc(s) +
            "</span>" +
            arrow +
            "</li>"
          );
        })
        .join(""),
    );

    if (!el) return;

    var reveal = function () {
      el.classList.add("flow-visible");
    };

    if (typeof global.IntersectionObserver !== "function") {
      reveal();
      return;
    }

    var io = new global.IntersectionObserver(
      function (entries) {
        if (entries[0] && entries[0].isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    io.observe(el);
  }

  function renderResearchImpact() {
    setHTML(
      "impact-grid",
      D.impactFlow
        .map(function (s, i) {
          return (
            '<li class="impact-item">' +
            '<span class="impact-index">' +
            pad2(i + 1) +
            "</span>" +
            "<p>" +
            esc(s) +
            "</p>" +
            "</li>"
          );
        })
        .join(""),
    );
  }

  /* --- agenda ------------------------------------------------------------- */

  function renderAgenda() {
    setHTML(
      "agenda-list",
      D.agenda
        .map(function (a, i) {
          return (
            '<li class="agenda-item">' +
            '<span class="agenda-index" aria-hidden="true">' +
            pad2(i + 1) +
            "</span>" +
            '<span class="agenda-text">' +
            esc(a) +
            "</span>" +
            "</li>"
          );
        })
        .join(""),
    );
  }

  /* --- conferences -------------------------------------------------------- */

  function renderConferences() {
    var list = document.getElementById("conf-list");
    var toggle = document.getElementById("conf-toggle");
    if (!list) return;

    var showAll = false;

    function draw() {
      var visible = showAll ? D.conferences : D.conferences.slice(0, 6);

      list.innerHTML = visible
        .map(function (c) {
          var meta = c.year + (c.venue ? " · " + esc(c.venue) : "");
          return (
            '<li class="conf-item">' +
            '<span class="conf-dot" aria-hidden="true"></span>' +
            '<p class="conf-meta">' +
            meta +
            "</p>" +
            '<p class="conf-title">' +
            esc(c.title) +
            "</p>" +
            "</li>"
          );
        })
        .join("");

      if (toggle) {
        toggle.setAttribute("aria-expanded", showAll ? "true" : "false");
        toggle.textContent = showAll
          ? "Show fewer"
          : "Show all " + D.conferences.length + " contributions";
      }
    }

    if (toggle) {
      toggle.addEventListener("click", function () {
        showAll = !showAll;
        draw();
      });
    }

    draw();
  }

  /* --- books & educational resources -------------------------------------- */

  function renderBooks() {
    setHTML(
      "books-list",
      D.books
        .map(function (b) {
          return (
            "<li>" +
            '<p class="book-title">' +
            esc(b.title) +
            "</p>" +
            '<p class="book-year">' +
            esc(b.year) +
            "</p>" +
            "</li>"
          );
        })
        .join(""),
    );

    setHTML(
      "edu-list",
      D.educationalPackages
        .map(function (e) {
          return (
            '<li class="edu-item"><span>' +
            esc(e.title) +
            '</span><span class="edu-year">' +
            esc(e.year) +
            "</span></li>"
          );
        })
        .join(""),
    );
  }

  /* --- projects ----------------------------------------------------------- */

  function renderProjects() {
    setHTML(
      "project-pi",
      D.projects.pi
        .map(function (p) {
          return '<li class="project-card">' + esc(p) + "</li>";
        })
        .join(""),
    );

    /* Co-PI entries are appended as direct children of the column, next to the
       eyebrow, exactly like the original <p> mapping. */
    var col = document.getElementById("project-copi-col");
    if (col) {
      col.insertAdjacentHTML(
        "beforeend",
        D.projects.coPi
          .map(function (p) {
            return '<p class="copi-card">' + esc(p) + "</p>";
          })
          .join(""),
      );
    }
  }

  /* --- teaching ----------------------------------------------------------- */

  function renderCourses() {
    setHTML(
      "course-list",
      D.courses
        .map(function (c) {
          var platform = c.platform ? '<p class="eyebrow course-platform">' + esc(c.platform) + "</p>" : "";
          return '<li class="course-card"><h3>' + esc(c.title) + "</h3>" + platform + "</li>";
        })
        .join(""),
    );
  }

  /* --- students ----------------------------------------------------------- */

  function renderStudents() {
    setHTML(
      "student-list",
      D.students
        .map(function (s) {
          var thesis = s.thesis
            ? '<p class="student-thesis">“' +
              esc(s.thesis) +
              '”' +
              (s.year ? ' <span class="student-year">· ' + esc(s.year) + "</span>" : "") +
              "</p>"
            : "";
          return (
            '<li class="student-card">' +
            "<h3>" +
            esc(s.name) +
            "</h3>" +
            '<p class="student-area">' +
            esc(s.area !== undefined ? s.area : D.TBU) +
            "</p>" +
            thesis +
            "</li>"
          );
        })
        .join(""),
    );
  }

  /* --- awards ------------------------------------------------------------- */

  function renderAwards() {
    setHTML(
      "award-list",
      D.awards
        .map(function (a) {
          return (
            '<li class="award-item">' +
            '<span class="award-diamond" aria-hidden="true"></span>' +
            '<span class="award-text">' +
            esc(a) +
            "</span>" +
            "</li>"
          );
        })
        .join(""),
    );
  }

  /* --- academic profiles -------------------------------------------------- */

  function renderProfiles() {
    setHTML(
      "profile-list",
      D.academicProfiles
        .map(function (p) {
          /* The label stays a bare text node, with the arrow as a sibling span. */
          var inner =
            esc(p.label) +
            (p.url ? '<span class="profile-arrow">↗</span>' : '<span class="note">To be updated</span>');

          var body = p.url
            ? '<a class="profile-link" href="' +
              esc(p.url) +
              '" target="_blank" rel="noreferrer">' +
              inner +
              "</a>"
            : '<span class="profile-disabled" aria-disabled="true">' + inner + "</span>";

          return "<li>" + body + "</li>";
        })
        .join(""),
    );
  }

  global.Components = {
    esc: esc,
    pad2: pad2,
    renderMetrics: renderMetrics,
    renderPortrait: renderPortrait,
    renderCvButtons: renderCvButtons,
    renderAbout: renderAbout,
    renderResearchAreas: renderResearchAreas,
    renderImpactFlowSteps: renderImpactFlowSteps,
    renderResearchImpact: renderResearchImpact,
    renderAgenda: renderAgenda,
    renderConferences: renderConferences,
    renderBooks: renderBooks,
    renderProjects: renderProjects,
    renderCourses: renderCourses,
    renderStudents: renderStudents,
    renderAwards: renderAwards,
    renderProfiles: renderProfiles,
  };
})(window);
