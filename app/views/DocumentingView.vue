<template>
  <div class="docs-page">
    <h1
      id="documenting"
      class="docs-title"
    >
      Documenting your components
    </h1>

    <PageSkeleton />

    <nav>
      <ul>
        <li>
          <a href="#title-name">Component Title/Name</a>
          <ul>
            <li><a href="#title">Title (string)</a></li>
            <li><a href="#title-component">Title (component)</a></li>
            <li><a href="#name">Name (string)</a></li>
          </ul>
        </li>
        <li>
          <a href="#description">Component Description</a>
          <ul>
            <li><a href="#description-string">String example</a></li>
            <li><a href="#description-component">Custom component example</a></li>
          </ul>
        </li>
        <li>
          <a href="#import">Import Statements</a>
          <ul>
            <li><a href="#import-string">String example</a></li>
            <li><a href="#import-component">Custom component example</a></li>
          </ul>
        </li>
        <li>
          <a href="#props">Documenting Props</a>
          <ul>
            <li><a href="#basic-prop">Basic Prop Definitions</a></li>
            <li><a href="#documentation-props">Documentation Specific Prop Definitions</a></li>
            <li><a href="#using-both">Using both Demo files and Components for Prop Definitions</a></li>
            <li><a href="#setting-defaults">Setting a default value for a prop</a></li>
            <li><a href="#custom-components">Use your own components in the props playground</a></li>
          </ul>
        </li>
        <li>
          <a href="#slots">Documenting Slots</a>
          <ul>
            <li><a href="#slots-array">Array example</a></li>
            <li><a href="#slots-default-text">Default text example</a></li>
            <li><a href="#slots-custom-component">Custom component example</a></li>
          </ul>
        </li>
        <li>
          <a href="#emits">Documenting Emits</a>
          <ul>
            <li><a href="#emits-vue-array">Vue's Array API</a></li>
            <li><a href="#emits-vue-object">Vue's Object API</a></li>
            <li><a href="#emits-array">Array example</a></li>
            <li><a href="#emits-object">Object example</a></li>
          </ul>
        </li>
      </ul>
    </nav>

    <DocumentationSection id="title-name" title="Component Title/Name">
      <p>
        The component title is used at the top of a demo page.
        The component name is used for the tag and variable name in the code example below the props playground.
      </p>

      <SubDocumentationSection
        id="title"
        title="Title"
        subTitle="String example"
      >
        <p>
          You can directly set the title of your demo page to any string you want, this is separate from the component name used in the code examples below the playground.
          If no <code>title</code> is passed in via the demo or component, we'll use the <code>name</code> provided in the demo or component.
          If the title/name is not explicitly defined in those places, we'll check for a file name (this is sometimes provided by the bundler when using <code>.vue</code> files).
        </p>

        <DoxenCodeSwapper
          :codeTypes="{
            'Demo File': COMPONENT_TITLE_DEMO_EXAMPLE,
            Options: COMPONENT_TITLE_OPTIONS_EXAMPLE,
            Composition: COMPONENT_TITLE_OPTIONS_EXAMPLE,
            'Script Setup': COMPONENT_TITLE_SCRIPT_SETUP_EXAMPLE
          }"
          :fileName="FILE_NAME_YOUR"
          :styleTokens="styleTokens"
        />
      </SubDocumentationSection>

      <SubDocumentationSection
        id="title-component"
        title="Title"
        subTitle="Custom component example"
      >
        <p>
          If you need more control than just a string for the title, you can pass in a custom component to be rendered at the top of your demo.
        </p>

        <DoxenCodeSwapper
          :codeTypes="{
            'Demo File': TITLE_COMPONENT_DEMO_FILE_EXAMPLE,
            Options: TITLE_COMPONENT_OPTIONS_EXAMPLE,
            Composition: TITLE_COMPONENT_OPTIONS_EXAMPLE,
            'Script Setup': TITLE_COMPONENT_SCRIPT_SETUP_EXAMPLE
          }"
          :fileName="FILE_NAME_MY"
          :styleTokens="styleTokens"
        />
      </SubDocumentationSection>

      <SubDocumentationSection
        id="name"
        title="Name"
        subTitle="String example"
      >
        <p>
          The component <code>name</code>, is an official part of Vue's API. It is used to identify the component in the Vue-DevTools.
          In Vue-Doxen, we use it to set the tag name and variable name in the live code examples below the Props playground.
          It is also used a fallback for the <code>title</code> if one is not provided.
        </p>

        <p>
          We will prefer the <code>name</code> provided in the demo object over the one in the component. If none is provided,
          we will look for a file name that is sometimes provided by bundlers when using <code>.vue</code> files.
        </p>

        <DoxenCodeSwapper
          :codeTypes="{
            'Demo File': COMPONENT_NAME_DEMO_EXAMPLE,
            Options: COMPONENT_NAME_OPTIONS_EXAMPLE,
            Composition: COMPONENT_NAME_OPTIONS_EXAMPLE,
            'Script Setup': COMPONENT_NAME_SCRIPT_SETUP_EXAMPLE
          }"
          :fileName="FILE_NAME_YOUR"
          :styleTokens="styleTokens"
        />
      </SubDocumentationSection>
    </DocumentationSection>

    <DocumentationSection id="description" title="Component Description">
      <p>
        The component description is displayed under the component name on a demo page. It can be provided in a demo file or the component as a string or custom component. If defined in multiple locations we will use the version provided in the demo file (for consistency).
      </p>

      <SubDocumentationSection
        id="description-string"
        title="Description"
        subTitle="String Example"
      >
        <DoxenCodeSwapper
          :codeTypes="{
            'Demo File': COMPONENT_DESCRIPTION_DEMO_EXAMPLE,
            Options: COMPONENT_DESCRIPTION_OPTIONS_EXAMPLE,
            Composition: COMPONENT_DESCRIPTION_OPTIONS_EXAMPLE,
            'Script Setup': COMPONENT_DESCRIPTION_SCRIPT_SETUP_EXAMPLE
          }"
          :fileName="FILE_NAME_YOUR"
          :styleTokens="styleTokens"
        />
      </SubDocumentationSection>

      <SubDocumentationSection
        id="description-component"
        title="Description"
        subTitle="Custom component example"
      >
        <p>
          If you want to customize the part of the demo page just below the component title where it describes the component
          being demo'd, we allow passing in a custom component to render whatever you want.
        </p>

        <DoxenCodeSwapper
          :codeTypes="{
            'Demo File': DESCRIPTION_COMPONENT_DEMO_FILE_EXAMPLE,
            Options: DESCRIPTION_COMPONENT_OPTIONS_EXAMPLE,
            Composition: DESCRIPTION_COMPONENT_OPTIONS_EXAMPLE,
            'Script Setup': DESCRIPTION_COMPONENT_SCRIPT_SETUP_EXAMPLE
          }"
          :fileName="FILE_NAME_MY"
          :styleTokens="styleTokens"
        />
      </SubDocumentationSection>
    </DocumentationSection>

    <DocumentationSection id="import" title="Import Statements">
      <p>
        If you want to add instructions for how people can import your component into their app, you can either pass in the import statement as a string, or use a custom component with your own props.
      </p>

      <SubDocumentationSection
        id="import-string"
        title="Import Statement"
        subTitle="String example"
      >
        <DoxenCodeSwapper
          :codeTypes="{
            'Demo File': IMPORT_STATEMENT_STRING_DEMO_FILE_EXAMPLE,
            Options: IMPORT_STATEMENT_STRING_OPTIONS_EXAMPLE,
            Composition: IMPORT_STATEMENT_STRING_OPTIONS_EXAMPLE,
            'Script Setup': IMPORT_STATEMENT_STRING_SCRIPT_SETUP_EXAMPLE
          }"
          :fileName="FILE_NAME_MY"
          :styleTokens="styleTokens"
        />
      </SubDocumentationSection>

      <SubDocumentationSection
        id="import-component"
        title="Import Statement"
        subTitle="Custom component example"
      >
        <p>
          If you want to customize the part of the demo page that says "Usage" and shows the import statement, we allow passing
          in a custom component to render whatever you want in this part of the page (below the description, above the live
          component rendering).
        </p>

        <DoxenCodeSwapper
          :codeTypes="{
            'Demo File': IMPORT_STATEMENT_COMPONENT_DEMO_FILE_EXAMPLE,
            Options: IMPORT_STATEMENT_COMPONENT_OPTIONS_EXAMPLE,
            Composition: IMPORT_STATEMENT_COMPONENT_OPTIONS_EXAMPLE,
            'Script Setup': IMPORT_STATEMENT_COMPONENT_SCRIPT_SETUP_EXAMPLE
          }"
          :fileName="FILE_NAME_MY"
          :styleTokens="styleTokens"
        />
      </SubDocumentationSection>
    </DocumentationSection>

    <DocumentationSection id="props" title="Documenting Props">
      <SubDocumentationSection id="basic-prop" title="Basic Prop Definitions">
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
          <li><code>type</code> &ndash; JavaScript type constructor or array of type constructors restricting what can be passed in to the prop.</li>
          <li><code>required</code> &ndash; Boolean to indicate a value <strong>must</strong> be passed in to this prop.</li>
          <li><code>default</code> &ndash; The value to use if nothing is passed in to this prop, or it recieves <code>undefined</code>.</li>
          <li>
            <code>validator</code> &ndash;
            A function to validate the input passed to the prop meets custom requirements. On your component's demo page,
            we will note if a prop <em>has</em> a validator function, but will not show it. This is because your function
            may be minified/uglified, and not very human-friendly.
          </li>
        </ul>

        <p>
          Though putting these basic prop definitions in the <strong>Demo file</strong> is supported, they offer no functional benefit
          to your component. If you put this information inside the component's actual prop definition Vue will be able to offer helpful
          console warnings when receiving bad/invalid inputs for your props at runtime. The <code>default</code> feature specifically
          needs placed on the prop definition in order for undefined props to be defaulted to a desired value at runtime.
        </p>

        <DoxenCodeSwapper
          :codeTypes="{
            Options: BASIC_PROPS_OPTIONS,
            Composition: BASIC_PROPS_OPTIONS,
            'Script Setup': BASIC_PROPS_SCRIPT_SETUP,
            'Demo File': BASIC_PROPS_DEMO_FILE
          }"
          :fileName="FILE_NAME_YOUR"
          :styleTokens="styleTokens"
        />
      </SubDocumentationSection>

      <SubDocumentationSection id="documentation-props" title="Documentation Specific Prop Definitions">
        <p>
          There are many common features of props that are worth documenting but aren't officially part of Vue's API.
          The following are prop definitions exclusive to Vue-Doxen:
        </p>

        <ul>
          <li><code>description</code> &ndash; A human readable description of what the prop is for, or the context of why it exists.</li>
          <li><code>allowed</code> &ndash; An array of the only values permitted by this prop. May be auto-generated based on your validator function if it follows certain patterns.</li>
          <li><code>example</code> &ndash; An example of what should be passed in to the prop. Useful for complex data types.</li>
          <li><code>min</code>/<code>max</code> &ndash; These two keys are used when a prop accepts a number with upper/lower bounds.</li>
        </ul>

        <DoxenCodeSwapper
          :codeTypes="{
            'Demo File': DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_DEMO_FILE,
            Options: DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_OPTIONS,
            Composition: DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_OPTIONS,
            'Script Setup': DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_SCRIPT_SETUP
          }"
          :fileName="FILE_NAME_YOUR"
          :styleTokens="styleTokens"
        />
      </SubDocumentationSection>

      <SubDocumentationSection id="using-both" title="Using both Demo files and Components for Prop Definitions">
        <p>
          When Vue-Doxen produces a demo page for your component it will <strong>merge the prop definitions</strong>
          from the component and the demo file together. If the same key is used in both, the demo file version will win.
          We do this for the following reasons:
        </p>

        <ul>
          <li>
            If you are documenting external components, this allows overriding any aspect of the component on the demo page.
          </li>
          <li>
            You may want to use Vue's API for runtime checks, but change these values in the documentation without effecting these checks.
          </li>
          <li>
            You may want to change the way the component name is rendered on the page without changing how it is used by Vue-DevTools.
          </li>
        </ul>
      </SubDocumentationSection>

      <SubDocumentationSection id="setting-defaults" title="Setting a default value for a prop">
        <p>
          Sometimes when demoing a component, you'll want to set a default value for
          components in the props playground. There are two ways to do this:
        </p>

        <p>
          Vue's API supports setting a default value on a prop. If you use the official
          API, we will detect this automatically and use that value for the default.
          This approach will also be displayed in the Props Documentation section.
        </p>

        <DoxenCodeSwapper
          :codeTypes="{
            'Demo File': SETTING_PROP_DEFAULTS_VUE_API_DEMO_EXAMPLE,
            Options: SETTING_PROP_DEFAULTS_VUE_API_OPTIONS_EXAMPLE,
            Composition: SETTING_PROP_DEFAULTS_VUE_API_OPTIONS_EXAMPLE,
            'Script Setup': SETTING_PROP_DEFAULTS_VUE_API_SCRIPT_SETUP_EXAMPLE
          }"
          :fileName="FILE_NAME_MY"
          :styleTokens="styleTokens"
        />

        <p>
          You can override the built-in playground component's props. This is similar
          to importing a component and providing it with props. We're already doing that
          under the hood for you, so if you don't have a need to use a custom component,
          you can still set the props values for the built in ones. <strong>Note:</strong>
          The built-in components may change, so be careful not to over-rely on this
          convience by using other, more specific props.
        </p>

        <DoxenCodeSwapper
          :codeTypes="{
            'Demo File': SETTING_PROP_DEFAULTS_DEMO_EXAMPLE,
            Options: SETTING_PROP_DEFAULTS_OPTIONS_EXAMPLE,
            Composition: SETTING_PROP_DEFAULTS_OPTIONS_EXAMPLE,
            'Script Setup': SETTING_PROP_DEFAULTS_SCRIPT_SETUP_EXAMPLE
          }"
          :fileName="FILE_NAME_MY"
          :styleTokens="styleTokens"
        />
      </SubDocumentationSection>

      <SubDocumentationSection id="custom-components" title="Use your own components in the props playground">
        <p>
          Though Vue-Doxen ships with many basic form-field components that are used in the
          props playground, you may want to use your own components instead, or even create
          a one-off component just to be able to better interact with a specific prop on a
          component. This is fully supported!
        </p>

        <DoxenCodeSwapper
          :codeTypes="{
            'Demo File': CUSTOM_COMPONENTS_DEMO_EXAMPLE,
            Options: CUSTOM_COMPONENTS_OPTIONS_EXAMPLE,
            Composition: CUSTOM_COMPONENTS_OPTIONS_EXAMPLE,
            'Script Setup': CUSTOM_COMPONENTS_SCRIPT_SETUP_EXAMPLE
          }"
          :fileName="FILE_NAME_MY"
          :styleTokens="styleTokens"
        />
      </SubDocumentationSection>
    </DocumentationSection>

    <DocumentationSection id="slots" title="Documenting Component Slots">
      <p>
        You can provide an array of slot names,
        default slot value to show in the demo as the value,
        or even your own custom component.
      </p>

      <SubDocumentationSection
        id="slots-array"
        title="Documenting Slots"
        subTitle="Array example"
      >
        <DoxenCodeSwapper
          :codeTypes="{
            'Demo File': SLOTS_DEMO_ARRAY_EXAMPLE,
            Options: SLOTS_OPTIONS_ARRAY_EXAMPLE,
            Composition: SLOTS_OPTIONS_ARRAY_EXAMPLE,
            'Script Setup': SLOTS_SCRIPT_SETUP_ARRAY_EXAMPLE
          }"
          :fileName="FILE_NAME_MY"
          :styleTokens="styleTokens"
        />
      </SubDocumentationSection>

      <SubDocumentationSection
        id="slots-default-text"
        title="Documenting Slots"
        subTitle="Default text example"
      >
        <p>
          You can optionally provide some HTML markup as a string to be used
          as the default text passed in to a slot on the demo page.
        </p>
        <DoxenCodeSwapper
          :codeTypes="{
            'Demo File': SLOTS_DEMO_DEFAULT_TEXT_EXAMPLE,
            Options: SLOTS_OPTIONS_DEFAULT_TEXT_EXAMPLE,
            Composition: SLOTS_OPTIONS_DEFAULT_TEXT_EXAMPLE,
            'Script Setup': SLOTS_SCRIPT_SETUP_DEFAULT_TEXT_EXAMPLE
          }"
          :fileName="FILE_NAME_MY"
          :styleTokens="styleTokens"
        />
      </SubDocumentationSection>

      <SubDocumentationSection
        id="slots-custom-component"
        title="Documenting Slots"
        subTitle="Custom component example"
      >
        <p>
          By default, Vue-Doxen displays a <code>textarea</code> on the demo page for
          users to type whatever they want to be passed along to the           slot. However,
          you can replace the <code>textarea</code> with your own custom component.
        </p>
        <DoxenCodeSwapper
          :codeTypes="{
            'Demo File': SLOTS_DEMO_CUSTOM_COMPONENT_EXAMPLE,
            Options: SLOTS_OPTIONS_CUSTOM_COMPONENT_EXAMPLE,
            Composition: SLOTS_OPTIONS_CUSTOM_COMPONENT_EXAMPLE,
            'Script Setup': SLOTS_SCRIPT_SETUP_CUSTOM_COMPONENT_EXAMPLE
          }"
          :fileName="FILE_NAME_MY"
          :styleTokens="styleTokens"
        />
      </SubDocumentationSection>
    </DocumentationSection>

    <DocumentationSection id="emits" title="Documenting Component Emits">
      <p>
        You can provide an array of emit names, or an object with emit names as keys and an object as the value.
      </p>

      <SubDocumentationSection
        id="emits-vue-array"
        title="Documenting Emits"
        subTitle="Vue's Array API"
      >
        <p>
          Vue's offical API supports passing in an array of strings to define all emits in a component.
          Vue-Doxen will check this part of the component and attempt to automatically document your emits.
        </p>

        <DoxenCodeSwapper
          :codeTypes="{
            Options: EMITS_ARRAY_OPTIONS_EXAMPLE,
            Composition: EMITS_ARRAY_OPTIONS_EXAMPLE,
            'Script Setup': EMITS_ARRAY_SCRIPT_SETUP_EXAMPLE
          }"
          :fileName="FILE_NAME_MY"
          :styleTokens="styleTokens"
        />
      </SubDocumentationSection>

      <SubDocumentationSection
        id="emits-vue-object"
        title="Documenting Emits"
        subTitle="Vue's Object API"
      >
        <p>
          Vue's offical API supports passing in an object of emit validators.
          Vue-Doxen will check this part of the component and attempt to automatically document your emits.
        </p>

        <DoxenCodeSwapper
          :codeTypes="{
            Options: EMITS_OBJECT_OPTIONS_EXAMPLE,
            Composition: EMITS_OBJECT_OPTIONS_EXAMPLE,
            'Script Setup': EMITS_OBJECT_SCRIPT_SETUP_EXAMPLE
          }"
          :fileName="FILE_NAME_MY"
          :styleTokens="styleTokens"
        />
      </SubDocumentationSection>

      <SubDocumentationSection
        id="emits-array"
        title="Documenting Emits"
        subTitle="Array example"
      >
        <DoxenCodeSwapper
          :codeTypes="{
            'Demo File': EMITS_TO_DEMO_ARRAY_DEMO_FILE_EXAMPLE,
            Options: EMITS_TO_DEMO_ARRAY_OPTIONS_EXAMPLE,
            Composition: EMITS_TO_DEMO_ARRAY_OPTIONS_EXAMPLE,
            'Script Setup': EMITS_TO_DEMO_ARRAY_SCRIPT_SETUP_EXAMPLE
          }"
          :fileName="FILE_NAME_MY"
          :styleTokens="styleTokens"
        />
      </SubDocumentationSection>

      <SubDocumentationSection
        id="emits-object"
        title="Documenting Emits"
        subTitle="Object example"
      >
        <p>
          If using the object syntax you can add these keys, all take a <code>string</code> value to be displayed on the page:
        </p>

        <ul>
          <li><code>description</code> &ndash; The intent of how this emit should be used.</li>
          <li><code>value</code> &ndash; A description of what value is emitted.</li>
          <li><code>example</code> &ndash; Any example code you want to add for how to use this emit.</li>
        </ul>

        <DoxenCodeSwapper
          :codeTypes="{
            'Demo File': EMITS_TO_DEMO_OBJECT_DEMO_FILE_EXAMPLE,
            Options: EMITS_TO_DEMO_OBJECT_OPTIONS_EXAMPLE,
            Composition: EMITS_TO_DEMO_OBJECT_OPTIONS_EXAMPLE,
            'Script Setup': EMITS_TO_DEMO_OBJECT_SCRIPT_SETUP_EXAMPLE
          }"
          :fileName="FILE_NAME_MY"
          :styleTokens="styleTokens"
        />
      </SubDocumentationSection>
    </DocumentationSection>
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import DoxenCodeSwapper from '@/components/DoxenCodeSwapper.vue';
import DocumentationSection from '@@@/components/DocumentationSection.vue';
import PageSkeleton from '@@@/components/PageSkeleton.vue';
import SubDocumentationSection from '@@@/components/SubDocumentationSection.vue';

