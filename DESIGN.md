---
name: Associação Projeto Acolher
description: Convenção de ONG executada com acabamento inquestionável — cor de marca em campos chapados, tipografia de sistema levada a sério.
colors:
  coral: "#ED6965"
  coral-hover: "#F07D79"
  coral-press: "#D8524E"
  coral-deep: "#A8332F"
  teal-light: "#85CBCD"
  teal-medium: "#2C6B6D"
  teal-dark: "#1B4041"
  teal-press: "#123031"
  teal-tint: "#E4F2F2"
  teal-tint-border: "#C4E0E0"
  ink: "#22303C"
  ink-soft: "#3C5257"
  on-coral: "#1D2A34"
  on-dark: "#FFFFFF"
  on-dark-soft: "#B7D2D2"
  control-border: "#5F7476"
  rule: "#DCD5CB"
  rule-strong: "#BDB4A7"
  cream: "#FAF7F2"
  white: "#FFFFFF"
  whatsapp: "#0F7A40"
typography:
  display:
    fontFamily: "-apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.15rem, 1.5rem + 3.2vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.03
    letterSpacing: "-0.032em"
  headline:
    fontFamily: "-apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.6rem, 1.3rem + 1.5vw, 2.6rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.022em"
  title:
    fontFamily: "-apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.25rem, 1.12rem + 0.6vw, 1.6rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.012em"
  lead:
    fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "-apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1rem, 0.97rem + 0.15vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontSize: "clamp(0.8125rem, 0.79rem + 0.11vw, 0.875rem)"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.08em"
  stat:
    fontSize: "clamp(2rem, 4.5vw, 3.4rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.035em"
    fontFeature: "tabular-nums"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.95rem"
rounded:
  sm: "6px"
  md: "12px"
  lg: "20px"
  full: "999px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2.5rem"
  xl: "4rem"
  section-y: "clamp(3.5rem, 7.5vw, 6.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.on-coral}"
    rounded: "{rounded.full}"
    padding: "0.9rem 1.75rem"
  button-primary-hover:
    backgroundColor: "{colors.coral-hover}"
    textColor: "{colors.on-coral}"
  button-secondary:
    backgroundColor: "{colors.teal-dark}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.full}"
    padding: "0.9rem 1.75rem"
  button-secondary-hover:
    backgroundColor: "{colors.teal-press}"
    textColor: "{colors.on-dark}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.teal-dark}"
    rounded: "{rounded.full}"
    padding: "0.9rem 1.75rem"
  button-outline-hover:
    backgroundColor: "{colors.teal-tint}"
    textColor: "{colors.teal-dark}"
  nav-cta:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.on-coral}"
    rounded: "{rounded.full}"
    padding: "0.5rem 1.1rem"
  copy-button:
    backgroundColor: "{colors.teal-medium}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.full}"
    padding: "0.6rem 1.25rem"
  card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "1.5rem"
  card-accent-teal:
    backgroundColor: "{colors.teal-tint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "1.5rem"
  card-tag:
    backgroundColor: "{colors.white}"
    textColor: "{colors.teal-dark}"
    rounded: "{rounded.full}"
    padding: "0.2rem 0.7rem"
  pix-key:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    typography: "{typography.mono}"
    rounded: "{rounded.sm}"
    padding: "1rem"
  cta-panel:
    backgroundColor: "{colors.teal-tint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "clamp(2rem, 5vw, 3.5rem) 1.5rem"
  stat-band:
    backgroundColor: "{colors.teal-dark}"
    textColor: "{colors.on-dark}"
    padding: "clamp(2rem, 4vw, 3rem) 0"
  footer:
    backgroundColor: "{colors.teal-dark}"
    textColor: "{colors.on-dark-soft}"
    padding: "4rem 0 1.5rem"
  whatsapp-pill:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.full}"
    padding: "0.8rem 1.25rem"
---

# Design System: Associação Projeto Acolher

## Overview

**Creative North Star: "A Convenção, Executada"**

O site adota, por decisão permanente registrada em PRODUCT.md, a arquitetura convencional de uma página de doação de ONG — herói com texto à esquerda e fotografia à direita, faixa de números, grade de cards, CTA, rodapé escuro. O que distingue este sistema não é o arranjo: é o acabamento. Cada valor de cor vem amostrado por pixel da logo existente, cada passo de tipo tem salto real, cada limite de componente tem contraste medido. A convenção é a escolha; a execução é a propriedade da superfície.

