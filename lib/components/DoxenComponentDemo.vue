<template>
  <div v-bind="applyStyleTokens({ componentDemo: true })">
    <!-- DoxenHeader -->
    <component
      :is="options.components.header"
      :description="description"
      :styleTokens="styleTokens"
      :title="title"
    />

    <template v-if="importStatement">
      <template v-if="typeof(importStatement) === 'string'">
        <h3 v-bind="applyStyleTokens({ componentDemoH3: true })">Usage</h3>
        <CodeBox
          :code="importStatement"
          :styleTokens="styleTokens"
        />
      </template>
      <template v-else-if="typeof(importStatement) === 'object' && importStatement.component">
        <component
          :is="importStatement.component"
          v-bind="importStatement.props || {}"
          v-on="importStatement.events || {}"
          :key="componentName + '-import-statment'"
        />
      </template>
    </template>

    <div v-bind="applyStyleTokens({ componentDemoContainer: true })">
      <hr v-bind="applyStyleTokens({ componentDemoHr: true })" />
      <component
        v-if="'modelValue' in propsToDemo"
        v-model="demoProps.modelValue"
        :is="demo.component"
        v-bind="demoProps"
        v-on="demoEvents"
        :key="componentName + '-v-model'"
      >
        <template
          v-for="(slotValue, slotName) in slotsToDemo"
          #[slotName]
        >
          <span
            v-html="demoSlots[slotName]"
            :key="'slot-' + slotName"
          ></span>
        </template>
      </component>
      <component
        v-else
        :is="demo.component"
        v-bind="demoProps"
        v-on="demoEvents"
        :key="componentName + '-no-v-model'"
      >
        <template
          v-for="(slotValue, slotName) in slotsToDemo"
          #[slotName]
        >
          <span
            v-html="demoSlots[slotName]"
            :key="'slot-' + slotName"
          ></span>
        </template>
      </component>
      <hr v-bind="applyStyleTokens({ componentDemoHr: true })" />
    </div>

    <h3 v-bind="applyStyleTokens({ componentDemoH3: true })">Props Playground:</h3>

    <form v-bind="applyStyleTokens({ propsPlaygroundForm: true })">
      <component
        v-for="(prop, propName) in propsToDemo"
        v-bind="prop.props"
        v-model="demoProps[propName]"
        :is="prop.component"
        :key="propName"
      />
      <!-- DoxenTextarea -->
      <component
        v-for="(slotValue, slotName) in slotsToDemo"
        v-model="demoSlots[slotName]"
        :is="options.components.textarea"
        :label="_startCase(slotName) + ' Slot'"
        :styleTokens="styleTokens"
        :key="'slot-playground-' + slotName"
      />
      <!-- DoxenEmitLog -->
      <component
        v-if="Object.keys(emitsToDemo).length"
        v-model="emitLog"
        :is="options.components.emitLog"
        :styleTokens="styleTokens"
      />
    </form>

    <CodeSwapper
      :codeTypes="{
        Vue: markup,
        JavaScript: js
      }"
      :styleTokens="styleTokens"
    />

    <PropsDocumentation
      :component="demo.component"
      :propsToDemo="propsToDemo"
      :styleTokens="styleTokens"
    />

    <template v-if="Object.keys(emitsToDemo).length">
      <EmitsDocumentation
        :componentName="componentName"
        :emitsToDemo="emitsToDemo"
        :styleTokens="styleTokens"
      />
    </template>
  </div>
</template>

<script>
import _lowerFirst from 'lodash.lowerfirst';
import _startCase from 'lodash.startcase';

import { deJSONify } from '@/helpers/componentHelpers.js';
import {
  autoGeneratePlaygroundProps,
  combinePropsAndPropsToDemo,
  createMarkupExample
} from '@/helpers/demoHelpers.js';
import {
  options,
  styleTokens
} from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

import CodeBox from '@/components/CodeBox.vue';
import CodeSwapper from '@/components/CodeSwapper.vue';
import EmitsDocumentation from '@/components/EmitsDocumentation.vue';
import PropsDocumentation from '@/components/PropsDocumentation.vue';

