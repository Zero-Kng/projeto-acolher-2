---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["css/style.css"]
---

# Home — reformulação visual

## Escopo e modo

Superfície: `index.html`. Modo do visitante: **Persuade**. A home lidera; as outras doze páginas herdam o sistema depois.

**Escopo travado pelo usuário:** a estrutura da página, a navegação, os atalhos e a ordem das seções ficam **intactos**. Muda a camada visual. O trabalho concentra-se em `css/style.css`; HTML só onde o visual exigir, e nunca de forma que altere menu, links, âncoras ou ordem de conteúdo.

## Público, tarefa e prova

Doador pessoa física, no celular, vindo do Instagram, com vinte segundos de paciência e desconfiança justificada. Ação única: copiar a chave PIX. Prova disponível: 5 fotos documentais reais com consentimento, 8 parceiros nomeados com URL, 7 modalidades com contagem, fundação em 2010, duas comunidades nomeadas. Prova que existe mas não está no repositório: prestação de contas, CNPJ, convênios.

## Restrições

Estático puro sem build; CSP sem `unsafe-inline` (nada de `style=` nem `<script>` inline); zero requisições a terceiros, portanto zero webfont externa; WCAG AA vinculante; coral, teais e logo intocáveis; header e footer duplicados em treze arquivos.

## Direction contract

**THESIS:** A convenção é a escolha; a execução é o que esta superfície possui. Não recusa o arranjo que o doador espera — recusa o acabamento aproximado que faz uma ONG real de quinze anos parecer trabalho de fim de semana.

**OWN-WORLD:** Coral, teal médio, teal escuro e o creme da marca aplicados por cargo fixo: coral é ação e só ação. Cor em campo, não em respingo — regiões inteiras assumem cor. Sem gradiente, sem vidro, sem sombra colorida; profundidade por sobreposição de campos chapados. Tipografia de sistema levada a sério: escala fluida com salto real entre níveis e medida de leitura travada.

**STORY:** O visitante entende que é uma instituição de quinze anos com território nomeado; acredita nisso porque vê fotografia real, números específicos e oito parceiros nomeados; e faz uma coisa — copia a chave PIX.

**FIRST VIEWPORT:** Estrutura atual preservada: texto à esquerda, carrossel à direita, números abaixo. Herói em creme sólido em vez de gradiente lavado. H1 em escala real. "Quero doar" é o alvo coral dominante do viewport; o CTA do menu é coral por compromisso de marca registrado no PRODUCT.md, mas fica subordinado em tamanho e peso, e o voluntariado recua para contorno. Banner de números estático, não marquee perpétuo.

**FORM:** A saída padrão da categoria, escolhida pelo usuário na rodada de direção — nenhuma das sete direções autorais derivadas em duas rodadas. Seed key `9ad500a8`. Barra de qualidade: Gerando Falcões e Instituto Reação, não inspecionados (navegação externa bloqueada no ambiente).

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Momento memorável

O botão de copiar a chave PIX: o único momento do site em que algo confirma de volta para o visitante. É onde o acabamento tem que ser inquestionável.

## Decisões em aberto

- O banner de números roda hoje em marquee infinito. Vou torná-lo estático — movimento perpétuo em dado institucional lê como enfeite, e enfeite é o que faz parecer amador. Mudança de comportamento visual, sinalizada ao usuário; reversível se ele discordar.
- Chave PIX e link do Mercado Pago seguem como placeholder; a página Doe mantém a mensagem honesta.
- Prestação de contas, CNPJ e convênios existem mas não estão no repositório — nenhuma seção nova deve ser desenhada para eles até os documentos chegarem.