A densidade é institucional e tranquila: campos grandes de cor sólida, filetes finos, medida de leitura travada, respiro vertical fluido (`--section-y`, 56–104px). A profundidade vem de sobreposição de campos chapados — creme como chão da página, branco como campo elevado, teal escuro como âncora. Não há gradiente em nenhum lugar do sistema, não há vidro, não há sombra colorida. Duas sombras existem e são reservadas ao que está de fato flutuando acima da página.

A voz tipográfica é a pilha de fontes do sistema operacional. Isto é limitação declarada, não preferência: PRODUCT.md fixa zero requisições a terceiros e não existe arquivo de fonte auto-hospedado no repositório. A compensação foi feita na métrica — peso 800 no topo, tracking negativo, escala que chega a 64/41/25px com salto real entre níveis, `text-wrap: balance` e medida presa em 65ch.

**Key Characteristics:**
- Cor por cargo fixo, nunca por decoração: coral é ação e só ação.
- Campos chapados e sobrepostos; zero gradiente, zero sombra tintada.
- Escala tipográfica fluida de sistema, com salto real entre níveis.
- Contraste medido como requisito vinculante (WCAG 2.1 AA), inclusive em limite de componente (1.4.11).
- Um único momento de movimento autorado, a partir de um estado já visível.
- Superfícies do navegador (seleção, caret, scrollbar, foco) tematizadas de propósito.

## Colors

Paleta herdada, não autorada: coral, teais, ink e creme foram amostrados por pixel direto de `assets/img/logo.png` e são compromisso de marca registrado em PRODUCT.md. Nenhuma rodada futura re-litiga esses valores; o que se discute é onde cada um pode aparecer.

### Primary
- **Coral de Acolhimento** (`{colors.coral}`): ação, exclusivamente. Botão primário, CTA do menu, filete de hover/foco do card clicável, sublinhado de link no rodapé. Nenhuma superfície decorativa recebe coral.
- **Coral Pressionado** (`{colors.coral-press}`): a borda de 2px do botão primário e do CTA do menu — a ação tem contorno próprio, não flutua sobre o creme.
- **Coral Profundo** (`{colors.coral-deep}`): o anel de foco visível (3px, offset 3px) e o traço dos ícones de seta. É o coral levado a contraste suficiente sobre creme e branco.

### Secondary
- **Teal Institucional** (`{colors.teal-dark}`): âncora de superfície. Faixa de números, rodapé, botão secundário, títulos de card. Onde o site precisa parecer sólido, o campo fica teal escuro.
- **Teal de Ligação** (`{colors.teal-medium}`): relação e navegação. Cor de link no corpo do texto, botão de copiar a chave PIX, caret, polegar da scrollbar, `accent-color`.
- **Teal Lavado** (`{colors.teal-tint}`) e sua borda (`{colors.teal-tint-border}`): campo do painel de CTA e dos cards do segundo grupo de atividades. A distinção entre grupos é o campo, não uma barra de cor na borda.
- **Teal Claro** (`{colors.teal-light}`): decorativo por restrição de contraste (PRODUCT.md). Aparece apenas como fundo de `::selection`, com tinta teal escuro.

### Neutral
- **Creme da Marca** (`{colors.cream}`): o chão da página e o fundo do header fixo.
- **Branco** (`{colors.white}`): o campo elevado — cards, caixas de doação, seções `.section-alt`. Em seção branca a relação inverte e o card volta ao creme.
- **Ink** (`{colors.ink}`) e **Ink Suave** (`{colors.ink-soft}`): texto principal e texto secundário. O secundário é tinto de teal, nunca cinza neutro.
- **Filete** (`{colors.rule}`) e **Filete Forte** (`{colors.rule-strong}`): divisores e bordas de card sobre claro; o forte só no campo da chave PIX.
- **Tinta sobre Escuro** (`{colors.on-dark}` / `{colors.on-dark-soft}`): texto e texto secundário nos campos teal escuro; divisores lá são `rgba(255,255,255,0.16)`.

### Derived for contrast
- **Ink sobre Coral** (`{colors.on-coral}`): existe porque o ink da marca sobre o coral da marca mede 4.38:1 — abaixo do mínimo de 4.5:1 para texto normal. Este derivado dá 4.75:1 em repouso e 5.52:1 sobre o coral clareado do hover. É indistinguível a olho e não é negociável.
- **Borda de Controle** (`{colors.control-border}`): existe porque WCAG 1.4.11 exige 3:1 para o limite de um componente. Tinto de teal, 4.63:1 sobre o creme. Usada no contorno do botão outline e do botão de menu.

### Named Rules
**The Fixed Post Rule.** Toda cor tem um cargo e só um: coral é ação, teal escuro é âncora de superfície, teal médio é ligação, creme é chão, branco é campo elevado. Cor nunca é escolhida por gosto no ponto de uso.

