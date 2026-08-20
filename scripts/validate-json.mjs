// Valida os arquivos de content/*.json.
//
// Motivo de existir: a equipe edita esses arquivos direto por FTP, e uma
// virgula sobrando derruba silenciosamente a pagina inteira que depende deles
// (a lista de parceiros some, o carrossel nao aparece). O CI passa a barrar
// isso antes de virar problema no ar.

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const dir = "content";
let falhas = 0;

// Checagens de forma, alem do JSON ser sintaticamente valido.
const esquemas = {
  "galeria.json": (data) => {
    if (!Array.isArray(data.photos)) return 'esperado um array em "photos"';
    for (const [i, p] of data.photos.entries()) {
      if (!p.src) return `photos[${i}] sem "src"`;
      if (!existsSync(p.src)) return `photos[${i}].src aponta para arquivo inexistente: ${p.src}`;
      if (!p.alt) return `photos[${i}] sem "alt" (obrigatorio para acessibilidade)`;
    }
    return null;
  },
  "parceiros.json": (data) => {
    if (!Array.isArray(data.partners)) return 'esperado um array em "partners"';
    for (const [i, p] of data.partners.entries()) {
      if (!p.name) return `partners[${i}] sem "name"`;
      if (p.url && !/^https?:\/\//.test(p.url)) return `partners[${i}].url nao e http(s): ${p.url}`;
    }
    return null;
  },
  "site.json": (data) => {
    if (!data.donation) return 'esperado um objeto "donation"';
    return null;
  },
};

for (const file of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
  const path = join(dir, file);
  let data;

  try {
    data = JSON.parse(readFileSync(path, "utf8"));
  } catch (err) {
    console.error(`FALHOU  ${path}: JSON invalido - ${err.message}`);
    falhas++;
    continue;
  }

  const erro = esquemas[file]?.(data);
  if (erro) {
    console.error(`FALHOU  ${path}: ${erro}`);
    falhas++;
  } else {
    console.log(`ok      ${path}`);
  }
}

if (falhas > 0) {
  console.error(`\n${falhas} arquivo(s) com problema.`);
  process.exit(1);
}
console.log("\nTodos os JSON de content/ estao validos.");
