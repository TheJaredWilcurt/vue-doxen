/**
 * @file Generate `tests/fixtures/serialized-demos.json` — same flow as atc-alloy's
 * makeMCPComponentsFile.js but self-contained inside vue-doxen.
 *
 * Usage:
 *   npm run build:library
 *   node scripts/runSerializeDemo.js
 */

import fs from 'node:fs';
import { resolve } from 'node:path';

/* eslint-disable-next-line import/no-extraneous-dependencies */
import { createServer } from 'vite';

const __dirname = import.meta.dirname;
const outputPath = resolve(__dirname, '..', 'tests', 'fixtures', 'sandbox', 'serialized-demos.json');

async function main () {
  const server = await createServer({
    configFile: resolve(__dirname, '..', 'vite.config.test-serialize.js'),
    root: resolve(__dirname, '..', 'tests', 'fixtures', 'sandbox'),
    server: { port: 5199, strictPort: true }
  });
  await server.listen();
  const baseUrl = 'http://localhost:5199';

  try {
    const { serializeDemos } = await import('../dist/vue-doxen.js');
    const { demos } = await server.ssrLoadModule('/sandboxDemos.js');

    const result = await serializeDemos(demos, {
      playwright: { baseUrl }
    });

    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2) + '\n');
    console.log(
      `Generated ${outputPath} with ${Object.keys(result).length} components.`
    );
  } finally {
    await server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