**The One Coral Target Rule.** Um alvo coral dominante por viewport. O CTA do menu é coral por compromisso de marca, mas fica subordinado em tamanho e peso ao botão do herói; a ação de segunda ordem recua para contorno.

**The Measured Ink Rule.** Nenhum par texto/fundo entra no sistema sem medição contra 4.5:1 (texto normal) e 3:1 (texto grande ou limite de componente). Contraste vence marca — inclusive marca de terceiro, como o verde do WhatsApp ajustado para `{colors.whatsapp}`.

## Typography

**Display Font:** pilha de sistema (`-apple-system`, Segoe UI, Roboto, Helvetica Neue, Arial)
**Body Font:** a mesma pilha de sistema
**Label/Mono Font:** `ui-monospace`, SFMono-Regular, Menlo, Consolas — apenas para a chave PIX

**Character:** uma voz neutra de sistema, levada a sério pela métrica em vez do desenho da letra. O peso 800 e o tracking negativo no topo da escala compram a presença que um display face traria; a medida travada e o `text-wrap: balance` compram a compostura.

**Limitação conhecida, registrada:** a ausência de um display face é consequência de duas travas de produto (zero requisições a terceiros; nenhum arquivo de fonte auto-hospedado no repositório), não uma escolha estética. Qualquer fonte futura precisa ser servida do próprio domínio.

### Hierarchy
- **Display** (800, `{typography.display.fontSize}` — 34→64px, line-height 1.03, tracking -0.032em): apenas o `h1` de cada página. No herói, limitado a 14ch para forçar quebra em duas linhas.
- **Headline** (800, 25.6→41.6px, 1.1, -0.022em): `h2` de seção.
- **Title** (700, 20→25.6px, 1.2, -0.012em): `h3` e os `h2` compensados de card, caixa de doação e seções numeradas da política.
- **Lead** (400, 17→20px, 1.55, ink suave): parágrafo de abertura do herói (44ch) e subtítulo de `.section-header` (65ch).
- **Body** (400, 16→17px, 1.65): corpo geral; `0.975rem` dentro de card.
- **Label** (700, 13→14px, tracking 0.08em, caixa alta): títulos de coluna do rodapé e etiquetas de contagem.
- **Stat** (800, 32→54px, line-height 1, tracking -0.035em, `tabular-nums`): os quatro números da faixa de impacto. Numeral tabular para que as colunas não dancem.

### Named Rules
**The Document-Level Split Rule.** Nível de documento e escala visual são coisas diferentes, e a divergência aqui é deliberada: títulos de card e de caixa de doação são `h2` por semântica WCAG 1.3.1 e renderizam na escala de título via `.card h2` / `.donate-box h2`; títulos de rodapé são `h2` renderizando o tratamento caixa-alta do antigo `h4` via `.footer-grid h2`; as seções numeradas de `privacidade.html` são `h2` na escala de seção via `.container-narrow > h2`. Quem editar precisa saber que a compensação existe, ou vai "consertar" de volta.

**The Locked Measure Rule.** Texto corrido nunca passa de 65ch (68ch em `.measure-wide`). A medida pertence ao parágrafo, não ao bloco — presa no bloco, o título deixa de respirar.

**The Air Above Rule.** Mais espaço acima de um título do que abaixo dele (`* + h2` = 4rem, `* + h3` = 2.5rem).

## Layout

Contêiner único de 1140px com 24px de padding lateral, centralizado. Ritmo vertical na escala 0.5 / 1 / 1.5 / 2.5 / 4rem; o respiro de seção é fluido em `clamp(3.5rem, 7.5vw, 6.5rem)`, e a primeira seção de página interna recua para `clamp(2rem, 4vw, 3.5rem)` para que os cards alcancem o primeiro viewport.

O herói é uma grade de duas colunas 1.05fr / 0.95fr com gap fluido de 32–72px. Grades de card são `auto-fit` com mínimo de 250px (240px na lista de parceiros) e gap de 24px; a faixa de números é uma grade fixa de 4 colunas.

Três pontos de quebra, todos `max-width`: **900px** colapsa o herói para coluna única e move a fotografia para antes do texto com `order: -1` e `aspect-ratio: 16/9` — público majoritariamente mobile com vinte segundos de paciência, e a foto não pode empurrar "Quero doar" abaixo da dobra de um 375×667. **860px** troca o menu horizontal pelo menu empilhado com botão "Menu" e colapsa o rodapé para coluna única. **760px** reduz a faixa de números a duas colunas e remove o filete das células ímpares.

## Elevation & Depth

