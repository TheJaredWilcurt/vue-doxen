<template>
  <div class="page-skeleton">
    <div class="page">
      <a
        class="flex zone"
        :class="{ 'zone-hover': hover === COMPONENT_NAME }"
        href="#name"
        @mouseover="hover = COMPONENT_NAME"
        @mouseout="hoverOff"
        @focus="hover = COMPONENT_NAME"
        @blur="hoverOff"
      >
        <div class="blocks header">
          <span v-text="COMPONENT_NAME" class="sr-only"></span>
        </div>
      </a>
      <a
        :class="{ 'zone-hover': hover === COMPONENT_DESCRIPTION }"
        href="#description"
        @mouseover="hover = COMPONENT_DESCRIPTION"
        @mouseout="hoverOff"
        @focus="hover = COMPONENT_DESCRIPTION"
        @blur="hoverOff"
      >
        <div class="zone">
          <div class="blocks description">
            <span v-text="COMPONENT_DESCRIPTION" class="sr-only"></span>
          </div>
        </div>
      </a>
      <a
        :class="{ 'zone-hover': hover === IMPORT_STATEMENT }"
        href="#import"
        @mouseover="hover = IMPORT_STATEMENT"
        @mouseout="hoverOff"
        @focus="hover = IMPORT_STATEMENT"
        @blur="hoverOff"
      >
        <div class="zone">
          <div class="import-statement">
            <span v-text="IMPORT_STATEMENT" class="sr-only"></span>
          </div>
        </div>
      </a>
      <RouterLink
        :class="{ 'zone-hover': hover === YOUR_COMPONENT }"
        :to="{ name: 'demoFiles', hash: '#demo-files' }"
        @mouseover="hover = YOUR_COMPONENT"
        @mouseout="hoverOff"
        @focus="hover = YOUR_COMPONENT"
        @blur="hoverOff"
      >
        <div class="zone component-container">
          <div class="hr"></div>
          <div class="blocks component">
            <span v-text="YOUR_COMPONENT" class="sr-only"></span>
          </div>
          <div class="hr"></div>
        </div>
      </RouterLink>
      <div class="props-playground">
        <a
          href="#props"
          @mouseover="hover = PROPS_PLAYGROUND"
          @mouseout="hoverOff"
          @focus="hover = PROPS_PLAYGROUND"
          @blur="hoverOff"
        >
          <div
            class="props-1 props-zone"
            :class="{ 'props-hover': hover === PROPS_PLAYGROUND }"
          >
            <div
              v-for="prop in 4"
              class="blocks prop"
              :key="'prop' + prop"
            >
              <span v-text="PROPS_PLAYGROUND" class="sr-only"></span>
            </div>
          </div>
        </a>
        <div class="props-2">
          <a
            class="props-zone"
            :class="{ 'props-hover': hover === PROPS_PLAYGROUND }"
            href="#props"
            @mouseover="hover = PROPS_PLAYGROUND"
            @mouseout="hoverOff"
            @focus="hover = PROPS_PLAYGROUND"
            @blur="hoverOff"
          >
            <div class="blocks prop">
              <span v-text="PROPS_PLAYGROUND" class="sr-only"></span>
            </div>
          </a>
          <a
            class="zone slots-playground"
            :class="{ 'zone-hover': hover === SLOTS_PLAYGROUND }"
            href="#slots"
            @mouseover="hover = SLOTS_PLAYGROUND"
            @mouseout="hoverOff"
            @focus="hover = SLOTS_PLAYGROUND"
            @blur="hoverOff"
          >
            <div
              v-for="slot in 2"
              class="blocks slot"
              :class="'slot-' + slot"
              :key="'slot' + slot"
            >
              <span v-text="SLOTS_PLAYGROUND" class="sr-only"></span>
            </div>
          </a>
          <a
            class="zone emit-logger-container"
            :class="{ 'zone-hover': hover === EMIT_LOGGER }"
            href="#emits"
            @mouseover="hover = EMIT_LOGGER"
            @mouseout="hoverOff"
            @focus="hover = EMIT_LOGGER"
            @blur="hoverOff"
          >
            <div class="blocks emit-logger">
              <span v-text="EMIT_LOGGER" class="sr-only"></span>
            </div>
          </a>
        </div>
      </div>
      <div
        class="zone live-code"
        :class="{ 'live-code-hover': hover === LIVE_CODE }"
        role="button"
        tabindex="0"
        @focus="hover = LIVE_CODE"
        @blur="hoverOff"
        @mouseover="hover = LIVE_CODE"
        @mouseout="hoverOff"
      >
        <div class="buttons-container">
          <span v-text="LIVE_CODE" class="sr-only"></span>
          <div class="blocks button first"></div>
          <div class="blocks button"></div>
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
        :class="{ 'zone-hover': hover === PROPS_DOCUMENTATION }"
        href="#props"
        @mouseover="hover = PROPS_DOCUMENTATION"
        @mouseout="hoverOff"
        @focus="hover = PROPS_DOCUMENTATION"
        @blur="hoverOff"
      >
        <div class="blocks props-documentation">
          <span v-text="PROPS_DOCUMENTATION" class="sr-only"></span>
        </div>
      </a>
      <a
        class="flex zone"
        :class="{ 'zone-hover': hover === EMITS_DOCUMENTATION }"
        href="#emits"
        @mouseover="hover = EMITS_DOCUMENTATION"
        @mouseout="hoverOff"
        @focus="hover = EMITS_DOCUMENTATION"
        @blur="hoverOff"
      >
        <div class="blocks emits-documentation">
          <span v-text="EMITS_DOCUMENTATION" class="sr-only"></span>
        </div>
      </a>
    </div>
    <div>
      <strong
        v-show="hover"
        class="hover-text"
        :style="hoverTextPosition"
      >
        {{ hover }}
      </strong>
    </div>
  </div>
