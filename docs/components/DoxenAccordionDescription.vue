<template>
  <p>
    A component that animates the visibility of content. When collapsed, it marks the inner content as <code>aria-hidden</code> and <code>inert</code>, to prevent keyboard navigation or screen reading of the no-longer-visibile content.
  </p>
  <p>
    For proper accessibility, be sure to connect the interactive element that toggles the accordion to it using <code>id</code>, <code>labelledby</code>, and <code>aria-controls</code>, like in the following example.
  </p>
  <DoxenCodeBox :code="EXAMPLE" />
</template>

<script>
import DoxenCodeBox from '@/components/DoxenCodeBox.vue';

const EXAMPLE = `
<template>
  <button
    id="my-button"
    aria-controls="my-expandable-content"
    @click="isOpen = !isOpen"
  >
    Example button
  </button>

  <DoxenAccordion
    :show="isOpen"
    labelledBy="my-button"
    uniqueId="my-expandable-content"
  >
    <p>My content.</p>
  </DoxenAccordion>
</template>
`.trim();
export default {
  name: 'DoxenAccordionDemo',
  components: {
    DoxenCodeBox
  },
  constants: {
    EXAMPLE
  }
}
</script>
