<template>
  <div v-html="message"></div>
</template>

<script>
export default {
  name: 'TierTwoWrapper',
  props: {
    message: {
      type: String,
      default: ''
    }
  }
};
</script>