</template>

<script>
const COMPONENT_NAME = 'Component Name';
const COMPONENT_DESCRIPTION = 'Component Description';
const IMPORT_STATEMENT = 'Import Statement';
const YOUR_COMPONENT = 'Your Component';
const PROPS_PLAYGROUND = 'Props Playground';
const SLOTS_PLAYGROUND = 'Slots Playground';
const EMIT_LOGGER = 'Emit Logger';
const LIVE_CODE = 'Live Code';
const PROPS_DOCUMENTATION = 'Props Documentation';
const EMITS_DOCUMENTATION = 'Emits Documentation';

export default {
  name: 'PageSkeleton',
  constants: {
    COMPONENT_NAME,
    COMPONENT_DESCRIPTION,
    IMPORT_STATEMENT,
    YOUR_COMPONENT,
    PROPS_PLAYGROUND,
    SLOTS_PLAYGROUND,
    EMIT_LOGGER,
    LIVE_CODE,
    PROPS_DOCUMENTATION,
    EMITS_DOCUMENTATION
  },
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
  computed: {
    hoverTextPosition: function () {
      const hoverTextTopOffsetMap = {
        [COMPONENT_NAME]: 11,
        [COMPONENT_DESCRIPTION]: 42,
        [IMPORT_STATEMENT]: 59,
        [YOUR_COMPONENT]: 99,
        [PROPS_PLAYGROUND]: 159,
        [SLOTS_PLAYGROUND]: 201,
        [EMIT_LOGGER]: 201,
        [LIVE_CODE]: 283,
        [PROPS_DOCUMENTATION]: 372,
        [EMITS_DOCUMENTATION]: 441
      };
      const top = hoverTextTopOffsetMap[this.hover];

      if (top) {
        return 'top:' + top + 'px';
      }
      return 'display: none;';
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
.page-skeleton {
  display: flex;
}
.page {
  position: relative;
  display: inline-block;
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
  justify-content: flex-start;
}
.buttons-container .first {
  margin: 0px;
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
.hover-text {
  position: relative;
  top: 0px;
  left: 11px;
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

@media (width < 430px) {
  .hover-text {
    display: none;
  }
}
</style>
