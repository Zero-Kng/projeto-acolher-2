# Handoff — Projeto Acolher (versão KingHost)

Documento de transferência de contexto. Este projeto (site institucional da Associação Projeto Acolher) já tem uma versão em produção/testes hospedada no Netlify, construída em outra conversa. Este novo chat vai construir uma **versão separada, para hospedagem KingHost** — não é uma migração de código, é um projeto novo com a mesma base de conteúdo e identidade. Este documento existe pra não repetir a pesquisa/decisões já tomadas.

## Sobre a organização

Associação Projeto Acolher — ONG sem fins lucrativos no Rio de Janeiro, acolhe crianças e adolescentes (4 a 17 anos) das comunidades Pavão-Pavãozinho e Cantagalo (zona sul do Rio). Atua com esporte, educação e assistência social desde 2010 (originada do trabalho da Pastoral da Criança). Ampliou atuação para o Cantagalo em 2017.

**Missão**: promover, de forma contínua e permanente, a inclusão social e o desenvolvimento da cidadania através do esporte e da educação para crianças de comunidades carentes.

**Visão**: uma sociedade mais justa e fraterna, que permita o pleno desenvolvimento humano das futuras gerações.

**Valores**: justiça e responsabilidade social, ética, respeito ao indivíduo.

## ⚠️ Pendência não resolvida — carregar para qualquer versão do site

Existe uma divergência de dado que **ainda não foi confirmada pela ONG**: um rascunho anterior (Wix) informava "450+ crianças acompanhadas"; o site antigo em `acolhendo.org.br` (ainda no ar) informa "mais de 30". A versão Netlify está publicada com "450+" a pedido do usuário, mas isso segue pendente de confirmação oficial. Não publique nenhum número de impacto na versão KingHost sem confirmar com a ONG primeiro.

## Conteúdo já levantado (reaproveitável)

**Atividades**: Esportes (futebol de campo, beach soccer, futsal, vôlei, basquete, judô, ginástica artística, baby ginástica), Educação e Reforço Escolar, Cultura/Arte/Lazer (oficinas, cinema, passeios). Também: Serviço de Convivência e Fortalecimento de Vínculos, Atendimento às Famílias.

**Parceiros** (com URLs já confirmadas):
- Departamento de Comunicação - PUC-Rio — https://www.puc-rio.br/ensinopesq/ccg/comunicacao.html
- UNIFACHA — https://facha.edu.br/
- Bar do Adão — https://www.bardoadao.com.br/
- ALOB Sports — https://alobsports.com.br/
- Academia Pérolas Negras — https://academiaperolasnegras.org/
- Viva Rio — https://vivario.org.br/
- Axx Care — https://axxcare.com.br/
- Clube de Regatas do Flamengo — https://www.flamengo.com.br/

**Contato**:
- Rio de Janeiro, Brasil
- E-mail: contato@acolhendo.org.br
- WhatsApp: +55 (21) 99596-9795 (havia um segundo número pessoal no rascunho original — recomendo não publicar dois celulares pessoais; ver seção de privacidade abaixo)
- Instagram: [@aprojetoacolher](https://www.instagram.com/aprojetoacolher/)

## Identidade visual

Logo oficial: circular, duas mãos (coral e teal) formando um círculo ao redor de ícones de crianças em atividades. Arquivo de logo deve ser solicitado ao usuário nesse novo chat (não está anexado a este documento).

Paleta extraída por amostragem de pixel direto da logo (não é chute visual):

| Uso | Cor | Observação |
|---|---|---|
| Coral (extraído da logo) | `#ED6965` | Usar com texto escuro em cima (contraste 4.38:1), não texto branco (só 3.08:1, reprova AA) |
| Teal claro (extraído da logo) | `#85CBCD` | Só decorativo/pequeno — contraste ruim pra texto (1.84:1 com branco) |
| Teal médio (derivado, p/ links/texto) | `#2C6B6D` | Contraste 6.12:1 com branco |
| Teal escuro (derivado, p/ fundo com texto branco) | `#1B4041` | Contraste 11.31:1 com branco |
| Ink (texto principal) | `#22303C` | |
| Fundo | `#FAF7F2` | |

## Cuidados legais/éticos — valem para qualquer versão do site

1. **Uso de imagem de crianças/adolescentes**: exige Termo de Autorização de Uso de Imagem assinado pelo responsável legal antes de publicar qualquer foto onde uma criança seja identificável. A versão Netlify já publicou 5 fotos reais com consentimento confirmado pelo usuário — mas confirme de novo para este projeto se as fotos usadas forem diferentes.
2. **EXIF/geolocalização**: sempre checar e remover metadados de geolocalização de fotos antes de publicar (comunidade vulnerável — não expor localização).
3. **Telefone pessoal público**: evitar publicar celular pessoal de voluntário/fundador; preferir WhatsApp Business institucional.
4. **LGPD/ECA**: qualquer formulário que colete dado pessoal precisa de política de privacidade acessível e clara sobre uso dos dados.
5. **Domínio `acolhendo.org.br`**: já registrado e com site antigo no ar. Confirmar quem administra o DNS antes de apontar qualquer coisa nova pra lá — o mesmo domínio não pode apontar para dois hosts ao mesmo tempo, então a ONG vai ter que decidir qual versão (Netlify ou KingHost) fica no domínio principal, ou usar subdomínios/domínios diferentes para cada uma.

## Contexto técnico da KingHost (relevante para decisões de arquitetura do novo projeto)

Confirmado via busca: hospedagem compartilhada tradicional, SSL grátis incluso, suporte a PHP, acesso FTP/SFTP, painel de controle próprio, planos a partir de ~R$12,50/mês, datacenter no Brasil. **Não é hospedagem Git-based** — não tem equivalente a "deploy automático a cada commit".

Implicações práticas para o novo projeto:
- **Formulários**: não existe Netlify Forms lá. Caminho natural é um script PHP (`mail()` ou PHPMailer) recebendo o POST do formulário HTML e enviando e-mail. É um padrão bem estabelecido em hospedagem PHP tradicional.
- **Painel de edição de conteúdo pra pessoa não-técnica**: não há equivalente pronto ao Decap CMS + Git Gateway (esse combo depende do Netlify). Se a ONG precisar editar conteúdo sem developer, a opção é construir um mini-painel PHP próprio (autenticado por senha, editando arquivos/JSON direto no servidor) — trabalho de desenvolvimento real, decidir com o usuário se vale a pena ou se a ONG aceita pedir a um developer sempre que precisar atualizar algo.
- Sem redeploy automático: qualquer atualização de arquivo precisa ser enviada por FTP/SFTP manualmente (ou automatizar depois com uma GitHub Action de deploy via FTP, se o código for mantido em repositório Git em paralelo).

## O que NÃO replicar da versão Netlify

Não faz sentido copiar a arquitetura Decap CMS + Netlify Identity + Git Gateway pra esse novo projeto — é uma dependência direta do Netlify que não existe na KingHost. Repensar do zero como esse site vai ser editado, considerando as limitações acima.
