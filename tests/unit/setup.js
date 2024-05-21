import vueSnapshotSerializer from './serializer.js';

expect.addSnapshotSerializer(vueSnapshotSerializer);

global.beforeEach(() => {
});

global.afterEach(() => {
});
