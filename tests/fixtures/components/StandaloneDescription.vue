<!--
  Test fixture: component-based description with NO props.
  All text lives in the template. Proves that serializeDemos returns null
  for this field without Playwright (no props to scan), and that Playwright
  extraction correctly reads text from a template-only component.
-->
<template>
  <div>
    <p>Template-only description text.</p>
    <ul>
      <li>Feature one</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'StandaloneDescription'
};
</script>
