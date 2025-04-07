function unindent (value) {
  if (
    !value.startsWith('  ') &&
    !value.startsWith('\n  ')
  ) {
    return value;
  }
  return value
    .split('\n')
    .map((line) => {
      if (line.startsWith('  ')) {
        return line.replace('  ', '');
      }
      return line;
    })
    .join('\n')
    .trim();
}

export const ALTERNATE_COMPOSITION_DEMO_EXAMPLE = unindent(`
  <template>
    <VueDoxen
      modelValue="MyComponent"
      :demos="{ MyComponent: demo }"
    />
  </template>

  <script>
  import { computed } from 'vue';
  import { VueDoxen } from 'vue-doxen';

  import MyComponent from '../components/MyComponent.vue';

  export default {
    name: 'MyComponentDemo',
    components: {
      VueDoxen
    },
    setup: function () {
      const demo = computed(() => {
        return {
          component: MyComponent,
          importStatement: 'import { MyComponent } from \\'my-component-library\\'',
          slotsToDemo: {
            default: 'This is the text for the demo of the default slot.'
          }
        };
      };
      return {
        demo
      };
    }
  };
  </script>
`);
export const ALTERNATE_OPTIONS_DEMO_EXAMPLE = unindent(`
  <template>
    <VueDoxen
      modelValue="MyComponent"
      :demos="{ MyComponent: demo }"
    />
  </template>

  <script>
  import { VueDoxen } from 'vue-doxen';

  import MyComponent from '../components/MyComponent.vue';

  export default {
    name: 'MyComponentDemo',
    components: {
      VueDoxen
    },
    computed: {
      demo: function () {
        return {
          component: MyComponent,
          importStatement: 'import { MyComponent } from \\'my-component-library\\'',
          slotsToDemo: {
            default: 'This is the text for the demo of the default slot.'
          }
        };
      }
    }
  };
  </script>
`);
export const ALTERNATE_SCRIPT_SETUP_DEMO_EXAMPLE = unindent(`
  <template>
    <VueDoxen
      modelValue="MyComponent"
      :demos="{ MyComponent: demo }"
    />
  </template>

  <script setup>
  import { computed } from 'vue';
  import { VueDoxen } from 'vue-doxen';

  import MyComponent from '../components/MyComponent.vue';

  defineOptions({
    name: 'MyComponentDemo'
  });

  const demo = computed(() => {
    return {
      component: MyComponent,
      importStatement: 'import { MyComponent } from \\'my-component-library\\'',
      slotsToDemo: {
        default: 'This is the text for the demo of the default slot.'
      }
    };
  };
  </script>
`);
export const ALTERNATE_VUE_ROUTER_EXAMPLE = unindent(`
  import { createRouter, createWebHistory } from 'vue-router';

  const routes = [
    // ...other routes,
    {
      // Create the path for the URL
      path: '/components/my-component',
      // Give it an optional name
      name: 'MyComponentDemo',
      // Asynchronously import the demo component
      component: () => import('../demos/MyComponentDemo.vue')
    }
  ];

  // Create the router
  const router = createRouter({
    // Use the correct history mode for your project
    history: createWebHistory(),
    routes
  });

  // Export the router
  export default router;
`);

export const BARE_MINIMUM_EXAMPLE = unindent(`
  <template>
    <VueDoxen :demos="demos" />
  </template>
  <script>
  import { VueDoxen } from 'vue-doxen';
  import MyComponent from './MyComponent.vue';

  export default {
    components: { VueDoxen },
    computed: {
      demos: function () {
        return { MyComponent };
      }
    }
  };
  </script>
`);
export const BARE_MINIMUM_COMPOSITION_EXAMPLE = unindent(`
  <template>
    <VueDoxen :demos="{ MyComponent }" />
  </template>
  <script>
  import { VueDoxen } from 'vue-doxen';
  import MyComponent from './MyComponent.vue';

  export default {
    components: { VueDoxen },
    setup: function () {
      return { MyComponent };
    }
  };
  </script>
`);
export const BARE_MINIMUM_SCRIPT_SETUP_EXAMPLE = unindent(`
  <template>
    <VueDoxen :demos="{ MyComponent }" />
  </template>
  <script setup>
  import { VueDoxen } from 'vue-doxen';
  import MyComponent from './MyComponent.vue';
  </script>
`);

export const BASIC_PROPS_DEMO_FILE = unindent(`
  import YourComponent from '../components/YourComponent.vue';

  export const yourComponentDemo = {
    component: YourComponent,
    propsToDemo: {
      amount: {
        // Placing this information in the Demo file means they
        // are not used by Vue for runtime validation and
        // defaulting of inputs. You are better off placing
        // these basic prop definitions in your component.
        type: [Number, String],
        required: false,
        default: 2,
        validator: function (value) {
          return value < 5;
        }
      }
    }
  };
`);
export const BASIC_PROPS_OPTIONS = unindent(`
  <script>
  export default {
    props: {
      amount: {
        type: [Number, String],
        required: false,
        default: 2,
        validator: function (value) {
          return value < 5;
        }
      }
    }
  };
  </script>
`);
export const BASIC_PROPS_SCRIPT_SETUP = unindent(`
  <script setup>
  defineProps({
    amount: {
      type: [Number, String],
      required: false,
      default: 2,
      validator: function (value) {
        return value < 5;
      }
    }
  });
  </script>
`);

