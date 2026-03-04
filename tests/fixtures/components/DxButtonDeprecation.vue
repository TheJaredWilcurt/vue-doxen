<!--
  Test fixture: template-only deprecation notice. Proves that Playwright
  extraction works for the deprecationNotice field and that serializeDemos
  sets the `deprecated: true` flag when a deprecationNotice is present.
-->
<template>
  <div class="deprecation-banner">
    <strong>Deprecated:</strong> DxButton will be removed in v4.0.
    Use <code>DxActionButton</code> instead, which supports the same API
    with improved accessibility and keyboard navigation.
  </div>
</template>

<script>
export default {
  name: 'DxButtonDeprecation'
};
</script>
