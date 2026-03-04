<!--
  Test fixture: import statement component with props AND computed text.
  The rendered text is built dynamically from `name` and `slim` props via
  computed properties. Proves that Playwright extraction works when text
  is not static in the template or directly in a prop value, but generated
  at render time by the component's logic.
-->
<template>
  <div>
    <pre><code>{{ importLine }}</code></pre>
    <p v-if="slim">
      Also available in the slim build:
      <code>{{ slimImportLine }}</code>
    </p>
  </div>
</template>

<script>
export default {
  name: 'DxButtonImport',
  props: {
    name: {
      type: String,
      required: true
    },
    slim: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    importLine: function () {
      return 'import { ' + this.name + ' } from \'my-design-system\';';
    },
    slimImportLine: function () {
      return 'import { ' + this.name + ' } from \'my-design-system/slim\';';
    }
  }
};
</script>