export const COMPONENT_DESCRIPTION_DEMO_EXAMPLE = unindent(`
  import YourComponent from '../components/YourComponent.vue';

  export const yourComponentDemo = {
    component: YourComponent,
    description: 'Context of <em>why your component exists/what it does</em>.'
  };
`);
export const COMPONENT_DESCRIPTION_OPTIONS_EXAMPLE = unindent(`
  <script>
  export default {
    description: 'Context of <em>why your component exists/what it does</em>.'
  };
  </script>
`);
export const COMPONENT_DESCRIPTION_SCRIPT_SETUP_EXAMPLE = unindent(`
  <script setup>
  defineOptions({
    description: 'Context of <em>why your component exists/what it does</em>.'
  });
  </script>
`);

export const COMPONENT_NAME_DEMO_EXAMPLE = unindent(`
  import YourComponent from '../components/YourComponent.vue';

  export const yourComponentDemo = {
    component: YourComponent,
    name: 'YourComponent'
  };
`);
export const COMPONENT_NAME_OPTIONS_EXAMPLE = unindent(`
  <script>
  export default {
    name: 'YourComponent'
  };
  </script>
`);
export const COMPONENT_NAME_SCRIPT_SETUP_EXAMPLE = unindent(`
  <script setup>
  defineOptions({
    name: 'YourComponent'
  });
  </script>
`);

export const COMPOSE_ALL_DEMOS_EXAMPLE = unindent(`
  import ComponentA from '../components/ComponentA.vue';
  import ComponentB from '../components/ComponentB.vue';

  import { componentCDemo } from './componentCDemo.js';
  import { componentDDemo } from './componentDDemo.js';

  export const demos = {
    ComponentA,
    ComponentB,
    ComponentC: componentCDemo,
    ComponentD: componentDDemo
  };
`);

export const CUSTOM_COMPONENTS_DEMO_EXAMPLE = unindent(`
  import MyComponent from '../components/MyComponent.vue';
  import MyCustomColorPicker from '../components/MyCustomColorPicker.vue';

  export const myComponentDemo = {
    component: MyComponent,
    propsToDemo: {
      color: {
        component: MyCustomColorPicker,
        props: {
          // Default value to demo
          modelValue: 'red'
          // any other props your custom component takes
        }
      }
    }
  };
`);
export const CUSTOM_COMPONENTS_OPTIONS_EXAMPLE = unindent(`
  <script>
  // DO NOT ACTUALLY DO THIS! USE A DEMO FILE INSTEAD.
  // Though this is technically supported, importing custom components
  // into your component just for Vue-Doxen will bloat your component's
  // file size for no real benefit. If you want to use your own
  // components in the props playground, just use a demo file.
  import MyCustomColorPicker from '../MyCustomColorPicker.vue';

  export default {
    name: 'MyComponent',
    props: {
      color: {
        component: MyCustomColorPicker,
        props: {
          // Default value to demo
          modelValue: 'red'
          // any other props your custom component takes
        }
      }
    }
  };
  </script>
`);
export const CUSTOM_COMPONENTS_SCRIPT_SETUP_EXAMPLE = unindent(`
  <script setup>
  // DO NOT ACTUALLY DO THIS! USE A DEMO FILE INSTEAD.
  // Though this is technically supported, importing custom components
  // into your component just for Vue-Doxen will bloat your component's
  // file size for no real benefit. If you want to use your own
  // components in the props playground, just use a demo file.
  import MyCustomColorPicker from '../MyCustomColorPicker.vue';

  defineOptions({
    name: 'MyComponent'
  });

  defineProps({
    color: {
      component: MyCustomColorPicker,
      props: {
        // Default value to demo
        modelValue: 'red'
        // any other props your custom component takes
      }
    }
  });
  </script>
`);

export const DEMO_FILE_EXAMPLE = unindent(`
  import MyComponent from '../components/MyComponent.vue';
  import MyCustomColorPicker from '../components/MyCustomColorPicker.vue';

  export const myComponentDemo = {
    component: MyComponent,
    description: '<p>Some description of the component.</p>',
    importStatement: 'import { MyComponent } from \\'my-component-library\\';',
    propsToDemo: {
      color: {
        component: MyCustomColorPicker,
        props: {
          // Default value to demo
          modelValue: 'red'
          // any other props your custom component takes
        },
        slots: {
          default: 'If your custom component expects something in a slot'
        },
        // If your component emits anything you can listen for it here
        events: {
          'update:modelValue': function (value) {
            console.log({ value });
          }
        }
      },
      /* Any prop not defined here will be automatically
       * added to the props playground using simple Vue-Doxen
       * provided components.
       */
    },
    slotsToDemo: {
      default: 'This is the prefilled text for the demo of the default slot.',
      footer: 'This is the prefilled text for the demo of the footer slot.'
    },
    events: {
      click: function (value) {
        console.log(
          'If the component you are demoing emits anything,',
          'you can listen for it in this "events" section',
          value
        );
      }
    }
  };
`);
export const DEMO_FILE_USAGE_COMPOSITION_EXAMPLE = unindent(`
  <template>
    <VueDoxen
      v-model="selectedDemo"
      :demos="demos"
    />
  </template>

  <script>
  import { computed, ref } from 'vue';
  import { VueDoxen } from 'vue-doxen';

  // Demo files
  import { myComponentDemo } from '../demos/myComponentDemo.js';
  import { anotherDemo } from '../demos/anotherDemo.js';

  // Components without demo files
  import ComponentA from '../components/ComponentA.vue';

  export default {
    name: 'DocumentationPage',
    components: {
      VueDoxen
    },
    setup: function () {
      const selectedDemo = ref('myComponentDemo');

      const demos = computed(() => {
        // Both demos and components can be passed in.
        return {
          myComponentDemo,
          anotherDemo,
          // If a component is passed in directly we will wrap it,
          // like so: { component: ComponentA }.
          // So all components automatically become demo objects internally.
          ComponentA
        };
      });

      return {
        demos,
        selectedDemo
      };
    }
  };
  </script>
`);
export const DEMO_FILE_USAGE_EXAMPLE = unindent(`
  <template>
    <VueDoxen
      v-model="selectedDemo"
      :demos="demos"
    />
  </template>

  <script>
  import { VueDoxen } from 'vue-doxen';

  // Demo files
  import { myComponentDemo } from '../demos/myComponentDemo.js';
  import { anotherDemo } from '../demos/anotherDemo.js';

  // Components without demo files
  import ComponentA from '../components/ComponentA.vue';

  export default {
    name: 'DocumentationPage',
    components: {
      VueDoxen
    },
    data: function () {
      return {
        selectedDemo: 'myComponentDemo'
      };
    },
    computed: {
      demos: function () {
        // Both demos and components can be passed in.
        return {
          myComponentDemo,
          anotherDemo,
          // If a component is passed in directly we will wrap it,
          // like so: { component: ComponentA }.
          // So all components automatically become demo objects internally.
          ComponentA
        };
      }
    }
  };
  </script>
`);
export const DEMO_FILE_USAGE_SCRIPT_SETUP_EXAMPLE = unindent(`
  <template>
    <VueDoxen
      v-model="selectedDemo"
      :demos="demos"
    />
  </template>

  <script setup>
  import { computed, ref } from 'vue';
  import { VueDoxen } from 'vue-doxen';

  // Demo files
  import { myComponentDemo } from '../demos/myComponentDemo.js';
  import { anotherDemo } from '../demos/anotherDemo.js';

  // Components without demo files
  import ComponentA from '../components/ComponentA.vue';

  const selectedDemo = ref('myComponentDemo');

  const demos = computed(() => {
    // Both demos and components can be passed in.
    return {
      myComponentDemo,
      anotherDemo,
      // If a component is passed in directly we will wrap it,
      // like so: { component: ComponentA }.
      // So all components automatically become demo objects internally.
      ComponentA
    };
  });
  </script>
`);

