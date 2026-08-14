# Projeto Acolher — site institucional (versão KingHost)

Site estático (HTML/CSS/JS puro, sem PHP, sem build step, sem dependências externas) para a Associação Projeto Acolher, pensado para hospedagem compartilhada tradicional (KingHost), sem deploy automático via Git.

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

## Bug encontrado e corrigido durante o desenvolvimento

O padrão `<botão hidden>` combinado com uma classe que define `display: inline-flex` faz o atributo `hidden` ser ignorado (o CSS do autor sobrepõe o `display: none` padrão do navegador). Isso afetava o botão "Doar pelo Mercado Pago" — ele aparecia clicável mesmo sem link configurado. Corrigido com uma regra global `[hidden] { display: none !important; }`. Vale checar se o rascunho Netlify tem o mesmo problema, já que usa exatamente o mesmo padrão.

## Pendências conhecidas

1. **Logo em baixa resolução.** O arquivo atual (`assets/img/logo.png`) é 150×150px — vai borrar em telas retina/HiDPI acima desse tamanho. Trocar por versão vetorial (SVG) ou PNG maior (500px+) assim que disponível.
2. **Chave PIX e link de pagamento.** `content/site.json` tem um placeholder (`SUBSTITUIR_PELA_CHAVE_PIX_OFICIAL`). A página `doe.html` já mostra isso de forma transparente ("chave em configuração pela equipe, fale pelo WhatsApp por enquanto") em vez de esconder o problema — decisão explícita sua nesta sessão. Trocar pela chave oficial e/ou link do Mercado Pago assim que a ONG definir.
3. **Domínio.** `acolhendo.org.br` já está no ar com o site antigo. Antes de publicar esta versão em produção, confirmar com quem administra o DNS qual host (Netlify ou KingHost) fica no domínio principal, ou decidir por subdomínios diferentes. `robots.txt`, `sitemap.xml` e as tags `canonical` (se forem adicionadas) assumem `acolhendo.org.br` — atualizar se o domínio final for outro.
4. **Política de Privacidade.** Modelo inicial baseado em LGPD/ECA, adaptado do rascunho Netlify. Não é aconselhamento jurídico — revisar com advogado antes de publicar.

## Fotos usadas

5 fotos reais das atividades (mesmo conjunto já usado com consentimento confirmado na versão Netlify, conforme confirmado pelo usuário). Todas foram reprocessadas nesta sessão: metadados EXIF/GPS checados (nenhum encontrado nos arquivos originais) e a imagem foi resalva do zero via Pillow para garantir que nenhum metadado residual permaneça no arquivo publicado. Aparecem no carrossel do hero da Home (`content/galeria.json`).

Número de crianças atendidas (450+) confirmado pelo usuário nesta sessão como o valor correto oficial da ONG.

## Deploy

Ver `DEPLOY.md`.
