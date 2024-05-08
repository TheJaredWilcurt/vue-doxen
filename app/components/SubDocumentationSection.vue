<template>
  <hr />

  <section :id="id">
    <h3 v-html="fullTitle"></h3>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'SubDocumentationSection',
  slots: ['default'],
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String,
      default: undefined
    }
  },
  computed: {
    fullTitle: function () {
      let title = this.title;
      if (this.subTitle) {
        title = title + ' &ndash; <strong style="font-weight: 800">' + this.subTitle + '</strong>'
      }
      return title;
    }
  }
};
</script>
