/**
 * @file Every time we update this file, also update:
 *   /lib/library.js
 *   /lib/helpers/props.js (options validator)
 *   /lib/helpers/validateOptions.js
 *   /app/demos/index.js (styleToken components list)
 *   /app/helpers/codeSnippets.js (TREE_SHAKING_IMPORT_EXAMPLE)
 */

// Though it would be more convienent to import all this from
// `@/vue-doxen.js`, doing so causes a cylcic import.
import DoxenEmitsDocumentation from '@/components/DoxenEmitsDocumentation.vue';
import DoxenHeader from '@/components/DoxenHeader.vue';
import DoxenPropsDocumentation from '@/components/DoxenPropsDocumentation.vue';
import DoxenCheckbox from '@/components/formFields/DoxenCheckbox.vue';
import DoxenDropdown from '@/components/formFields/DoxenDropdown.vue';
import DoxenEmitLog from '@/components/formFields/DoxenEmitLog.vue';
import DoxenJsonTextarea from '@/components/formFields/DoxenJsonTextarea.vue';
import DoxenPlainText from '@/components/formFields/DoxenPlainText.vue';
import DoxenRadioDials from '@/components/formFields/DoxenRadioDials.vue';
import DoxenTextField from '@/components/formFields/DoxenTextField.vue';
import DoxenTextarea from '@/components/formFields/DoxenTextarea.vue';

export default {
  components: {
    checkbox: DoxenCheckbox,
    dropdown: DoxenDropdown,
    emitLog: DoxenEmitLog,
    emitsDocumentation: DoxenEmitsDocumentation,
    header: DoxenHeader,
    jsonTextarea: DoxenJsonTextarea,
    plainText: DoxenPlainText,
    propsDocumentation: DoxenPropsDocumentation,
    radioDials: DoxenRadioDials,
    textField: DoxenTextField,
    textarea: DoxenTextarea
  }
};
