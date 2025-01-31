<template>
  <div class="docs-page">
    <h1
      id="dev-testing-page"
      class="docs-title"
    >
      Dev Testing Page
    </h1>

    <section>
      <DoxenCodeBox
        :code="code"
        :copy="false"
        :styleTokens="styleTokens"
      />
    </section>

    <section v-if="false">
      <div
        v-for="(component, componentIndex) in components"
        :key="'component' + componentIndex"
      >
        <strong>{{ component.name }} Slot data</strong>
        <pre v-text="getSlotDataFromComponent(component)"></pre>
      </div>
    </section>
  </div>
</template>

<script>
import { getSlotDataFromComponent } from '@/helpers/demoHelpers.js';
import { styleTokens } from '@/helpers/props.js';

import DoxenCodeBox from '@/components/DoxenCodeBox.vue';
import DummyCompositionApi from '@@@/components/DummyCompositionApi.vue';
import DummyScriptSetupApi from '@@@/components/DummyScriptSetupApi.vue';
import DummySlots from '@@@/components/DummySlots.vue';

export default {
  name: 'DevTestingPage',
  components: {
    DoxenCodeBox
  },
  props: {
    styleTokens
  },
  methods: {
    getSlotDataFromComponent
  },
  computed: {
    code: function () {
      return document.getElementById('VueDoxen_Styles_v-2');
    },
    components: function () {
      return [
        DummyCompositionApi,
        DummyScriptSetupApi,
        DummySlots
      ];
    }
  }
};
</script>
