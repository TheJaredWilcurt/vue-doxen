import { vueDoxenPlugin } from '@/vue-doxen.js';

describe('Vue-Doxen', () => {
  test('install', () => {
    const mockApp = {
      component: vi.fn()
    };

    vueDoxenPlugin.install(mockApp);

    expect(mockApp.component.mock.calls.length > 18)
      .toEqual(true);
  });
});
