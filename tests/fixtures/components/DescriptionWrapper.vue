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