export default {
  name: 'DoxenComponentDemo',
  components: {
    CodeBox,
    CodeSwapper,
    EmitsDocumentation,
    PropsDocumentation
  },
  mixins: [applyStyleTokens],
  props: {
    demo: {
      type: Object,
      required: true
    },
    options,
    styleTokens
  },
  data: function () {
    return {
      demoProps: {},
      demoSlots: {},
      emitLog: []
    };
  },
  methods: {
    _startCase,
    initialize: function () {
      this.demoProps = {};
      this.demoSlots = {};
      for (const propName in this.propsToDemo) {
        this.demoProps[propName] = this.propsToDemo?.[propName]?.props?.modelValue;
      }
      for (const slotName in this.slotsToDemo) {
        this.demoSlots[slotName] = this.slotsToDemo?.[slotName];
      }
    }
  },
  computed: {
    componentName: function () {
      return (
        this.demo?.component?.name ||
        this.demo?.component?.__name ||
        this.demo?.name ||
        ''
      );
    },
    title: function () {
      return _startCase(this.componentName);
    },
    description: function () {
      return (
        this.demo?.component?.description ||
        this.demo?.description
      );
    },
    importStatement: function () {
      return (
        this.demo?.component?.importStatement ||
        this.demo?.importStatement
      );
    },
    emitsToDemo: function () {
      let demoEmits = {};

      function handleEmitArrays (emits) {
        if (emits && Array.isArray(emits) && emits.length) {
          for (const emitName of emits) {
            demoEmits[emitName] = demoEmits[emitName] || {};
          }
        }
      }
      function handleEmitObjects (emits) {
        if (
          emits &&
          typeof(emits) === 'object' &&
          !Array.isArray(emits)
        ) {
          for (const emitName in emits) {
            demoEmits[emitName] = demoEmits[emitName] || {};
            demoEmits[emitName] = {
              ...demoEmits[emitName],
              ...emits[emitName]
            };
          }
        }
      }

      handleEmitArrays(this.demo?.component?.emits);
      handleEmitArrays(this.demo?.component?.emitsToDemo);
      handleEmitArrays(this.demo?.emitsToDemo);

      handleEmitObjects(this.demo?.emitsToDemo);
      handleEmitObjects(this.demo?.component?.emitsToDemo);
      handleEmitObjects(this.demo?.component?.emits);

      // Default values
      for (const emitName in demoEmits) {
        // Default v-model="value" and v-model:title="value"
        if (emitName.startsWith('update:')) {
          const emitNameShort = emitName.replace('update:', '');
          const vModels = ['model-value', 'modelValue'];
          if (!demoEmits[emitName].description) {
            if (vModels.includes(emitNameShort)) {
              demoEmits[emitName].description = 'For use with v-model for two way data binding.';
            } else {
              demoEmits[emitName].description = 'For use with v-model:' + emitNameShort + ' for two way data binding.';
            }
          }
          if (!demoEmits[emitName].example) {
            if (vModels.includes(emitNameShort)) {
              demoEmits[emitName].example = 'v-model="yourValue"';
            } else {
              demoEmits[emitName].example = 'v-model:' + emitNameShort + '="yourValue"';
            }
          }
        // Default @click="yourMethod"
        } else {
          if (!demoEmits[emitName].example) {
            demoEmits[emitName].example = '@' + emitName + '="yourMethod"';
          }
        }
      }

      return demoEmits;
    },
    slotsToDemo: function () {
      let slotsToDemo = {};

      function handleSlotArrays (slots) {
        if (slots && Array.isArray(slots) && slots.length) {
          for (const slotName of slots) {
            slotsToDemo[slotName] = slotsToDemo[slotName] || '';
          }
        }
      }
      function handleSlotObjects (slots) {
        if (
          slots &&
          typeof(slots) === 'object' &&
          !Array.isArray(slots)
        ) {
          for (const slotName in slots) {
            slotsToDemo[slotName] = slots[slotName] || '';
          }
        }
      }

      handleSlotArrays(this.demo?.component?.slots);
      handleSlotArrays(this.demo?.component?.slotsToDemo);
      handleSlotArrays(this.demo?.slotsToDemo);

      handleSlotObjects(this.demo?.component?.slots);
      handleSlotObjects(this.demo?.component?.slotsToDemo);
      handleSlotObjects(this.demo?.slotsToDemo);

      // Defaults
      for (const slotName in slotsToDemo) {
        if (typeof(slotsToDemo[slotName]) !== 'string') {
          slotsToDemo[slotName] = deJSONify(slotsToDemo[slotName]);
        }
      }

      return slotsToDemo;
    },
    propsToDemo: function () {
      const propsToDemo = this.demo?.propsToDemo || {};
      const componentProps = this.demo?.component?.props || {};
      const playgroundProps = combinePropsAndPropsToDemo(propsToDemo, componentProps);
      const autoGeneratedPlaygroundProps = autoGeneratePlaygroundProps(playgroundProps, this.styleTokens);
      return autoGeneratedPlaygroundProps;
    },
    demoEvents: function () {
      const events = {};
      Object.keys(this.emitsToDemo).forEach((emitName) => {
        events[emitName] = (value) => {
          this.emitLog.push({ emitName, value });
          // Intentional console.info to demonstrate emits
          console.info(this.title + ' emit log:', { emitName, value });
        };
      });
      return events;
    },
    markup: function () {
      const tag = (this.componentName || '').replaceAll(' ', '');
      const emits = Object.keys(this.emitsToDemo);
      const attributes = Object.keys(this.propsToDemo)
        .map((propName) => {
          return {
            name: propName,
            value: this.demoProps[propName],
            required: !!this.demo?.component?.props?.[propName]?.required
          };
        });
      const slots = {};
      for (const demoSlotName in this.demoSlots) {
        const demoSlotValue = this.demoSlots[demoSlotName];
        if (demoSlotValue && typeof(demoSlotValue) === 'string') {
          slots[demoSlotName] = demoSlotValue;
        }
      }
      return createMarkupExample(tag, attributes, slots, emits);
    },
    js: function () {
      const jsOutput = [];
      const propsOutput = {};
      const slotsOutput = {};
      const tag = _lowerFirst(this.componentName || '').replaceAll(' ', '');

      // Process Props
      Object.keys(this.propsToDemo)
        .sort()
        .forEach((propName) => {
          const value = this.demoProps[propName];
          const defaultValue = this.demo?.component?.props?.[propName]?.default;
          if (
            typeof(value) === 'boolean' &&
            typeof(defaultValue) === 'boolean' &&
            defaultValue === value
          ) {
            return;
          } else if (![undefined, null, ''].includes(value)) {
            propsOutput[propName] = value;
          }
        });

      // Process Slots
      Object.keys(this.demoSlots)
        .sort()
        .forEach((slotName) => {
          const value = this.demoSlots[slotName];
          if (value) {
            slotsOutput[slotName] = value;
          }
        });

      const indent = '\n  ';
      const emitStrings = Object.keys(this.emitsToDemo)
        .filter(Boolean)
        .sort()
        .map(function (emitName) {
          const indent = '  ';
          return [
            '\'' + emitName + '\': function (value) {',
            indent + indent + 'console.log(value);',
            indent + '}'
          ].join('\n');
        });
      const eventsOutput = '{' + indent + emitStrings.join(',' + indent) + '\n}';

      jsOutput.push('const ' + tag + 'Props = ' + deJSONify(propsOutput, '\n') + ';');
      if (Object.keys(slotsOutput).length) {
        jsOutput.push('const ' + tag + 'Slots = ' + deJSONify(slotsOutput, '\n') + ';');
      }
      if (emitStrings.filter(Boolean).length) {
        jsOutput.push('const ' + tag + 'Events = ' + eventsOutput + ';');
      }

      return jsOutput.join('\n');
    }
  },
  watch: {
    demo: function () {
      this.initialize();
    }
  },
  created: function () {
    this.initialize();
  }
};
</script>
