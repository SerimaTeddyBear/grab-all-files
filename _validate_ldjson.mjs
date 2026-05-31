import { readFileSync } from 'node:fs';
const html = readFileSync('index.html', 'utf8');
const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
let m, i = 0, bad = 0;
while ((m = re.exec(html)) !== null) {
  i++;
  try { const o = JSON.parse(m[1]); console.log(`block ${i}: OK  @type=${o['@type']}`); }
  catch (e) { bad++; console.log(`block ${i}: PARSE ERROR -> ${e.message}`); }
}
console.log(`\n${i} JSON-LD blocks, ${bad} errors`);
process.exit(bad ? 1 : 0);
