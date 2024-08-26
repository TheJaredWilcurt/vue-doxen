import {
  styleTokensBootstrap5,
  styleTokensBuiltIn,
  styleTokensEmpty,
  styleTokensVuetify3
} from '@/helpers/styleTokens.js';

import DoxenCodeBox from '@/components/DoxenCodeBox.vue';
import DoxenCodeSwapper from '@/components/DoxenCodeSwapper.vue';
import DoxenEmitsDocumentation from '@/components/DoxenEmitsDocumentation.vue';
import DoxenHeader from '@/components/DoxenHeader.vue';
import DoxenPropsDocumentation from '@/components/DoxenPropsDocumentation.vue';
import DoxenSideBar from '@/components/DoxenSideBar.vue';
import VueDoxen from '@/components/VueDoxen.vue';
import VueDoxenCustom from '@/components/VueDoxenCustom.vue';
import DoxenCheckbox from '@/components/formFields/DoxenCheckbox.vue';
import DoxenDropdown from '@/components/formFields/DoxenDropdown.vue';
import DoxenEmitLog from '@/components/formFields/DoxenEmitLog.vue';
import DoxenJsonTextarea from '@/components/formFields/DoxenJsonTextarea.vue';
import DoxenNumberField from '@/components/formFields/DoxenNumberField.vue';
import DoxenPlainText from '@/components/formFields/DoxenPlainText.vue';
import DoxenRadioDials from '@/components/formFields/DoxenRadioDials.vue';
import DoxenRangeSlider from '@/components/formFields/DoxenRangeSlider.vue';
import DoxenTextField from '@/components/formFields/DoxenTextField.vue';
import DoxenTextarea from '@/components/formFields/DoxenTextarea.vue';

const DoxenSidebar = DoxenSideBar;

const vueDoxenPlugin = {
  install: (app) => {
    app.component('DoxenCheckbox', DoxenCheckbox);
    app.component('DoxenCodeBox', DoxenCodeBox);
    app.component('DoxenCodeSwapper', DoxenCodeSwapper);
    app.component('DoxenDropdown', DoxenDropdown);
    app.component('DoxenEmitsDocumentation', DoxenEmitsDocumentation);
    app.component('DoxenEmitLog', DoxenEmitLog);
    app.component('DoxenHeader', DoxenHeader);
    app.component('DoxenJsonTextarea', DoxenJsonTextarea);
    app.component('DoxenNumberField', DoxenNumberField);
    app.component('DoxenPlainText', DoxenPlainText);
    app.component('DoxenPropsDocumentation', DoxenPropsDocumentation);
    app.component('DoxenRadioDials', DoxenRadioDials);
    app.component('DoxenRangeSlider', DoxenRangeSlider);
    app.component('DoxenSidebar', DoxenSideBar);
    app.component('DoxenSideBar', DoxenSideBar);
    app.component('DoxenTextField', DoxenTextField);
    app.component('DoxenTextarea', DoxenTextarea);
    app.component('VueDoxen', VueDoxen);
    app.component('VueDoxenCustom', VueDoxenCustom);
  }
};

export {
  DoxenCheckbox,
  DoxenCodeBox,
  DoxenCodeSwapper,
  DoxenDropdown,
  DoxenEmitLog,
  DoxenEmitsDocumentation,
  DoxenHeader,
  DoxenJsonTextarea,
  DoxenNumberField,
  DoxenPlainText,
  DoxenPropsDocumentation,
  DoxenRadioDials,
  DoxenRangeSlider,
  DoxenSidebar,
  DoxenSideBar,
  DoxenTextField,
  DoxenTextarea,
  styleTokensBootstrap5,
  styleTokensBuiltIn,
  styleTokensEmpty,
  styleTokensVuetify3,
  VueDoxen,
  VueDoxenCustom,
  vueDoxenPlugin
};
