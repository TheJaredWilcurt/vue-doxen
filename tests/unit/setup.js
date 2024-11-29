/** @typedef {import('vue3-snapshot-serializer/types').SETTINGS} SETTINGS */

global.beforeEach(() => {
  /** @type {SETTINGS} */
  const snapshotSettings = {
    formatting: {}
  };
  globalThis.vueSnapshots = snapshotSettings;
});

global.afterEach(() => {
});
