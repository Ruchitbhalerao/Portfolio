/* ==========================================================================
   main.js — entry point. Wires up every renderer and interaction once the
   document is ready. Classic script, so index.html works from file://
   without a build step or a web server.
   ========================================================================== */
(function () {
  "use strict";

  function boot() {
    var C = window.Components;

    C.renderMetrics();
    C.renderPortrait();
    C.renderCvButtons();
    C.renderAbout();
    C.renderResearchAreas();
    C.renderImpactFlowSteps();
    C.renderResearchImpact();
    C.renderAgenda();
    window.Publications.init();
    C.renderConferences();
    C.renderBooks();
    C.renderProjects();
    C.renderCourses();
    C.renderStudents();
    C.renderAwards();
    C.renderProfiles();

    window.Navigation.init();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
