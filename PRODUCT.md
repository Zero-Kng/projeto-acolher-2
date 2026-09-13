# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Público prioritário confirmado: doador pessoa física.** Alguém que chega ao site sem conhecer a organização — por indicação, por busca, por link no Instagram — e precisa decidir, em poucos segundos, se essa é uma instituição real e séria o bastante para receber seu dinheiro. O trabalho dele é simples de nomear e difícil de merecer: confiar e doar. É por isso que "Doar agora" é o único item destacado no menu.

**Beneficiários — não são os visitantes do site.** Crianças e adolescentes de 4 a 17 anos das comunidades Pavão-Pavãozinho e Cantagalo, na zona sul do Rio de Janeiro. Eles são a razão do trabalho, aparecem nas fotos e nos números, mas não são quem o site precisa converter. Não confundir os dois.

**Outros públicos, atendidos em segundo plano** (cada um já tem página própria, e nenhum deve ser sacrificado pela prioridade do doador):

- **Voluntários** — pessoas oferecendo tempo e habilidade (esportes, educação, cultura, apoio administrativo, eventos). Entram por WhatsApp, e-mail ou formulário externo.
- **Empresas e parceiros institucionais** — avaliando patrocínio ou convênio. Pedem credibilidade e continuidade, não emoção.
- **Famílias das comunidades** — responsáveis buscando vaga para a criança. Não há hoje fluxo de inscrição no site; o contato é pelos canais diretos.

## Product Purpose

Site institucional da Associação Projeto Acolher, uma instituição sem fins lucrativos do Rio de Janeiro que acolhe crianças e adolescentes das comunidades Pavão-Pavãozinho e Cantagalo por meio de esporte, educação, cultura e assistência social.

**Missão:** promover, de forma contínua e permanente, a inclusão social e o desenvolvimento da cidadania através do esporte e da educação para crianças que residam em comunidades carentes.

**Visão:** uma sociedade mais justa e fraterna, que permita o pleno desenvolvimento humano das futuras gerações.

**Valores:** justiça e responsabilidade social, ética, respeito ao indivíduo.

O site existe para transformar desconhecidos em doadores, e para sustentar os outros três públicos sem exigir uma equipe técnica que a ONG não tem. Sucesso é uma doação concluída por alguém que chegou sem conhecer a organização.

## Positioning

O que um projeto social vizinho não poderia copiar honestamente:

- **Quinze anos de continuidade, com origem rastreável.** Nasceu do trabalho da Pastoral da Criança e opera desde 2010, quando atendia crianças de 0 a 6 anos da comunidade do Caranguejo, no Morro Pavão-Pavãozinho. Ampliou a faixa etária conforme os beneficiários cresceram e, em 2017, chegou ao Cantagalo com escolinhas esportivas. A trajetória é a prova — não é um projeto que começou ontem.
- **Território específico, não genérico.** Duas comunidades nomeadas, não "comunidades do Rio".
- **O esporte como porta de entrada, não como fim.** Sete modalidades levam a reforço escolar, cultura, convivência e acompanhamento das famílias. A criança entra pelo futebol e a família inteira passa a ser acompanhada.
- **Acompanhamento que atravessa a infância.** Os mesmos beneficiários são seguidos da primeira infância à adolescência, com o vínculo familiar tratado como parte do trabalho.

## Operating Context

- **Hospedagem:** KingHost, hospedagem compartilhada tradicional, datacenter no Brasil. Publicação **manual por FTP/SFTP** — não há deploy automático a cada commit. O `.htaccess` é quem aplica segurança e 404 em produção.
- **Destino do domínio (confirmado):** esta versão KingHost **vira o site oficial em `acolhendo.org.br`**, substituindo o site antigo que ainda está no ar. O `sitemap.xml`, o `robots.txt` e as URLs já assumem esse domínio. Existe uma versão paralela em Netlify (`projeto-acolher-rascunho.netlify.app`) com a mesma base de conteúdo e identidade visual levemente diferente; ela não fica no domínio principal. Ao publicar, evitar conteúdo duplicado entre as duas.
- **Edição de conteúdo sem desenvolvedor:** parceiros, galeria de fotos e dados de doação vivem em `content/*.json` e são renderizados por `js/content.js`. Dá para atualizar essas listas editando um `.json` puro por FTP, sem painel e sem login. Não existe CMS, e construir um painel PHP autenticado foi deliberadamente descartado (superfície de ataque).
- **Manutenção de cabeçalho e rodapé:** cada página HTML duplica header/nav e footer, de propósito — sem include PHP, sem injeção por JavaScript (quebraria com `file://` e prejudica SEO). O custo é real: **qualquer mudança no menu ou no rodapé precisa ser replicada em todos os arquivos `.html`.**
- **Paridade com produção no desenvolvimento:** um container Docker/nginx reproduz os cabeçalhos reais e um filesystem case-sensitive, porque nenhum servidor de desenvolvimento comum aplica o `.htaccess` — foi assim que um bug de CSP ficou meses no ar sem ninguém ver.
- **CI:** valida HTML, JSON, links internos e o site servido pelo container a cada push. **Não faz deploy.** Links externos são verificados semanalmente, fora do CI de push.

