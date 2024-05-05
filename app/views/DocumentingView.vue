<template>
  <div class="docs-page">
    <h1 class="docs-title">Documenting your components</h1>

    <nav>
      <ul>
        <li><a href="#name">Component Name</a></li>
        <li><a href="#description">Component Description</a></li>
        <li><a href="#import">Import Statements</a></li>
        <li>
          <a href="#props">Documenting Props</a>
          <ul>
            <li><a href="#basic-prop">Basic Prop Definitions</a></li>
            <li><a href="#documentation-props">Documentation Specific Prop Definitions</a></li>
            <li><a href="#using-both">Using both Demo files and Components for Prop Definitions</a></li>

          </ul>
        </li>
        <li><a href="#slots">Documenting Slots</a></li>
        <li><a href="#emits">Documenting Emits</a></li>
      </ul>
    </nav>

    <DocumentationSection id="name" title="Component Name">
      <p>
        The name of the component is used at the top of a demo page, and also used for the tag and variable name in the code example below the props playground. If not provided on the demo object, we will use the name provided in the component (if available).
      </p>
      <p>
        Components written in <code>.vue</code> files, and processed by a bundler, may include the filename in the component. We will check for for this if the name is not explicitly defined in the demo object or component definition.
      </p>

      <CodeSwapper
        :codeTypes="{
          'Demo File': COMPONENT_NAME_DEMO_EXAMPLE,
          Options: COMPONENT_NAME_OPTIONS_EXAMPLE,
          Composition: COMPONENT_NAME_OPTIONS_EXAMPLE,
          'Script Setup': USE_DEMO
        }"
        :fileName="FILE_NAME"
        :styleTokens="styleTokens"
      />
    </DocumentationSection>

    <DocumentationSection id="description" title="Component Description">
      <p>
        The component description is displayed under the component name on a demo page. If a description is not found in the demo file we will use the one in the component.
      </p>

      <p>
        For <code>&lt;script setup&gt;</code> components, you must define the description in the demo object.
      </p>

      <CodeSwapper
        :codeTypes="{
          'Demo File': COMPONENT_DESCRIPTION_DEMO_EXAMPLE,
          Options: COMPONENT_DESCRIPTION_OPTIONS_EXAMPLE,
          Composition: COMPONENT_DESCRIPTION_OPTIONS_EXAMPLE,
          'Script Setup': USE_DEMO
        }"
        :fileName="FILE_NAME"
        :styleTokens="styleTokens"
      />
    </DocumentationSection>

    <DocumentationSection id="import" title="Import Statements">
      <p>
        If you want to add instructions for how people can import your component into their app, you can either pass in the import statement as a string, or use a custom component with your own props.
      </p>

      <h3>Import Statement &ndash; String example</h3>

      <CodeSwapper
        :codeTypes="{
          'Demo File': IMPORT_STATEMENT_STRING_DEMO_FILE_EXAMPLE,
          Options: IMPORT_STATEMENT_STRING_OPTIONS_EXAMPLE,
          Composition: IMPORT_STATEMENT_STRING_OPTIONS_EXAMPLE,
          'Script Setup': USE_DEMO
        }"
        :fileName="FILE_NAME"
        :styleTokens="styleTokens"
      />

      <h3>Import Statement &ndash; Custom component example</h3>

      <p>Though you <em>can</em> import a custom component inside the component you are going to demo and pass it through, it will impact the size of your component, so we do not recommend it.</p>

      <CodeSwapper
        :codeTypes="{
          'Demo File': IMPORT_STATEMENT_COMPONENT_DEMO_FILE_EXAMPLE
        }"
        :fileName="FILE_NAME"
        :styleTokens="styleTokens"
      />
    </DocumentationSection>

    <DocumentationSection id="props" title="Documenting Props">
      <h3 id="basic-prop">Basic Prop Definitions</h3>

      <p>
        These are the official parts of
        <a
          v-text="'Vue\'s component prop definitions'"
          href="https://vuejs.org/guide/components/props.html"
          target="_blank"
          title="VueJS.org Documentation - Props"
        ></a>:
      </p>

      <ul>
        <li><code>type</code> &ndash; JavaScript type constructor or array of type constructors.</li>
        <li><code>required</code> &ndash; Boolean to indicate a value <strong>must</strong> be passed in to this prop.</li>
        <li><code>default</code> &ndash; The value to use if nothing is passed in to this prop, or it recieves <code>undefined</code>.</li>
        <li><code>validator</code> &ndash; A function to validate the input passed to the prop meets custom requirements. On your component's demo page, we will note if a prop <em>has</em> a validator function, but will not show it. This is because your function may be minified/uglified, and not very human-friendly.</li>
      </ul>

      <p>
        Though putting these basic prop definitions in the <strong>Demo file</strong> is supported, they offer no functional benefit
        to your component. If you put this information inside the component's actual prop definition Vue will be able to offer helpful
        console warnings when receiving bad/invalid inputs for your props at runtime. The <code>default</code> feature specifically
        needs placed on the prop definition in order for undefined props to be defaulted to a desired value at runtime.
      </p>

      <CodeSwapper
        :codeTypes="{
          Options: BASIC_PROPS_OPTIONS,
          Composition: BASIC_PROPS_OPTIONS,
          'Script Setup': BASIC_PROPS_SCRIPT_SETUP,
          'Demo File': BASIC_PROPS_DEMO_FILE
        }"
        :fileName="FILE_NAME"
        :styleTokens="styleTokens"
      />

      <hr />

      <h3 id="documentation-props">Documentation Specific Prop Definitions</h3>

      <p>
        There are many common features of props that are worth documenting but aren't officially part of Vue's API.
        The following are prop definitions exclusive to Vue-Doxen:
      </p>

      <ol>
        <li><code>description</code> &ndash; A human readable description of what the prop is for, or the context of why it exists.</li>
        <li><code>allowed</code> &ndash; An array of the only values permitted by this prop.</li>
        <li><code>example</code> &ndash; An example of what should be passed in to the prop. Useful for complex data types.</li>
      </ol>

      <CodeSwapper
        :codeTypes="{
          'Demo File': DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_DEMO_FILE,
          Options: DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_OPTIONS,
          Composition: DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_OPTIONS,
          'Script Setup': DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_SCRIPT_SETUP
        }"
        :fileName="FILE_NAME"
        :styleTokens="styleTokens"
      />

      <hr />

      <h3 id="using-both">Using both Demo files and Components for Prop Definitions</h3>

      <p>
        When Vue-Doxen produces a demo page for your component it will merge the prop definitions from the component
        and the demo file together. If the same key is used in both we let the component's version win. We do this
        for two reasons:
      </p>

      <ul>
        <li>
          Basic component prop definitions have a real runtime impact, so it is important that the real values be shown in
          the documentation of the component.
        </li>
        <li>
          Though documentation-specific prop definitions are exclusively used by Vue-Doxen, for consistency and simplicity,
          we treat them the same as the basic definitions. Also, philosophically, the closer the documentation is to the
          code it is documenting, the more likely it is to be maintained and therefore accurate. So we assume if the two
          versions ever differ, the one in the component is more likely to be correct and prefer it.
        </li>
      </ul>
    </DocumentationSection>

    <DocumentationSection id="slots" title="Documenting Component Slots">
      <p>You can provide an array of slot names, or an object with slot names as keys and the default slot value to show in the demo as the value.</p>

      <h3>Documenting Slots &ndash; Array example</h3>

      <CodeSwapper
        :codeTypes="{
          'Demo File': SLOTS_DEMO_ARRAY_EXAMPLE,
          Options: SLOTS_OPTIONS_ARRAY_EXAMPLE,
          Composition: SLOTS_OPTIONS_ARRAY_EXAMPLE,
          'Script Setup': USE_DEMO
        }"
        :fileName="FILE_NAME"
        :styleTokens="styleTokens"
      />

      <h3>Documenting Slots &ndash; Object example</h3>

      <CodeSwapper
        :codeTypes="{
          'Demo File': SLOTS_DEMO_OBJECT_EXAMPLE,
          Options: SLOTS_OPTIONS_OBJECT_EXAMPLE,
          Composition: SLOTS_OPTIONS_OBJECT_EXAMPLE,
          'Script Setup': USE_DEMO
        }"
        :fileName="FILE_NAME"
        :styleTokens="styleTokens"
      />
    </DocumentationSection>

    <DocumentationSection id="emits" title="Documenting Component Emits">
      <p>
        You can provide an array of emit names, or an object with emit names as keys and an object as the value.
      </p>

      <h3>Documenting Emits &ndash; Vue's API</h3>

      <CodeSwapper
        :codeTypes="{
          Options: EMITS_OPTIONS_ARRAY_EXAMPLE,
          Composition: EMITS_OPTIONS_ARRAY_EXAMPLE,
          'Script Setup': EMITS_SCRIPT_SETUP_EXAMPLE
        }"
        :fileName="FILE_NAME"
        :styleTokens="styleTokens"
      />

      <h3>Documenting Emits &ndash; Array example</h3>

      <CodeSwapper
        :codeTypes="{
          'Demo File': EMITS_TO_DEMO_DEMO_FILE_ARRAY_EXAMPLE,
          Options: EMITS_TO_DEMO_OPTIONS_ARRAY_EXAMPLE,
          Composition: EMITS_TO_DEMO_OPTIONS_ARRAY_EXAMPLE,
          'Script Setup': USE_DEMO
        }"
        :fileName="FILE_NAME"
        :styleTokens="styleTokens"
      />

      <h3>Documenting Emits &ndash; Object example</h3>

      <p>
        If using the object syntax you can add these keys, all take a <code>string</code> value to be displayed on the page:
      </p>

      <ul>
        <li><code>description</code> &ndash; The intent of how this emit should be used.</li>
        <li><code>value</code> &ndash; A description of what value is emitted.</li>
        <li><code>example</code> &ndash; Any example code you want to add for how to use this emit.</li>
      </ul>

      <CodeSwapper
        :codeTypes="{
          'Demo File': EMITS_TO_DEMO_DEMO_FILE_OBJECT_EXAMPLE,
          Options: EMITS_TO_DEMO_OPTIONS_OBJECT_EXAMPLE,
          Composition: EMITS_TO_DEMO_OPTIONS_OBJECT_EXAMPLE,
          'Script Setup': USE_DEMO
        }"
        :fileName="FILE_NAME"
        :styleTokens="styleTokens"
      />
    </DocumentationSection>
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import CodeSwapper from '@/components/CodeSwapper.vue';
import DocumentationSection from '@@@/components/DocumentationSection.vue';

