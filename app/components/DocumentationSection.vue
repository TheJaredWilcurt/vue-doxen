<template>
  <hr />

  <section :id="id">
    <h2
      v-text="title"
      class="docs-title"
    ></h2>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'DocumentationSection',
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
};
</script>