export const DESCRIPTION_COMPONENT_DEMO_FILE_EXAMPLE = unindent(`
  import MyComponent from '../components/MyComponent.vue';
  import MyDescription from '../components/MyDescription.vue';

  export const myComponentDemo = {
    component: MyComponent,
    description: {
      component: MyDescription,
      // Optional, if your component needs props
      props: {
        yourProp: 'your value'
      },
      // Optional, if your component has slots
      slots: {
        default: '<em>Content</em>'
      },
      // Optional, if your component has emits
      events: {
        click: function ($event) {
          console.log($event);
        }
      }
    }
  };
`);
export const DESCRIPTION_COMPONENT_OPTIONS_EXAMPLE = unindent(`
  <script>
  // DO NOT ACTUALLY DO THIS! USE A DEMO FILE INSTEAD.
  // Though this is technically supported, importing custom components
  // into your component just for Vue-Doxen will bloat your component's
  // file size for no real benefit. If you want to use your own
  // component for the description, just use a demo file.
  import MyDescription from '../components/MyDescription.vue';

  export default {
    description: {
      component: MyDescription,
      // Optional, if your component needs props
      props: {
        yourProp: 'your value'
      },
      // Optional, if your component has slots
      slots: {
        default: '<em>Content</em>'
      },
      // Optional, if your component has emits
      events: {
        click: function ($event) {
          console.log($event);
        }
      }
    }
  };
  </script>
`);
export const DESCRIPTION_COMPONENT_SCRIPT_SETUP_EXAMPLE = unindent(`
  <script setup>
  // DO NOT ACTUALLY DO THIS! USE A DEMO FILE INSTEAD.
  // Though this is technically supported, importing custom components
  // into your component just for Vue-Doxen will bloat your component's
  // file size for no real benefit. If you want to use your own
  // component for the description, just use a demo file.
  import MyDescription from '../components/MyDescription.vue';

  defineOptions({
    description: {
      component: MyDescription,
      // Optional, if your component needs props
      props: {
        yourProp: 'your value'
      },
      // Optional, if your component has slots
      slots: {
        default: '<em>Content</em>'
      },
      // Optional, if your component has emits
      events: {
        click: function ($event) {
          console.log($event);
        }
      }
    }
  });
  </script>
`);

