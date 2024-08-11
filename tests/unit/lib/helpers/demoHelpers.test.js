import {
  DoxenCheckbox,
  DoxenCodeBox,
  DoxenCodeSwapper,
  DoxenDropdown,
  DoxenEmitLog,
  DoxenEmitsDocumentation,
  DoxenHeader,
  DoxenJsonTextarea,
  DoxenNumberField,
  DoxenPlainText,
  DoxenPropsDocumentation,
  DoxenRadioDials,
  DoxenRangeSlider,
  DoxenSideBar,
  DoxenTextField,
  DoxenTextarea,
  VueDoxen,
  VueDoxenCustom
} from '@/library.js';

import {
  getSlotDataFromComponent
} from '@/helpers/demoHelpers.js';

import DummyCompositionApi from '@@@/components/DummyCompositionApi.vue';
import DummyScriptSetupApi from '@@@/components/DummyScriptSetupApi.vue';
import DummySlots from '@@@/components/DummySlots.vue';

describe('Demo helpers', () => {
  describe('getSlotDataFromComponent', () => {
    test('Returns empty object for invalid components', () => {
      expect(getSlotDataFromComponent({}))
        .toEqual({});
    });

    test('Gets correct slot data from dummy components', () => {
      expect(getSlotDataFromComponent(DummySlots))
        .toEqual({
          counter: {
            slotProps: [
              'count',
              'message'
            ]
          },
          other: {},
          default: {}
        });

      expect(getSlotDataFromComponent(DummyCompositionApi))
        .toEqual({ default: {} });

      expect(getSlotDataFromComponent(DummyScriptSetupApi))
        .toEqual({ default: {} });
    });

    test('Gets correct slot data on library components', () => {
      expect(getSlotDataFromComponent(DoxenCodeBox))
        .toEqual({});

      expect(getSlotDataFromComponent(DoxenCheckbox))
        .toEqual({ default: {} });

      expect(getSlotDataFromComponent(DoxenCodeBox))
        .toEqual({});

      expect(getSlotDataFromComponent(DoxenCodeSwapper))
        .toEqual({});

      expect(getSlotDataFromComponent(DoxenDropdown))
        .toEqual({ default: {} });

      expect(getSlotDataFromComponent(DoxenEmitLog))
        .toEqual({});

      expect(getSlotDataFromComponent(DoxenEmitsDocumentation))
        .toEqual({});

      expect(getSlotDataFromComponent(DoxenHeader))
        .toEqual({});

      expect(getSlotDataFromComponent(DoxenJsonTextarea))
        .toEqual({ default: {} });

      expect(getSlotDataFromComponent(DoxenNumberField))
        .toEqual({ default: {} });

      expect(getSlotDataFromComponent(DoxenPlainText))
        .toEqual({ default: {} });

      expect(getSlotDataFromComponent(DoxenPropsDocumentation))
        .toEqual({});

      expect(getSlotDataFromComponent(DoxenRadioDials))
        .toEqual({ default: {} });

      expect(getSlotDataFromComponent(DoxenRangeSlider))
        .toEqual({ default: {} });

      expect(getSlotDataFromComponent(DoxenSideBar))
        .toEqual({
          default: {},
          footer: {}
        });

      expect(getSlotDataFromComponent(DoxenTextField))
        .toEqual({ default: {} });

      expect(getSlotDataFromComponent(DoxenTextarea))
        .toEqual({ default: {} });

      expect(getSlotDataFromComponent(VueDoxen))
        .toEqual({});

      expect(getSlotDataFromComponent(VueDoxenCustom))
        .toEqual({});
    });
  });
});
