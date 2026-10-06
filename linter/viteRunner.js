/**
 * @file Executes a script with Vite's Module Runner (Environment API).
 *
 *       This is a drop in replacement for the `vite-node` CLI, which is
 *       deprecated in favor of Vite's built in Module Runner.
 *
 *       Before:
 *       vite-node --config vite.config.lib.js ./scripts/someScript.js
 *
 *       After:
 *       node ./some/path/viteRunner.js --config vite.config.lib.js ./scripts/someScript.js
 */

import path from 'node:path';
import { parseArgs } from 'node:util';

import { createServer, isRunnableDevEnvironment } from 'vite';

/**
 * Runs a script through Vite, so the script can use Vite features,
 * like path aliases and importing .vue single file components.
 *
 * @param  {string}  configFile  Path to the Vite config file to run the script with
 * @param  {string}  scriptFile  Path to the script to execute
 * @return {Promise}             Resolves after the script has finished executing
 */
export const runScriptWithVite = async function (configFile, scriptFile) {
  const server = await createServer({
    configFile,
    // Vite only creates dev environments (and thus module runners) in serve mode.
    // Middleware mode means no HTTP server, websocket, or file watcher is started.
    mode: 'development',
    server: {
      hmr: false,
      middlewareMode: true,
      watch: null
    }
  });

  try {
    const environment = server.environments.ssr;
    if (!isRunnableDevEnvironment(environment)) {
      throw new Error('The Vite SSR environment is not runnable.');
    }
    await environment.runner.import(path.resolve(scriptFile));
  } finally {
    await server.close();
  }
};

const { positionals, values } = parseArgs({
  allowPositionals: true,
  options: {
    config: {
      default: 'vite.config.js',
      short: 'c',
      type: 'string'
    }
  }
});

const scriptFile = positionals[0];
if (!scriptFile) {
  console.log('You must pass in the path to a script to run.');
  process.exit(1);
}

try {
  await runScriptWithVite(values.config, scriptFile);
} catch (error) {
  console.log(error);
  process.exit(1);
}
