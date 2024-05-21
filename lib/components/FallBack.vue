<template>
  <h1 id="fallback">
    OH NO!
    You are missing a needed component!
    View console for details.
  </h1>
</template>

<script>
export default {
  name: 'FallBack',
  created: function () {
    const message = [
      'This fallback component is only used when a custom component',
      'is not supplied in the VueDoxenCustom component\'s options',
      'prop. The following props/attributes were passed in to this',
      'fallback component:'
    ].join(' ');
    const data = {
      ...this.$props,
      ...this.$attrs
    };
    console.info(message, data);
  }
};
</script>

<style scoped>
#fallback {
  position: relative;
  display: block;
  background: #000;
  border: 0px;
  margin: 10px;
  padding: 10px;
  color: #FF0;
  font-size: 20px;
  opacity: 1;
  visibility: visible;
}
</style>
