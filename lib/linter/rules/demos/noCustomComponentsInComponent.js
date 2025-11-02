import {
  getAllPropNames,
  getAllSlotNames,
  isComponent,
  unindent
} from '@/linter/helpers.js';

const DEMO_EXAMPLE = unindent(`
  import MyComponent from '@/components/MyComponent.vue';
  import MyCustomComponent from '@/components/MyCustomComponent.vue';

  export const myComponentDemo = {
    component: MyComponent,
    propsToDemo: {
      myProp: {
        // GOOD
        component: MyCustomComponent
      }
    }
  };
`);
const OPTIONS_EXAMPLE = unindent(`
  <script>
  // BAD: Do not import custom documentation components in your actual component
  import MyCustomComponent from '@/components/MyCustomComponent.vue';

  export default {
    name: 'MyComponent',,
    propsToDemo: {
      myProp: {
        // BAD
        component: MyCustomComponent
      }
    }
  };
  </script>
`);
const SCRIPT_SETUP_EXAMPLE = unindent(`
  <script setup>
  // BAD: Do not import custom documentation components in your actual component
  import MyCustomComponent from '@/components/MyCustomComponent.vue';

  defineOptions({
    name: 'MyComponent',,
    propsToDemo: {
      myProp: {
        // BAD
        component: MyCustomComponent
      }
    }
  });
  </script>
`);

/** @type {import('../../../../types').RULEDEFINITION} */
export const noCustomComponentsInComponent = {
  rule: function (demos, options, linterSettings, errors) {
    if (linterSettings.demos.noCustomComponentsInComponent) {
      for (const demoName in demos) {
        const demo = demos[demoName];
        let component;

        /* v8 ignore else */
        if (isComponent(demo)) {
          component = demo;
        } else if (isComponent(demo.component)) {
          component = demo.component;
        }

        /* v8 ignore else */
        if (component) {
          function propOrSlotHasCustomComponent (propsOrSlots, name) {
            return (
              typeof(propsOrSlots) === 'object' &&
              !Array.isArray(propsOrSlots) &&
              propsOrSlots[name] &&
              isComponent(propsOrSlots[name].component)
            );
          }

          const allPropNames = getAllPropNames(component);
          for (const propName of allPropNames) {
            const propHasCustomComponent = (
              component.props &&
              propOrSlotHasCustomComponent(component.props, propName)
            );
            const propsToDemoHasCustomComponent = (
              component.propsToDemo &&
              propOrSlotHasCustomComponent(component.propsToDemo, propName)
            );

            /* v8 ignore else */
            if (propHasCustomComponent || propsToDemoHasCustomComponent) {
              const message = 'The ' + demoName + ' demo component\'s prop ' + propName + ' should not contain a custom documentation component, move it to a demo file.';
              console.info(message);
              errors.push(demoName);
            }
          }

          const allSlotNames = getAllSlotNames(component);
          for (const slotName of allSlotNames) {
            const slotHasCustomComponent = (
              component.slots &&
              propOrSlotHasCustomComponent(component.slots, slotName)
            );
            const slotsToDemoHasCustomComponent = (
              component.slotsToDemo &&
              propOrSlotHasCustomComponent(component.slotsToDemo, slotName)
            );

            /* v8 ignore else */
            if (slotHasCustomComponent || slotsToDemoHasCustomComponent) {
              const message = 'The ' + demoName + ' demo component\'s slot ' + slotName + ' should not contain a custom documentation component, move it to a demo file.';
              console.info(message);
              errors.push(demoName);
            }
          }

          function warnAboutSpecificKey (key) {
            if (
              component[key] &&
              typeof(component[key]) === 'object' &&
              component[key].component &&
              isComponent(component[key].component)
            ) {
              const message = 'The ' + demoName + ' demo component\'s ' + key + ' should not be a custom documentation component, move it to a demo file.';
              console.info(message);
              errors.push(demoName);
            }
          }
          warnAboutSpecificKey('deprecationNotice');
          warnAboutSpecificKey('title');
          warnAboutSpecificKey('description');
          warnAboutSpecificKey('importStatement');
        }
      }
    }
  },
  title: 'demos.noCustomComponentsInComponent',
  description: [
    'Requires moving documentation specific child components to a demo file to',
    'avoid incurring file size bloat in the original component being documented.'
  ].join(' '),
  url: '/vue-doxen/demo-files#demo-files',
  examples: {
    'Demo File': DEMO_EXAMPLE,
    Options: OPTIONS_EXAMPLE,
    Composition: OPTIONS_EXAMPLE,
    'Script Setup': SCRIPT_SETUP_EXAMPLE
  }
};
