<p align="center"><img alt="A doxen dog with the Vue logo on it's chest" src="https://github.com/TheJaredWilcurt/vue-doxen/assets/4629794/dee9d79c-692e-4aaf-96c6-768c3e918120"></p>


# vue-doxen

The world's best Vue.js component documentation tool! (Or at least it will be when it's done)


## API Plan

Demo files let you define how you demo your props, emits, and slots. There should be one demo file per component you want to document. Demo files are used to make your component documentation fully interactive. We offer many common form field components you can use in the demo, but alternatively, you can use your own components, as long as they support `v-model`.

```js
export const fooBarDemo = {
  componentToDemo: FooBar,
  slotsToDemo: {
    default: {
      component: DoxenTextarea,
      props: {
        modelValue: '<strong>Text</strong>',
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
