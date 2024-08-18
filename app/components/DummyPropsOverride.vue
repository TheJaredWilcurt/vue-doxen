<template>
  <div>{{ value }}</div>
</template>

<script>
export default {
  name: 'DummyPropsOverride',
  props: {
    value: {
      type: String,
      required: true,
      validator: function (value) {
        return ['a', 'b'].includes(value);
      }
    }
  }
};
</script>
