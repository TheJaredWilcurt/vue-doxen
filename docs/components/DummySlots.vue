<template>
  <div>
    <button @click="count++">increment</button>
    <slot name="counter" :count="count" message="Hello Word" />
    <span>
      <slot name="other" />
    </span>
    <slot />
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