import {
  BASIC_PROPS_DEMO_FILE,
  BASIC_PROPS_OPTIONS,
  BASIC_PROPS_SCRIPT_SETUP,
  COMPONENT_DESCRIPTION_DEMO_EXAMPLE,
  COMPONENT_DESCRIPTION_OPTIONS_EXAMPLE,
  COMPONENT_DESCRIPTION_SCRIPT_SETUP_EXAMPLE,
  COMPONENT_NAME_DEMO_EXAMPLE,
  COMPONENT_NAME_OPTIONS_EXAMPLE,
  COMPONENT_NAME_SCRIPT_SETUP_EXAMPLE,
  COMPONENT_TITLE_DEMO_EXAMPLE,
  COMPONENT_TITLE_OPTIONS_EXAMPLE,
  COMPONENT_TITLE_SCRIPT_SETUP_EXAMPLE,
  CUSTOM_COMPONENTS_DEMO_EXAMPLE,
  CUSTOM_COMPONENTS_OPTIONS_EXAMPLE,
  CUSTOM_COMPONENTS_SCRIPT_SETUP_EXAMPLE,
  DESCRIPTION_COMPONENT_DEMO_FILE_EXAMPLE,
  DESCRIPTION_COMPONENT_OPTIONS_EXAMPLE,
  DESCRIPTION_COMPONENT_SCRIPT_SETUP_EXAMPLE,
  DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_DEMO_FILE,
  DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_OPTIONS,
  DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_SCRIPT_SETUP,
  EMITS_ARRAY_OPTIONS_EXAMPLE,
  EMITS_ARRAY_SCRIPT_SETUP_EXAMPLE,
  EMITS_OBJECT_OPTIONS_EXAMPLE,
  EMITS_OBJECT_SCRIPT_SETUP_EXAMPLE,
  EMITS_TO_DEMO_ARRAY_DEMO_FILE_EXAMPLE,
  EMITS_TO_DEMO_ARRAY_OPTIONS_EXAMPLE,
  EMITS_TO_DEMO_ARRAY_SCRIPT_SETUP_EXAMPLE,
  EMITS_TO_DEMO_OBJECT_DEMO_FILE_EXAMPLE,
  EMITS_TO_DEMO_OBJECT_OPTIONS_EXAMPLE,
  EMITS_TO_DEMO_OBJECT_SCRIPT_SETUP_EXAMPLE,
  IMPORT_STATEMENT_COMPONENT_DEMO_FILE_EXAMPLE,
  IMPORT_STATEMENT_COMPONENT_OPTIONS_EXAMPLE,
  IMPORT_STATEMENT_COMPONENT_SCRIPT_SETUP_EXAMPLE,
  IMPORT_STATEMENT_STRING_DEMO_FILE_EXAMPLE,
  IMPORT_STATEMENT_STRING_OPTIONS_EXAMPLE,
  IMPORT_STATEMENT_STRING_SCRIPT_SETUP_EXAMPLE,
  SETTING_PROP_DEFAULTS_DEMO_EXAMPLE,
  SETTING_PROP_DEFAULTS_OPTIONS_EXAMPLE,
  SETTING_PROP_DEFAULTS_SCRIPT_SETUP_EXAMPLE,
  SETTING_PROP_DEFAULTS_VUE_API_DEMO_EXAMPLE,
  SETTING_PROP_DEFAULTS_VUE_API_OPTIONS_EXAMPLE,
  SETTING_PROP_DEFAULTS_VUE_API_SCRIPT_SETUP_EXAMPLE,
  SLOTS_DEMO_ARRAY_EXAMPLE,
  SLOTS_DEMO_CUSTOM_COMPONENT_EXAMPLE,
  SLOTS_DEMO_DEFAULT_TEXT_EXAMPLE,
  SLOTS_OPTIONS_ARRAY_EXAMPLE,
  SLOTS_OPTIONS_CUSTOM_COMPONENT_EXAMPLE,
  SLOTS_OPTIONS_DEFAULT_TEXT_EXAMPLE,
  SLOTS_SCRIPT_SETUP_ARRAY_EXAMPLE,
  SLOTS_SCRIPT_SETUP_CUSTOM_COMPONENT_EXAMPLE,
  SLOTS_SCRIPT_SETUP_DEFAULT_TEXT_EXAMPLE,
  TITLE_COMPONENT_DEMO_FILE_EXAMPLE,
  TITLE_COMPONENT_OPTIONS_EXAMPLE,
  TITLE_COMPONENT_SCRIPT_SETUP_EXAMPLE
} from '@@@/helpers/codeSnippets.js';

