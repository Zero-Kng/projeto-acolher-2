document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  document.querySelectorAll("[data-copy-target]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = document.querySelector(btn.getAttribute("data-copy-target"));
      if (!target) return;
      var text = target.textContent.trim();
      navigator.clipboard.writeText(text).then(function () {
        var original = btn.textContent;
        btn.textContent = "Copiado!";
        setTimeout(function () { btn.textContent = original; }, 2000);
      }).catch(function () {
        window.prompt("Copie a chave PIX:", text);
      });
    });
  });

  (function initStatCarousel() {
    var root = document.querySelector("[data-stat-carousel]");
    if (!root) return;
    var track = root.querySelector("[data-stat-track]");
    var dotsWrap = root.querySelector("[data-stat-dots]");
    if (!track || !dotsWrap) return;
    var slides = track.querySelectorAll(".stat-slide");
    if (slides.length < 2) return;

    var index = 0;
    var dots = [];
    var timer = null;

    slides.forEach(function (slide, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "stat-dot";
      dot.setAttribute("aria-label", "Ir para estatística " + (i + 1));
      dot.addEventListener("click", function () {
        goTo(i);
        start();
      });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });

    function update() {
      track.style.transform = "translateX(-" + (index * 100) + "%)";
      dots.forEach(function (d, i) {
        if (i === index) {
          d.setAttribute("aria-current", "true");
        } else {
          d.removeAttribute("aria-current");
        }
      });
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      update();
    }

    function next() {
      goTo(index + 1);
    }

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    function start() {
      stop();
      timer = setInterval(next, 4000);
    }

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);

    update();
    start();
  })();
});