export const DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_DEMO_FILE = unindent(`
  import YourComponent from '../components/YourComponent.vue';

  const OPTIONS_EXAMPLE = \`
  [
    {
      name: 'Kiva.org',
      value: 'kiva'
    },
    {
      name: 'Good.store',
      value: 'goodstore'
    }
  ]
  \`.trim();

  export const yourComponentDemo = {
    component: YourComponent,
    propsToDemo: {
      percent: {
        min: 0,
        max: 100
      },
      color: {
        allowed: ['gold', 'silver', 'bronze'],
        description: 'The trophy color to convey first, second, or third place.'
      },
      options: {
        // A complex validator function is defined on this prop in
        // the component, so to better convey what type of data is
        // expected, an example is also given.
        example: OPTIONS_EXAMPLE
      }
    }
  };
`);
export const DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_OPTIONS = unindent(`
  <script>
  const OPTIONS_EXAMPLE = \`
  [
    {
      name: 'Kiva.org',
      value: 'kiva'
    },
    {
      name: 'Good.store',
      value: 'goodstore'
    }
  ]
  \`.trim();
  const ALLOWED_COLORS = ['gold', 'silver', 'bronze'];

  export default {
    props: {
      percent: {
        min: 0,
        max: 100
      },
      color: {
        allowed: ALLOWED_COLORS,
        description: 'The trophy color to convey first, second, or third place.',
        validator: function (value) {
          return ALLOWED_COLORS.includes(value);
        }
      },
      options: {
        // A complex validator function is defined, so to better convey what
        // type of data is expected, an example is also given.
        example: OPTIONS_EXAMPLE,
        validator: function (options) {
          let valid = true;
          if (Array.isArray(options)) {
            options.forEach(function (option) {
              if (
                typeof(option) !== 'object' ||
                Array.isArray(option) ||
                !option.name ||
                (
                  typeof(option.value) !== 'string' &&
                  option.value !== null
                )
              ) {
                valid = false;
              }
            });
          } else {
            valid = false;
          }
          return valid;
        }
      }
    }
  };
  </script>
`);
export const DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_SCRIPT_SETUP = unindent(`
  <script setup>
  // Because "Script Setup" components are actually just the setup function
  // in disguise, and props are defined outside of the setup function; when
  // you use the defineProps macro, the code is actually hoisted to a normal
  // <script> block, which is ran in a different context and therefor cannot
  // access variables defined in the <script setup> block. All this to say,
  // if you use <script setup> you'll need to hard-code values in your prop
  // definitions. This, among many other reasons, is why <script setup>
  // is not a great choice for documenting (or writing) your components.
  defineProps({
    percent: {
      min: 0,
      max: 100
    },
    color: {
      allowed: ['gold', 'silver', 'bronze'],
      description: 'The trophy color to convey first, second, or third place.',
      validator: function (value) {
        return ['gold', 'silver', 'bronze'].includes(value);
      }
    },
    options: {
      // A complex validator function is defined, so to better convey what
      // type of data is expected, an example is also given.
      example: [
        '[',
        '  {',
        '    name: \\'Kiva.org\\',',
        '    value: \\'kiva\\'',
        '  },',
        '  {',
        '    name: \\'Good.store\\',',
        '    value: \\'goodstore\\'',
        '  }',
        ']'
      ].join('\\n'),
      validator: function (options) {
        let valid = true;
        if (Array.isArray(options)) {
          options.forEach(function (option) {
            if (
              typeof(option) !== 'object' ||
              Array.isArray(option) ||
              !option.name ||
              (
                typeof(option.value) !== 'string' &&
                option.value !== null
              )
            ) {
              valid = false;
            }
          });
        } else {
          valid = false;
        }
        return valid;
      }
    }
  });
  </script>
`);

export const EMITS_ARRAY_OPTIONS_EXAMPLE = unindent(`
  <script>
  export default {
    name: 'MyComponent',
    emits: [
      'update:modelValue',
      'click'
    ]
  };
  </script>
`);
export const EMITS_ARRAY_SCRIPT_SETUP_EXAMPLE = unindent(`
  <script setup>
  defineOptions({
    name: 'MyComponent'
  });
  defineEmits([
    'update:modelValue',
    'click'
  ]);
  </script>
`);
export const EMITS_OBJECT_OPTIONS_EXAMPLE = unindent(`
  <script>
  export default {
    name: 'MyComponent',
    emits: {
      click: null,
      submit: (payload) => {
        if (payload.email && payload.password) {
          return true;
        } else {
          console.warn('Invalid submit event payload!');
          return false;
        }
      }
    }
  };
  </script>
`);
export const EMITS_OBJECT_SCRIPT_SETUP_EXAMPLE = unindent(`
  <script setup>
  defineOptions({
    name: 'MyComponent'
  });
  defineEmits({
    click: null,
    submit: (payload) => {
      if (payload.email && payload.password) {
        return true;
      } else {
        console.warn('Invalid submit event payload!');
        return false;
      }
    }
  });
  </script>
`);
export const EMITS_TO_DEMO_ARRAY_DEMO_FILE_EXAMPLE = unindent(`
  import MyComponent from '../components/MyComponent.vue';

  export const myComponentDemo = {
    component: MyComponent,
    emitsToDemo: [
      'update:modelValue',
      'click'
    ]
  };
`);
export const EMITS_TO_DEMO_ARRAY_OPTIONS_EXAMPLE = unindent(`
  <script>
  // Though \`emitsToDemo\` in components supports arrays, you
  // might as well just use \`emit\`, Vue's official API.
  export default {
    name: 'MyComponent',
    emitsToDemo: [
      'update:modelValue',
      'click'
    ]
  };
  </script>
`);
export const EMITS_TO_DEMO_ARRAY_SCRIPT_SETUP_EXAMPLE = unindent(`
  <script setup>
  // Though \`emitsToDemo\` in components supports arrays, you
  // might as well just use \`emit\`, Vue's official API.
  defineOptions({
    name: 'MyComponent',
    emitsToDemo: [
      'update:modelValue',
      'click'
    ]
  });
  </script>
`);
export const EMITS_TO_DEMO_OBJECT_DEMO_FILE_EXAMPLE = unindent(`
  import MyComponent from '../components/MyComponent.vue';

  export const myComponentDemo = {
    component: MyComponent,
    emitsToDemo: {
      'update:modelValue': {
        description: 'The logs being displayed',
        value: 'An array of logs.',
        example: 'v-model="logs"'
      },
      click: {
        description: 'Fired when the user clicks the "clear" button.',
        value: 'Boolean, <code>true</code> means hard reset.',
        example: '@click="reset"'
      }
    }
  };
`);
export const EMITS_TO_DEMO_OBJECT_OPTIONS_EXAMPLE = unindent(`
  <script>
  export default {
    name: 'MyComponent',
    emitsToDemo: {
      'update:modelValue': {
        description: 'The logs being displayed',
        value: 'An array of logs.',
        example: 'v-model="logs"'
      },
      click: {
        description: 'Fired when the user clicks the "clear" button.',
        value: 'Boolean, <code>true</code> means hard reset.',
        example: '@click="reset"'
      }
    }
  };
  </script>
`);
export const EMITS_TO_DEMO_OBJECT_SCRIPT_SETUP_EXAMPLE = unindent(`
  <script setup>
  defineOptions({
    name: 'MyComponent',
    emitsToDemo: {
      'update:modelValue': {
        description: 'The logs being displayed',
        value: 'An array of logs.',
        example: 'v-model="logs"'
      },
      click: {
        description: 'Fired when the user clicks the "clear" button.',
        value: 'Boolean, <code>true</code> means hard reset.',
        example: '@click="reset"'
      }
    }
  });
  </script>
`);

