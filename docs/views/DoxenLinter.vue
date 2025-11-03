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
      demos/components into, with settings you can enable; documented below.
    </p>

    <ul>
      <li>
        <a href="#getting-started">Getting Started</a>
      </li>
      <li>
        <a href="#linter-settings">Linter Settings</a>
        <ul>
          <li>
            Demos
            <ul>
              <li>
                All Emits Must Have
                <ul>
                  <li>
                    <a href="#demos-allEmitsMustHave-description">
                      Description
                    </a>
                  </li>
                  <li>
                    <a href="#demos-allEmitsMustHave-example">
                      Example
                    </a>
                  </li>
                  <li>
                    <a href="#demos-allEmitsMustHave-value">
                      Value
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                All Props Must Have
                <ul>
                  <li>
                    <a href="#demos-allPropsMustHave-allowed">
                      Allowed
                    </a>
                  </li>
                  <li>
                    <a href="#demos-allPropsMustHave-deprecated">
                      Deprecated
                    </a>
                  </li>
                  <li>
                    <a href="#demos-allPropsMustHave-description">
                      Description
                    </a>
                  </li>
                  <li>
                    <a href="#demos-allPropsMustHave-example">
                      Example
                    </a>
                  </li>
                  <li>
                    <a href="#demos-allPropsMustHave-requiredOrDefault">
                      Required Or Default
                    </a>
                  </li>
                  <li>
                    <a href="#demos-allPropsMustHave-type">
                      Type
                    </a>
                  </li>
                  <li>
                    <a href="#demos-allPropsMustHave-validator">
                      Validator
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#demos-componentMustBeNamed">
                  Component Must Be Named
                </a>
              </li>
              <li>
                <a href="#demos-demosMustHaveComponent">
                  Demos Must Have Component
                </a>
              </li>
              <li>
                <a href="#demos-deprecatedMustBeSet">
                  Deprecated Must Be Set
                </a>
              </li>
              <li>
                <a href="#demos-descriptionMustEndInPeriod">
                  Description Must End In Period
                </a>
              </li>
              <li>
                <a href="#demos-doNotViolateVueEmitApi">
                  Do not violate Vue emit API
                </a>
              </li>
              <li>
                <a href="#demos-mustHaveDescription">
                  Must Have Description
                </a>
              </li>
              <li>
                <a href="#demos-mustHaveImportStatement">
                  Must Have Import Statement
                </a>
              </li>
              <li>
                <a href="#demos-noCustomComponentsInComponent">
                  No Custom Components In Component
                </a>
              </li>
              <li>
                <a href="#demos-onlyAllowDemoObjects">
                  Only Allow Demo Objects
                </a>
              </li>
            </ul>
          </li>
          <li>
            Options
            <ul>
              <li>
                <a href="#options-allComponentsMustBeReplaced">
                  All Components Must Be Replaced
                </a>
              </li>
              <li>
                <a href="#options-noMissingComponents">
                  No Missing Components
                </a>
              </li>
            </ul>
          </li>
        </ul>
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
        The <code>demos</code> and <code>options</code> are the same things you'd pass
        into <code>&lt;VueDoxenCustom :demos="demos" :options="options" /&gt;</code>
        (<RouterLink :to="{ name: 'treeShaking' }">more</RouterLink>).
        If you are just using <code>&lt;VueDoxen :demos="demos" /&gt;</code>, then
        you can set <code>options</code> to an empty object. The
        <code>linterSettings</code> are detailed below.
      </p>
      <p>
        After you create your linting script, you'll need a convienient way to run it.
        I would recommed using an npm script. In the example we use <code>vite-node</code>,
        you may need to run <code>npm i -D vite-node</code> for the npm script below to work.
        If you know of a way to get the linter to work with
        <a
          href="https://vite.dev/guide/api-environment-runtimes.html#modulerunner"
          target="_blank"
        >Vite's ModuleRunner</a>,
        create a
        <a
          href="https://github.com/TheJaredWilcurt/vue-doxen/issues/new?title=DoxenLinter%20ModuleRunner%20example"
        >GitHub issue</a> with an example so it can be documented here.
      </p>
      <DoxenCodeSwapper
        fileName="./package.json"
        :codeTypes="{ JSON: MANIFEST }"
        :styleTokens="styleTokens"
      />
    </DocumentationSection>

    <DocumentationSection id="linter-settings" title="Linter Settings">
      <p>
        Here are all the linter settings in one convenient object.
        All options are set to false by default, so
        <strong>you only need to pass in the settings you wish to enable</strong>.
      </p>
      <DoxenCodeSwapper
        :codeTypes="{ JavaScript: LINTER_SETTINGS_OBJECT }"
        :styleTokens="styleTokens"
      />
    </DocumentationSection>

    <SubDocumentationSection
      v-for="rule in ruleDefinitions"
      :id="rule.title.replaceAll('.', '-')"
      :title="rule.title"
      :key="rule.title"
    >
      <p v-html="rule.description"></p>
      <ul>
        <li>
          <RouterLink
            :to="{
              path: rule.url.split('#')[0],
              hash: '#' + rule.url.split('#')[1]
            }"
          >
            More info
          </RouterLink>
        </li>
      </ul>
      <DoxenCodeSwapper
        :codeTypes="rule.examples"
        :fileName="FILE_NAME_MY"
        :styleTokens="styleTokens"
      />
    </SubDocumentationSection>
  </div>
