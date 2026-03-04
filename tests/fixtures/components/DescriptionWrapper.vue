<!--
  Test fixture: component-based description with text passed via props.
  Proves that serializeDemos can extract text from a component's props
  without needing Playwright (the text is in the `message` prop, not
  hidden inside the template).
-->
<template>
  <div v-html="message"></div>
</template>

<script>
export default {
  name: 'DescriptionWrapper',
  props: {
    message: {
      type: String,
      default: ''
    }
  }
};
</script>
