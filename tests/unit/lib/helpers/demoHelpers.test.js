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
    const defaultSlot = {
      default: {
        default: ''
      }
    };

    test('Returns empty object for invalid components', () => {
      expect(getSlotDataFromComponent({}))
        .toEqual({});
    });

    test('Gets correct slot data from dummy components', () => {
      expect(getSlotDataFromComponent(DummySlots))
        .toEqual({
          counter: {
            default: '',
            slotProps: [
              'count',
              'message'
            ]
          },
          other: {
            default: ''
          },
          default: {
            default: ''
          }
        });

      expect(getSlotDataFromComponent(DummyCompositionApi))
        .toEqual(defaultSlot);

      expect(getSlotDataFromComponent(DummyScriptSetupApi))
        .toEqual(defaultSlot);
    });

    test('Gets correct slot data on library components', () => {
      expect(getSlotDataFromComponent(DoxenCodeBox))
        .toEqual({});

      expect(getSlotDataFromComponent(DoxenCheckbox))
        .toEqual(defaultSlot);

      expect(getSlotDataFromComponent(DoxenCodeBox))
        .toEqual({});

      expect(getSlotDataFromComponent(DoxenCodeSwapper))
        .toEqual({});

      expect(getSlotDataFromComponent(DoxenDropdown))
        .toEqual(defaultSlot);

      expect(getSlotDataFromComponent(DoxenEmitLog))
        .toEqual({});

      expect(getSlotDataFromComponent(DoxenEmitsDocumentation))
        .toEqual({});

      expect(getSlotDataFromComponent(DoxenHeader))
        .toEqual({});

      expect(getSlotDataFromComponent(DoxenJsonTextarea))
        .toEqual(defaultSlot);

      expect(getSlotDataFromComponent(DoxenNumberField))
        .toEqual(defaultSlot);

      expect(getSlotDataFromComponent(DoxenPlainText))
        .toEqual(defaultSlot);

      expect(getSlotDataFromComponent(DoxenPropsDocumentation))
        .toEqual({});

      expect(getSlotDataFromComponent(DoxenRadioDials))
        .toEqual(defaultSlot);

      expect(getSlotDataFromComponent(DoxenRangeSlider))
        .toEqual(defaultSlot);

      expect(getSlotDataFromComponent(DoxenSideBar))
        .toEqual({
          default: {
            default: ''
          },
          footer: {
            default: ''
          }
        });

      expect(getSlotDataFromComponent(DoxenTextField))
        .toEqual(defaultSlot);

      expect(getSlotDataFromComponent(DoxenTextarea))
        .toEqual(defaultSlot);

      expect(getSlotDataFromComponent(VueDoxen))
        .toEqual({});

      expect(getSlotDataFromComponent(VueDoxenCustom))
        .toEqual({});
    });
  });
});
