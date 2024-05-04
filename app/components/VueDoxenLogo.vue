<template>
  <div
    class="logo-container"
    role="button"
    tabindex="0"
    @click="bark"
    @keyup.enter="bark"
    @keydown.space.prevent="bark"
  >
    <h1
      v-html="'Vue<br />Doxen'"
      class="docs-title"
    ></h1>
    <h1
      v-html="'Vue<br />Doxen'"
      class="docs-title meter"
      :style="colorMeter"
    ></h1>
    <img
      alt="A doxen dog with a green chest in the shape of the Vue logo"
      src="@@@/assets/vue-doxen-logo-small.png"
      :style="temper"
    />
    <img
      alt="Dog barking"
      class="hide"
      :class="{ show: barking }"
      :style="exhausted ? 'opacity: 0' : ''"
      src="@@@/assets/bork-face.png"
    />
    <div v-if="exhausted" class="rest">
      The dog must rest.
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueDoxenLogo',
  data: function () {
    return {
      barking: false,
      borkCount: 0
    };
  },
  methods: {
    bark: async function () {
      if (!this.exhausted) {
        const bark = new Audio('/vue-doxen/bark.mp3');
        await bark.play();
        setTimeout(() => { this.barking = true; }, 100);
        setTimeout(() => { this.barking = false; }, 250);
        setTimeout(() => { this.barking = true; }, 600);
        setTimeout(() => { this.barking = false; }, 800);
        setTimeout(() => { this.borkCount++; }, 1000);
      }
    },
    calm: function () {
      setInterval(() => {
        if (this.borkCount > 0) {
          this.borkCount--;
        }
      }, 1100);
    }
  },
  computed: {
    colorMeter: function () {
      let percent = this.borkCount / this.limit;
      percent = percent * 106;
      percent = percent - 106;
      percent = percent * -1;
      percent = percent - 1;
      percent = Math.round(percent * 100) / 100;
      return 'clip-path: inset(0% ' + percent + '% 0% 0%)';
    },
    limit: function () {
      return 20;
    },
    exhausted: function () {
      return this.borkCount > this.limit;
    },
    temper: function () {
      const sepia = Math.min(Math.round((this.borkCount / this.limit) * 100) / 100, 1);
      const hue = Math.max(Math.round(((this.borkCount / this.limit) * -48) * 100) / 100, -48);
      const saturate = Math.min(Math.round((((this.borkCount / this.limit) * 4) + 1) * 100) / 100, 5);
      const filter = [
        'filter:',
        'sepia(' + sepia + ')',
        'hue-rotate(' + hue + 'deg)',
        'saturate(' + saturate + ')'
      ].join(' ');
      let opacity = 'opacity: 1.0';
      if (this.exhausted) {
        opacity = 'opacity: 0.1';
      }
      return [
        filter,
        opacity
      ].join(';');
    }
  },
  created: function () {
    this.calm();
  }
};
</script>

<style scoped>
.logo-container {
  position: relative;
  height: 128px;
  min-width: 190px;
}
h1 {
  position: absolute;
  top: 6px;
  left: 10px;
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  width: auto;
  margin-right: auto;
  margin-bottom: 0px;
  user-select: none;
  z-index: 2;
}
img {
  position: absolute;
  top: -3px;
  left: 121px;
  max-width: fit-content;
  height: 106px;
  z-index: 1;
}
.meter {
  margin-top: 0px;
  color: #FF5C5C;
  text-shadow: 7px -2px 0px #5E3434, 7px 2px 0px #5E3434, 2px 2px 0px #5E3434, -2px -2px 0px #5E3434, 2px -2px 0px #5E3434, -2px 2px 0px #5E3434;
  clip-path: inset(0% 100% 0% 0%);
  transition: 250ms linear clip-path;
  z-index: 3;
}
.rest {
  position: absolute;
  top: 24px;
  left: 121px;
  width: 61px;
  font-size: 0.7rem;
  text-align: center;
}
.hide,
.show {
  transition: 75ms ease opacity;
}
.hide {
  opacity: 0.001;
}
.show {
  opacity: 1.0;
}
</style>
