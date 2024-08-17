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
  createMarkupExample,
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

    test('Combine subobjects', () => {
      const propsToDemo = {
        percent: {
          subObject: {
            a: 'a',
            b: 'b'
          }
        }
      };
      const componentProps = {
        percent: {
          subObject: {
            a: 1,
            b: 2,
            c: 3
          }
        }
      };

      expect(combinePropsAndPropsToDemo(propsToDemo, componentProps))
        .toEqual({
          percent: {
            subObject: {
              a: 'a',
              b: 'b',
              c: 3
            }
          }
        });
    });

    describe('Specific prop keys', () => {
      describe('allowed', () => {
        test('Combines prefering demo', () => {
          const propsToDemo = {
            amount: {
              allowed: ['a', 'b']
            }
          };
          const componentProps = {
            amount: {
              allowed: ['b', 'c', 'd']
            }
          };

          expect(combinePropsAndPropsToDemo(propsToDemo, componentProps))
            .toEqual({
              amount: {
                allowed: ['a', 'b', 'b', 'c', 'd']
              }
            });
        });

        test('Guesses allowed values from validator preferring demo', () => {
          const validatorA = function (value) {
            return ['a', 'b'].includes(value);
          };
          const validatorB = function (value) {
            return ['b', 'c', 'd'].includes(value);
          };
          const propsToDemo = {
            amount: {
              validator: validatorA
            }
          };
          const componentProps = {
            amount: {
              validator: validatorB
            }
          };

          expect(combinePropsAndPropsToDemo(propsToDemo, componentProps))
            .toEqual({
              amount: {
                allowed: ['a', 'b'],
                validator: validatorA
              }
            });
        });

        test('Guesses allowed values from component validator with empty demo', () => {
          const validatorB = function (value) {
            return ['b', 'c', 'd'].includes(value);
          };
          const propsToDemo = {
            amount: {}
          };
          const componentProps = {
            amount: {
              validator: validatorB
            }
          };

          expect(combinePropsAndPropsToDemo(propsToDemo, componentProps))
            .toEqual({
              amount: {
                allowed: ['b', 'c', 'd'],
                validator: validatorB
              }
            });
        });
      });

      describe('type', () => {
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

        test('Converts type to array and combines type if only demo uses it', () => {
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

      describe('modelModifiers', () => {
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
      });
    });
  });

  describe('createMarkupExample', () => {
    test('With nothing passed in', () => {
      expect(createMarkupExample())
        .toEqual('<ComponentName />');
    });

    test('Sort attributes, props, and emits', () => {
      const tag = 'DummyComponent';
      const attributes = [
        {
          name: 'name',
          required: true,
          value: 'Bob'
        },
        {
          name: 'percent',
          default: 0,
          value: 20
        },
        {
          name: 'firstName',
          default: undefined,
          value: 'Bob'
        },
        {
          name: 'enabled',
          default: false,
          value: true
        },
        {
          name: 'modelValue',
          default: undefined,
          value: 'text'
        }
      ];
      const slots = {};
      const emits = [
        'update:modelValue',
        'click',
        'update:firstName',
        'submit'
      ];

      expect(createMarkupExample(tag, attributes, slots, emits))
        .toEqual([
          '<DummyComponent',
          '  v-model="yourDataValue"',
          '  v-model:firstName="yourDataValue"',
          '  :enabled="true"',
          '  name="Bob"',
          '  :percent="20"',
          '  @click="yourMethodName"',
          '  @submit="yourMethodName"',
          '/>'
        ].join('\n'));
    });

    describe('Tag', () => {
      test('Has a tag', () => {
        expect(createMarkupExample('DummyComponent'))
          .toEqual('<DummyComponent />');
      });
    });

    describe('Attributes', () => {
      test('Has model-value', () => {
        const tag = '';
        const attributes = [
          {
            name: 'model-value'
          }
        ];

        expect(createMarkupExample(tag, attributes))
          .toEqual([
            '<ComponentName',
            '  v-model="yourDataValue"',
            '/>'
          ].join('\n'));
      });

      test('Has modelValue', () => {
        const tag = '';
        const attributes = [
          {
            name: 'modelValue'
          }
        ];

        expect(createMarkupExample(tag, attributes))
          .toEqual([
            '<ComponentName',
            '  v-model="yourDataValue"',
            '/>'
          ].join('\n'));
      });

      test('String attribute has default value', () => {
        const tag = '';
        const attributes = [
          {
            name: 'label',
            default: 'Label',
            value: 'Label'
          }
        ];

        expect(createMarkupExample(tag, attributes))
          .toEqual('<ComponentName />');
      });

      test('String attribute has non-default value', () => {
        const tag = '';
        const attributes = [
          {
            name: 'label',
            default: 'Label',
            value: 'Name'
          }
        ];

        expect(createMarkupExample(tag, attributes))
          .toEqual([
            '<ComponentName',
            '  label="Name"',
            '/>'
          ].join('\n'));
      });

      test('String attribute has non-default non-value', () => {
        const tag = '';
        const attributes = [
          {
            name: 'label',
            default: 'Label',
            value: ''
          }
        ];

        expect(createMarkupExample(tag, attributes))
          .toEqual('<ComponentName />');
      });

      test('Dynamic attribute has non-default value', () => {
        const tag = '';
        const attributes = [
          {
            name: 'disabled',
            default: false,
            value: true
          }
        ];

        expect(createMarkupExample(tag, attributes))
          .toEqual([
            '<ComponentName',
            '  :disabled="true"',
            '/>'
          ].join('\n'));
      });
    });

    describe('Slots', () => {
      test('Has default slot', () => {
        const tag = '';
        const attributes = [];
        const slots = {
          default: '<h1>Text</h1>'
        };

        expect(createMarkupExample(tag, attributes, slots))
          .toEqual([
            '<ComponentName>',
            '  <h1>Text</h1>',
            '</ComponentName>'
          ].join('\n'));
      });

      test('Has named slots', () => {
        const tag = '';
        const attributes = [];
        const slots = {
          header: '<h1>Title</h1>',
          footer: '<footer>\n  <button>Submit</button>\n</footer>'
        };

        expect(createMarkupExample(tag, attributes, slots))
          .toEqual([
            '<ComponentName>',
            '  <template #header>',
            '    <h1>Title</h1>',
            '  </template>',
            '  <template #footer>',
            '    <footer>',
            '      <button>Submit</button>',
            '    </footer>',
            '  </template>',
            '</ComponentName>'
          ].join('\n'));
      });
    });

    describe('Emits', () => {
      test('Click event', () => {
        const tag = '';
        const attributes = [];
        const slots = {};
        const emits = [
          'click'
        ];

        expect(createMarkupExample(tag, attributes, slots, emits))
          .toEqual([
            '<ComponentName',
            '  @click="yourMethodName"',
            '/>'
          ].join('\n'));
      });

      test('Named v-model', () => {
        const tag = '';
        const attributes = [
          {
            name: 'firstName'
          }
        ];
        const slots = {};
        const emits = [
          'update:firstName'
        ];

        expect(createMarkupExample(tag, attributes, slots, emits))
          .toEqual([
            '<ComponentName',
            '  v-model:firstName="yourDataValue"',
            '/>'
          ].join('\n'));
      });
    });
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
