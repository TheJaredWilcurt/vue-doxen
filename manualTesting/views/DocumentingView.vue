<template>
  <div class="docs-page">
    <h1 class="docs-title">Documenting your components</h1>

    <nav>
      <ul>
        <li><a href="#name">Component Name</a></li>
        <li><a href="#description">Component Description</a></li>
        <li><a href="#import">Import Statements</a></li>
        <li><a href="#slots">Documenting Component Slots</a></li>
      </ul>
    </nav>


    <h2 id="name">Component Name</h2>

    <p></p>

    <h2 id="description">Component Description</h2>

    <p></p>

    <h2 id="import">Import Statements</h2>

    <p>
      If you want to add instructions for how people can import your component into your app, you can either pass in the import statement as a string, or use a custom component with your own props.
    </p>

    <ol></ol>

    <h2 id="slots">Documenting Component Slots</h2>

    <p>You can provide an array of slot names, or an object with slot names as keys and the default slot value to show in the demo as the value.</p>

    <h3>Documenting Slots Array example</h3>

    <CodeSwapper
      :fileName="{
        Component: 'MyComponent.vue',
        'Demo File': 'myComponentDemo.js'
      }"
      :codeTypes="{
        Component: SLOTS_OPTIONS_ARRAY_EXAMPLE,
        'Demo File': SLOTS_DEMO_ARRAY_EXAMPLE
      }"
      :styleTokens="styleTokens"
    />

    <h3>Documenting Slots Object example</h3>

    <CodeSwapper
      :fileName="{
        Component: 'MyComponent.vue',
        'Demo File': 'myComponentDemo.js'
      }"
      :codeTypes="{
        Component: SLOTS_OPTIONS_OBJECT_EXAMPLE,
        'Demo File': SLOTS_DEMO_OBJECT_EXAMPLE
      }"
      :styleTokens="styleTokens"
    />
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import CodeSwapper from '@/components/CodeSwapper.vue';

import {
  SLOTS_DEMO_ARRAY_EXAMPLE,
  SLOTS_DEMO_OBJECT_EXAMPLE,
  SLOTS_OPTIONS_ARRAY_EXAMPLE,
  SLOTS_OPTIONS_OBJECT_EXAMPLE
} from '@@@/helpers/codeSnippets.js';

export default {
  name: 'DocumentingView',
  components: {
    CodeSwapper
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
