<template>
  <div>
    <div class="page">
      <a
        class="flex zone"
        :class="{ 'zone-hover': hover === 'Component Name' }"
        href="#name"
        @mouseover="hover = 'Component Name'"
        @mouseout="hoverOff"
        @focus="hover = 'Component Name'"
        @blur="hoverOff"
      >
        <div class="blocks header">
          <span class="sr-only">Component Name</span>
        </div>
      </a>
      <a
        :class="{ 'zone-hover': hover === 'Component Description' }"
        href="#description"
        @mouseover="hover = 'Component Description'"
        @mouseout="hoverOff"
        @focus="hover = 'Component Description'"
        @blur="hoverOff"
      >
        <div class="zone">
          <div class="blocks description">
            <span class="sr-only">Component Description</span>
          </div>
        </div>
      </a>
      <a
        :class="{ 'zone-hover': hover === 'Import Statement' }"
        href="#import"
        @mouseover="hover = 'Import Statement'"
        @mouseout="hoverOff"
        @focus="hover = 'Import Statement'"
        @blur="hoverOff"
      >
        <div class="zone">
          <div class="import-statement">
            <span class="sr-only">Import Statement</span>
          </div>
        </div>
      </a>
      <RouterLink
        :class="{ 'zone-hover': hover === 'Your Component' }"
        :to="{ name: 'demoFiles', hash: '#demo-files' }"
        @mouseover="hover = 'Your Component'"
        @mouseout="hoverOff"
        @focus="hover = 'Your Component'"
        @blur="hoverOff"
      >
        <div class="zone component-container">
          <div class="hr"></div>
          <div class="blocks component">
            <span class="sr-only">Your Component</span>
          </div>
          <div class="hr"></div>
        </div>
      </RouterLink>
      <div class="props-playground">
        <a
          href="#props"
          @mouseover="hover = 'Props Playground'"
          @mouseout="hoverOff"
          @focus="hover = 'Props Playground'"
          @blur="hoverOff"
        >
          <div
            class="props-1 props-zone"
            :class="{ 'props-hover': hover === 'Props Playground' }"
          >
            <div
              v-for="prop in 4"
              class="blocks prop"
              :key="'prop' + prop"
            >
              <span class="sr-only">Props Playground</span>
            </div>
          </div>
        </a>
        <div class="props-2">
          <a
            class="props-zone"
            :class="{ 'props-hover': hover === 'Props Playground' }"
            href="#props"
            @mouseover="hover = 'Props Playground'"
            @mouseout="hoverOff"
            @focus="hover = 'Props Playground'"
            @blur="hoverOff"
          >
            <div class="blocks prop">
              <span class="sr-only">Props Playground</span>
            </div>
          </a>
          <a
            class="zone slots-playground"
            :class="{ 'zone-hover': hover === 'Slots Playground' }"
            href="#slots"
            @mouseover="hover = 'Slots Playground'"
            @mouseout="hoverOff"
            @focus="hover = 'Slots Playground'"
            @blur="hoverOff"
          >
            <div
              v-for="slot in 2"
              class="blocks slot"
              :class="'slot-' + slot"
              :key="'slot' + slot"
            >
              <span class="sr-only">Slots Playground</span>
            </div>
          </a>
          <a
            class="zone emit-logger-container"
            :class="{ 'zone-hover': hover === 'Emit Logger' }"
            href="#emits"
            @mouseover="hover = 'Emit Logger'"
            @mouseout="hoverOff"
            @focus="hover = 'Emit Logger'"
            @blur="hoverOff"
          >
            <div class="blocks emit-logger">
              <span class="sr-only">Emit Logger</span>
            </div>
          </a>
        </div>
      </div>
      <div
        class="zone live-code"
        :class="{ 'live-code-hover': hover === 'Live Code' }"
        role="button"
        tabindex="0"
        @focus="hover = 'Live Code'"
        @blur="hoverOff"
        @mouseover="hover = 'Live Code'"
        @mouseout="hoverOff"
      >
        <div class="buttons-container">
          <span class="sr-only">Live Code</span>
          <div
            v-for="button in 2"
            class="blocks button"
            :key="'button' + button"
          ></div>
        </div>
        <div class="code-box">
          <div
            v-for="codeLine in 4"
            class="code-line"
            :key="'codeLine' + codeLine"
          >
            <TransitionGroup name="code-blocks">
              <div
                v-for="codeBlock in randomizeCodeBlocks(skeletonKey)"
                class="code-block"
                :style="(
                  'width:' + randomizeCodeBlockWidth(skeletonKey) + 'px;' +
                  'background: hsl(0, 0%, ' + randomizeCodeBlockColor(skeletonKey) + '%);'
                )"
                :key="'codeBlock' + codeBlock"
              ></div>
            </TransitionGroup>
          </div>
        </div>
      </div>
      <a
        class="flex zone"
        :class="{ 'zone-hover': hover === 'Props Documentation' }"
        href="#props"
        @mouseover="hover = 'Props Documentation'"
        @mouseout="hoverOff"
        @focus="hover = 'Props Documentation'"
        @blur="hoverOff"
      >
        <div class="blocks props-documentation">
          <span class="sr-only">Props Documentation</span>
        </div>
      </a>
      <a
        class="flex zone"
        :class="{ 'zone-hover': hover === 'Emits Documentation' }"
        href="#emits"
        @mouseover="hover = 'Emits Documentation'"
        @mouseout="hoverOff"
        @focus="hover = 'Emits Documentation'"
        @blur="hoverOff"
      >
        <div class="blocks emits-documentation">
          <span class="sr-only">Emits Documentation</span>
        </div>
      </a>
    </div>
    <strong>
      {{ hover || '&nbsp;' }}
    </strong>
  </div>
