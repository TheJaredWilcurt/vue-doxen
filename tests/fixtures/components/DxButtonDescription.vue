<!--
  Test fixture: template-only description with rich HTML (paragraphs, code
  tags, links, lists). Proves that Playwright extraction captures multi-
  paragraph text content from a component with no props.
-->
<template>
  <div class="prose">
    <p>
      A versatile button component for triggering actions, submitting forms, and navigating via links.
      Supports multiple variants and sizes out of the box.
    </p>
    <p>
      Use the <code>variant</code> prop to control the visual style and the <code>size</code> prop to
      adjust dimensions. The <code>ghost</code> variant renders a transparent button suitable for toolbars.
    </p>
    <ul>
      <li>
        <a href="https://design.example.com/components/button">Design System Documentation</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DxButtonDescription'
};
</script>
