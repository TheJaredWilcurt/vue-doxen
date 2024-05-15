import DoxenPropsDocumentation from '@/components/DoxenPropsDocumentation.vue';
import DoxenJsonTextarea from '@/components/formFields/DoxenJsonTextarea.vue';
import DoxenTextarea from '@/components/formFields/DoxenTextarea.vue';
import DoxenPlainText from '@/components/formFields/DoxenPlainText.vue';

const CODE_AS_STRING = `
{
  amount: {
    type: [Number, String],
    required: false,
    default: 2,
    validator: function (value) {
      return value < 5;
    },
    example: ':amount="4"'
  },
  color: {
    type: String,
    required: false,
    default: 'bronze',
    allowed: ['gold', 'silver', 'bronze'],
    description: 'The trophy color to convey first, second, or third place.',
    validator: function (value) {
      return ['gold', 'silver', 'bronze'].includes(value);
    },
    example: 'color="gold"'
  }
}
`.trim();

export const createDoxenPropsDocumentationDemo = function (styleTokens) {
  return {
    component: DoxenPropsDocumentation,
    description: 'Below we pass in some example prop definitions into the <code>DoxenPropsDocumentation</code> component.',
    propsToDemo: {
      propsToDemo: {
        component: DoxenPlainText,
        props: {
          label: 'Props to demo',
          codeAsString: CODE_AS_STRING,
          modelValue: {
            amount: {
              type: [Number, String],
              required: false,
              default: 2,
              validator: function (value) {
                return value < 5;
              },
              example: ':amount="4"'
            },
            color: {
              type: String,
              required: false,
              default: 'bronze',
              allowed: ['gold', 'silver', 'bronze'],
              description: 'The trophy color to convey first, second, or third place.',
              validator: function (value) {
                return ['gold', 'silver', 'bronze'].includes(value);
              },
              example: 'color="gold"'
            }
          },
          styleTokens
        }
      },
      styleTokens: {
        component: DoxenJsonTextarea,
        props: {
          label: 'Style Tokens',
          modelValue: styleTokens,
          styleTokens
        }
      }
    }
  };
};
