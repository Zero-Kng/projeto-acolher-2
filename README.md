# Projeto Acolher — site institucional (versão KingHost)

[![CI](https://github.com/Zero-Kng/projeto-acolher-2/actions/workflows/ci.yml/badge.svg)](https://github.com/Zero-Kng/projeto-acolher-2/actions/workflows/ci.yml)

Site estático (HTML/CSS/JS puro, sem PHP, sem build step) para a Associação Projeto Acolher, pensado para hospedagem compartilhada tradicional (KingHost), sem deploy automático via Git.

**O site publicado não tem nenhuma dependência.** O `package.json` na raiz existe só para as ferramentas de validação usadas em desenvolvimento e no CI (`html-validate`) — `node_modules/` não vai para o servidor, e o navegador do visitante continua não baixando nada de terceiros.

A estrutura de páginas e a arquitetura de conteúdo foram alinhadas com o rascunho já existente em Netlify (`projeto-acolher-rascunho.netlify.app` / pasta local `Projeto-Acolher-Site`), mantendo porém um sistema visual próprio (cores, espaçamento, cards com faixa coral, sombras) — as duas versões têm estruturas de página equivalentes mas identidades visuais levemente diferentes.

## Por que 100% estático

- Sem formulário de contato → sem necessidade de PHP (`mail()`/PHPMailer). Contato é feito direto via WhatsApp, e-mail (`mailto:`) e Instagram.
- Sem painel de edição de conteúdo customizado (sem equivalente ao Decap CMS do rascunho) → menor superfície de ataque. Um painel PHP autenticado próprio, editando arquivos direto no servidor, é risco real se não for construído com rigor. Optamos por não construir isso.
- Parceiros, galeria de fotos e dados de doação são carregados de arquivos JSON em `content/` via JavaScript (`js/content.js`) — dá pra atualizar essas listas editando um `.json` puro por FTP, sem precisar mexer no HTML, sem precisar de login algum.
- Zero fontes/scripts de terceiros carregados (nada de Google Fonts) → nenhuma requisição de visitante sai para fora do próprio domínio.

## Estrutura

```
index.html          Home (hero com carrossel de fotos, estatísticas, história, missão/visão/valores, CTA)
atividades.html      Esportes, educação, cultura, convivência, atendimento às famílias
parceiros.html       Lista de parceiros (carregada de content/parceiros.json)
voluntariado.html    Como ser voluntário(a) — canais diretos, sem formulário
doe.html              Doação via PIX / Mercado Pago (ver pendência abaixo) + transparência
contato.html          WhatsApp, e-mail, Instagram, localização
privacidade.html      Política de Privacidade (LGPD/ECA) — revisar com jurídico antes de publicar
404.html              Página de erro customizada
css/style.css         Design system completo (cores, tipografia, componentes)
js/main.js            Menu mobile + botão "copiar chave PIX"
js/content.js          Busca e renderiza parceiros/galeria/doação a partir dos JSONs (DOM API, nunca innerHTML com dado não confiável — evita XSS)
content/*.json         Dados editáveis direto no arquivo, sem precisar de painel
assets/img/            Logo e fotos
.htaccess               Cabeçalhos de segurança + HTTPS forçado + página 404 customizada (equivalente ao netlify.toml do rascunho, adaptado pra Apache)
robots.txt, sitemap.xml
```

Arquivos de infraestrutura — **nenhum deles vai para o FTP da KingHost**, são ferramenta de desenvolvimento:

```
Dockerfile              Imagem nginx com o site, para rodar local com os cabeçalhos reais
nginx/default.conf      Porte do .htaccess para nginx (ver "Container" abaixo)
docker-compose.yml      docker compose up --build -> http://localhost:8080
.dockerignore
.github/workflows/      Pipeline de validação (não faz deploy)
scripts/smoke-test.sh   Testa o site já servido pelo container
scripts/validate-json.mjs  Valida sintaxe e forma de content/*.json
.htmlvalidate.json      Regras do html-validate
package.json            devDependencies apenas
```

Cada página HTML duplica o cabeçalho (header/nav) e rodapé (footer) — decisão intencional para não depender de include em PHP nem de injeção via JavaScript (que quebraria com `file://` e prejudica SEO). O trade-off é manutenção manual: **qualquer mudança no menu ou no rodapé precisa ser replicada em todos os arquivos `.html`.**

## Paleta de cores (extraída da logo)

| Token CSS | Cor | Uso |
|---|---|---|
| `--color-coral` | `#ED6965` | Botões primários, destaques — sempre com texto escuro em cima |
| `--color-teal-medium` | `#2C6B6D` | Links, textos secundários |
| `--color-teal-dark` | `#1B4041` | Fundos escuros (footer, banner de estatísticas) com texto branco |
| `--color-ink` | `#22303C` | Texto principal |
| `--color-bg` | `#FAF7F2` | Fundo padrão |
| `--color-whatsapp` | `#0F7A40` | Botão flutuante do WhatsApp (verde ajustado para contraste AA — o verde de marca padrão do WhatsApp, `#1FA855`, reprova AA com texto branco) |

Todas as combinações texto/fundo usadas no site foram checadas contra WCAG AA (mínimo 4.5:1 para texto normal, 3:1 para texto grande/bold).

## Container (desenvolvimento) — o que ele é e o que ele não é

```bash
docker compose up --build                 # http://localhost:8080
SITE_PORT=8088 docker compose up --build  # se a 8080 ja estiver ocupada
```

**O container não substitui a KingHost.** Hospedagem compartilhada não roda Docker; a publicação continua sendo FTP e quem serve o site lá continua sendo o `.htaccess`. O container existe por quatro motivos:

1. **Exercitar os cabeçalhos de segurança de verdade.** O Live Server e o `python -m http.server` não aplicam o `.htaccess`, então o CSP nunca era testado localmente — foi exatamente assim que o bug do rodapé (abaixo) ficou meses no ar sem ninguém ver. No container, ele quebra na sua máquina primeiro.
2. **Case-sensitivity.** O Windows trata `Logo.png` e `logo.png` como o mesmo arquivo; o Linux da KingHost, não. Um link com a caixa errada funciona local e dá 404 em produção. O container roda Linux e o smoke test pega isso.
3. **Permite o CI testar o site servido**, não só arquivos parados em disco: status HTTP, cabeçalhos, página 404, links resolvendo.
4. **Portabilidade**, se a ONG um dia sair da KingHost.

O `nginx/default.conf` é um porte 1:1 do `.htaccess`, com duas diferenças deliberadas e comentadas no próprio arquivo: não há redirecionamento HTTPS (não existe TLS dentro do container — isso é papel do proxy na frente) e o HSTS é enviado mesmo assim (navegadores ignoram HSTS fora de HTTPS, então é inofensivo local e já fica correto atrás de TLS).

Uma armadilha do nginx está documentada no arquivo e vale repetir aqui: **um `add_header` dentro de um bloco `location` descarta todos os `add_header` herdados do bloco pai.** É por isso que o cache usa `expires` em vez de `add_header Cache-Control`, e o `/healthz` usa `default_type` em vez de `add_header Content-Type`. O smoke test tem um caso específico para isso (checa se o CSS ainda recebe `X-Frame-Options`).

## CI — o que roda a cada push

O pipeline **não faz deploy**. A publicação continua manual (ver `DEPLOY.md`). Ele só responde "esse commit quebrou alguma coisa?".

`.github/workflows/ci.yml`, três jobs em paralelo:

| Job | O que checa | Por que importa |
|---|---|---|
| **HTML e JSON** | `html-validate` em todos os `.html` + sintaxe e forma de `content/*.json` | A regra `no-inline-style` barra `style=` e `<script>` inline, que o CSP bloqueia silenciosamente em produção. A validação de JSON pega a vírgula sobrando que derruba a lista de parceiros. |
| **Links internos** | `lychee --offline` | Link para página que não existe. Offline de propósito: nunca fica vermelho porque um site de terceiro caiu. |
| **Container + smoke test** | Builda a imagem, sobe, e testa o site servido | Toda página responde 200, os 6 cabeçalhos de segurança estão lá, URL inexistente devolve **status** 404 (e não 200 com cara de erro), `.htaccess` e dotfiles não vazam, nenhum HTML servido tem inline, e todo asset interno resolve num filesystem case-sensitive. |

`.github/workflows/links-externos.yml` roda **semanalmente** (segunda, 06:00 de Brasília) e sob demanda. Links externos ficam fora do CI de push de propósito: se o site de um parceiro cair, o problema é real, mas não é do seu commit — não faz sentido bloquear seu trabalho por isso. Instagram e `wa.me` são excluídos porque respondem 401/403 para qualquer coisa que não seja um navegador de verdade; confira esses dois à mão quando mexer no rodapé.

Para rodar o mesmo que o CI roda, localmente:

```bash
npm ci
npm run validate                        # HTML + JSON
SITE_PORT=8088 docker compose up -d --build
bash scripts/smoke-test.sh http://localhost:8088
```

O `smoke-test.sh` aceita a URL base como argumento; sem argumento assume `http://localhost:8080`.

## Bug encontrado e corrigido durante o desenvolvimento

**CSP versus HTML inline (corrigido).** O `.htaccess` define `script-src 'self'; style-src 'self'` sem `'unsafe-inline'` — postura correta contra XSS. Mas as 8 páginas tinham um `<script>` inline (o que preenchia o ano no rodapé) e 16 atributos `style=`. Todos eram **bloqueados pelo navegador em produção**: o ano aparecia em branco no rodapé de todas as páginas do site no ar. Não dava pra ver localmente porque nenhum servidor de desenvolvimento aplica o `.htaccess`. Corrigido movendo o script do ano para `js/main.js` e os estilos inline para classes (`.cta-light`, `.mb-0`, `.measure`, `.measure-wide`). A regra `no-inline-style` do `html-validate` agora barra a reincidência no CI.

O padrão `<botão hidden>` combinado com uma classe que define `display: inline-flex` faz o atributo `hidden` ser ignorado (o CSS do autor sobrepõe o `display: none` padrão do navegador). Isso afetava o botão "Doar pelo Mercado Pago" — ele aparecia clicável mesmo sem link configurado. Corrigido com uma regra global `[hidden] { display: none !important; }`. Vale checar se o rascunho Netlify tem o mesmo problema, já que usa exatamente o mesmo padrão.

## Pendências conhecidas

1. **Logo em baixa resolução.** O arquivo atual (`assets/img/logo.png`) é 150×150px — vai borrar em telas retina/HiDPI acima desse tamanho. Trocar por versão vetorial (SVG) ou PNG maior (500px+) assim que disponível.
2. **Chave PIX e link de pagamento.** `content/site.json` tem um placeholder (`SUBSTITUIR_PELA_CHAVE_PIX_OFICIAL`). A página `doe.html` já mostra isso de forma transparente ("chave em configuração pela equipe, fale pelo WhatsApp por enquanto") em vez de esconder o problema — decisão explícita sua nesta sessão. Trocar pela chave oficial e/ou link do Mercado Pago assim que a ONG definir.
3. **Domínio.** `acolhendo.org.br` já está no ar com o site antigo. Antes de publicar esta versão em produção, confirmar com quem administra o DNS qual host (Netlify ou KingHost) fica no domínio principal, ou decidir por subdomínios diferentes. `robots.txt`, `sitemap.xml` e as tags `canonical` (se forem adicionadas) assumem `acolhendo.org.br` — atualizar se o domínio final for outro.
4. **Política de Privacidade.** Modelo inicial baseado em LGPD/ECA, adaptado do rascunho Netlify. Não é aconselhamento jurídico — revisar com advogado antes de publicar.
5. **Hierarquia de títulos (9 avisos no CI).** O `html-validate` aponta títulos que pulam nível — `<h1>` seguido direto de `<h3>` nos cards, e `<h4>` no rodapé depois de um `<h2>`. É uma falha real de WCAG 1.3.1: leitor de tela usa a hierarquia para navegar. Está como **aviso**, não erro, porque a correção envolve decisão visual, não só semântica: promover os `<h3>` dos cards para `<h2>` deixaria os títulos visivelmente maiores, a menos que se adicione `.card h2 { font-size: clamp(1.2rem, 2vw, 1.5rem); }` para manter a aparência. O caminho sugerido: cards `<h3>` → `<h2>` com essa compensação no CSS, rodapé `<h4>` → `<h2>` (com `.footer-grid h2` herdando o estilo atual de `.footer-grid h4`), e em `privacidade.html` as seções numeradas `<h3>` → `<h2>`. Quando isso for feito, subir as regras `heading-level` e `long-title` de volta para `"error"` em `.htmlvalidate.json`.
6. **Title da home tem 91 caracteres** (limite recomendado: 70). O Google trunca por volta de 60. Encurtar é decisão de SEO/conteúdo — por isso está como aviso, não erro.

## Fotos usadas

5 fotos reais das atividades (mesmo conjunto já usado com consentimento confirmado na versão Netlify, conforme confirmado pelo usuário). Todas foram reprocessadas nesta sessão: metadados EXIF/GPS checados (nenhum encontrado nos arquivos originais) e a imagem foi resalva do zero via Pillow para garantir que nenhum metadado residual permaneça no arquivo publicado. Aparecem no carrossel do hero da Home (`content/galeria.json`).

Número de crianças atendidas (450+) confirmado pelo usuário nesta sessão como o valor correto oficial da ONG.

## Deploy

Ver `DEPLOY.md`.
