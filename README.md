<p align="center"><img alt="A doxen dog with the Vue logo on it's chest" src="https://github.com/TheJaredWilcurt/vue-doxen/assets/4629794/dee9d79c-692e-4aaf-96c6-768c3e918120"></p>

# vue-doxen

The world's best Vue.js component documentation tool! (Or at least it will be when it's done)


## API Plan

You import the `VueDoxen` component and optionally the `DoxenSidebar` (or make your own sidebar). Then pass in the "demo" files.

```html
<template>
  <div style="display: flex; align-items: column;">
    <DoxenSideBar
      v-model="selected"
      :demos="demos"
    />
    <VueDoxen
      v-model="selected"
      :demos="demos"
    />
  </div>
</template>

<script>
import { DoxenSideBar, VueDoxen } from 'vue-doxen';

import { fooBarDemo } from '@/demos/fooBarDemo.js';

export default {
  name: 'MyComponent',
  components: {
    DoxenSideBar,
    VueDoxen
  },
  data: function () {
    return {
      selected: 'fooBarDemo'
    };
  },
  computed: {
    demos: function () {
      return {
        fooBarDemo
      };
    }
  }
}
</script>
```

Demo files let you define how you demo your props, emits, and slots. There should be one demo file per component you want to document. Demo files are used to make your component documentation fully interactive. We offer many common form field components you can use in the demo, but alternatively, you can use your own components, as long as they support `v-model`.

```js
// src/demos/fooBarDemo.js
import {
  DoxenCheckbox,
  DoxenRadioDials,
  DoxenTextarea,
  DoxenTextField
} from 'vue-doxen';

import FooBar from '@/components/FooBar.vue';

export const fooBarDemo = {
  componentToDemo: FooBar,
  description: 'Lorem ipsum dolar sit amet.',
  importStatement: 'import { FooBar } from \'your-cool-component-libary\'',
  propsToDemo: {
    label: {
      initialValue: 'Name',
      component: DoxenTextField,
      componentProps: {
        label: 'Label'
      }
    },
    size: {
      initialValue: 'small',
      component: DoxenRadioDials,
      componentProps: {
        label: 'Size',
        options: [
          { name: 'Large', value: 'large' },
          { name: 'Small', value: 'small' }
        ]
      }
    },
    disabled: {
      initialValue: false,
      component: DoxenCheckbox,
      props: {
        label: 'Disabled'
      }
    }
  },
  slotsToDemo: {
    default: {
      initialValue: '<strong>Text</strong>',
      component: DoxenTextarea,
      props: {
        label: 'Slot'
      }
    }
  },
  emitsDocumentation: {
    click: {
      value: 'Empty string',
      event: 'Browser mouse click event'
    }
  }
};
```

In the below component example, we are using built-in features of Vue's prop defintions such as `type`, `default`, `required`, and `validator`. We've also added in `allowed`, `example`, and `description` which are not part of Vue's API, but also don't negatively impact components either (other than a negligible file size increase). This approach keeps the documentation right next to the code, making it easier to update both at the same time.

```html
<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <button
      :data-size="size"
      :disabled="disabled"
      @click="$emit('click', $event)"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script>
const ALLOWED_SIZES = Object.freeze([
  'small',
  'normal'
]);

export default {
  name: 'FooBar',
  emits: ['click'],
  props: {
    label: {
      type: String,
      default: undefined,
      description: 'Optional label above button describing it'
    },
    size: {
      type: String,
      allowed: ALLOWED_SIZES,
      description: 'Adjust the visual size of the button.',
      default: 'normal',
      example: ':size="small"',
      validator: function (value) {
        return ALLOWED_SIZES.includes(value);
      }
    },
    disabled: {
      type: Boolean,
      default: false,
      description: 'Prevents interacting with the button and visually indicates the field is disabled.'
    }
  }
};
</script>
```
