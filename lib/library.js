export {
  styleTokensBootstrap5,
  styleTokensBuiltIn,
  styleTokensEmpty
} from '@/helpers/styleTokens.js';

import VueDoxen from '@/components/VueDoxen.vue';
import DoxenSideBar from '@/components/DoxenSideBar.vue';
import DoxenCheckbox from '@/components/formFields/DoxenCheckbox.vue';
import DoxenDropdown from '@/components/formFields/DoxenDropdown.vue';
import DoxenEmitLog from '@/components/formFields/DoxenEmitLog.vue';
import DoxenJsonTextarea from '@/components/formFields/DoxenJsonTextarea.vue';
import DoxenPlainText from '@/components/formFields/DoxenPlainText.vue';
import DoxenRadioDials from '@/components/formFields/DoxenRadioDials.vue';
import DoxenTextarea from '@/components/formFields/DoxenTextarea.vue';
import DoxenTextField from '@/components/formFields/DoxenTextField.vue';

export default {
  install: (app) => {
    app.component('DoxenCheckbox', DoxenCheckbox);
    app.component('DoxenDropdown', DoxenDropdown);
    app.component('DoxenEmitLog', DoxenEmitLog);
    app.component('DoxenJsonTextarea', DoxenJsonTextarea);
    app.component('DoxenPlainText', DoxenPlainText);
    app.component('DoxenRadioDials', DoxenRadioDials);
    app.component('DoxenSideBar', DoxenSideBar);
    app.component('DoxenTextarea', DoxenTextarea);
    app.component('DoxenTextField', DoxenTextField);
    app.component('VueDoxen', VueDoxen);
  }
};

export {
  DoxenCheckbox,
  DoxenDropdown,
  DoxenEmitLog,
  DoxenJsonTextarea,
  DoxenPlainText,
  DoxenRadioDials,
  DoxenSideBar,
  DoxenTextarea,
  DoxenTextField,
  VueDoxen
};