Profundidade por sobreposição de campos chapados, não por sombra. O creme é o chão; o branco (e o creme de volta, dentro de seção branca) é o campo elevado; o teal escuro e o teal lavado são campos que assumem regiões inteiras. Card é campo com filete de 1px, nunca caixa flutuante. Não existe gradiente em nenhum ponto do sistema.

Duas sombras existem, ambas com deslocamento e desfoque reais e deliberadamente neutras (`rgba(16,16,16,…)` em vez de tintas de marca), reservadas ao que está genuinamente levantado acima da página.

### Shadow Vocabulary
- **Levantado leve** (`box-shadow: 0 1px 2px rgba(16,16,16,0.07), 0 4px 12px rgba(16,16,16,0.08)`): a seta do carrossel, que flutua sobre a fotografia.
- **Flutuante fixo** (`box-shadow: 0 4px 10px rgba(16,16,16,0.12), 0 14px 34px rgba(16,16,16,0.16)`): a pílula fixa do WhatsApp, o único elemento permanentemente fora do fluxo.

### Named Rules
**The Flat Field Rule.** Superfície nova = campo chapado com filete, não sombra. Sombra só para elemento que sai do fluxo do documento (posicionado `absolute` ou `fixed`).

**The Neutral Shadow Rule.** Sombra é neutra e nunca tintada de marca. Sem gradiente, sem vidro, sem sombra colorida, sem deslocamento duro sem desfoque.

## Shapes

Três raios em uso e um raio pleno. Painéis grandes e a moldura da fotografia usam 20px; cards, caixas de doação e itens de parceiro usam 12px; campos de dado e o anel de foco usam 6px. Tudo que é ação ou etiqueta é pílula plena (999px): botões, CTA do menu, etiquetas de contagem, botão de copiar, pílula do WhatsApp, pontos do carrossel.

A linguagem de borda é filete de 1px em superfície e 2px em ação. Botões carregam borda própria (2px em coral pressionado no primário; borda de controle no outline) para que o alvo tenha limite medido, não apenas preenchimento. Ícones são SVG inline com traço de 2.5px, `currentColor`, 15–20px — nunca fonte de ícone, nunca glifo de texto.

## Components

### Buttons
- **Shape:** pílula plena (999px), borda de 2px, `inline-flex` com gap de 8px para o ícone.
- **Primary:** campo coral com tinta derivada (`{components.button-primary}`), peso 800, 17px, padding 0.9rem 1.75rem. Hover clareia para `{colors.coral-hover}` mantendo a tinta.
- **Secondary:** campo teal escuro com tinta branca; hover aprofunda para `{colors.teal-press}`.
- **Outline:** ação de segunda ordem — transparente, tinta teal escuro, borda `{colors.control-border}` (3:1 garantido), peso 700. Hover preenche com teal lavado. Nunca disputa com o coral.
- **Focus:** contorno de 3px em `{colors.coral-deep}` com offset de 3px e raio de 6px; sobre campos escuros (rodapé, faixa de números, skip link) o anel troca para `{colors.coral}`.

### Chips
- **Style:** etiqueta de contagem em pílula branca com filete, tinta teal escuro, 13–14px peso 700, numeral tabular.
- **State:** estática e informativa; não há variante selecionada. Em card de modalidade, ancora na base (`margin-top: auto`) para que a linha inteira alinhe as etiquetas.

### Cards / Containers
- **Corner Style:** 12px.
- **Background:** branco sobre creme; creme sobre seção branca; teal lavado na variante de acento.
- **Shadow Strategy:** nenhuma. Ver Elevation & Depth.
- **Border:** filete de 1px `{colors.rule}` (a variante lavada usa `{colors.teal-tint-border}`).
- **Internal Padding:** 24px (40px na caixa de doação).
- **Card clicável:** o card inteiro é o link, com seta SVG em coral profundo visível em repouso — o sinal de destino não depende de hover. Hover/foco troca o filete para coral, sobe o fundo para branco e sublinha o título em 2px coral; a seta translada 4px, guardada por `prefers-reduced-motion`.

### Inputs / Fields
Não há formulário próprio no sistema (sem back-end). O único campo de dado é a **chave PIX**: campo creme com filete forte, raio de 6px, tipografia monoespaçada, `word-break: break-all`, com o botão de copiar em teal médio ao lado. O botão confirma de volta trocando o rótulo para "Copiado!" por 2s, com `window.prompt` como caminho de recuo — é o único momento do site em que algo responde ao visitante, e é onde o acabamento tem que ser inquestionável.

