# O site e 100% estatico: nao ha build step, nenhuma dependencia e compilada.
# A imagem e so nginx + os arquivos, o que mantem a superficie de ataque minima.
#
# nginx-unprivileged: roda como UID 101 (nao-root) e escuta em 8080. A imagem
# oficial `nginx` precisa de root no boot para bindar na porta 80.
FROM nginxinc/nginx-unprivileged:1.29-alpine

LABEL org.opencontainers.image.title="projeto-acolher" \
      org.opencontainers.image.description="Site institucional da Associacao Projeto Acolher" \
      org.opencontainers.image.source="https://github.com/Zero-Kng/projeto-acolher-2"

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Copia explicita: docs (*.md), .htaccess e arquivos de CI nao entram na imagem.
# O glob *.html pega automaticamente qualquer pagina nova.
COPY *.html robots.txt sitemap.xml ./
COPY assets/ ./assets/
COPY content/ ./content/
COPY css/    ./css/
COPY js/     ./js/

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:8080/healthz || exit 1
