<template>
  <div class="docs-page">
    <h1
      id="dev-testing-page"
      class="docs-title"
    >
      Dev Testing Page
    </h1>

    <div
      v-for="(component, componentIndex) in test.components"
      :key="'component' + componentIndex"
    >
      <strong>{{ component.name }} Slot names</strong>
      <pre v-text="getSlotNamesFromComponent(component)"></pre>
      <strong>{{ component.name }} Slot data</strong>
      <pre v-text="getSlotDataFromComponent(component)"></pre>
    </div>
  </div>
</template>

<script>
import DummySlots from '@@@/components/DummySlots.vue';
import { DoxenCodeBox, DoxenRadioDials } from '@/library.js';

import {
  getSlotNamesFromComponent,
  getSlotDataFromComponent
} from '@/helpers/demoHelpers.js';

export default {
  name: 'DevTestingPage',
  methods: {
    getSlotNamesFromComponent,
    getSlotDataFromComponent
  },
  computed: {
    test: function () {
      return {
        components: [
          DummySlots,
          DoxenRadioDials,
          DoxenCodeBox
        ]
      };
    }
  }
};
</script>