import {
  BASIC_PROPS_DEMO_FILE,
  BASIC_PROPS_OPTIONS,
  BASIC_PROPS_SCRIPT_SETUP,
  COMPONENT_DESCRIPTION_OPTIONS_EXAMPLE,
  COMPONENT_DESCRIPTION_DEMO_EXAMPLE,
  COMPONENT_NAME_OPTIONS_EXAMPLE,
  COMPONENT_NAME_DEMO_EXAMPLE,
  DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_DEMO_FILE,
  DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_OPTIONS,
  DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_SCRIPT_SETUP,
  EMITS_OPTIONS_ARRAY_EXAMPLE,
  EMITS_SCRIPT_SETUP_EXAMPLE,
  EMITS_TO_DEMO_DEMO_FILE_ARRAY_EXAMPLE,
  EMITS_TO_DEMO_DEMO_FILE_OBJECT_EXAMPLE,
  EMITS_TO_DEMO_OPTIONS_ARRAY_EXAMPLE,
  EMITS_TO_DEMO_OPTIONS_OBJECT_EXAMPLE,
  IMPORT_STATEMENT_COMPONENT_DEMO_FILE_EXAMPLE,
  IMPORT_STATEMENT_STRING_DEMO_FILE_EXAMPLE,
  IMPORT_STATEMENT_STRING_OPTIONS_EXAMPLE,
  SLOTS_DEMO_ARRAY_EXAMPLE,
  SLOTS_DEMO_OBJECT_EXAMPLE,
  SLOTS_OPTIONS_ARRAY_EXAMPLE,
  SLOTS_OPTIONS_OBJECT_EXAMPLE
} from '@@@/helpers/codeSnippets.js';

