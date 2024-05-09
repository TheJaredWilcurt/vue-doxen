export const ALTERNATE_COMPOSITION_DEMO_EXAMPLE = `
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
        importStatement: 'import { MyComponent } from \'my-component-library\'',
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
`.trim();
export const ALTERNATE_OPTIONS_DEMO_EXAMPLE = `
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
        importStatement: 'import { MyComponent } from \'my-component-library\'',
        slotsToDemo: {
          default: 'This is the text for the demo of the default slot.'
        }
      };
    }
  }
};
`.trim();
export const ALTERNATE_SCRIPT_SETUP_DEMO_EXAMPLE = `
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

S({
  name: 'MyComponentDemo'
});

const demo = computed(() => {
  return {
    component: MyComponent,
    importStatement: 'import { MyComponent } from \'my-component-library\'',
    slotsToDemo: {
      default: 'This is the text for the demo of the default slot.'
    }
  };
};
`.trim();
export const ALTERNATE_VUE_ROUTER_EXAMPLE = `
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
`.trim();

export const BASIC_PROPS_DEMO_FILE = `
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
`.trim();
export const BASIC_PROPS_OPTIONS = `
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
`.trim();
export const BASIC_PROPS_SCRIPT_SETUP = `
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
`.trim();

export const COMPONENT_DESCRIPTION_DEMO_EXAMPLE = `
import YourComponent from '../components/YourComponent.vue';

export const yourComponentDemo = {
  component: YourComponent,
  description: 'Context of <em>why your component exists/what it does</em>.'
};
`.trim();
export const COMPONENT_DESCRIPTION_OPTIONS_EXAMPLE = `
<script>
export default {
  description: 'Context of <em>why your component exists/what it does</em>.'
};
</script>
`.trim();
export const COMPONENT_DESCRIPTION_SCRIPT_SETUP_EXAMPLE = `
<script setup>
defineOptions({
  description: 'Context of <em>why your component exists/what it does</em>.'
});
</script>
`.trim();

export const COMPONENT_NAME_DEMO_EXAMPLE = `
import YourComponent from '../components/YourComponent.vue';

export const yourComponentDemo = {
  component: YourComponent,
  name: 'YourComponent'
};
`.trim();
export const COMPONENT_NAME_OPTIONS_EXAMPLE = `
<script>
export default {
  name: 'YourComponent'
};
</script>
`.trim();
export const COMPONENT_NAME_SCRIPT_SETUP_EXAMPLE = `
<script setup>
defineOptions({
  name: 'YourComponent'
});
</script>
`.trim();

export const COMPOSE_ALL_DEMOS_EXAMPLE = `
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
`.trim();

export const CUSTOM_COMPONENTS_DEMO_EXAMPLE = `
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
`.trim();
export const CUSTOM_COMPONENTS_OPTIONS_EXAMPLE = `
<script>
// DO NOT ACTUALLY DO THIS! USE A DEMO FILE INSTEAD.
// Though this is technically supported, importing custom components
// into your component just for Vue-Doxen will bloat your component's
// file size for no real benefit. If you want to use your own
// components in the props playground, just use a demo file.
import MyCustomColorPicker from '../components/MyCustomColorPicker.vue';

export default {
  name: 'MyComponent',
  props: {
    color: {
      component: MyCustomColorPicker,
      props: {
        modelValue: 'red'
      }
    }
  }
};
</script>
`.trim();
export const CUSTOM_COMPONENTS_SCRIPT_SETUP_EXAMPLE = `
<script setup>
// DO NOT ACTUALLY DO THIS! USE A DEMO FILE INSTEAD.
// Though this is technically supported, importing custom components
// into your component just for Vue-Doxen will bloat your component's
// file size for no real benefit. If you want to use your own
// components in the props playground, just use a demo file.
import MyCustomColorPicker from '../components/MyCustomColorPicker.vue';

defineProps({
  color: {
    component: MyCustomColorPicker,
    props: {
      modelValue: 'red'
    }
  }
});
</script>
`.trim();

export const DEMO_FILE_EXAMPLE = `
import MyComponent from '../components/MyComponent.vue';
import MyCustomColorPicker from '../components/MyCustomColorPicker.vue';

export const myComponentDemo = {
  component: MyComponent,
  importStatement: 'import { MyComponent } from \\'my-component-library\\'',
  propsToDemo: {
    color: {
      component: MyCustomColorPicker,
      props: {
        // Default value to demo
        modelValue: 'red'
        // any other props your custom component takes
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
  }
};
`.trim();
export const DEMO_FILE_USAGE_COMPOSITION_EXAMPLE = `
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
`.trim();
export const DEMO_FILE_USAGE_EXAMPLE = `
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
`.trim();
export const DEMO_FILE_USAGE_SCRIPT_SETUP_EXAMPLE = `
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
`.trim();

export const DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_DEMO_FILE = `
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
`.trim();
export const DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_OPTIONS = `
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
    color: {
      allowed: ALLOWED_COLORS,
      description: 'The trophy color to convey first, second, or third place.',
      vaidator: function (value) {
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
`.trim();
export const DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_SCRIPT_SETUP = `
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
  color: {
    allowed: ['gold', 'silver', 'bronze'],
    description: 'The trophy color to convey first, second, or third place.',
    vaidator: function (value) {
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
`.trim();

