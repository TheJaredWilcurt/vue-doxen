<!--
  Test fixture: minimal *Demo.vue file that exports a `demo` object.
  Mirrors the real-world pattern where
  demos live inside .vue SFCs. Used to test loadDemos.
-->
<template>
  <div>Sample demo page</div>
</template>

<script>
export const demo = {
  component: {
    name: 'SampleComponent',
    template: '<div>Sample</div>',
    props: {
      label: {
        type: String,
        default: 'Hello'
      }
    }
  },
  description: '<p>A sample component.</p>',
  propsToDemo: {
    label: { description: 'The label text.' }
  }
};

export default {
  name: 'SampleDemo'
};
</script>
