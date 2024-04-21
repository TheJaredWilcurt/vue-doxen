<template>
  <div>
    {{ title }}

    <div>
      DoxenDemoHeader
      :title="title"
      :description="demo.description"
    </div>

    <div>
      Usage
      import whatever from whatever
    </div>

    <div>
      <hr />
      <!-- eslint-disable vue/no-v-text-v-html-on-component -->
      <component
        :is="demo.component"
        v-bind="demoProps"
        v-on="demoEvents"
      />
      <hr />
    </div>

    <h3>Props Playground:</h3>

    <input :value="allProps" type="hidden" />

    <form class="cluster" data-variant="brick">
      <div
        v-for="prop in demo.propsPlayground"
        class="box"
        :title="propTypeTitle(prop)"
        :key="prop.propName"
      >
        <component
          v-model="propsPlayground[prop.propName]"
          :is="prop.component"
          v-bind="prop.props"
        />
      </div>
    </form>

    CodeSwapper
    :vue="markup"
    :javascript="js"

    <h3>Props Documentation</h3>

    PropsDocumentation
    :component="demo.component"


    <h3>Emits Documentation</h3>

    EmitsDocumentation
    :component="demo.component"
    :emitsDocumentation="demo.emitsDocumentation"
  </div>
</template>

<script>
import _lowerFirst from 'lodash.lowerfirst';
import _startCase from 'lodash.startcase';

import {
  createMarkupExample,
  deJSONify
} from '@/helpers/demoHelpers.js';

/*
import CodeBox from '@/components/CodeBox.vue';
import CodeSwapper from '@/components/CodeSwapper.vue';
import DemoHeader from '@/components/DemoHeader.vue';
import EmitsDocumentation from '@/components/EmitsDocumentation.vue';
import PropsDocumentation from '@/components/PropsDocumentation.vue';
*/

export default {
  name: 'DoxenComponentDemo',
  /*
  components: {
    CodeBox,
    CodeSwapper,
    DemoHeader,
    EmitsDocumentation,
    PropsDocumentation
  },
  */
  props: {
    demo: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      propsPlayground: {}
    };
  },
  computed: {
    title: function () {
      return _startCase(this.demo?.component?.name);
    },
    allProps: function () {
      return Object.keys(this.demo?.component?.props).join(', ');
    },
    demoProps: function () {
      const props = {
        ...this.propsPlayground
      };
      return props;
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
      const tag = this.demo?.component?.name || '';
      const emits = this.demo?.component?.emits || [];
      const demoPlayground = this.demo?.propsPlayground || [];
      const attributes = demoPlayground
        .map((prop) => {
          return {
            name: prop.propName,
            value: this.propsPlayground[prop.propName],
            required: !!prop.props?.required
          };
        });
      const slot = this.propsPlayground?.slot;
      return createMarkupExample(tag, attributes, slot, emits);
    },
    js: function () {
      const propsOutput = {};
      const tag = _lowerFirst(this.demo?.component?.name || '');
      const demoPlayground = this.demo?.propsPlayground || [];
      demoPlayground
        .forEach((prop) => {
          const propName = prop.propName;
          const value = this.propsPlayground[prop.propName];
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
      propsOutput.innerHTML = this.propsPlayground?.slot;
      const propsJs = 'const ' + tag + 'Props = ' + deJSONify(propsOutput, '\n') + ';';

      const indent = '\n  ';
      const emits = this.demo?.emitsDocumentation || [];
      const emitStrings = emits
        .filter(Boolean)
        .map(function (emit) {
          const indent = '  ';
          return [
            emit.name + ': function ($event, value) {',
            indent + indent + 'console.log($event, value);',
            indent + '}'
          ].join('\n');
        });
      const eventsOutput = '{' + indent + emitStrings.join(',' + indent) + '\n}';
      const eventsJs = 'const ' + tag + 'Events = ' + eventsOutput + ';';
      if (!emits.length) {
        return propsJs;
      }
      return [propsJs, eventsJs].join('\n');
    }
  }
};
</script>
