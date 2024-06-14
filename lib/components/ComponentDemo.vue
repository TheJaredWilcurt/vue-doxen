<template>
  <div v-bind="applyStyleTokens({ componentDemo: true })">
    <!-- DoxenHeader -->
    <component
      :is="options.components.header"
      :styleTokens="styleTokens"
      :title="title"
    />

    <template v-if="description">
      <div
        v-if="typeof(description) === 'string'"
        v-html="description"
        v-bind="applyStyleTokens({ demoDescription: true })"
      ></div>
      <component
        v-else-if="typeof(description) === 'object' && description.component"
        :is="description.component"
        v-bind="description.props || {}"
        v-on="description.events || {}"
        :key="componentName + '-description'"
      />
    </template>

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

    <!-- Component being demo'd -->
    <div v-bind="applyStyleTokens({ componentDemoContainer: true })">
      <hr v-bind="applyStyleTokens({ componentDemoHr: true })" />
      <component
        :is="demo.component"
        v-bind="demoProps"
        v-on="demoEvents"
        :key="componentName + '-demo'"
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

    <form
      v-bind="applyStyleTokens({ propsPlaygroundForm: true })"
      @submit.prevent
    >
      <!-- Anything for Props -->
      <component
        v-for="(prop, propName) in propsToDemo"
        v-bind="prop.props || {}"
        v-model="demoProps[propName]"
        :is="prop.component"
        v-on="prop.events || {}"
        :key="propName"
      >
        <template
          v-for="(slotValue, slotName) in prop.slots"
          #[slotName]
        >
          <span
            v-html="slotValue"
            :key="'slot-' + slotName"
          ></span>
        </template>
      </component>
      <!-- Slots Playground -->
      <template v-for="(slotValue, slotName) in slotsToDemo">
        <!-- Custom component for slots -->
        <component
          v-if="slotValue.component"
          v-bind="{
            ...(slotValue.props || {}),
            modelValue: demoSlots[slotName]
          }"
          :is="slotValue.component"
          v-on="{
            ...(slotValue.events || {}),
            'update:model-value': ($event) => demoSlots[slotName] = $event,
            'update:modelValue': ($event) => demoSlots[slotName] = $event
          }"
          :key="'custom-slot-playground' + slotName"
        />
        <!-- DoxenTextarea for slots -->
        <component
          v-else
          v-model="demoSlots[slotName]"
          :is="options.components.textarea"
          :label="_startCase(slotName) + ' Slot'"
          :styleTokens="styleTokens"
          :key="'slot-playground-' + slotName"
        />
      </template>
      <!-- DoxenEmitLog for emits -->
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

    <!-- DoxenPropsDocumentation -->
    <component
      :is="options.components.propsDocumentation"
      :propsToDemo="playgroundProps"
      :styleTokens="styleTokens"
    />

    <template v-if="Object.keys(emitsToDemo).length">
      <!-- DoxenEmitsDocumentation -->
      <component
        :is="options.components.emitsDocumentation"
        :componentName="componentName"
        :emitsToDemo="emitsToDemo"
        :styleTokens="styleTokens"
      />
    </template>
  </div>
</template>

<script>
import _cloneDeep from 'lodash.clonedeep';
import _lowerFirst from 'lodash.lowerfirst';
import _startCase from 'lodash.startcase';

import {
  autoGeneratePlaygroundProps,
  combinePropsAndPropsToDemo,
  createMarkupExample,
  getDefaultValue
} from '@/helpers/demoHelpers.js';
import {
  createVueDoxenOptions,
  styleTokens
} from '@/helpers/props.js';
import { serializeJavaScript } from '@/helpers/serializeJavaScript.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

import CodeBox from '@/components/CodeBox.vue';
import CodeSwapper from '@/components/CodeSwapper.vue';

const options = createVueDoxenOptions(true);

