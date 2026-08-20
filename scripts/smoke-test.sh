#!/usr/bin/env bash
#
# Testa o site JA SERVIDO pelo container, nao os arquivos parados em disco.
# E ai que esta a diferenca: so aqui os cabecalhos de seguranca existem, o
# sistema de arquivos e case-sensitive (Linux) e o 404 devolve status 404.
#
#   docker compose up -d --build
#   bash scripts/smoke-test.sh              # usa http://localhost:8080
#   bash scripts/smoke-test.sh http://host:porta

set -uo pipefail

BASE="${1:-http://localhost:8080}"
ok=0
falhas=0

verde()    { printf '  \033[32mok\033[0m      %s\n' "$1"; ok=$((ok + 1)); }
vermelho() { printf '  \033[31mFALHOU\033[0m  %s\n' "$1"; falhas=$((falhas + 1)); }

status() { curl -s -o /dev/null -w '%{http_code}' "$1"; }

espera_status() {
  local url="$1" esperado="$2" got
  got=$(status "$url")
  if [ "$got" = "$esperado" ]; then
    verde "$url -> $got"
  else
    vermelho "$url -> $got (esperado $esperado)"
  fi
}

espera_header() {
  local url="$1" header="$2" trecho="$3" valor
  valor=$(curl -sI "$url" | tr -d '\r' | grep -i "^${header}:" | cut -d' ' -f2-)
  if [ -z "$valor" ]; then
    vermelho "$header ausente em $url"
  elif [[ "$valor" == *"$trecho"* ]]; then
    verde "$header: $trecho"
  else
    vermelho "$header em $url = '$valor' (esperava conter '$trecho')"
  fi
}

espera_corpo() {
  local url="$1" trecho="$2"
  if curl -s "$url" | grep -qF "$trecho"; then
    verde "$url contem '$trecho'"
  else
    vermelho "$url NAO contem '$trecho'"
  fi
}

echo "Aguardando $BASE ficar de pe..."
for _ in $(seq 1 30); do
  [ "$(status "$BASE/healthz")" = "200" ] && break
  sleep 1
done
if [ "$(status "$BASE/healthz")" != "200" ]; then
  echo "ERRO: $BASE nao respondeu em 30s. O container subiu? (docker compose ps)" >&2
  exit 1
fi

echo
echo "== Todas as paginas respondem 200 =="
# Le a lista do disco: uma pagina nova entra no teste sozinha.
for f in *.html; do
  [ "$f" = "404.html" ] && continue
  espera_status "$BASE/$f" 200
done
espera_status "$BASE/" 200

echo
echo "== Assets e conteudo =="
espera_status "$BASE/css/style.css"           200
espera_status "$BASE/js/main.js"              200
espera_status "$BASE/js/content.js"           200
espera_status "$BASE/content/parceiros.json"  200
espera_status "$BASE/content/galeria.json"    200
espera_status "$BASE/content/site.json"       200
espera_status "$BASE/robots.txt"              200
espera_status "$BASE/sitemap.xml"             200

echo
echo "== Cabecalhos de seguranca (paridade com o .htaccess) =="
espera_header "$BASE/" X-Frame-Options            "DENY"
espera_header "$BASE/" X-Content-Type-Options     "nosniff"
espera_header "$BASE/" Referrer-Policy            "strict-origin-when-cross-origin"
espera_header "$BASE/" Permissions-Policy         "camera=()"
espera_header "$BASE/" Strict-Transport-Security  "max-age=63072000"
espera_header "$BASE/" Content-Security-Policy    "script-src 'self'"
# O cache tem de valer para o CSS sem derrubar os cabecalhos de seguranca
# (o `add_header` dentro de um location descartaria todos eles).
espera_header "$BASE/css/style.css" X-Frame-Options "DENY"

echo
echo "== Pagina 404 =="
espera_status "$BASE/pagina-que-nao-existe" 404
espera_corpo  "$BASE/pagina-que-nao-existe" "Página não encontrada"

echo
echo "== Arquivos que nao podem vazar =="
# Nem .htaccess nem qualquer dotfile podem ser servidos.
for oculto in .htaccess .git/config .nojekyll; do
  got=$(status "$BASE/$oculto")
  if [ "$got" = "403" ] || [ "$got" = "404" ]; then
    verde "/$oculto -> $got (bloqueado)"
  else
    vermelho "/$oculto -> $got (deveria ser 403 ou 404)"
  fi
done

echo
echo "== Nada inline no HTML servido (o CSP bloquearia) =="
for f in *.html; do
  corpo=$(curl -s "$BASE/$f")
  if echo "$corpo" | grep -qE '<script>|style="'; then
    vermelho "$f tem <script> inline ou style= — seria bloqueado pelo CSP"
  else
    verde "$f sem inline"
  fi
done

echo
echo "== Todo link e asset interno resolve no servidor =="
# Esta e a checagem que o Windows nao consegue fazer: o disco local trata
# "Logo.png" e "logo.png" como o mesmo arquivo, o Linux nao. Um link com a
# caixa errada funciona na sua maquina e da 404 na producao.
links=$(
  for f in *.html; do
    curl -s "$BASE/$f"
  done \
    | grep -oE '(href|src)="[^"]+"' \
    | sed -E 's/^(href|src)="//; s/"$//' \
    | sed 's/#.*//' \
    | grep -vE '^(https?:|mailto:|tel:|data:|//|$)' \
    | sort -u
)
for link in $links; do
  espera_status "$BASE/$link" 200
done

echo
echo "-----------------------------------------"
printf '%d passaram, %d falharam\n' "$ok" "$falhas"
[ "$falhas" -eq 0 ] || exit 1
