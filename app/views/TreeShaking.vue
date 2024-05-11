<template>
  <div class="docs-page">
    <h1
      id="tree-shaking"
      class="docs-title"
    >
      Tree Shaking
    </h1>

    <DocumentationSection id="" title="">
      <p>
      </p>

      <CodeBox
        :code="API"
        :styleTokens="styleTokens"
      />
    </DocumentationSection>
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import DocumentationSection from '@@@/components/DocumentationSection.vue';

const API = `
<VueDoxenCustom
   v-model="selected"
  :demos="demos"
  :options="{
  }"
  :styletokens="tokens"
/>
`.trim();

export default {
  name: 'TreeShaking',
  components: {
    DocumentationSection
  },
  props: {
    styleTokens
  },
  constants: {
    API
  }
};
</script>