export default {
  name: 'ComponentDemo',
  components: {
    CodeBox,
    CodeSwapper
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
        const propDefault = getDefaultValue(this.playgroundProps?.[propName]?.default);
        const modelValue = this.propsToDemo?.[propName]?.props?.modelValue;

        if (propDefault === undefined && modelValue === undefined) {
          this.demoProps[propName] = undefined;
        } else {
          if (propDefault !== undefined) {
            this.demoProps[propName] = propDefault;
          }
          // Intentionally not using else if
          if (modelValue !== undefined) {
            this.demoProps[propName] = modelValue;
          }
        }
      }
      for (const slotName in this.slotsToDemo) {
        this.demoSlots[slotName] = getDefaultValue(this.slotsToDemo?.[slotName].default);
      }
    }
  },
  computed: {
    componentName: function () {
      return (
        this.demo?.component?.name ||
        this.demo?.name ||
        this.demo?.component?.__name ||
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
            const value = emits[emitName];
            demoEmits[emitName] = demoEmits[emitName] || {};
            // emits[emitName] may be a validator function if using Vue's objet API
            if (
              typeof(value) === 'object' &&
              !Array.isArray(value)
            ) {
              demoEmits[emitName] = {
                ...demoEmits[emitName],
                ...emits[emitName]
              };
            }
            if (typeof(value) === 'function') {
              demoEmits[emitName].validator = value;
            }
          }
        }
      }

      handleEmitArrays(this.demo?.component?.emits);
      handleEmitArrays(this.demo?.component?.emitsToDemo);
      handleEmitArrays(this.demo?.emitsToDemo);

      handleEmitObjects(this.demo?.emitsToDemo);
      handleEmitObjects(this.demo?.component?.emitsToDemo);
      handleEmitObjects(this.demo?.component?.emits);

      return demoEmits;
    },
    slotsToDemo: function () {
      let slotsToDemo = {};

      function handleSlotArrays (slots) {
        if (slots && Array.isArray(slots) && slots.length) {
          for (const slotName of slots) {
            slotsToDemo[slotName] = {
              default: '',
              ...(slotsToDemo[slotName] || {})
            };
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
            const value = slots[slotName];
            if (typeof(value) === 'string') {
              slotsToDemo[slotName] = {
                ...(slotsToDemo[slotName] || {}),
                default: value
              };
            } else if (
              typeof(value) === 'object' &&
              !Array.isArray(value)
            ) {
              slotsToDemo[slotName] = {
                default: '',
                ...(slotsToDemo[slotName] || {}),
                ...value
              };
            }
          }
        }
      }

      /**
       * ORDER: Stuff in the component always wins over the demo file.
       * However, because component.slot is not part of Vue's documented
       * API, we are preferring component.slotsToDemo, in case Vue ever
       * claims component.slots for something in the future. Users can
       * store both in the component and we won't override the
       * component.slotsToDemo documentation for the unknown
       * component.slots. Also arrays go first because they are just
       * slot names and don't have default string values.
       */
      handleSlotArrays(this.demo?.slotsToDemo);
      handleSlotArrays(this.demo?.component?.slots);
      handleSlotArrays(this.demo?.component?.slotsToDemo);

      handleSlotObjects(this.demo?.slotsToDemo);
      handleSlotObjects(this.demo?.component?.slots);
      handleSlotObjects(this.demo?.component?.slotsToDemo);

      // Defaults
      for (const slotName in slotsToDemo) {
        slotsToDemo[slotName].default = (
          slotsToDemo[slotName]?.props?.modelValue ||
          String(getDefaultValue(slotsToDemo[slotName].default))
        );
      }

      return slotsToDemo;
    },
    playgroundProps: function () {
      const propsToDemo = this.demo?.propsToDemo || {};
      const componentProps = this.demo?.component?.props || {};
      const playgroundProps = combinePropsAndPropsToDemo(propsToDemo, componentProps);
      return playgroundProps;
    },
    propsToDemo: function () {
      const playgroundProps = this.playgroundProps;
      const components = this.options.components;
      const tokens = this.styleTokens;
      const autoGeneratedPlaygroundProps = autoGeneratePlaygroundProps(playgroundProps, components, tokens);
      return autoGeneratedPlaygroundProps;
    },
    demoEvents: function () {
      const events = {};
      // Loop over all defined emits
      Object.keys(this.emitsToDemo).forEach((emitName) => {
        // Create a v-on event on the object
        events[emitName] = (value) => {
          // When an emit occurs, add it to the emit log
          this.emitLog.push(_cloneDeep({ emitName, value }));
          // If the demo file has a callback for this emit
          if (
            this.demo?.events?.[emitName] &&
            typeof(this.demo.events[emitName]) === 'function'
          ) {
            // Run the callback in the demo file
            this.demo.events[emitName](value);
          }
          // Intentional console.info to demonstrate emits
          console.info(this.title + ' emit log:', { emitName, value });

          // If the emit is part of a v-model
          if (emitName.startsWith('update:')) {
            // Get the prop name ('model-value', or whatever)
            let modelName = emitName.replace('update:', '');
            if (modelName === 'model-value') {
              modelName = 'modelValue';
            }
            // Update the value to be passed in, like v-model would
            this.demoProps[modelName] = value;
          }
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
            default: getDefaultValue(this.playgroundProps?.[propName]?.default),
            name: propName,
            required: !!this.demo?.component?.props?.[propName]?.required,
            value: this.demoProps[propName]
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
          const defaultValue = getDefaultValue(this.playgroundProps?.[propName]?.default);
          if (
            typeof(value) === 'boolean' &&
            typeof(defaultValue) === 'boolean' &&
            defaultValue === value
          ) {
            return;
          } else if (defaultValue === value) {
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
      let serializedProps = '';
      try {
        serializedProps = serializeJavaScript(propsOutput);
      } catch (error) {
        console.log(error);
      }

      jsOutput.push('const ' + tag + 'Props = ' + serializedProps + ';');
      if (Object.keys(slotsOutput).length) {
        let serializedSlots = '';
        try {
          serializedSlots = serializeJavaScript(slotsOutput);
        } catch (error) {
          console.log(error);
        }
        jsOutput.push('const ' + tag + 'Slots = ' + serializedSlots + ';');
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
