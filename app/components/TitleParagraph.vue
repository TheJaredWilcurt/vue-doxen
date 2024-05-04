<template>
  <h2 class="docs-title">{{ title }}</h2>
  <p><slot></slot></p>
  <ul v-if="readMore && readMoreLink">
    <li>
      <RouterLink :to="{ name: readMoreLink }">
        {{ readMore }}
      </RouterLink>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TitleParagraph',
  props: {
    title: {
      type: String,
      required: true
    },
    readMore: {
      type: String,
      default: undefined
    },
    readMoreLink: {
      type: String,
      default: undefined
    }
  }
};
</script>
