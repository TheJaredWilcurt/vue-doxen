/**
 * @file Loads VueDoxen demo objects from .vue SFC files via Vite SSR.
 *
 * Most VueDoxen consumers define demos inside .vue SFCs
 * These files can't be imported directly in
 * Node because they contain `<template>` and `<style>` blocks. This helper
 * spins up a temporary Vite dev server in SSR mode, loads each demo file via
 * ssrLoadModule, extracts the named export, and returns an aggregated demos
 * object ready to pass to serializeDemos.
 *
 * Vite is dynamically imported so it is never bundled into the library.
 * Consumers must have `vite` installed in their project (they almost certainly
 * already do).
 */

/**
 * Loads demo objects from .vue SFC files using Vite's SSR module loader.
 *
 * @param  {object}   options                        Configuration for demo loading.
 * @param  {string}   options.viteConfig              Path to the Vite config file (e.g. './vite.config.docs.js').
 * @param  {string[]} options.files                   Array of file paths to load (relative to Vite root, e.g. ['/docs/demos/AlloyCardDemo.vue']).
 * @param  {string}   [options.exportName='demo']     Named export to extract from each file.
 * @param  {Function} [options.nameFromPath]           Function to derive the demo key from a file path. Defaults to stripping directory and 'Demo.vue' suffix.
 * @return {Promise<object>}                          Map of demo name to demo object.
 */
export const loadDemos = async function (options = {}) {
  const {
    viteConfig,
    files,
    exportName = 'demo'
  } = options;

  if (!viteConfig) {
    throw new Error('loadDemos: options.viteConfig is required (path to your Vite config file).');
  }
  if (!files || !files.length) {
    throw new Error('loadDemos: options.files is required (array of demo file paths relative to Vite root).');
  }

  const nameFromPath = options.nameFromPath || defaultNameFromPath;

  // Dynamic import so Vite is never bundled into the library.
  let createServer;
  try {
    const viteModuleName = 'vite';
    const viteModule = await import(/* @vite-ignore */ viteModuleName);
    createServer = viteModule.createServer;
  } catch {
    throw new Error(
      'loadDemos: requires "vite" as a dependency. Install it with: npm install -D vite'
    );
  }

  console.log('loadDemos: Loading ' + files.length + ' demo file(s) via Vite SSR...');
  const vite = await createServer({
    configFile: viteConfig,
    server: { middlewareMode: true }
  });

  const demos = {};
  try {
    for (const filePath of files) {
      try {
        const mod = await vite.ssrLoadModule(filePath);
        if (mod[exportName]) {
          const name = nameFromPath(filePath);
          demos[name] = mod[exportName];
        }
      } catch (error) {
        console.warn('loadDemos: skipping ' + filePath + ': ' + error.message);
      }
    }
  } finally {
    await vite.close();
  }

  console.log('loadDemos: Loaded ' + Object.keys(demos).length + ' demo(s).');
  return demos;
};

/**
 * Derives a demo name from a file path by stripping the directory and
 * removing a trailing 'Demo.vue' or 'Demo.js' suffix.
 *
 * '/docs/demos/AlloyCardDemo.vue' → 'AlloyCard'
 * '/demos/MyWidgetDemo.js'        → 'MyWidget'
 *
 * @param  {string} filePath  The file path.
 * @return {string}           The derived demo name.
 */
function defaultNameFromPath (filePath) {
  const basename = filePath.split('/').pop();
  return basename
    .replace(/Demo\.(vue|js|ts|mjs)$/, '')
    .replace(/\.(vue|js|ts|mjs)$/, '');
}