export const GETTING_STARTED_CDN = unindent(`
  <!DOCTYPE html>
  <html>
    <head>
      <title>Component Documentation</title>
      <!-- Load in Vue and Vue-Doxen -->
      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js"
      ></script>
      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/vue-doxen@latest/dist/vue-doxen.iife.js"
      ></script>
      <!-- OPTIONAL: Load in the Vue-Doxen CSS file -->
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.jsdelivr.net/npm/vue-doxen@latest/dist/vue-doxen.css"
      >
    </head>
    <body>
      <!-- Define a div with an ID to mount Vue to, put Vue-Doxen in it -->
      <div id="app">
        <doxen-sidebar
          v-model="selected"
          :demos="demos"
        ></doxen-sidebar>
        <vue-doxen
          v-model="selected"
          :demos="demos"
        ></vue-doxen>
      </div>

      <script>
        // Import the VueDoxen component
        const {
          DoxenSidebar,
          VueDoxen
        } = window.vueDoxen;

        // Here is a dummy component for example:
        const ExampleComponent1 = {
          name: 'ExampleComponent1',
          description: 'A Description.',
          template: '<strong>{{ message }}</strong>',
          props: {
            message: {
              description: 'A message.',
              type: String,
              default: 'Example'
            }
          }
        };
        // Another dummy component
        const ExampleComponent2 = {
          name: 'ExampleComponent2',
          template: '{{ someNumber * 10 }}',
          props: {
            someNumber: {
              type: Number,
              min: 1,
              max: 5,
              default: 1
            }
          }
        };

        const app = Vue.createApp({
          // Register the VueDoxen components for use in the template
          components: {
            DoxenSidebar,
            VueDoxen
          },
          data: function () {
            return {
              // Create a reactive variable for which component to demo
              selected: 'ExampleComponent1'
            };
          },
          computed: {
            demos: function () {
              return {
                // Pass in the components to demo
                ExampleComponent1,
                ExampleComponent2
              };
            }
          }
        }).mount('#app');
      </script>
    </body>
  </html>
`);

export const GETTING_STARTED_EXAMPLE = unindent(`
  <template>
    <div>
      <!--
        Simple way of switching selected component,
        or use your own sidebar component
      -->
      <DoxenSidebar
        v-model="selectedDemo"
        :demos="demos"
      />
      <VueDoxen
        v-model="selectedDemo"
        :demos="demos"
      />
      <!--
        Optional CSS file for syntax highlighting
      -->
      <link
        href="https://unpkg.com/highlightjs/styles/ir-black.css"
        rel="stylesheet"
        type="text/css"
      />
    </div>
  </template>

  <script>
  import { DoxenSidebar, VueDoxen } from 'vue-doxen';

  // OPTIONAL: CSS file for minor layout/affordance improvements
  import 'vue-doxen/vue-doxen.css';

  // Components you want to document/demo
  import ComponentA from './ComponentA.vue';
  import ComponentB from './ComponentB.vue';

  export default {
    name: 'DocumentationPage',
    components: {
      DoxenSidebar,
      VueDoxen
    },
    data: function () {
      return {
        selectedDemo: 'ComponentA'
      };
    },
    computed: {
      demos: function () {
        return {
          // Pass the component in directly
          ComponentA,
          // or wrap it in a "demo" object to add
          // documentation specific properties
          ComponentB: {
            component: ComponentB,
            description: 'Details about your component'
          }
        };
      }
    }
  };
  </script>
`);
export const GETTING_STARTED_COMPOSITION_EXAMPLE = unindent(`
  <template>
    <div>
      <!--
        Simple way of switching selected component,
        or use your own sidebar component
      -->
      <DoxenSidebar
        v-model="selectedDemo"
        :demos="demos"
      />
      <VueDoxen
        v-model="selectedDemo"
        :demos="demos"
      />
      <!--
        Optional CSS file for syntax highlighting
      -->
      <link
        href="https://unpkg.com/highlightjs/styles/ir-black.css"
        rel="stylesheet"
        type="text/css"
      />
    </div>
  </template>

  <script>
  import { computed, ref } from 'vue';
  import { DoxenSidebar, VueDoxen } from 'vue-doxen';

  // OPTIONAL: CSS file for minor layout/affordance improvements
  import 'vue-doxen/vue-doxen.css';

  // Components you want to document/demo
  import ComponentA from './ComponentA.vue';
  import ComponentB from './ComponentB.vue';

  export default {
    name: 'DocumentationPage',
    components: {
      DoxenSidebar,
      VueDoxen
    },
    setup: function () {
      const selectedDemo = ref('ComponentA');

      const demos = computed(() => {
        return {
          // Pass the component in directly
          ComponentA,
          // or wrap it in a "demo" object to add
          // documentation specific properties
          ComponentB: {
            component: ComponentB,
            description: 'Details about your component'
          }
        };
      });

      return {
        demos,
        selectedDemo
      };
    }
  };
  </script>
`);
export const GETTING_STARTED_SCRIPT_SETUP_EXAMPLE = unindent(`
  <template>
    <div>
      <!--
        Simple way of switching selected component,
        or use your own sidebar component
      -->
      <DoxenSidebar
        v-model="selectedDemo"
        :demos="demos"
      />
      <VueDoxen
        v-model="selectedDemo"
        :demos="demos"
      />
      <!--
        Optional CSS file for syntax highlighting
      -->
      <link
        href="https://unpkg.com/highlightjs/styles/ir-black.css"
        rel="stylesheet"
        type="text/css"
      />
    </div>
  </template>

  <script setup>
  import { computed, ref } from 'vue';
  import { DoxenSidebar, VueDoxen } from 'vue-doxen';

  // OPTIONAL: CSS file for minor layout/affordance improvements
  import 'vue-doxen/vue-doxen.css';

  // Components you want to document/demo
  import ComponentA from './ComponentA.vue';
  import ComponentB from './ComponentB.vue';

  defineOptions({
    name: 'DocumentationPage'
  });

  const selectedDemo = ref('ComponentA');

  const demos = computed(() => {
    return {
      // Pass the component in directly
      ComponentA,
      // or wrap it in a "demo" object to add
      // documentation specific properties
      ComponentB: {
        component: ComponentB,
        description: 'Details about your component'
      }
    };
  });
  </script>
`);

