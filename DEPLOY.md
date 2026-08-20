# Deploy manual — KingHost via FTP/SFTP

Sem Git-based deploy. Toda publicação é manual, arquivo por arquivo, via FTP ou SFTP.

**O container e o GitHub Actions não mudaram nada disso.** O pipeline no GitHub só valida (não publica), e o container é ferramenta de desenvolvimento — hospedagem compartilhada não roda Docker. Quem serve o site na KingHost continua sendo o Apache lendo o `.htaccess`.

## O que sobe para o FTP e o que não sobe

Sobe (igual a sempre):

```
*.html   .htaccess   robots.txt   sitemap.xml
assets/  content/  css/  js/
```

**Não sobe** — é infraestrutura de desenvolvimento e não tem função nenhuma no servidor:

```
Dockerfile   docker-compose.yml   .dockerignore   nginx/
.github/     scripts/    .htmlvalidate.json
package.json   package-lock.json   node_modules/
*.md   .gitignore   .nojekyll
```

Se subir por engano, o pior caso é ocupar espaço — mas `node_modules/` são dezenas de milhares de arquivos e a transferência FTP vai demorar horas à toa. Vale conferir.

## ⚠️ Testando localmente antes de publicar

**Não abra os arquivos `.html` direto no navegador (clique duplo / `file:///...`).** Parceiros, o carrossel de fotos da Home e os dados de doação são carregados via `fetch()` de arquivos em `content/*.json`, e o navegador bloqueia esse tipo de requisição por segurança quando a página está em `file://` (erro de CORS). O resultado visual é exatamente "Não foi possível carregar a lista de parceiros agora" e o carrossel não aparecendo — não é bug, é a página sendo aberta do jeito errado.

Pra testar localmente, sirva a pasta por um servidor:

- **Docker** (mais fiel): `docker compose up --build`, depois `http://localhost:8080` (se a porta 8080 ja estiver ocupada por outro projeto, use `SITE_PORT=8088 docker compose up --build`). É a única opção que aplica os cabeçalhos de segurança reais — use esta sempre que mexer em CSP, `.htaccess` ou for adicionar qualquer coisa inline no HTML. Foi assim que o bug do ano em branco no rodapé apareceu (ver README).
- **VS Code**: instale a extensão **Live Server** (Ritwick Dey), clique com o botão direito no `index.html` → "Open with Live Server". Abre em `http://127.0.0.1:5500` e tudo funciona. Mais prático para só editar HTML/CSS, mas **não** aplica os cabeçalhos — o site vai parecer funcionar aqui e quebrar no ar.
- **Python** (se tiver instalado): dentro da pasta do projeto, `python -m http.server 8000`, depois abra `http://localhost:8000/` no navegador. Mesma ressalva do Live Server.

Uma vez publicado na KingHost, isso deixa de ser problema — o site vai estar em `https://`, que é justamente o cenário para o qual esse `fetch()` foi desenhado.

## O que você precisa

- Cliente FTP/SFTP. Recomendo **FileZilla** (gratuito, multiplataforma).
- Credenciais de acesso FTP da KingHost: host, usuário, senha, porta. Ficam disponíveis no painel de controle da KingHost (cPanel), em "Contas FTP" ou "Gerenciador de Arquivos". Se for a primeira vez, pode ser necessário criar uma conta FTP específica lá dentro.
- Prefira **SFTP** (porta 22) a FTP puro (porta 21) se a KingHost oferecer — SFTP criptografa a conexão inteira, incluindo a senha. FTP puro trafega tudo em texto claro.

## Passo a passo

1. Abra o FileZilla e conecte com host / usuário / senha / porta fornecidos pela KingHost.
2. No painel remoto (lado direito), navegue até a pasta pública do domínio — geralmente `public_html/` ou `www/`, dependendo de como a KingHost organiza a conta. Se for publicar em subdomínio (ex: enquanto o domínio principal ainda aponta pro site antigo), a pasta será a do subdomínio específico.
3. No painel local (lado esquerdo), navegue até a pasta deste projeto.
4. Selecione todo o conteúdo (todos os `.html` da raiz, `.htaccess`, `robots.txt`, `sitemap.xml`, e as pastas `css/`, `js/`, `content/`, `assets/`) e arraste para o painel remoto, mantendo a mesma estrutura de pastas. **Atenção ao `.htaccess`**: é um arquivo oculto (começa com ponto) — confirme no FileZilla que "Mostrar arquivos ocultos" está ativado, senão ele não aparece pra ser enviado.
5. Confirme no painel de controle da KingHost que o módulo Apache `mod_headers` está ativo (normalmente vem ativado por padrão em hospedagem compartilhada) — é ele que aplica os cabeçalhos de segurança do `.htaccess`.
6. Aguarde a transferência terminar e confirme que não houve erro em nenhum arquivo (o FileZilla mostra uma lista de falhas, se houver, na aba inferior).
7. **Antes de habilitar o redirecionamento HTTPS forçado** (já vem ativo no `.htaccess`), confirme que o certificado SSL grátis da KingHost já foi emitido e está ativo pro domínio/subdomínio em uso. Se publicar com HTTPS ainda não ativo, esse redirecionamento pode causar erro de conexão — nesse caso, comente as 4 linhas do bloco `mod_rewrite` no `.htaccess` até o certificado ficar pronto.

## Checklist antes de cada publicação

- [ ] O CI está verde no GitHub (aba **Actions**). Se estiver vermelho, o site vai quebrar em produção do mesmo jeito que quebrou lá — não publique por cima.
- [ ] Nenhuma foto de criança publicada sem termo de autorização de imagem assinado.
- [ ] EXIF/geolocalização removido de todas as fotos novas.
- [ ] Nenhum telefone pessoal exposto (só o WhatsApp institucional).
- [ ] Testou pelo menos uma vez em tela de celular (o site é responsivo, mas vale conferir após qualquer mudança grande de layout).
- [ ] Conferiu se os links de WhatsApp, e-mail e Instagram no rodapé ainda estão corretos, já que aparecem em todas as páginas.
- [ ] Se mexeu em `content/parceiros.json`, `content/galeria.json` ou `content/site.json`, validou que o JSON está bem formado (um vírgula sobrando quebra a página inteira que depende dele) — qualquer validador de JSON online resolve, ou rode `python3 -m json.tool arquivo.json` no terminal.

## Atualizações futuras

Como cada página `.html` duplica o cabeçalho e o rodapé (ver README.md), qualquer mudança de menu, contato ou rodapé precisa ser feita em todos os arquivos antes de subir. Não existe endpoint único.

Já a lista de parceiros, as fotos do carrossel da Home e os dados de doação **não** exigem editar HTML — bastam editar os arquivos em `content/*.json` direto pelo FTP (ou pelo Gerenciador de Arquivos do painel da KingHost) e subir de novo.

Se o ritmo de atualização crescer e isso virar dor de cabeça, dá pra migrar depois para deploy automatizado via GitHub Actions + FTP. A validação já está pronta (`.github/workflows/ci.yml`); faltaria só um job de publicação. Mas isso exige guardar credenciais FTP como secret no GitHub, o que é uma troca de simplicidade por automação, não um upgrade "de graça" — e o FTP puro da KingHost trafega a senha em texto claro, então só faria sentido com SFTP. Decisão adiada de propósito.
