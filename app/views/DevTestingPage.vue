<template>
  <div class="docs-page">
    <h1
      id="dev-testing-page"
      class="docs-title"
    >
      Dev Testing Page
    </h1>

    <div
      v-for="(component, componentIndex) in components"
      :key="'component' + componentIndex"
    >
      <strong>{{ component.name }} Slot data</strong>
      <pre v-text="getSlotDataFromComponent(component)"></pre>
    </div>
  </div>
</template>

<script>
import { getSlotDataFromComponent } from '@/helpers/demoHelpers.js';

import DummyCompositionApi from '@@@/components/DummyCompositionApi.vue';
import DummyScriptSetupApi from '@@@/components/DummyScriptSetupApi.vue';
import DummySlots from '@@@/components/DummySlots.vue';

export default {
  name: 'DevTestingPage',
  methods: {
    getSlotDataFromComponent
  },
  computed: {
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
