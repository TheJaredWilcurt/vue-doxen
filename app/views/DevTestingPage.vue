<template>
  <div class="docs-page">
    <h1
      id="dev-testing-page"
      class="docs-title"
    >
      Dev Testing Page
    </h1>

    <pre v-text="test.component.render.toString()"></pre>
  </div>
</template>

<script>
import DummySlots from '@@@/components/DummySlots.vue';

export default {
  name: 'DevTestingPage',
  computed: {
    test: function () {
      return {
        component: DummySlots
      };
    }
  }
};
</script>
