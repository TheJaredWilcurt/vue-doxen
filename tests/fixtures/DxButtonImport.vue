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
