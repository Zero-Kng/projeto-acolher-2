(function () {
  "use strict";

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function fetchJSON(path) {
    return fetch(path, { cache: "no-store" }).then(function (res) {
      if (!res.ok) throw new Error("Falha ao carregar " + path);
      return res.json();
    });
  }

  function renderPartners() {
    var container = document.querySelector("[data-partners]");
    if (!container) return;
    fetchJSON("content/parceiros.json").then(function (data) {
      container.innerHTML = "";
      (data.partners || []).forEach(function (p) {
        var item = el("li");
        if (p.url) {
          var link = el("a", null, p.name);
          link.href = p.url;
          link.rel = "noopener noreferrer";
          link.target = "_blank";
          item.appendChild(link);
        } else {
          item.textContent = p.name;
        }
        container.appendChild(item);
      });
      if (!data.partners || !data.partners.length) {
        container.appendChild(el("li", "content-loading", "Nenhum parceiro cadastrado no momento."));
      }
    }).catch(function () {
      container.innerHTML = "";
      container.appendChild(el("li", "content-loading", "Não foi possível carregar a lista de parceiros agora. Tente novamente mais tarde."));
    });
  }

  function renderDonation() {
    var pixEl = document.querySelector("[data-pix-key]");
    var pixTypeEl = document.querySelector("[data-pix-type]");
    var mpLink = document.querySelector("[data-mp-link]");
    if (!pixEl && !mpLink) return;
    fetchJSON("content/site.json").then(function (data) {
      var donation = data.donation || {};
      if (pixEl) {
        var key = donation.pixKey || "";
        var placeholder = !key || key.indexOf("SUBSTITUIR") === 0;
        pixEl.textContent = placeholder ? "Chave PIX ainda em configuração pela equipe. Fale conosco pelo WhatsApp para doar por enquanto." : key;
      }
      if (pixTypeEl && donation.pixKeyType) {
        pixTypeEl.textContent = "Tipo de chave: " + donation.pixKeyType;
      }
      if (mpLink) {
        if (donation.mercadoPagoUrl) {
          mpLink.href = donation.mercadoPagoUrl;
          mpLink.hidden = false;
        } else {
          mpLink.hidden = true;
        }
      }
    }).catch(function () {
      if (pixEl) pixEl.textContent = "Não foi possível carregar os dados de doação agora.";
    });
  }

  function renderGallery() {
    var root = document.querySelector("[data-carousel]");
    if (!root) return;
    var track = root.querySelector("[data-carousel-track]");
    var prevBtn = root.querySelector("[data-carousel-prev]");
    var nextBtn = root.querySelector("[data-carousel-next]");
    var dotsWrap = root.querySelector("[data-carousel-dots]");

    fetchJSON("content/galeria.json").then(function (data) {
      var photos = (data.photos || []).filter(function (p) { return p && p.src; });
      if (!photos.length) return;

      track.innerHTML = "";
      dotsWrap.innerHTML = "";
      var dots = [];
      var index = 0;

      photos.forEach(function (photo, i) {
        var slide = el("div", "carousel-slide");
        var img = document.createElement("img");
        img.src = photo.src;
        img.alt = photo.alt || "";
        img.loading = i === 0 ? "eager" : "lazy";
        img.decoding = "async";
        slide.appendChild(img);
        track.appendChild(slide);

        var dot = el("button", "carousel-dot");
        dot.type = "button";
        dot.setAttribute("aria-label", "Ir para foto " + (i + 1));
        dot.addEventListener("click", function () { goTo(i); });
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
        index = (i + photos.length) % photos.length;
        update();
      }

      if (photos.length > 1) {
        prevBtn.hidden = false;
        nextBtn.hidden = false;
        dotsWrap.hidden = false;
        prevBtn.addEventListener("click", function () { goTo(index - 1); });
        nextBtn.addEventListener("click", function () { goTo(index + 1); });
        root.setAttribute("tabindex", "0");
        root.addEventListener("keydown", function (e) {
          if (e.key === "ArrowLeft") goTo(index - 1);
          if (e.key === "ArrowRight") goTo(index + 1);
        });
      }

      update();
    }).catch(function () {
      /* mantem o placeholder padrao em caso de falha */
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderPartners();
    renderDonation();
    renderGallery();
  });
})();
