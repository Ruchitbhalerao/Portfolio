/* ==========================================================================
   navigation.js — the header menu toggle.
   ========================================================================== */
(function (global) {
  "use strict";

  function init() {
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.getElementById("mnav");
    if (!toggle || !menu) return;

    var LABEL_OPEN = toggle.getAttribute("data-label-open") || "Menu";
    var LABEL_CLOSE = toggle.getAttribute("data-label-close") || "Close";

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? LABEL_CLOSE : LABEL_OPEN;
      menu.hidden = !open;
    }

    setOpen(false);

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    /* Selecting a link closes the panel. */
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    /* Keyboard affordance for the disclosure button. */
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  global.Navigation = { init: init };
})(window);