## Capabilities and Constraints

**O que o site faz**

- Sete páginas institucionais mais o hub de Atividades com cinco páginas filhas (Esportes, Educação e Reforço Escolar, Cultura/Arte/Lazer, Serviço de Convivência e Fortalecimento de Vínculos, Atendimento às Famílias).
- Doação por PIX com botão de copiar chave; link de pagamento por cartão ou recorrente previsto.
- Listas de parceiros e galeria carregadas de JSON.
- Contato por WhatsApp, e-mail e Instagram. Voluntariado por esses canais mais um formulário externo do Google Forms.

**Restrições técnicas duras**

- **Estático puro.** HTML, CSS e JavaScript, sem build step e sem PHP. O site publicado não tem nenhuma dependência; `package.json` e `node_modules/` existem só para validação em desenvolvimento e no CI, e não vão para o servidor.
- **Sem formulários próprios.** Não há back-end para receber POST. Contato é por canal direto.
- **CSP sem `unsafe-inline`.** Nada de `<script>` inline nem atributo `style=` — o navegador bloqueia silenciosamente em produção, e o `html-validate` barra a reincidência no CI.
- **Zero requisições a terceiros.** Nenhuma fonte, script ou asset externo; nada sai do domínio próprio no navegador do visitante. Decisão de privacidade, não de performance.

**Pendências de produto registradas**

- Chave PIX oficial: `content/site.json` ainda tem o placeholder `SUBSTITUIR_PELA_CHAVE_PIX_OFICIAL`. A página Doe expõe isso com honestidade em vez de esconder.
- Link do Mercado Pago: não configurado.
- Logo em 150×150px — borra acima desse tamanho. Substituir por SVG ou PNG de 500px+.
- Política de Privacidade: modelo baseado em LGPD/ECA, ainda **não revisado por advogado**.
- Hierarquia de títulos pula nível em cards e rodapé (falha real de WCAG 1.3.1, hoje como aviso no CI, com caminho de correção já documentado no README).

## Brand Commitments

- **Nome:** Associação Projeto Acolher. No site aparece também como "Projeto Acolher".
- **Logo:** circular, duas mãos (coral e teal) formando um círculo ao redor de ícones de crianças em atividade. `assets/img/logo.png`.
- **Paleta amostrada por pixel direto da logo** — não é escolha estética, é derivação da identidade existente: coral `#ED6965`, teal claro `#85CBCD`, teal médio `#2C6B6D`, teal escuro `#1B4041`, ink `#22303C`, fundo `#FAF7F2`. O coral só recebe texto escuro (com branco reprova AA); o teal claro é apenas decorativo.
- **Verde do WhatsApp ajustado** para `#0F7A40`: o verde de marca padrão reprova contraste AA com texto branco. Contraste vence marca de terceiro.
- **Nenhuma fonte de terceiro.** Tipografia de sistema hoje, por decisão de privacidade — qualquer fonte futura precisa ser auto-hospedada no próprio domínio.
- **Voz:** institucional, direta, na primeira pessoa do plural ("acolhemos", "oferecemos", "nossas modalidades"). Sem apelo dramático, sem retórica de pena. A dignidade dos beneficiários não é moeda de captação.
- **Convenção da categoria, por decisão explícita.** Numa rodada de direção visual em que direções autorais foram apresentadas e recusadas, a escolha foi a saída padrão: o site adota a arquitetura convencional de uma página de doação de ONG, executada com fidelidade total e sem ironia. Isto é preferência permanente, não uma limitação da rodada — trabalho futuro não deve reabrir a questão nem contrabandear excentricidade por dentro da convenção.
- **Barra de qualidade:** Gerando Falcões e Instituto Reação, pares brasileiros diretos (o Reação é judô em favela do Rio). O nível de acabamento deles é o alvo. Registro honesto: esses sites não puderam ser inspecionados no ambiente onde a decisão foi tomada, então a barra foi executada a partir da expectativa desse grupo de pares, não de uma leitura direta.