export const EMITS_TO_DEMO_DEMO_FILE_ARRAY_EXAMPLE = `
import MyComponent from '../components/MyComponent.vue';

export const myComponentDemo = {
  component: MyComponent,
  emitsToDemo: [
    'update:modelValue',
    'click'
  ]
};
`.trim();
export const EMITS_TO_DEMO_DEMO_FILE_OBJECT_EXAMPLE = `
import MyComponent from '../components/MyComponent.vue';

export const myComponentDemo = {
  component: MyComponent,
  emitsToDemo: {
    'update:modelValue': {
      description: 'The logs being displayed',
      value: 'An array of logs.',
      example: 'v-model="value"'
    },
    click: {
      description: 'Fired when the user clicks the "clear" button.',
      value: 'Boolean, <code>true</code> means hard reset.',
      example: '@click="reset"'
    }
  }
};
`.trim();
export const EMITS_TO_DEMO_OPTIONS_ARRAY_EXAMPLE = `
<script>
export default {
  name: 'MyComponent',
  emitsToDemo: [
    'update:modelValue',
    'click'
  ]
};
</script>
`.trim();
export const EMITS_TO_DEMO_OPTIONS_OBJECT_EXAMPLE = `
<script>
export default {
  name: 'MyComponent',
  emitsToDemo: {
    'update:modelValue': {
      description: 'The logs being displayed',
      value: 'An array of logs.',
      example: 'v-model="value"'
    },
    click: {
      description: 'Fired when the user clicks the "clear" button.',
      value: 'Boolean, <code>true</code> means hard reset.',
      example: '@click="reset"'
    }
  }
};
</script>
`.trim();
export const EMITS_OPTIONS_ARRAY_EXAMPLE = `
<script>
export default {
  name: 'MyComponent',
  emits: [
    'update:modelValue',
    'click'
  ]
};
</script>
`.trim();
export const EMITS_SCRIPT_SETUP_EXAMPLE = `
<script setup>
defineEmits([
  'update:modelValue',
  'click'
]);
</script>
`.trim();

export const GETTING_STARTED_EXAMPLE = `
<template>
  <div>
    <DoxenSidebar
      v-model="selectedDemo"
      :demos="demos"
    />
    <VueDoxen
      v-model="selectedDemo"
      :demos="demos"
    />
  </div>
</template>

<script>
import { DoxenSidebar, VueDoxen } from 'vue-doxen';

// Components you want to document
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
        ComponentA,
        ComponentB
      };
    }
  }
};
</script>
`.trim();
export const GETTING_STARTED_COMPOSITION_EXAMPLE = `
<template>
  <div>
    <DoxenSidebar
      v-model="selectedDemo"
      :demos="demos"
    />
    <VueDoxen
      v-model="selectedDemo"
      :demos="demos"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { DoxenSidebar, VueDoxen } from 'vue-doxen';

// Components you want to document
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
        ComponentA,
        ComponentB
      };
    });

    return {
      demos,
      selectedDemo
    };
  }
};
</script>
`.trim();
export const GETTING_STARTED_SCRIPT_SETUP_EXAMPLE = `
<template>
  <div>
    <DoxenSidebar
      v-model="selectedDemo"
      :demos="demos"
    />
    <VueDoxen
      v-model="selectedDemo"
      :demos="demos"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { DoxenSidebar, VueDoxen } from 'vue-doxen';

// Components you want to document
import ComponentA from './ComponentA.vue';
import ComponentB from './ComponentB.vue';

const selectedDemo = ref('ComponentA');

const demos = computed(() => {
  return {
    ComponentA,
    ComponentB
  };
});
</script>
`.trim();

export const IMPORT_STATEMENT_STRING_DEMO_FILE_EXAMPLE = `
import MyComponent from '../components/MyComponent.vue';

export const myComponentDemo = {
  component: MyComponent,
  importStatement: 'import { MyComponent } from \\'my-component-library\\''
};
`.trim();
export const IMPORT_STATEMENT_STRING_OPTIONS_EXAMPLE = `
<script>
export default {
  importStatement: 'import { MyComponent } from \\'my-component-library\\''
};
</script>
`.trim();
export const IMPORT_STATEMENT_COMPONENT_DEMO_FILE_EXAMPLE = `
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
    // Optional: if your component has emits
    events: {
      click: function ($event) {
        console.log($event);
      }
    }
  }
};
`.trim();

export const ROUTER_LINK_OPTIONS_EXAMPLE = `
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
          {{ demo.name || demo.component?.name || componentName }}
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
`.trim();
export const ROUTER_LINK_COMPOSITION_EXAMPLE = `
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
          {{ demo.name || demo.component?.name || componentName }}
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
`.trim();
export const ROUTER_LINK_SCRIPT_SETUP_EXAMPLE = `
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
          {{ demo.name || demo.component?.name || componentName }}
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
`.trim();

export const SLOTS_DEMO_ARRAY_EXAMPLE = `
import MyComponent from '../components/MyComponent.vue';

export const myComponentDemo = {
  component: MyComponent,
  slotsToDemo: [
    'default',
    'footer'
  ]
};
`.trim();
export const SLOTS_DEMO_OBJECT_EXAMPLE = `
import MyComponent from '../components/MyComponent.vue';

export const myComponentDemo = {
  component: MyComponent,
  slotsToDemo: {
    default: 'This appears <strong>above</strong> the component.',
    footer: 'This appears <strong>below</strong> the component.'
  }
};
`.trim();
export const SLOTS_OPTIONS_ARRAY_EXAMPLE = `
<script>
export default {
  name: 'MyComponent',
  slots: [
    'default',
    'footer'
  ]
};
</script>
`.trim();
export const SLOTS_OPTIONS_OBJECT_EXAMPLE = `
<script>
export default {
  name: 'MyComponent',
  slots: {
    default: 'This appears <strong>above</strong> the component.',
    footer: 'This appears <strong>below</strong> the component.'
  }
};
</script>
`.trim();

export const VUE_ROUTER_EXAMPLE = `
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
`.trim();