export const IMPORT_STATEMENT_COMPONENT_DEMO_FILE_EXAMPLE = unindent(`
  import MyComponent from '../components/MyComponent.vue';
  import MyImportStatement from '../components/MyImportStatement.vue';

  export const myComponentDemo = {
    component: MyComponent,
    importStatement: {
      component: MyImportStatement,
      // Optional, if your component needs props
      props: {
        yourProp: 'your value'
      },
      // Optional, if your component has slots
      slots: {
        default: '<em>Content</em>'
      },
      // Optional, if your component has emits
      events: {
        click: function ($event) {
          console.log($event);
        }
      }
    }
  };
`);
export const IMPORT_STATEMENT_COMPONENT_OPTIONS_EXAMPLE = unindent(`
  <script>
  // DO NOT ACTUALLY DO THIS! USE A DEMO FILE INSTEAD.
  // Though this is technically supported, importing custom components
  // into your component just for Vue-Doxen will bloat your component's
  // file size for no real benefit. If you want to use your own
  // component for the import statement, just use a demo file.
  import MyImportStatement from '../components/MyImportStatement.vue';

  export default {
    importStatement: {
      component: MyImportStatement,
      // Optional, if your component needs props
      props: {
        yourProp: 'your value'
      },
      // Optional, if your component has slots
      slots: {
        default: '<em>Content</em>'
      },
      // Optional, if your component has emits
      events: {
        click: function ($event) {
          console.log($event);
        }
      }
    }
  };
  </script>
`);
export const IMPORT_STATEMENT_COMPONENT_SCRIPT_SETUP_EXAMPLE = unindent(`
  <script setup>
  // DO NOT ACTUALLY DO THIS! USE A DEMO FILE INSTEAD.
  // Though this is technically supported, importing custom components
  // into your component just for Vue-Doxen will bloat your component's
  // file size for no real benefit. If you want to use your own
  // component for the import statement, just use a demo file.
  import MyImportStatement from '../components/MyImportStatement.vue';

  defineOptions({
    importStatement: {
      component: MyImportStatement,
      // Optional, if your component needs props
      props: {
        yourProp: 'your value'
      },
      // Optional, if your component has slots
      slots: {
        default: '<em>Content</em>'
      },
      // Optional, if your component has emits
      events: {
        click: function ($event) {
          console.log($event);
        }
      }
    }
  });
  </script>
`);

export const IMPORT_STATEMENT_STRING_DEMO_FILE_EXAMPLE = unindent(`
  import MyComponent from '../components/MyComponent.vue';

  export const myComponentDemo = {
    component: MyComponent,
    importStatement: 'import { MyComponent } from \\'my-component-library\\''
  };
`);
export const IMPORT_STATEMENT_STRING_OPTIONS_EXAMPLE = unindent(`
  <script>
  export default {
    importStatement: 'import { MyComponent } from \\'my-component-library\\''
  };
  </script>
`);
export const IMPORT_STATEMENT_STRING_SCRIPT_SETUP_EXAMPLE = unindent(`
  <script setup>
  defineOptions({
    importStatement: 'import { MyComponent } from \\'my-component-library\\''
  });
  </script>
`);

export const ROUTER_LINK_OPTIONS_EXAMPLE = unindent(`
  <template>
    <div>
      <aside>
        <nav>
          <RouterLink
            v-for="(demo, componentName) in componentDemos"
            :to="{
              name: 'components',
              params: { componentName }
            }"
            :key="'sidebar-link-' + componentName"
          >
            {{ demo.component?.name || demo.name || componentName }}
          </RouterLink>
        </nav>
      </aside>
      <main>
        <RouterView />
      </main>
    </div>
  </template>

  <script>
  import { demos } from './demos/index.js';

  export default {
    name: 'App',
    computed: {
      componentDemos: function () {
        return demos;
      }
    }
  };
  </script>
`);
export const ROUTER_LINK_COMPOSITION_EXAMPLE = unindent(`
  <template>
    <div>
      <aside>
        <nav>
          <RouterLink
            v-for="(demo, componentName) in componentDemos"
            :to="{
              name: 'components',
              params: { componentName }
            }"
            :key="'sidebar-link-' + componentName"
          >
            {{ demo.component?.name || demo.name || componentName }}
          </RouterLink>
        </nav>
      </aside>
      <main>
        <RouterView />
      </main>
    </div>
  </template>

  <script>
  import { computed } from 'vue';

  import { demos } from './demos/index.js';

  export default {
    name: 'App',
    setup: function () {
      const componentDemos = computed(() => {
        return demos;
      });

      return {
        componentDemos
      };
    }
  };
  </script>
`);
export const ROUTER_LINK_SCRIPT_SETUP_EXAMPLE = unindent(`
  <template>
    <div>
      <aside>
        <nav>
          <RouterLink
            v-for="(demo, componentName) in componentDemos"
            :to="{
              name: 'components',
              params: { componentName }
            }"
            :key="'sidebar-link-' + componentName"
          >
            {{ demo.component?.name || demo.name || componentName }}
          </RouterLink>
        </nav>
      </aside>
      <main>
        <RouterView />
      </main>
    </div>
  </template>

  <script setup>
  import { computed } from 'vue';

  import { demos } from './demos/index.js';

  const componentDemos = computed(() => {
    return demos;
  });
  </script>
`);

