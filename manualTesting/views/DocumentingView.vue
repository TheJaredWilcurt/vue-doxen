<template>
  <div class="docs-paragraph">
    <h1 class="docs-title">Documenting your components</h1>

    <h2>Documenting Component Slots</h2>

    <p>There are <strong>4 approaches</strong> you can pick from:</p>

    <ol>
      <li>Using the <strong>Options API</strong>, you can list the names of the props as an array of strings:
        <CodeBox
          :code="SLOTS_OPTIONS_ARRAY_EXAMPLE"
          language="xml"
          :styleTokens="styleTokens"
        />
      </li>
      <li>
        Using the <strong>Options API</strong>, you can pass in an object with the slot names as keys, and the value as the default text to demo:
        <CodeBox
          :code="SLOTS_OPTIONS_OBJECT_EXAMPLE"
          language="xml"
          :styleTokens="styleTokens"
        />
      </li>
      <li>
        In the component's <strong>demo object</strong>, you can define an array of strings for the names of the slots to demo:
        <CodeBox
          :code="SLOTS_DEMO_ARRAY_EXAMPLE"
          language="javascript"
          :styleTokens="styleTokens"
        />
      </li>
      <li>
        In the component's <strong>demo object</strong>, pass in an object with the slot names as keys, and the value as the default text to demo:
        <CodeBox
          :code="SLOTS_DEMO_OBJECT_EXAMPLE"
          language="javascript"
          :styleTokens="styleTokens"
        />
      </li>
    </ol>
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import CodeBox from '@/components/CodeBox.vue';

import {
  SLOTS_DEMO_ARRAY_EXAMPLE,
  SLOTS_DEMO_OBJECT_EXAMPLE,
  SLOTS_OPTIONS_ARRAY_EXAMPLE,
  SLOTS_OPTIONS_OBJECT_EXAMPLE
} from '@@@/helpers/codeSnippets.js';

export default {
  name: 'DocumentingView',
  components: {
    CodeBox
  },
  props: {
    styleTokens
  },
  constants: {
    SLOTS_DEMO_ARRAY_EXAMPLE,
    SLOTS_DEMO_OBJECT_EXAMPLE,
    SLOTS_OPTIONS_ARRAY_EXAMPLE,
    SLOTS_OPTIONS_OBJECT_EXAMPLE
  }
};
</script>
