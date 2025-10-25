<template>
  <div class="docs-page">
    <h1
      id="linter"
      class="docs-title"
    >
      Doxen Linter
    </h1>

    <p>
      Due to the flexibility of where Vue-Doxen allows you to store your documentation
      (demo object vs component, props vs proptsToDemo, etc),
      a simple ESLint plugin that examines individual lines in individual files would
      not be able to accurately detect, a missing prop description, for example.
    </p>
    <p>
      To deal with this, we provide a bespoke linting function you can pass your
      Demos/components into, with settings you can enable, documented below.
    </p>

    <ul>
      <li>
        <a href="#getting-started">Getting Started</a>
      </li>
    </ul>

    <DocumentationSection id="getting-started" title="Getting Started">
      <p>
        You will need to create a script to run the <code>doxenLinter</code>
        function from.
      </p>
      <DoxenCodeSwapper
        fileName="./scripts/lintDocs.js"
        :codeTypes="{ JavaScript: CUSTOM_SCRIPT }"
        :styleTokens="styleTokens"
      />
      <p>
        Then you'll need a convienient way to run your script, I would recommed
        using an npm script for this.
      </p>
      <DoxenCodeSwapper
        fileName="./package.json"
        :codeTypes="{ JSON: MANIFEST }"
        :styleTokens="styleTokens"
      />
    </DocumentationSection>
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import DoxenCodeSwapper from '@/components/DoxenCodeSwapper.vue';
import { unindent } from '@/linter/helpers.js';
import DocumentationSection from '@@@/components/DocumentationSection.vue';

const CUSTOM_SCRIPT = unindent(`
  import { doxenLinter } from 'vue-doxen';
`);
const MANIFEST = unindent(`
  {
    "scripts": {
      "lint:docs": "node ./scripts/lintDocs.js",
      "lint:js": "eslint",
      "lint": "npm run lint:docs && npm run lint:js"
    }
  }
`);

export default {
  name: 'DoxenLinter',
  components: {
    DocumentationSection,
    DoxenCodeSwapper
  },
  props: {
    styleTokens
  },
  constants: {
    CUSTOM_SCRIPT,
    MANIFEST
  }
};
</script>
