import { ref } from 'vue';

import DoxenButton from '@/components/DoxenButton.vue';
import DoxenEmitLog from '@/components/formFields/DoxenEmitLog.vue';
import DoxenPlainText from '@/components/formFields/DoxenPlainText.vue';

import { styleTokenPropToDemo } from '@@@/helpers/tokensByComponent.js';

export const createDoxenEmitLogDemo = function (styleTokens) {
  const events = ref([]);
  return {
    component: DoxenEmitLog,
    propsToDemo: {
      ...styleTokenPropToDemo(styleTokens, 'DoxenEmitLog'),
      addToLogButton: {
        component: DoxenButton,
        props: {
          styleTokens
        },
        slots: {
          default: 'Add to log'
        },
        events: {
          click: function ($event) {
            events.value.push({
              emitName: 'click',
              value: $event
            });
          }
        }
      },
      modelValue: {
        component: DoxenPlainText,
        props: {
          label: 'Model Value',
          modelValue: events,
          styleTokens,
          asCode: true
        }
      }
    },
    events: {
      'update:model-value': function ($event) {
        events.value = $event;
      }
    }
  };
};