export default {
  name: 'DocumentingView',
  components: {
    DocumentationSection,
    DoxenCodeSwapper,
    PageSkeleton,
    SubDocumentationSection
  },
  props: {
    styleTokens
  },
  constants: {
    BASIC_PROPS_DEMO_FILE,
    BASIC_PROPS_OPTIONS,
    BASIC_PROPS_SCRIPT_SETUP,
    COMPONENT_DESCRIPTION_DEMO_EXAMPLE,
    COMPONENT_DESCRIPTION_OPTIONS_EXAMPLE,
    COMPONENT_DESCRIPTION_SCRIPT_SETUP_EXAMPLE,
    COMPONENT_NAME_DEMO_EXAMPLE,
    COMPONENT_NAME_OPTIONS_EXAMPLE,
    COMPONENT_NAME_SCRIPT_SETUP_EXAMPLE,
    COMPONENT_TITLE_DEMO_EXAMPLE,
    COMPONENT_TITLE_OPTIONS_EXAMPLE,
    COMPONENT_TITLE_SCRIPT_SETUP_EXAMPLE,
    CUSTOM_COMPONENTS_DEMO_EXAMPLE,
    CUSTOM_COMPONENTS_OPTIONS_EXAMPLE,
    CUSTOM_COMPONENTS_SCRIPT_SETUP_EXAMPLE,
    DESCRIPTION_COMPONENT_DEMO_FILE_EXAMPLE,
    DESCRIPTION_COMPONENT_OPTIONS_EXAMPLE,
    DESCRIPTION_COMPONENT_SCRIPT_SETUP_EXAMPLE,
    DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_DEMO_FILE,
    DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_OPTIONS,
    DOCUMENTATION_SPECIFIC_PROP_DEFINITIONS_SCRIPT_SETUP,
    EMITS_ARRAY_OPTIONS_EXAMPLE,
    EMITS_ARRAY_SCRIPT_SETUP_EXAMPLE,
    EMITS_OBJECT_OPTIONS_EXAMPLE,
    EMITS_OBJECT_SCRIPT_SETUP_EXAMPLE,
    EMITS_TO_DEMO_ARRAY_DEMO_FILE_EXAMPLE,
    EMITS_TO_DEMO_ARRAY_OPTIONS_EXAMPLE,
    EMITS_TO_DEMO_ARRAY_SCRIPT_SETUP_EXAMPLE,
    EMITS_TO_DEMO_OBJECT_DEMO_FILE_EXAMPLE,
    EMITS_TO_DEMO_OBJECT_OPTIONS_EXAMPLE,
    EMITS_TO_DEMO_OBJECT_SCRIPT_SETUP_EXAMPLE,
    FILE_NAME_YOUR: {
      'Demo File': 'yourComponentDemo.js',
      Options: 'YourComponent.vue',
      Composition: 'YourComponent.vue',
      'Script Setup': 'YourComponent.vue'
    },
    FILE_NAME_MY: {
      'Demo File': 'myComponentDemo.js',
      Options: 'MyComponent.vue',
      Composition: 'MyComponent.vue',
      'Script Setup': 'MyComponent.vue'
    },
    IMPORT_STATEMENT_COMPONENT_DEMO_FILE_EXAMPLE,
    IMPORT_STATEMENT_COMPONENT_OPTIONS_EXAMPLE,
    IMPORT_STATEMENT_COMPONENT_SCRIPT_SETUP_EXAMPLE,
    IMPORT_STATEMENT_STRING_DEMO_FILE_EXAMPLE,
    IMPORT_STATEMENT_STRING_OPTIONS_EXAMPLE,
    IMPORT_STATEMENT_STRING_SCRIPT_SETUP_EXAMPLE,
    SETTING_PROP_DEFAULTS_DEMO_EXAMPLE,
    SETTING_PROP_DEFAULTS_OPTIONS_EXAMPLE,
    SETTING_PROP_DEFAULTS_SCRIPT_SETUP_EXAMPLE,
    SETTING_PROP_DEFAULTS_VUE_API_DEMO_EXAMPLE,
    SETTING_PROP_DEFAULTS_VUE_API_OPTIONS_EXAMPLE,
    SETTING_PROP_DEFAULTS_VUE_API_SCRIPT_SETUP_EXAMPLE,
    SLOTS_DEMO_ARRAY_EXAMPLE,
    SLOTS_DEMO_CUSTOM_COMPONENT_EXAMPLE,
    SLOTS_DEMO_DEFAULT_TEXT_EXAMPLE,
    SLOTS_OPTIONS_ARRAY_EXAMPLE,
    SLOTS_OPTIONS_CUSTOM_COMPONENT_EXAMPLE,
    SLOTS_OPTIONS_DEFAULT_TEXT_EXAMPLE,
    SLOTS_SCRIPT_SETUP_ARRAY_EXAMPLE,
    SLOTS_SCRIPT_SETUP_CUSTOM_COMPONENT_EXAMPLE,
    SLOTS_SCRIPT_SETUP_DEFAULT_TEXT_EXAMPLE,
    TITLE_COMPONENT_DEMO_FILE_EXAMPLE,
    TITLE_COMPONENT_OPTIONS_EXAMPLE,
    TITLE_COMPONENT_SCRIPT_SETUP_EXAMPLE
  }
};
</script>