</template>

<script>
export default {
  name: 'PageSkeleton',
  data: function () {
    return {
      hover: '',
      codeBlocksAmount: 0,
      codeBlockWidth: 0,
      codeBlockColor: 0,
      skeletonKey: 0,
      skeletonInterval: null
    };
  },
  methods: {
    hoverOff: function () {
      this.hover = '';
    },
    randomizeCodeBlocks: function () {
      return Math.round(Math.random() * 4) + 1;
    },
    randomizeCodeBlockWidth: function () {
      return Math.round(Math.random() * 30) + 21;
    },
    randomizeCodeBlockColor: function () {
      return Math.round(Math.random() * 26) + 40;
    }
  },
  created: function () {
    this.skeletonInterval = setInterval(() => {
      this.skeletonKey++;
    }, 10 * 1000);
  },
  beforeDestroy: function () {
    clearInterval(this.skeletonInterval);
  }
};
</script>

<style scoped>
.page {
  background: #EEE;
  width: 300px;
  border-radius: 7px;
  padding: 10px 7px;
}
.blocks {
  background: #CCC;
  border-radius: 7px;
}
.header {
  width: 100%;
  height: 30px;
}
.description {
  width: 190px;
  height: 10px;
}
.import-statement {
  width: 120px;
  height: 10px;
  background: #737373;
  border-radius: 7px;
}
.component {
  width: 100px;
  height: 40px;
  margin: 7px 0px;
}
.hr {
  height: 1px;
  background: #BBB;
}
.props-playground {
  padding: 7px 0px;
}
.props-1,
.props-2,
.slots-playground {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.props-2 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.prop,
.slot,
.emit-logger {
  width: 50px;
  height: 25px;
  margin: 5px 0px;
}
.slots-playground {
  flex-grow: 1;
  justify-content: space-evenly;
}
.slot-1 {
  margin-right: 3.5px;
}
.slot-2 {
  margin-left: 3.5px;
}
.buttons-container {
  display: flex;
  justify-content: flex-end;
}
.button {
  display: inline-block;
  width: 50px;
  height: 20px;
  border-radius: 4px;
  margin-left: 7px;
  margin-bottom: 3px;
}
.code-box {
  background: #555;
  width: 100%;
  border-radius: 8px;
  padding: 5px 0px;
  line-height: 0;
}
.code-line {
  margin: 5px 0px 5px 5px;
  padding: 0px;
}
.code-block {
  display: inline-block;
  height: 8px;
  background: #888;
  border-radius: 10px;
  margin: 1px 4px 0px;
  transition: 1s ease all;
}
.props-documentation {
  width: 100%;
  height: 80px;
}
.emits-documentation {
  width: 100%;
  height: 40px;
}

.props-zone,
.zone {
  padding: 3.5px 3.5px;
}
.live-code-hover,
.props-hover,
.zone-hover,
.zone:hover {
  background: #A7A7A7;
}
.flex {
  display: flex;
}
.zone-hover {
  display: flex;
}
.props-1.props-hover {
  border-radius: 7px 7px 7px 0px;
}
.props-2 .props-hover {
  position: relative;
  border-radius: 0px 0px 7px 7px;
}
.props-2 .props-hover:before {
  content: '';
  position: absolute;
  top: 0px;
  right: -7px;
  display: block;
  background: #A7A7A7;
  width: 7px;
  height: 7px;
}
.props-2 .props-hover:after {
  content: '';
  position: absolute;
  top: 0px;
  right: -7px;
  display: block;
  background: #EEE;
  width: 7px;
  height: 7px;
  border-radius: 7px 0px 0px 0px;
}

.zone.slots-playground,
.zone.emit-logger-container {
  border-radius: 7px;
}

.code-blocks-enter-active,
.code-blocks-leave-active,
.code-blocks-enter-from,
.code-blocks-leave-to {
  transition: 1s ease all;
}
.code-blocks-enter-from,
.code-blocks-leave-to {
  opacity: 0.0;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0px;
}
</style>