## Evidence on Hand

**Existe e está no repositório**

- **5 fotos reais** das atividades, com consentimento confirmado, EXIF/GPS verificado (nenhum encontrado) e imagem resalva do zero para garantir que nenhum metadado residual foi publicado. Em `assets/img/`, catalogadas com texto alternativo em `content/galeria.json`.
- **8 parceiros com URL confirmada:** Departamento de Comunicação da PUC-Rio, UNIFACHA, Bar do Adão, ALOB Sports, Academia Pérolas Negras, Viva Rio, Axx Care, Clube de Regatas do Flamengo. Hoje aparecem só como nome e link — não há descrição do que cada parceria envolve, nem logotipos.
- **Contato institucional:** `contato@acolhendo.org.br`, WhatsApp +55 (21) 99596-9795, Instagram @aprojetoacolher.
- **Números de impacto publicados:** 450+ crianças e adolescentes acompanhados, fundação em 2010, 8 modalidades esportivas, 2 comunidades. Registro de divergência: o site antigo em `acolhendo.org.br` informava "mais de 30" e o handoff marcou o número como pendente de confirmação oficial; o valor 450+ foi depois confirmado como oficial. A soma dos participantes declarados por modalidade é 445.
- **7 modalidades com número de participantes:** Ginástica Artística (130), Ginástica Baby (20), Futebol (150), Judô (75), Vôlei (20), Basquete (20), EducaFut (30).

**Existe na organização, mas ainda NÃO está no repositório**

Confirmado que a Associação possui. Precisa ser solicitado à equipe antes de qualquer uso — nenhum desses pode ser representado com dado inventado:

- **Relatório de atividades ou prestação de contas.** A página Doe hoje fala em transparência sem exibir nada — este documento é o que destrava a seção.
- **CNPJ e certificações.** Nenhum número de CNPJ, título de utilidade pública ou registro aparece hoje no site.
- **Convênios formais** com instituições.

**Não existe — não inventar**

Não há depoimentos, estudos de caso, cobertura de imprensa, valores financeiros, número de voluntários ativos nem métricas de resultado educacional no projeto. Qualquer um desses só entra no site com documento real fornecido pela ONG. Esta é uma organização real, com crianças reais: um dado inventado aqui é dano reputacional, não erro de layout.

## Product Principles

1. **Confiança antes do pedido.** O doador desconhecido decide em segundos se a instituição é real. Continuidade, território nomeado e prova verificável fazem esse trabalho — apelo emocional sozinho, não.
2. **Só afirmar o que tem documento por trás.** O histórico do projeto já registra um número de impacto divergente entre duas versões do site. Dado sem lastro é risco para a ONG, não licença criativa.
3. **A criança nunca é exposta.** Termo de autorização de imagem antes de publicar foto identificável, EXIF e geolocalização removidos sempre, nenhum celular pessoal no ar. A comunidade é vulnerável e o site não pode ampliar essa vulnerabilidade.
4. **Nada de terceiros no navegador do visitante.** Sem fontes externas, sem scripts de análise, sem widgets. Quem visita o site de uma ONG não deve ser rastreado por isso.
5. **Editável sem desenvolvedor sempre que possível.** A ONG não tem equipe técnica. Conteúdo que muda com frequência mora em JSON; o que exige um developer para mudar é dívida assumida conscientemente, não padrão.

## Accessibility & Inclusion

- **Padrão exigido: WCAG 2.1 AA.** Todas as combinações de texto e fundo em uso foram verificadas contra o mínimo de 4.5:1 para texto normal e 3:1 para texto grande ou bold. Esse requisito já derrubou o verde de marca do WhatsApp e restringiu o uso do coral e do teal claro — é vinculante, não aspiracional.
- **Navegação por teclado e leitor de tela:** link "pular para o conteúdo" em todas as páginas, foco visível com contorno de 3px, e atributos `aria-*` nos componentes interativos (carrossel, menu mobile).
- **Falha conhecida em aberto:** a hierarquia de títulos pula nível em cards e no rodapé — WCAG 1.3.1. Leitor de tela usa a hierarquia para navegar. Correção já mapeada no README, ainda não aplicada.
- **Contexto de acesso:** público majoritariamente mobile. O peso da página importa — é mais um motivo para a ausência de dependências externas.