</template>

<script>
import { unindent } from '@/linter/helpers.js';
import { ruleDefinitions } from '@/linter/index.js';

import { styleTokens } from '@/helpers/props.js';

import DoxenCodeSwapper from '@/components/DoxenCodeSwapper.vue';
import DocumentationSection from '@@@/components/DocumentationSection.vue';
import SubDocumentationSection from '@@@/components/SubDocumentationSection.vue';

const CUSTOM_SCRIPT = unindent(`
  import { doxenLinter } from 'vue-doxen';

  import { fooDemo } from '../src/demos/fooDemo.js';
  import { barDemo } from '../src/demos/barDemo.js';
  import MyComponent from '../src/components/MyComponent.vue';

  const demos = {
    fooDemo,
    barDemo,
    MyComponent
  };
  const options = {};
  const linterSettings = {
    demos: {
      mustHaveDescription: true,
      allPropsMustHave: {
        description: true
      }
    }
  };

  // If you want this script to cause your CI to stop,
  // remove the try/catch and let it throw.
  try {
    doxenLinter(demos, options, linterSettings);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
`);
const MANIFEST = unindent(`
  {
    "scripts": {
      "lint:docs": "vite-node --config vite.config.js ./scripts/lintDocs.js",
      "lint:js": "eslint",
      "lint": "npm run lint:docs && npm run lint:js"
    }
  }
`);
const LINTER_SETTINGS_OBJECT = unindent(`
  const linterSettings = {
    demos: {
      allEmitsMustHave: {
        // \`description\` key must be on the object (can be set to undefined).
        description: false,
        // \`example\` key must be on the object (can be set to undefined).
        example: false,
        // \`value\` key must be on the object (can be set to undefined).
        value: false
      },
      allPropsMustHave: {
        // \`allowed\` key must be on the object (can be set to undefined).
        allowed: false,
        // Prop must have either \`deprecated: true\` or \`deprecated: false\` set.
        deprecated: false,
        // \`description\` key must be on the object (can be set to undefined).
        description: false,
        // \`example\` key must be on the object (can be set to undefined).
        example: false,
        // Must have either a \`required: true\` or a \`default\` key on the object
        // (can be set to undefined).
        requiredOrDefault: false,
        // \`type\` key must be on the object (can be set to undefined).
        type: false,
        // \`validator\` key must be on the object (can be set to undefined).
        validator: false
      },
      // Requires a name be defined on the component.
      componentMustBeNamed: false,
      // If passing in a demo object, it must include the component to demo.
      demosMustHaveComponent: false,
      // All components/demos must have a \`deprecationNotice\` (can be undefined).
      deprecatedMustBeSet: false,
      // Warns when description on a demo page does not end in a period.
      // Ignores custom component descriptions, missing or empty strings.
      descriptionMustEndInPeriod: false,
      // Vue's API supports \`emits: ['foo', 'bar']\` in a component,
      // if you make it an object, the key values must be functions or \`null\`.
      // \`emits: { foo: () => {}, bar: null }\`
      doNotViolateVueEmitApi: false,
      // Requires a description (string or custom component) on all demos and/or
      // components. (can be set to undefined).
      mustHaveDescription: false,
      // Requires an import statement (string or custom component) on all demos
      // and/or components. (can be set to undefined).
      mustHaveImportStatement: false,
      // If using custom components, they must be imported in a demo object, rather
      // than in the component being demo'd to avoid file size bloat.
      noCustomComponentsInComponent: false,
      // Your demos object must not have any top-level components.
      onlyAllowDemoObjects: false
    },
    options: {
      // If enabled, requires all built-in components are replaced with custom
      // ones (not recommended)
      allComponentsMustBeReplaced: false,
      // If enabled, warns about missing required components (strongly recommended)
      noMissingComponents: false
    }
  };
`);

export default {
  name: 'DoxenLinter',
  components: {
    DocumentationSection,
    DoxenCodeSwapper,
    SubDocumentationSection
  },
  props: {
    styleTokens
  },
  constants: {
    CUSTOM_SCRIPT,
    FILE_NAME_MY: {
      'Demo File': 'myComponentDemo.js',
      Options: 'MyComponent.vue',
      Composition: 'MyComponent.vue',
      'Script Setup': 'MyComponent.vue'
    },
    LINTER_SETTINGS_OBJECT,
    MANIFEST,
    ruleDefinitions
  }
};
</script>