export const SETTING_PROP_DEFAULTS_DEMO_EXAMPLE = unindent(`
  import MyComponent from '../components/MyComponent.vue';

  export const myComponentDemo = {
    component: MyComponent,
    propsToDemo: {
      percent: {
        props: {
          modelValue: 20
        }
      }
    }
  };
`);
export const SETTING_PROP_DEFAULTS_OPTIONS_EXAMPLE = unindent(`
  <script>
  export default {
    props: {
      percent: {
        props: {
          modelValue: 20
        }
      }
    }
  };
  </script>
`);
export const SETTING_PROP_DEFAULTS_SCRIPT_SETUP_EXAMPLE = unindent(`
  <script setup>
  defineProps({
    percent: {
      props: {
        modelValue: 20
      }
    }
  });
  </script>
`);

export const SETTING_PROP_DEFAULTS_VUE_API_DEMO_EXAMPLE = unindent(`
  import MyComponent from '../components/MyComponent.vue';

  export const myComponentDemo = {
    component: MyComponent,
    propsToDemo: {
      percent: {
        default: 20
      }
    }
  };
`);
export const SETTING_PROP_DEFAULTS_VUE_API_OPTIONS_EXAMPLE = unindent(`
  <script>
  export default {
    props: {
      percent: {
        default: 20
      }
    }
  };
  </script>
`);
export const SETTING_PROP_DEFAULTS_VUE_API_SCRIPT_SETUP_EXAMPLE = unindent(`
  <script setup>
  defineProps({
    percent: {
      default: 20
    }
  });
  </script>
`);

export const SLOTS_DEMO_ARRAY_EXAMPLE = unindent(`
  import MyComponent from '../components/MyComponent.vue';

  export const myComponentDemo = {
    component: MyComponent,
    slotsToDemo: [
      'default',
      'footer'
    ]
  };
`);
export const SLOTS_DEMO_CUSTOM_COMPONENT_EXAMPLE = unindent(`
  import MyComponent from '../components/MyComponent.vue';
  import CustomSlotComponent from '../components/CustomSlotComponent.vue';

  export const myComponentDemo = {
    component: MyComponent,
    slotsToDemo: {
      default: {
        component: CustomSlotComponent,
        props: {
          modelValue: 'This is passed into the slot'
          // other props your CustomSlotComponent takes
        },
        events: {
          // catch any emits from your component
          'update:modelValue': function (value) {
            console.log(value);
          }
        }
      },
      // You can also use plain text for other slots if you want
      footer: 'This appears <strong>below</strong> the component.'
    }
  };
`);
export const SLOTS_DEMO_DEFAULT_TEXT_EXAMPLE = unindent(`
  import MyComponent from '../components/MyComponent.vue';

  export const myComponentDemo = {
    component: MyComponent,
    slotsToDemo: {
      default: 'This appears <strong>above</strong> the component.',
      footer: 'This appears <strong>below</strong> the component.'
    }
  };
`);
export const SLOTS_OPTIONS_ARRAY_EXAMPLE = unindent(`
  <script>
  export default {
    name: 'MyComponent',
    slots: [
      'default',
      'footer'
    ]
  };
  </script>
`);
export const SLOTS_OPTIONS_CUSTOM_COMPONENT_EXAMPLE = unindent(`
  <script>
  // DO NOT ACTUALLY DO THIS! USE A DEMO FILE INSTEAD.
  // Though this is technically supported, importing custom components
  // into your component just for Vue-Doxen will bloat your component's
  // file size for no real benefit. If you want to use your own
  // component for the slot, just use a demo file.
  import CustomSlotComponent from '../components/CustomSlotComponent.vue';

  export default {
    name: 'MyComponent',
    slots: {
      default: {
        component: CustomSlotComponent,
        props: {
          modelValue: 'This is passed into the slot'
          // other props your CustomSlotComponent takes
        },
        events: {
          // catch any emits from your component
          'update:modelValue': function (value) {
            console.log(value);
          }
        }
      },
      // You can also use plain text for other slots if you want
      footer: 'This appears <strong>below</strong> the component.'
    }
  };
  </script>
`);
export const SLOTS_OPTIONS_DEFAULT_TEXT_EXAMPLE = unindent(`
  <script>
  export default {
    name: 'MyComponent',
    slots: {
      default: 'This appears <strong>above</strong> the component.',
      footer: 'This appears <strong>below</strong> the component.'
    }
  };
  </script>
`);
export const SLOTS_SCRIPT_SETUP_ARRAY_EXAMPLE = unindent(`
  <script setup>
  defineOptions({
    name: 'MyComponent',
    slots: [
      'default',
      'footer'
    ]
  });
  </script>
`);
export const SLOTS_SCRIPT_SETUP_CUSTOM_COMPONENT_EXAMPLE = unindent(`
  <script setup>
  // DO NOT ACTUALLY DO THIS! USE A DEMO FILE INSTEAD.
  // Though this is technically supported, importing custom components
  // into your component just for Vue-Doxen will bloat your component's
  // file size for no real benefit. If you want to use your own
  // component for the slot, just use a demo file.
  import CustomSlotComponent from '../components/CustomSlotComponent.vue';

  defineOptions({
    name: 'MyComponent',
    slots: {
      default: {
        component: CustomSlotComponent,
        props: {
          modelValue: 'This is passed into the slot'
          // other props your CustomSlotComponent takes
        },
        events: {
          // catch any emits from your component
          'update:modelValue': function (value) {
            console.log(value);
          }
        }
      },
      // You can also use plain text for other slots if you want
      footer: 'This appears <strong>below</strong> the component.'
    }
  });
  </script>
`);
export const SLOTS_SCRIPT_SETUP_DEFAULT_TEXT_EXAMPLE = unindent(`
  <script setup>
  defineOptions({
    name: 'MyComponent',
    slots: {
      default: 'This appears <strong>above</strong> the component.',
      footer: 'This appears <strong>below</strong> the component.'
    }
  });
  </script>
`);

