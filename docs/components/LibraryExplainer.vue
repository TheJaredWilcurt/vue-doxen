<template>
  <div class="explainer">
    <h2 class="docs-title">TLDR</h2>
    <p>
      Vue-Doxen is a tool to demo and document Vue.js components.
    </p>
    <ol class="explainer-list">
      <li>
        <strong>Document your components:</strong>
        <p>
          Put your docs either inside your component or in an external "demo" object.
        </p>
        <DoxenCodeSwapper
          class="explainer-code"
          :codeTypes="{
            'Options API': EXPLAINER_OPTIONS_EXAMPLE,
            'Script Setup': EXPLAINER_SCRIPT_SETUP_EXAMPLE,
            [EXTERNAL_DEMO_OBJECT]: EXPLAINER_DEMO_EXAMPLE + '\n\n'
          }"
          :fileName="{
            'Options API': 'MyButton.vue',
            'Script Setup': 'MyButton.vue',
            [EXTERNAL_DEMO_OBJECT]: 'myButtonDemo.js'
          }"
          :copy="false"
          :styleTokens="styleTokens"
          @tabChanged="trackSelected($event)"
        />
      </li>
      <li>
        <strong>Pass them into Vue-Doxen</strong>
        <DoxenCodeBox
          class="explainer-code"
          :code="doxenExample"
          :copy="false"
          :styleTokens="styleTokens"
        />
      </li>
      <li>
        <strong>That's it!</strong>
        <p>
          With just that you get a live component demo with all your props, slots, and emits documented.
        </p>
      </li>
    </ol>
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import DoxenCodeBox from '@/components/DoxenCodeBox.vue';
import DoxenCodeSwapper from '@/components/DoxenCodeSwapper.vue';

import {
  EXPLAINER_DEMO_EXAMPLE,
  EXPLAINER_DOXEN_OPTIONS_API,
  EXPLAINER_DOXEN_OPTIONS_API_DEMO,
  EXPLAINER_DOXEN_SCRIPT_SETUP,
  EXPLAINER_DOXEN_SCRIPT_SETUP_DEMO,
  EXPLAINER_OPTIONS_EXAMPLE,
  EXPLAINER_SCRIPT_SETUP_EXAMPLE
} from '@@@/helpers/codeSnippets.js';

const EXTERNAL_DEMO_OBJECT = 'External Demo Object';

export default {
  name: 'LibraryExplainer',
  components: {
    DoxenCodeBox,
    DoxenCodeSwapper
  },
  props: {
    styleTokens
  },
  data: function () {
    return {
      selectedOrderPreference: ['Options API']
    };
  },
  constants: {
    EXPLAINER_DEMO_EXAMPLE,
    EXPLAINER_OPTIONS_EXAMPLE,
    EXPLAINER_SCRIPT_SETUP_EXAMPLE,
    EXTERNAL_DEMO_OBJECT
  },
  methods: {
    trackSelected: function (value) {
      this.selectedOrderPreference.unshift(value);
      this.selectedOrderPreference = Array.from(new Set(this.selectedOrderPreference));
    }
  },
  computed: {
    mostRecentAPI: function () {
      return this.selectedOrderPreference
        .filter((value) => {
          return value !== EXTERNAL_DEMO_OBJECT;
        })[0];
    },
    demoObjectSelected: function () {
      return this.selectedOrderPreference[0] === EXTERNAL_DEMO_OBJECT;
    },
    optionsApiExample: function () {
      if (this.demoObjectSelected) {
        return EXPLAINER_DOXEN_OPTIONS_API_DEMO;
      }
      return EXPLAINER_DOXEN_OPTIONS_API;
    },
    scriptSetupExample: function () {
      if (this.demoObjectSelected) {
        return EXPLAINER_DOXEN_SCRIPT_SETUP_DEMO;
      }
      return EXPLAINER_DOXEN_SCRIPT_SETUP;
    },
    doxenExample: function () {
      if (this.mostRecentAPI === 'Options API') {
        return this.optionsApiExample;
      }
      return this.scriptSetupExample;
    }
  }
};
</script>

<style>
.explainer {
  margin-bottom: 3rem;
}
.explainer-list li {
  font-size: 1.5rem;
}
.explainer-list strong {
  font-weight: 600;
}
.explainer-list p {
  margin-bottom: 0px;
}
.explainer-list p,
.explainer-code {
  font-size: 1.1rem;
}
@media (width < 1000px) {
  .explainer-list li {
    font-size: 1.25rem;
  }
  .explainer-code {
    font-size: 0.85rem;
  }
}
@media (width < 945px) {
  .explainer-code [data-style-tokens="tabsHeader"] {
    height: auto;
    align-items: end;
  }
  .explainer-code [data-style-tokens="tabsButtonContainer"] {
    flex-direction: column;
  }
  .explainer-code [data-applied-style-tokens="codeSwapperFileName"] {
    padding-left: 0.5rem;
    padding-bottom: 0.5rem;
  }
}
@media (width < 831px) {
  .explainer-code [data-applied-style-tokens="codeSwapperFileName"] {
    padding: unset;
  }
  .explainer-code [data-style-tokens="tabsHeader"] {
    align-items: center;
  }
  .explainer-code [data-style-tokens="tabsButtonContainer"] {
    flex-direction: row;
  }
  .explainer-list li {
    list-style: none;
  }
  .explainer-list li:before {
    content: '1. ';
  }
  .explainer-list li:nth-of-type(2):before {
    content: '2. ';
  }
  .explainer-list li:nth-of-type(3):before {
    content: '3. ';
  }
  .explainer-list {
    margin-right: 0px;
    margin-left: 0px;
    padding-right: 0px;
    padding-left: 0px;
  }
}
@media (width < 730px) {
  .explainer-code [data-style-tokens="tabsButtonContainer"] {
    flex-direction: column;
  }
  .explainer-code [data-applied-style-tokens="tabsHeader"] {
    align-items: end;
  }
  .explainer-code [data-applied-style-tokens="codeSwapperFileName"] {
    padding-left: 0.5rem;
    padding-bottom: 0.5rem;
  }
}
@media (width < 525px) {
  .explainer-code {
    font-size: 0.8rem;
  }
  .explainer-code [data-style-tokens="tabsButtonContainer"] button {
    font-size: inherit;
  }
}
@media (width < 410px) {
  .explainer-code {
    font-size: 0.725rem;
  }
}
@media (width < 400px) {
  .v-application .explainer-code [data-applied-style-tokens~="tabsHeader"] {
    flex-direction: row;
  }
}
@media (width < 371px) {
  .v-application .explainer-code [data-applied-style-tokens~="tabsHeader"],
  .explainer-code [data-applied-style-tokens="tabsHeader"] {
    flex-direction: column;
    align-items: center;
  }
  .explainer-code [data-applied-style-tokens="codeSwapperFileName"] {
    padding-left: 0px;
    padding-bottom: 0px;
  }
}
@media (width < 225px) {
  .explainer-code {
    font-size: 0.65rem;
  }
}
</style>
