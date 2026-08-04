import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const projectRoot = new URL('..', import.meta.url).pathname;
const sourcePath = '/Users/ceron/Developer/Projects/framer-html-exporter/exports/regent-template-standalone.html';
const destination = join(projectRoot, 'public/assets/inline-svg');
const sourceDestination = join(projectRoot, 'src/assets/inline-svg');
const source = await readFile(sourcePath, 'utf8');

await mkdir(destination, { recursive: true });
await mkdir(sourceDestination, { recursive: true });

function decodeSvg(uri) {
  let decoded = uri;
  try {
    decoded = decodeURIComponent(uri);
  } catch {
    decoded = uri.replaceAll('%22', '"').replaceAll('%20', ' ');
  }
  return decoded
    .replaceAll('&quot;', '"')
    .replaceAll('&amp;', '&')
    .replaceAll('\\"', '"');
}

function makeStandalone(svg) {
  return svg.includes('xmlns=') ? svg : svg.replace(/^<svg\b/, '<svg xmlns="http://www.w3.org/2000/svg"');
}

const inlineSvgs = [...source.matchAll(/data:image\/svg\+xml,.*?<\/svg>/gs)]
  .filter((match) => !match[0].includes('replaceAll'))
  .map((match) => decodeSvg(match[0].slice('data:image/svg+xml,'.length)));

const uniqueSvgs = [...new Map(inlineSvgs.map((svg) => [svg, svg])).values()];
if (uniqueSvgs[0]) {
  await writeFile(join(destination, 'stamp.svg'), makeStandalone(uniqueSvgs[0]));
}

for (const [index, svg] of uniqueSvgs.slice(1, 5).entries()) {
  await writeFile(join(destination, `as-seen-${index + 1}.svg`), makeStandalone(svg));
}

if (uniqueSvgs[5]) {
  await writeFile(join(destination, 'footer-logo.svg'), makeStandalone(uniqueSvgs[5]));
}

const namedMarks = {
  'wordmark-small.svg': /<svg[^>]*viewBox="0 0 87 32"[^>]*>[\s\S]*?<\/svg>/,
  'wordmark-large.svg': /<svg[^>]*viewBox="0 0 232\.983 83\.85"[^>]*>[\s\S]*?<\/svg>/,
  'crest.svg': /<svg[^>]*viewBox="0 0 46\.215 75\.153"[^>]*>[\s\S]*?<\/svg>/,
};

for (const [filename, pattern] of Object.entries(namedMarks)) {
  const match = source.match(pattern);
  if (!match) throw new Error(`Could not find ${filename} in the standalone source`);
  const svg = makeStandalone(match[0]).replaceAll(/var\([^,]+,\s*rgb\(255, 255, 255\)\)/g, '#ffffff');
  await writeFile(join(destination, filename), svg);
}

const darkWordmark = source.match(/<svg[^>]*viewBox="0 0 87 32"[^>]*>[\s\S]*?<\/svg>/)?.[0];
if (darkWordmark) {
  await writeFile(join(destination, 'wordmark-dark.svg'), makeStandalone(darkWordmark).replaceAll(/var\([^,]+,\s*rgb\(255, 255, 255\)\)/g, '#3d191b'));
}

for (const filename of await readdir(destination)) {
  if (filename.endsWith('.svg')) await copyFile(join(destination, filename), join(sourceDestination, filename));
}

console.log(`Extracted ${uniqueSvgs.slice(1, 5).length} As Seen marks, one footer mark, and ${Object.keys(namedMarks).length + 1} brand marks.`);
