import {
  isComponent,
  unindent
} from '../../helpers.js';

const OPTIONS_EXAMPLE = unindent(`
  <template>
    <VueDoxen :demos="demos" />
  </template>

  <script>
  import { VueDoxen } from 'vue-doxen';

  import MyButton from '../components/MyButton.vue';
  import MyCheckbox from '../components/MyCheckbox.vue';
  import myRadioDialDemo from '../demos/myRadioDialDemo.js';

  export default {
    components: { VueDoxen },
    computed: {
      demos: function () {
        return {
          // Don't directly pass in components
          MyButton,
          // Wrap them in a demo object
          { component: MyCheckbox },
          // Or import the wrapped demo object and pass that in
          myRadioDialDemo
        };
      }
    }
  };
  </script>
`);
const COMPOSITION_EXAMPLE = unindent(`
  <template>
    <VueDoxen :demos="demos" />
  </template>

  <script>
  import { VueDoxen } from 'vue-doxen';
  import { computed } from 'vue';

  import MyButton from '../components/MyButton.vue';
  import MyCheckbox from '../components/MyCheckbox.vue';
  import myRadioDialDemo from '../demos/myRadioDialDemo.js';

  export default {
    components: { VueDoxen },
    setup: function () {
      const demos = computed(() => {
        return {
          // Don't directly pass in components
          MyButton,
          // Wrap them in a demo object
          { component: MyCheckbox },
          // Or import the wrapped demo object and pass that in
          myRadioDialDemo
        };
      });
      return {
        demos
      };
    }
  };
  </script>
`);
const SCRIPT_SETUP_EXAMPLE = unindent(`
  <template>
    <VueDoxen :demos="demos" />
  </template>

  <script setup>
  import { VueDoxen } from 'vue-doxen';
  import { computed } from 'vue';

  import MyButton from '../components/MyButton.vue';
  import MyCheckbox from '../components/MyCheckbox.vue';
  import myRadioDialDemo from '../demos/myRadioDialDemo.js';

  const demos = computed(() => {
    return {
      // Don't directly pass in components
      MyButton,
      // Wrap them in a demo object
      { component: MyCheckbox },
      // Or import the wrapped demo object and pass that in
      myRadioDialDemo
    };
  });
  </script>
`);

const ruleName = 'demos.onlyAllowDemoObjects';

/** @type {import('../../../types').RULEDEFINITION} */
export const onlyAllowDemoObjects = {
  rule: function (demos, options, linterSettings, errors) {
    if (linterSettings.demos.onlyAllowDemoObjects) {
      for (const demoName in demos) {
        const demo = demos[demoName];
        if (isComponent(demo)) {
          const message = 'The ' + demoName + ' component must be wrapped in a demo object.';
          errors.push({
            ruleName,
            demoName,
            message
          });
        }
      }
    }
  },
  title: ruleName,
  description: 'Requires the demos object not to have any components at the top level.',
  url: '/vue-doxen/getting-started#getting-started',
  examples: {
    Options: OPTIONS_EXAMPLE,
    Composition: COMPOSITION_EXAMPLE,
    'Script Setup': SCRIPT_SETUP_EXAMPLE
  }
};