export const TREE_SHAKING_IMPORT_EXAMPLE = unindent(`
  // Import all the needed components from Vue-Doxen
  import {
    DoxenCheckbox,
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
    DoxenTextField,
    DoxenTextarea
  } from 'vue-doxen';

  // Everything listed below must have either the component I've listed
  // imported/passed in, or your own component passed in with a matching
  // API. Otherwise Vue-Doxen will break at runtime.
  export const options = {
    components: {
      // Top of demo
      header: DoxenHeader,

      // Props Playground
      checkbox: DoxenCheckbox,
      dropdown: DoxenDropdown,
      jsonTextarea: DoxenJsonTextarea,
      numberField: DoxenNumberField,
      plainText: DoxenPlainText,
      radioDials: DoxenRadioDials,
      rangeSlider: DoxenRangeSlider,
      textField: DoxenTextField,

      // Playground: Slots
      textarea: DoxenTextarea,

      // Playground: Emits
      emitLog: DoxenEmitLog,

      // Bottom of demo
      propsDocumentation: DoxenPropsDocumentation,
      emitsDocumentation: DoxenEmitsDocumentation
    }
  };
`);
export const TREE_SHAKING_USING_OPTIONS_OPTIONS_API = unindent(`
  <template>
    <div>
      <DoxenSideBar
        v-model="selectedDemo"
        :demos="componentDemos"
      />
      <VueDoxenCustom
        v-model="selectedDemo"
        :demos="componentDemos"
        :options="vueDoxenOptions"
      />
    </div>
  </template>

  <script>
  import { DoxenSideBar, VueDoxenCustom } from 'vue-doxen';

  import { demos } from '../demos/index.js';
  import { options } from './vue-doxen-options.js';

  export default {
    name: 'ComponentsDemo',
    components: {
      DoxenSideBar,
      VueDoxenCustom
    },
    data: function () {
      return {
        selectedDemo: 'MyComponentName'
      };
    },
    computed: {
      componentDemos: function () {
        return demos;
      },
      vueDoxenOptions: function () {
        return options;
      }
    }
  };
  </script>
`);
export const TREE_SHAKING_USING_OPTIONS_COMPOSITION_API = unindent(`
  <template>
    <div>
      <DoxenSideBar
        v-model="selectedDemo"
        :demos="componentDemos"
      />
      <VueDoxenCustom
        v-model="selectedDemo"
        :demos="componentDemos"
        :options="vueDoxenOptions"
      />
    </div>
  </template>

  <script>
  import { computed, ref } from 'vue';
  import { DoxenSideBar, VueDoxenCustom } from 'vue-doxen';

  import { demos } from '../demos/index.js';
  import { options } from './vue-doxen-options.js';

  export default {
    name: 'ComponentsDemo',
    components: {
      DoxenSideBar,
      VueDoxenCustom
    },
    setup: function () {
      const selectedDemo = ref('MyComponentName');

      const componentDemos = computed(() => {
        return demos;
      });

      const vueDoxenOptions = computed(() => {
        return options;
      });

      return {
        componentDemos,
        selectedDemo,
        vueDoxenOptions
      };
    }
  };
  </script>
`);
export const TREE_SHAKING_USING_OPTIONS_SCRIPT_SETUP = unindent(`
  <template>
    <div>
      <DoxenSideBar
        v-model="selectedDemo"
        :demos="componentDemos"
      />
      <VueDoxenCustom
        v-model="selectedDemo"
        :demos="componentDemos"
        :options="vueDoxenOptions"
      />
    </div>
  </template>

  <script setup>
  import { computed } from 'vue';
  import { DoxenSideBar, VueDoxenCustom } from 'vue-doxen';

  import { demos } from '../demos/index.js';
  import { options } from './vue-doxen-options.js';

  defineOptions({
    name: 'ComponentsDemo'
  });

  const selectedDemo = ref('MyComponentName');

  const componentDemos = computed(() => {
    return demos;
  });

  const vueDoxenOptions = computed(() => {
    return options;
  });
  </script>
`);

export const VUE_ROUTER_EXAMPLE = unindent(`
  import { createRouter, createWebHistory } from 'vue-router';
  import { VueDoxen } from 'vue-doxen';

  // Import the demos object
  import { demos } from '../demos/index.js';

  const routes = [
    // ...other routes,
    {
      // Create the path for the URL
      path: '/components/:componentName',
      // Give it an optional name
      name: 'components',
      // You could point to VueDoxen directly or a wrapper component
      component: VueDoxen,
      props: (route) => ({
        // If pointing to it directly you'll need to pass in the demos prop
        demos,
        // Inform VueDoxen of the component to demo based on the URL param
        modelValue: route.params.componentName,
        // Pass in any style tokens as a prop
        styleTokens: {}
      })
    }
  ];

  // Create the router
  const router = createRouter({
    // Use the correct history mode for your project
    history: createWebHistory(),
    routes
  });

  // Export the router
  export default router;
`);
