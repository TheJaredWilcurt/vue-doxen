export const SLOTS_OPTIONS_ARRAY_EXAMPLE = `
<script>
export default {
  name: 'MyComponent',
  slots: ['default', 'footer']
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

export const SLOTS_DEMO_ARRAY_EXAMPLE = `
import MyComponent from '../components/MyComponent.vue';

export const MyComponentDemo = {
  component: MyComponent,
  slotsToDemo: ['default', 'footer']
}
`.trim();

export const SLOTS_DEMO_OBJECT_EXAMPLE = `
import MyComponent from '../components/MyComponent.vue';

export const MyComponentDemo = {
  component: MyComponent,
  slotsToDemo: {
    default: 'This appears <strong>above</strong> the component.',
    footer: 'This appears <strong>below</strong> the component.'
  }
}
`.trim();
