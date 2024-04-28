import DoxenDropdown from '@/components/formFields/DoxenDropdown.vue';
import DoxenTextField from '@/components/formFields/DoxenTextField.vue';
import DummyScriptSetupApi from '@@@/components/DummyScriptSetupApi.vue';

export const dummyScriptSetupApiDemo = {
  component: DummyScriptSetupApi,
  name: 'Dummy Script Setup API',
  description: 'This is an arbitrary test for Script Setup API components.',
  propsToDemo: {
    label: {
      allowed: ['potato', 'Greeting'],
      description: 'Some text',
      required: false,
      default: 'butter',
      example: 'asdf',
      component: DoxenTextField,
      props: {
        label: 'Label',
        modelValue: 'Greeting:'
      }
    },
    color: {
      component: DoxenDropdown,
      props: {
        label: 'Color',
        modelValue: 'blue',
        options: DummyScriptSetupApi.props.color.allowed.map((value) => {
          return {
            name: value,
            value
          };
        })
      }
    }
  },
  slotsToDemo: {
    default: '<strong>Test</strong>'
  }
};
