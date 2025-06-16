<template>
  <div class="docs-page">
    <h1
      id="a11y"
      class="docs-title"
    >
      Accessibility Tooling
    </h1>

    <p>
      Rather than build a custom plugin for Vue-Doxen, we belive the best options for accessibility
      tooling is to use what already exists in the
      <a
        v-text="'Vue ecosystem'"
        href="https://github.com/vuejs/awesome-vue?tab=readme-ov-file#a11y"
        target="_blank"
      ></a>.
    </p>

    <p>
      Here are two tools I recommend:
    </p>

    <nav>
      <ul>
        <li><a href="#eslint">Vue.js Accessibility ESLint Plugin</a></li>
        <li><a href="#vdta">Vue-Dev-Tools-Accessibility</a></li>
        <li><a href="#demo">Tooling demonstration</a></li>
      </ul>
    </nav>

    <DocumentationSection id="eslint" title="Vue.js Accessibility ESLint Plugin">
      <p>
        This is a great ESLint plugin for Vue projects to detect common accessibility issues in your
        source code and help to enforce best practices.
      </p>

      <ol>
        <li><code>npm install --save-dev eslint@9 eslint-plugin-vuejs-accessibility</code></li>
        <li>
          Create an <code>eslint.config.js</code> file in the root of your project
          <DoxenCodeBox
            :code="ESLINT_EXAMPLE"
            :styleTokens="styleTokens"
          />
        </li>
        <li>
          In the <code>scripts</code> section of your <code>package.json</code>,
          add a <code>lint</code> script.
          <DoxenCodeBox
            :code="LINT_SCRIPT_EXAMPLE"
            :styleTokens="styleTokens"
          />
          The "<code>src vite.config.js</code>" part can be changed to any files or
          folders you want to lint in your project.
        </li>
        <li>
          <a
            v-text="'Additional Documentation'"
            href="https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility"
          ></a>
        </li>
      </ol>
    </DocumentationSection>

    <DocumentationSection id="vdta" title="Vue-Dev-Tools-Accessibility">
      <p>
        Axe is a commonly used open source rule set for automated accessibility validation.
        It is generally ran against the actual rendered DOM of a page and can catch things
        that a linter cannot, like color contrast issues.
      </p>

      <p>
        The Vite-Vue-DevTools are the officially recommened approach to debug and analyze
        your Vue apps. I've created a plugin for it that adds an Accessibility tab that
        uses Axe to scan your page for issues.
      </p>

      <p>To install it, follow the instructions on the website:</p>

      <ul>
        <li>
          <a href="https://vue-dev-tools-accessibility.github.io">
            Vue-Dev-Tools-Accessibility.github.io
          </a>
        </li>
      </ul>
    </DocumentationSection>

    <DocumentationSection id="demo" title="Tooling demonstration">
      <p>The following intentionally has accessibility issues, to demonstrate the accessibility tools.</p>

      <div class="bad-dom">
        <!-- eslint-disable -->
        <input
          :class="{ highlighted: highlighted === 'input' }"
          :value="'input needs label'"
        />
        <img
          :class="{ highlighted: highlighted === 'img' }"
          src="@@@/assets/vue-doxen-logo-small.png"
          @click="bark"
        />
        <img
          v-show="barking"
          src="@@@/assets/bork-face.png"
        />

        <h4
          :class="{ highlighted: highlighted === 'h4' }"
          style="background: #5D7DA2; color: #435A75;"
        >Low contrast</h4>
        <!-- eslint-enable -->
      </div>

      <p>
        The above example also results in the following linting errors when using the linter plugin:
      </p>

      <ul>
        <li>
          <code>vuejs-accessibility/alt-text</code>
          <ul>
            <li>
              <code>img</code> elements must have an <code>alt</code> prop, either with meaningful text, or an empty string for decorative images
            </li>
          </ul>
        </li>
        <li>
          <code>vuejs-accessibility/click-events-have-key-events</code>
          <ul>
            <li>
              Visible, non-interactive elements with click handlers must have at least one keyboard listener
            </li>
          </ul>
        </li>
        <li>
          <code>vuejs-accessibility/no-static-element-interactions</code>
          <ul>
            <li>
              Visible, non-interactive elements should not have an interactive handler
            </li>
          </ul>
        </li>
      </ul>

      <p>To correct the linting errors, this is hwo the code would need to be changed to be accessible:</p>

      <DoxenCodeSwapper
        :codeTypes="{
          'Fails Linter': BAD_IMAGE,
          'Passes Linter': GOOD_IMAGE
        }"
        fileName="ExampleComponent.vue"
        :styleTokens="styleTokens"
      />

      <p>
        The
        <strong><a
          v-text="'Vue-Dev-Tools-Accessibility plugin'"
          href="https://vue-dev-tools-accessibility.github.io"
          target="_blank"
        ></a></strong>
        would catch these errors:
      </p>

      <div class="vdta-card">
        <div class="vdta-heading">
          <h3>Color&nbsp;Contrast</h3>
          <p class="vdta-subheading">Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds.</p>
        </div>
        <p>
          Elements must meet minimum color contrast ratio thresholds.
          <a
            class="rule-learn-more"
            href="https://dequeuniversity.com/rules/axe/4.10/color-contrast"
            target="_blank"
            title="dequeuniversity.com/rules/axe/4.10/color-contrast"
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Learn more</title>
              <path
                d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </p>

        <DoxenCodeBox
          :code="'<h4\n  class=&quot;&quot;\n  style=&quot;\n    background: rgb(93, 125, 162);\n    color: rgb(67, 90, 117);\n  &quot;\n>\n  Low contrast\n</h4>'"
          :copy="false"
          :styleTokens="styleTokens"
        />

        <DoxenButton
          class="vdta-highlight-button"
          :styleTokens="styleTokens"
          @click="setHighlighted('h4')"
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>target icon</title>
            <path
              d="M22.08,11.04H20.08V4H13.05V2H11.04V4H4V11.04H2V13.05H4V20.08H11.04V22.08H13.05V20.08H20.08V13.05H22.08V11.04M18.07,18.07H13.05V16.06H11.04V18.07H6V13.05H8.03V11.04H6V6H11.04V8.03H13.05V6H18.07V11.04H16.06V13.05H18.07V18.07M13.05,12.05A1,1 0 0,1 12.05,13.05C11.5,13.05 11.04,12.6 11.04,12.05C11.04,11.5 11.5,11.04 12.05,11.04C12.6,11.04 13.05,11.5 13.05,12.05Z"
              fill="currentColor"
            />
          </svg>
          Highlight element on page
        </DoxenButton>

        Element has insufficient color contrast of
        <strong>1.66:1</strong>
        (text color: <span class="color-block-text"><span class="color-block" style="background: rgb(67, 90, 117);"></span><strong>#435A75</strong></span>,
        background color: <span class="color-block-text"><span class="color-block" style="background: rgb(93, 125, 162);"></span><strong>#5D7DA2</strong></span>,
        font size: <strong>12.0pt (16px)</strong>,
        font weight: <strong>normal</strong>).
        Expected contrast ratio of <strong>4.5:1</strong>.
        <ul><li>
          Suggested text color:
        <span class="color-block-text"><span class="color-block" style="background: rgb(11, 15, 19);"></span><strong>#0B0F13</strong></span></li><li>
          Suggested background color:
          <span class="color-block-text"><span class="color-block" style="background: rgb(197, 208, 222);"></span><strong>#C5D0DE</strong></span></li></ul>
        You should not need to change both text and background. Changing either to the suggested color should be enough.
      </div>

      <div class="vdta-card">
        <div class="vdta-heading">
          <h3>Heading&nbsp;Order</h3>
          <p class="vdta-subheading">Ensure the order of headings is semantically correct.</p>
        </div>
        <p>
          Heading levels should only increase by one.
          <a
            class="rule-learn-more"
            href="https://dequeuniversity.com/rules/axe/4.10/heading-order"
            target="_blank"
            title="dequeuniversity.com/rules/axe/4.10/heading-order"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <title>Learn more</title>
              <path
                d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </p>

        <DoxenCodeBox
          :code="'<h4\n  class=&quot;&quot;\n  style=&quot;\n    background: rgb(93, 125, 162);\n    color: rgb(67, 90, 117);\n  &quot;\n>\n  Low contrast\n</h4>'"
          :copy="false"
          :styleTokens="styleTokens"
        />

        <DoxenButton
          class="vdta-highlight-button"
          :styleTokens="styleTokens"
          @click="setHighlighted('h4')"
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>target icon</title>
            <path
              d="M22.08,11.04H20.08V4H13.05V2H11.04V4H4V11.04H2V13.05H4V20.08H11.04V22.08H13.05V20.08H20.08V13.05H22.08V11.04M18.07,18.07H13.05V16.06H11.04V18.07H6V13.05H8.03V11.04H6V6H11.04V8.03H13.05V6H18.07V11.04H16.06V13.05H18.07V18.07M13.05,12.05A1,1 0 0,1 12.05,13.05C11.5,13.05 11.04,12.6 11.04,12.05C11.04,11.5 11.5,11.04 12.05,11.04C12.6,11.04 13.05,11.5 13.05,12.05Z"
              fill="currentColor"
            />
          </svg>
          Highlight element on page
        </DoxenButton>

        Heading order invalid.
      </div>

      <div class="vdta-card">
        <div class="vdta-heading">
          <h3>Image&nbsp;Alt</h3>
          <p class="vdta-subheading">
            Ensure &lt;img&gt; elements have alternative text or a role of none or presentation.
          </p>
        </div>
        <p>
          Images must have alternative text.
          <a
            class="rule-learn-more"
            href="https://dequeuniversity.com/rules/axe/4.10/image-alt"
            target="_blank"
            title="dequeuniversity.com/rules/axe/4.10/image-alt"
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Learn more</title>
              <path
                d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </p>

        <DoxenCodeBox
          :code="'<img\n  class=&quot;&quot;\n  src=&quot;/vue-doxen/docs/assets/vue-doxen-logo-small.png&quot;\n/>'"
          :copy="false"
          :styleTokens="styleTokens"
        />

        <DoxenButton
          class="vdta-highlight-button"
          :styleTokens="styleTokens"
          @click="setHighlighted('img')"
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>target icon</title>
            <path
              d="M22.08,11.04H20.08V4H13.05V2H11.04V4H4V11.04H2V13.05H4V20.08H11.04V22.08H13.05V20.08H20.08V13.05H22.08V11.04M18.07,18.07H13.05V16.06H11.04V18.07H6V13.05H8.03V11.04H6V6H11.04V8.03H13.05V6H18.07V11.04H16.06V13.05H18.07V18.07M13.05,12.05A1,1 0 0,1 12.05,13.05C11.5,13.05 11.04,12.6 11.04,12.05C11.04,11.5 11.5,11.04 12.05,11.04C12.6,11.04 13.05,11.5 13.05,12.05Z"
              fill="currentColor"
            />
          </svg>
          Highlight element on page
        </DoxenButton>

        Fix any of the following:

        <ul>
          <li>Element does not have an alt attribute.</li>
          <li>Aria-label attribute does not exist or is empty</li>
          <li>Aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty</li>
          <li>Element has no title attribute</li>
          <li>Element's default semantics were not overridden with role="none" or role="presentation".</li>
        </ul>
      </div>

      <div class="vdta-card">
        <div class="vdta-heading">
          <h3>Label</h3>
          <p class="vdta-subheading">
            Ensure every form element has a label.
          </p>
        </div>

        <p>
          Form elements must have labels.
          <a
            class="rule-learn-more"
            href="https://dequeuniversity.com/rules/axe/4.10/label"
            target="_blank"
            title="dequeuniversity.com/rules/axe/4.10/label"
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Learn more</title>
              <path
                d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </p>

        <DoxenCodeBox
          code="<input value=&quot;input needs label&quot; />"
          :copy="false"
          :styleTokens="styleTokens"
        />

        <DoxenButton
          class="vdta-highlight-button"
          :styleTokens="styleTokens"
          @click="setHighlighted('input')"
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>target icon</title>
            <path
              d="M22.08,11.04H20.08V4H13.05V2H11.04V4H4V11.04H2V13.05H4V20.08H11.04V22.08H13.05V20.08H20.08V13.05H22.08V11.04M18.07,18.07H13.05V16.06H11.04V18.07H6V13.05H8.03V11.04H6V6H11.04V8.03H13.05V6H18.07V11.04H16.06V13.05H18.07V18.07M13.05,12.05A1,1 0 0,1 12.05,13.05C11.5,13.05 11.04,12.6 11.04,12.05C11.04,11.5 11.5,11.04 12.05,11.04C12.6,11.04 13.05,11.5 13.05,12.05Z"
              fill="currentColor"
            />
          </svg>
          Highlight element on page
        </DoxenButton>

        Fix any of the following:

        <ul>
          <li>Element does not have an implicit (wrapped) &lt;label&gt;</li>
          <li>Element does not have an explicit &lt;label&gt;</li>
          <li>Aria-label attribute does not exist or is empty</li>
          <li>Aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty</li>
          <li>Element has no title attribute</li>
          <li>Element has no placeholder attribute</li>
          <li>Element's default semantics were not overridden with role="none" or role="presentation".</li>
        </ul>
      </div>
    </DocumentationSection>
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import DoxenButton from '@/components/DoxenButton.vue';
import DoxenCodeBox from '@/components/DoxenCodeBox.vue';
import DoxenCodeSwapper from '@/components/DoxenCodeSwapper.vue';
import DocumentationSection from '@@@/components/DocumentationSection.vue';
import SubDocumentationSection from '@@@/components/SubDocumentationSection.vue';