### Navigation
Header `sticky` em creme com filete inferior. Marca em 44px mais nome em peso 800. Links em ink, peso 600, 0.95rem, sem sublinhado, com borda inferior transparente de 2px que assume coral no hover e na página atual (`[aria-current]`) — o marcador de página é coral, a tinta é teal escuro. O CTA "Doar agora" é a única peça coral do cabeçalho, em pílula subordinada em tamanho e peso ao botão do herói. Abaixo de 860px o menu colapsa: botão "Menu" com borda de controle, `aria-expanded` alternado por JS, itens empilhados com filete de 1px e o CTA centralizado ao final.

### Stat Band
Faixa teal escuro de largura total, quatro células em grade com filete vertical translúcido entre elas. Número em 800 com numeral tabular; rótulo em 13–14px teal claro sobre escuro, travado em 22ch com `text-wrap: balance`. **Estática por decisão** — movimento perpétuo em dado institucional lê como enfeite.

### Photo Carousel
Moldura de 20px com `overflow: hidden`, proporção 4/3 (16/9 no mobile), fundo teal escuro enquanto a foto não carrega. A trilha translada com `transform` em 0.55s no easing do sistema (`cubic-bezier(0.16, 1, 0.3, 1)`). Setas circulares de 40px em creme com filete e sombra leve, hover para branco com traço coral profundo. Pontos de 8px em branco translúcido; o ponto atual vira uma barra de 22px em branco pleno. Setas e pontos ficam `hidden` até o JS confirmar mais de uma foto.

### WhatsApp Pill
Pílula fixa no canto inferior direito, verde ajustado `{colors.whatsapp}` (o verde de marca reprova AA com texto branco; contraste vence marca de terceiro), tinta branca, sombra flutuante, `z-index: 90` — abaixo do header fixo.

### Browser Surfaces
As partes que não desenhamos também são design, e neste sistema são tematizadas de propósito: `::selection` em teal claro com tinta teal escuro; `caret-color` e `accent-color` em teal médio; `scrollbar-color` com polegar teal médio sobre trilha teal lavada, com equivalente `::-webkit-scrollbar` de 12px e polegar em pílula com borda de 3px.

### Motion
Um único momento autorado: a entrada do herói (`h1`, lead, ações, figura) escalonada em 0, 60, 120 e 180ms, 0.7s no easing do sistema, partindo de `opacity: 0.001` e `translateY(14px)`. Vive dentro de `@media (prefers-reduced-motion: no-preference)`, de modo que o estado padrão é o conteúdo já visível — se a animação não rodar, nada desaparece. A única outra animação do sistema é o translado de 4px da seta do card.

## Do's and Don'ts

### Do:
- **Do** atribuir cor por cargo: coral para ação, teal escuro para campo-âncora, teal médio para ligação, creme como chão, branco como campo elevado.
- **Do** usar `{colors.on-coral}` para qualquer texto sobre coral e `{colors.control-border}` para qualquer limite de componente — os dois existem para satisfazer 4.5:1 e 1.4.11 e não são substituíveis por ink ou cinza neutro.
- **Do** criar profundidade por campo chapado sobreposto com filete de 1px.
- **Do** travar texto corrido em 65ch e manter `text-wrap: balance` nos títulos.
- **Do** manter numeral tabular em qualquer dado numérico alinhado em coluna.
- **Do** desenhar ícones como SVG inline com traço de 2.5px e `currentColor`.
- **Do** guardar qualquer movimento com `prefers-reduced-motion` e partir de um estado já visível, nunca de `opacity: 0` dependente de animação.
- **Do** replicar à mão qualquer mudança de header ou rodapé nos treze arquivos HTML — a duplicação é decisão registrada, não descuido.
- **Do** manter todo estilo em `css/style.css`: a CSP sem `unsafe-inline` bloqueia `style=` e `<script>` inline em produção.

### Don't:
- **Don't** usar gradiente em nenhum lugar — nem lavado, nem sutil, nem em overlay de foto.
- **Don't** tintar sombra com cor de marca, nem usar sombra sem desfoque; sombra existe só para o que sai do fluxo (seta do carrossel, pílula do WhatsApp).
- **Don't** colocar coral em superfície decorativa, nem pôr dois alvos coral de mesmo peso no mesmo viewport.
- **Don't** usar texto branco sobre coral ou sobre teal claro — ambos reprovam AA.
- **Don't** "corrigir" os `h2` que renderizam em escala de título ou em caixa alta: a divergência entre nível de documento e escala visual é deliberada e está documentada acima.
- **Don't** reintroduzir movimento perpétuo (marquee, auto-scroll de números) nem pedir fonte a terceiro — as duas travas são de produto.
- **Don't** reabrir a escolha da convenção de categoria nem contrabandear excentricidade autoral por dentro dela.
