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
  combinePropsAndPropsToDemo,
  getSlotDataFromComponent
} from '@/helpers/demoHelpers.js';

import DummyCompositionApi from '@@@/components/DummyCompositionApi.vue';
import DummyScriptSetupApi from '@@@/components/DummyScriptSetupApi.vue';
import DummySlots from '@@@/components/DummySlots.vue';

describe('Demo helpers', () => {
  describe('combinePropsAndPropsToDemo', () => {
    test('No props or propsToDemo', () => {
      const propsToDemo = undefined;
      const componentProps = undefined;

      expect(combinePropsAndPropsToDemo(propsToDemo, componentProps))
        .toEqual({});
    });

    test('Combine props with no overlap', () => {
      const propsToDemo = {
        percent: {
          min: 20,
          max: 30
        }
      };
      const componentProps = {
        percent: {
          type: Number
        }
      };

      expect(combinePropsAndPropsToDemo(propsToDemo, componentProps))
        .toEqual({
          percent: {
            type: Number,
            min: 20,
            max: 30
          }
        });
    });

    test('Combine props with overlap', () => {
      const propsToDemo = {
        percent: {
          type: [Number],
          min: 20,
          max: 30
        }
      };
      const componentProps = {
        percent: {
          type: [Boolean, String],
          min: 10,
          max: 50
        }
      };

      expect(combinePropsAndPropsToDemo(propsToDemo, componentProps))
        .toEqual({
          percent: {
            type: [
              Number,
              Boolean,
              String
            ],
            min: 20,
            max: 30
          }
        });
    });

    describe('Prop "type"', () => {
      test('Picks demo type over component', () => {
        const propsToDemo = {
          amount: {
            type: Number
          }
        };
        const componentProps = {
          amount: {
            type: String
          }
        };

        expect(combinePropsAndPropsToDemo(propsToDemo, componentProps))
          .toEqual({
            amount: {
              type: Number
            }
          });
      });

      test('Converts type to array and combines type if only component uses it', () => {
        const propsToDemo = {
          amount: {
            type: Number
          }
        };
        const componentProps = {
          amount: {
            type: [String]
          }
        };

        expect(combinePropsAndPropsToDemo(propsToDemo, componentProps))
          .toEqual({
            amount: {
              type: [Number, String]
            }
          });
      });

      test('Converts type to array and combines type if only component uses it', () => {
        const propsToDemo = {
          amount: {
            type: [Number]
          }
        };
        const componentProps = {
          amount: {
            type: String
          }
        };

        expect(combinePropsAndPropsToDemo(propsToDemo, componentProps))
          .toEqual({
            amount: {
              type: [Number, String]
            }
          });
      });

      test('Demo is array, component is undefined', () => {
        const propsToDemo = {
          amount: {
            type: [Number]
          }
        };
        const componentProps = {
          amount: {}
        };

        expect(combinePropsAndPropsToDemo(propsToDemo, componentProps))
          .toEqual({
            amount: {
              type: [Number]
            }
          });
      });

      test('Demo is undefined, component is array', () => {
        const propsToDemo = {
          amount: {
            type: undefined
          }
        };
        const componentProps = {
          amount: {
            type: [Number]
          }
        };

        expect(combinePropsAndPropsToDemo(propsToDemo, componentProps))
          .toEqual({
            amount: {
              type: [Number]
            }
          });
      });
    });

    describe('Prop "modelModifiers"', () => {
      test('Without description', () => {
        const propsToDemo = {};
        const componentProps = { modelModifiers: {} };

        expect(combinePropsAndPropsToDemo(propsToDemo, componentProps))
          .toEqual({
            modelModifiers: {
              description: 'Automatically supplied prop from Vue to pass v-model modifiers to native HTML elements.'
            }
          });
      });

      test('With description', () => {
        const propsToDemo = { modelModifiers: { description: 'Test' } };
        const componentProps = { modelModifiers: {} };

        expect(combinePropsAndPropsToDemo(propsToDemo, componentProps))
          .toEqual({
            modelModifiers: {
              description: 'Test'
            }
          });
      });
    })
  });

  describe('getSlotDataFromComponent', () => {
    const defaultSlot = {
      default: {
        default: ''
      }
    };

    test('Returns empty object for invalid components', () => {
      const InvalidComponent = {};

      expect(getSlotDataFromComponent(InvalidComponent))
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