export default {
  name: 'DocumentingView',
  components: {
    CodeSwapper,
    DocumentationSection
  },
  props: {
    styleTokens
  },
  constants: {
    BASIC_PROPS_DEMO_FILE,
    BASIC_PROPS_OPTIONS,
    BASIC_PROPS_SCRIPT_SETUP,
    COMPONENT_DESCRIPTION_OPTIONS_EXAMPLE,
    COMPONENT_DESCRIPTION_DEMO_EXAMPLE,
    COMPONENT_NAME_OPTIONS_EXAMPLE,
    COMPONENT_NAME_DEMO_EXAMPLE,
    DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_DEMO_FILE,
    DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_OPTIONS,
    DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_SCRIPT_SETUP,
    EMITS_OPTIONS_ARRAY_EXAMPLE,
    EMITS_SCRIPT_SETUP_EXAMPLE,
    EMITS_TO_DEMO_DEMO_FILE_ARRAY_EXAMPLE,
    EMITS_TO_DEMO_DEMO_FILE_OBJECT_EXAMPLE,
    EMITS_TO_DEMO_OPTIONS_ARRAY_EXAMPLE,
    EMITS_TO_DEMO_OPTIONS_OBJECT_EXAMPLE,
    FILE_NAME: {
      'Demo File': 'yourComponentDemo.js',
      Options: 'YourComponent.vue',
      Composition: 'YourComponent.vue',
      'Script Setup': 'YourComponent.vue'
    },
    IMPORT_STATEMENT_COMPONENT_DEMO_FILE_EXAMPLE,
    IMPORT_STATEMENT_STRING_DEMO_FILE_EXAMPLE,
    IMPORT_STATEMENT_STRING_OPTIONS_EXAMPLE,
    SLOTS_DEMO_ARRAY_EXAMPLE,
    SLOTS_DEMO_OBJECT_EXAMPLE,
    SLOTS_OPTIONS_ARRAY_EXAMPLE,
    SLOTS_OPTIONS_OBJECT_EXAMPLE,
    USE_DEMO: '// Use a demo file'
  }
};
</script>
