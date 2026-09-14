(function () {
  "use strict";

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  // Icone de link externo desenhado como SVG. O piso de qualidade do projeto
  // nao aceita glifo Unicode no lugar de um sistema de icones, e este arquivo
  // nunca usa innerHTML — por isso e montado pela DOM API.
  function externalIcon() {
    var NS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2.2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    var path = document.createElementNS(NS, "path");
    path.setAttribute("d", "M8 16 16 8M9 8h7v7");
    svg.appendChild(path);
    return svg;
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
          var link = el("a");
          link.href = p.url;
          link.rel = "noopener noreferrer";
          link.target = "_blank";
          link.appendChild(el("span", null, p.name));
          link.appendChild(externalIcon());
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

  // ---------------------------------------------------------------------
  // Galeria das paginas de atividade (grade quadrada, formato de perfil)
  // ---------------------------------------------------------------------

  function icone(d) {
    var NS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2.2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    var path = document.createElementNS(NS, "path");
    path.setAttribute("d", d);
    svg.appendChild(path);
    return svg;
  }

  function botao(classe, rotulo, d, aoClicar) {
    var b = el("button", "lightbox-btn " + classe);
    b.type = "button";
    b.setAttribute("aria-label", rotulo);
    b.appendChild(icone(d));
    b.addEventListener("click", aoClicar);
    return b;
  }

  // Monta a ampliacao uma unica vez, sob demanda, e a reaproveita.
  function criarAmpliacao(fotos) {
    var indice = 0;
    var origem = null;

    var caixa = el("div", "lightbox");
    caixa.setAttribute("role", "dialog");
    caixa.setAttribute("aria-modal", "true");
    caixa.setAttribute("aria-label", "Foto ampliada");
    caixa.hidden = true;

    var contador = el("p", "lightbox-contador");
    var figura = document.createElement("figure");
    var img = document.createElement("img");
    var legenda = document.createElement("figcaption");
    figura.appendChild(img);
    figura.appendChild(legenda);

    function mostrar(i) {
      indice = (i + fotos.length) % fotos.length;
      var f = fotos[indice];
      img.src = f.src;
      img.alt = f.alt || "";
      legenda.textContent = f.alt || "";
      contador.textContent = (indice + 1) + " de " + fotos.length;
    }

    function fechar() {
      caixa.hidden = true;
      document.body.style.removeProperty("overflow");
      if (origem) origem.focus();
    }

    var fechaBtn = botao("lightbox-close", "Fechar foto ampliada", "M6 6l12 12M18 6L6 18", fechar);
    var prevBtn = botao("lightbox-prev", "Foto anterior", "M15 5l-7 7 7 7", function () { mostrar(indice - 1); });
    var nextBtn = botao("lightbox-next", "Próxima foto", "M9 5l7 7-7 7", function () { mostrar(indice + 1); });

    caixa.appendChild(contador);
    caixa.appendChild(fechaBtn);
    if (fotos.length > 1) {
      caixa.appendChild(prevBtn);
      caixa.appendChild(nextBtn);
    }
    caixa.appendChild(figura);

    // Clique no fundo fecha; clique na propria foto, nao.
    caixa.addEventListener("click", function (e) {
      if (e.target === caixa) fechar();
    });

    document.addEventListener("keydown", function (e) {
      if (caixa.hidden) return;
      if (e.key === "Escape") fechar();
      if (fotos.length > 1 && e.key === "ArrowLeft") mostrar(indice - 1);
      if (fotos.length > 1 && e.key === "ArrowRight") mostrar(indice + 1);
    });

    document.body.appendChild(caixa);

    return function abrir(i, gatilho) {
      origem = gatilho || null;
      mostrar(i);
      caixa.hidden = false;
      document.body.style.setProperty("overflow", "hidden");
      fechaBtn.focus();
    };
  }

  function renderGalerias() {
    var grade = document.querySelector("[data-galeria]");
    if (!grade) return;
    var secao = grade.getAttribute("data-galeria");
    var bloco = grade.closest("[data-galeria-secao]");

    fetchJSON("content/galerias.json").then(function (data) {
      var fotos = (data[secao] || []).filter(function (f) { return f && f.src; });
      if (!fotos.length) return; // secao continua oculta: melhor que uma grade vazia

      var abrir = criarAmpliacao(fotos);
      grade.innerHTML = "";

      fotos.forEach(function (foto, i) {
        var item = el("li");
        var link = el("a", "gallery-item");
        link.href = foto.src;
        link.setAttribute("aria-label", "Ampliar foto: " + (foto.alt || "foto " + (i + 1)));
        var img = document.createElement("img");
        img.src = foto.src;
        img.alt = foto.alt || "";
        img.loading = i < 6 ? "eager" : "lazy";
        img.decoding = "async";
        link.appendChild(img);
        // Sem JavaScript o link abre a foto direto; com JavaScript, amplia.
        link.addEventListener("click", function (e) {
          e.preventDefault();
          abrir(i, link);
        });
        item.appendChild(link);
        grade.appendChild(item);
      });

      if (bloco) bloco.hidden = false;
    }).catch(function (err) {
      // A secao continua oculta para o visitante — melhor que uma grade vazia.
      // Mas o erro vai para o console: um catch mudo esconde defeito de codigo
      // tao bem quanto esconde falha de rede.
      if (window.console && console.error) {
        console.error("Galeria \"" + secao + "\" nao pode ser montada:", err);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderPartners();
    renderDonation();
    renderGallery();
    renderGalerias();
  });
})();
