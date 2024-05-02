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
        // If a component is passed in directly we will wrap it, like so: { component: ComponentA }.
        // So all components automatically become demo objects internally.
        ComponentA
      };
    }
  }
};
</script>
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
        // If a component is passed in directly we will wrap it, like so: { component: ComponentA }.
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
    // If a component is passed in directly we will wrap it, like so: { component: ComponentA }.
    // So all components automatically become demo objects internally.
    ComponentA
  };
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

export const COMPONENT_DESCRIPTION_OPTIONS_EXAMPLE = `
<script>
export default {
  description: 'Details about what your component does, and the context as to <strong>why it exists</strong>.'
};
</script>
`.trim();

export const COMPONENT_DESCRIPTION_DEMO_EXAMPLE = `
import YourComponent from '../components/YourComponent.vue';

export const yourComponentDemo = {
  component: YourComponent,
  description: 'Details about what your component does, and the context as to <strong>why it exists</strong>.'
};
`.trim();

export const COMPONENT_NAME_OPTIONS_EXAMPLE = `
<script>
export default {
  name: 'YourComponent'
};
</script>
`.trim();

export const COMPONENT_NAME_DEMO_EXAMPLE = `
import YourComponent from '../components/YourComponent.vue';

export const yourComponentDemo = {
  component: YourComponent,
  name: 'YourComponent'
};
`.trim();
