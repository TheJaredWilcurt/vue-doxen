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
import DoxenPlainText from '@/components/formFields/DoxenPlainText.vue';
import DoxenRadioDials from '@/components/formFields/DoxenRadioDials.vue';
import DoxenTextField from '@/components/formFields/DoxenTextField.vue';
import DoxenTextarea from '@/components/formFields/DoxenTextarea.vue';

const DoxenSidebar = DoxenSideBar;

export {
  styleTokensBootstrap5,
  styleTokensBuiltIn,
  styleTokensEmpty,
  styleTokensVuetify3
} from '@/helpers/styleTokens.js';

export {
  DoxenCheckbox,
  DoxenDropdown,
  DoxenEmitLog,
  DoxenEmitsDocumentation,
  DoxenHeader,
  DoxenJsonTextarea,
  DoxenPlainText,
  DoxenPropsDocumentation,
  DoxenRadioDials,
  DoxenSidebar,
  DoxenSideBar,
  DoxenTextField,
  DoxenTextarea,
  VueDoxen,
  VueDoxenCustom
};

export default {
  install: (app) => {
    app.component('DoxenCheckbox', DoxenCheckbox);
    app.component('DoxenDropdown', DoxenDropdown);
    app.component('DoxenEmitsDocumentation', DoxenEmitsDocumentation);
    app.component('DoxenEmitLog', DoxenEmitLog);
    app.component('DoxenHeader', DoxenHeader);
    app.component('DoxenJsonTextarea', DoxenJsonTextarea);
    app.component('DoxenPlainText', DoxenPlainText);
    app.component('DoxenPropsDocumentation', DoxenPropsDocumentation);
    app.component('DoxenRadioDials', DoxenRadioDials);
    app.component('DoxenSidebar', DoxenSideBar);
    app.component('DoxenSideBar', DoxenSideBar);
    app.component('DoxenTextField', DoxenTextField);
    app.component('DoxenTextarea', DoxenTextarea);
    app.component('VueDoxen', VueDoxen);
    app.component('VueDoxenCustom', VueDoxenCustom);
  }
};
