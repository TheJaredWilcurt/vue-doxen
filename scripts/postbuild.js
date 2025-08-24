import fs from 'node:fs';
import path from 'node:path';

const __dirname = import.meta.dirname;

try {
  const indexPath = path.join(__dirname, '..', 'site', 'index.html');
  const notFoundPath = path.join(__dirname, '..', 'site', '404.html');
  const indexContents = String(fs.readFileSync(indexPath));
  fs.writeFileSync(notFoundPath, indexContents);
} catch (error) {
  console.log('ERROR: Could not copy 404', error);
}
