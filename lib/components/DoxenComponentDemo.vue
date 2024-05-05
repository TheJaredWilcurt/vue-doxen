<template>
  <div v-bind="applyStyleTokens({ componentDemo: true })">
    <DemoHeader
      :description="description"
      :styleTokens="styleTokens"
      :title="title"
    />

    <template v-if="importStatement">
      <template v-if="typeof(importStatement) === 'string'">
        <h3 v-bind="applyStyleTokens({ componentDemoH3: true })">Usage</h3>
        <CodeBox
          :code="importStatement"
          language="javascript"
          :styleTokens="styleTokens"
        />
      </template>
      <template v-else-if="typeof(importStatement) === 'object' && importStatement.component">
        <component
          :is="importStatement.component"
          v-bind="importStatement.props"
          v-on="importStatement.events"
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
      <DoxenTextarea
        v-for="(slotValue, slotName) in slotsToDemo"
        v-model="demoSlots[slotName]"
        :label="_startCase(slotName) + ' Slot'"
        :styleTokens="styleTokens"
        :key="'slot-playground-' + slotName"
      />
    </form>

    <CodeSwapper
      :codeTypes="{
        Vue: markup,
        JavaScript: js
      }"
      :styleTokens="styleTokens"
    />

    <h3 v-bind="applyStyleTokens({ componentDemoH3: true })">Props Documentation</h3>
    <PropsDocumentation
      :component="demo.component"
      :propsToDemo="propsToDemo"
      :styleTokens="styleTokens"
    />

    <template
      v-if="(
        (emitsDocumentation && emitsDocumentation.length) ||
        (demo.component.emits && demo.component.emits.length)
      )"
    >
      <h3 v-bind="applyStyleTokens({ componentDemoH3: true })">Emits Documentation</h3>
      <EmitsDocumentation
        :component="demo.component"
        :emitsDocumentation="emitsDocumentation"
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
import { styleTokens } from '@/helpers/props.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

import CodeBox from '@/components/CodeBox.vue';
import CodeSwapper from '@/components/CodeSwapper.vue';
import DemoHeader from '@/components/DemoHeader.vue';
import EmitsDocumentation from '@/components/EmitsDocumentation.vue';
import PropsDocumentation from '@/components/PropsDocumentation.vue';
import DoxenTextarea from '@/components/formFields/DoxenTextarea.vue';

export default {
  name: 'DoxenComponentDemo',
  components: {
    CodeBox,
    CodeSwapper,
    DemoHeader,
    DoxenTextarea,
    EmitsDocumentation,
    PropsDocumentation
  },
  mixins: [applyStyleTokens],
  props: {
    demo: {
      type: Object,
      required: true
    },
    styleTokens
  },
  data: function () {
    return {
      demoProps: {},
      demoSlots: {}
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
    },
    handleArrayOrObjectInputForSlotsAndEmits: function (demoItems) {
      let itemsToDemo = {};

      if (!demoItems) {
        return itemsToDemo;
      }

      if (Array.isArray(demoItems)) {
        for (const item of demoItems) {
          if (typeof(item) === 'string') {
            itemsToDemo[item] = '';
          }
        }
      } else if (typeof(demoItems) === 'object') {
        for (const itemName in demoItems) {
          if (typeof(demoItems[itemName]) === 'string') {
            itemsToDemo[itemName] = demoItems[itemName];
          } else {
            itemsToDemo[itemName] = deJSONify(demoItems[itemName]);
          }
        }
      }

      return itemsToDemo;
    }
  },
  computed: {
    componentName: function () {
      return (
        this.demo?.name ||
        this.demo?.component?.name ||
        this.demo?.component?.__name ||
        ''
      );
    },
    title: function () {
      return _startCase(this.componentName);
    },
    description: function () {
      return (
        this.demo?.description ||
        this.demo?.component?.description
      );
    },
    emitsDocumentation: function () {
      return (
        this.demo?.emitsDocumentation ||
        this.demo?.component?.emitsDocumentation
      );
    },
    importStatement: function () {
      return (
        this.demo?.importStatement ||
        this.demo?.component?.importStatement
      );
    },
    emitsToDemo: function () {
      const demoEmits = this.demo?.emitsToDemo || this.demo?.component?.emits;
      return this.handleArrayOrObjectInputForSlotsAndEmits(demoEmits);
    },
    slotsToDemo: function () {
      const demoSlots = this.demo?.slotsToDemo || this.demo?.component?.slots;
      return this.handleArrayOrObjectInputForSlotsAndEmits(demoSlots);
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
      this.demo?.emitsDocumentation?.forEach((emitDetails) => {
        const emit = emitDetails.name;
        events[emit] = ($event, value) => {
          this.propsPlayground.emit.push({ emit, $event, value });
          // Intentional console log to demonstrate emits
          console.log(this.title + ' emit log:', { emit, $event, value });
        };
      });
      return events;
    },
    markup: function () {
      const tag = (this.componentName || '').replaceAll(' ', '');
      const emits = this.demo?.component?.emits || [];
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