const ESLINT_EXAMPLE = `
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility';

export default [
  ...pluginVueA11y.configs['flat/recommended'],
  {
    languageOptions: {
      ecmaVersion: 2025
    },
    // project specific rules/settings
    rules: {
      'vuejs-accessibility/label-has-for': [
        'error',
        {
          components: ['Label'],
          required: {
            some: ['nesting', 'id']
          },
          allowChildren: false
        }
      ]
    }
  }
];
`.trim();
const LINT_SCRIPT_EXAMPLE = `
{
  "scripts": {
    "lint": "eslint --ext .js,.vue src vite.config.js"
  }
}
`.trim();
const BAD_IMAGE = `
<template>
  <img
    src="@/assets/vue-doxen-dog.png"
    @click="bark"
  />
</template>
`.trim();
const GOOD_IMAGE = `
<template>
  <img
    alt="A doxen dog with a green chest in the shape of the Vue logo"
    src="@/assets/vue-doxen-dog.png"
    role="button"
    tabindex="0"
    @click="bark"
    @keyup.enter="bark"
    @keydown.space.prevent="bark"
  />
</template>
`.trim();

export default {
  name: 'AccessibilityOptions',
  components: {
    DocumentationSection,
    DoxenButton,
    DoxenCodeBox,
    DoxenCodeSwapper,
    SubDocumentationSection
  },
  props: {
    styleTokens
  },
  constants: {
    BAD_IMAGE,
    ESLINT_EXAMPLE,
    GOOD_IMAGE,
    LINT_SCRIPT_EXAMPLE
  },
  data: function () {
    return {
      barking: false,
      highlighted: undefined
    };
  },
  methods: {
    bark: async function () {
      const bark = new Audio('/vue-doxen/bark.mp3');
      await bark.play();
      setTimeout(() => { this.barking = true; }, 100);
      setTimeout(() => { this.barking = false; }, 250);
      setTimeout(() => { this.barking = true; }, 600);
      setTimeout(() => { this.barking = false; }, 800);
    },
    setHighlighted: function (name) {
      if (this.highlighted === name) {
        this.highlighted = undefined
      } else {
        this.highlighted = name;
        document
          .querySelector('.bad-dom')
          .scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          });
      }
    }
  }
};
</script>

<style scoped>
.bad-dom {
  position: relative;
  border: 4px dashed #700;
  padding: 10px 100px 10px 10px;
}
img {
  position: absolute;
  top: 10px;
  right: 10px;
  max-width: fit-content;
  height: 106px;
  z-index: 1;
}
.vdta-card {
  border: 1px solid currentColor;
  margin: 1rem;
  padding: 1rem;
}
.vdta-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom: 1px solid currentColor;
}
.vdta-subheading {
  display: inline-block;
  max-width: 677px;
  margin-left: auto;
  text-align: right
}
.vdta-card h3 {
  margin: 0px;
  font-weight: 700;
}
.color-block-text {
  display: inline-flex;
  align-items: center;
  vertical-align: -2px;
}
.color-block {
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 1px solid currentColor;
  margin: 0 3px 0 0;
}
.rule-learn-more {
  text-decoration: none;
}
.rule-learn-more svg {
  height: 20px;
  vertical-align: sub;
}
.vdta-highlight-button {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 1rem;
}
.vdta-highlight-button svg {
  height: 17px;
}
.highlighted {
  outline: 4px solid #F00;
}
</style>
