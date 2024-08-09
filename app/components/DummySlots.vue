<template>
  <div>
    <button @click="count++">increment</button>
    <slot name="counter" :count="count"></slot>
    <span>
      <slot name="other"></slot>
    </span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DummySlots',
  data: function () {
    return {
      count: 1
    };
  }
};
</script>
