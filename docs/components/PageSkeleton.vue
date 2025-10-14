<template>
  <div class="page-skeleton">
    <div class="page">
      <a
        class="flex zone"
        :class="{ 'zone-hover': hover === COMPONENT_NAME }"
        href="#title-name"
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
      <a
        class="playground zone"
        :class="{ 'zone-hover': hover === PROPS_PLAYGROUND }"
        href="#props"
        @mouseover="hover = PROPS_PLAYGROUND"
        @mouseout="hoverOff"
        @focus="hover = PROPS_PLAYGROUND"
        @blur="hoverOff"
      >
        <div class="playground-header"></div>
        <span v-text="PROPS_PLAYGROUND" class="sr-only"></span>
        <div class="playground-props">
          <div class="prop-input"></div>
          <div class="prop-input"></div>
          <div class="prop-checkbox"></div>
          <div class="prop-checkbox"></div>
          <div class="prop-checkbox"></div>
        </div>
      </a>

      <a
        class="playground zone"
        :class="{ 'zone-hover': hover === SLOTS_PLAYGROUND }"
        href="#props"
        @mouseover="hover = SLOTS_PLAYGROUND"
        @mouseout="hoverOff"
        @focus="hover = SLOTS_PLAYGROUND"
        @blur="hoverOff"
      >
        <div class="playground-header"></div>
        <span v-text="SLOTS_PLAYGROUND" class="sr-only"></span>
        <div class="playground-props">
          <div class="slot-input"></div>
          <div class="slot-input"></div>
        </div>
      </a>

      <a
        class="playground zone"
        :class="{ 'zone-hover': hover === EMIT_LOGGER }"
        href="#props"
        @mouseover="hover = EMIT_LOGGER"
        @mouseout="hoverOff"
        @focus="hover = EMIT_LOGGER"
        @blur="hoverOff"
      >
        <div class="playground-header"></div>
        <span v-text="EMIT_LOGGER" class="sr-only"></span>
        <div class="playground-props">
          <div class="emit-logger"></div>
        </div>
      </a>

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
const COMPONENT_NAME = 'Component Title/Name';
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
        [SLOTS_PLAYGROUND]: 223,
        [EMIT_LOGGER]: 289,
        [LIVE_CODE]: 376,
        [PROPS_DOCUMENTATION]: 469,
        [EMITS_DOCUMENTATION]: 539
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
  beforeUnmount: function () {
    clearInterval(this.skeletonInterval);
  }
};
</script>

<style scoped>
.page-skeleton {
  display: flex;
}
.page-skeleton * {
  box-sizing: border-box;
}
.page {
  position: relative;
  display: inline-block;
  background: #EEE;
  width: 300px;
  border-radius: 7px;
  padding: 10px 7px;
}
.swapper-bootstrap .page {
  border: 1px solid #DEDEDE;
}
.swapper-vuetifyDark .page {
  background: #F7F7F7;
  filter: invert(1);
}
.swapper-vuetifyDark .code-box{
  background: #ECECEC;
}
.swapper-vuetifyDark .import-statement {
  background: #999;
}
.swapper-water .page {
  filter: sepia(0.5) invert(1) hue-rotate(330deg) brightness(1.4) contrast(0.8);
}
.swapper-water .code-box {
  background: #FFF;
}
.swapper-water .import-statement {
  background: #A9A9A9;
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
.component-container {
  width: 100%;
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
.playground {
  display: flex;
  flex-direction: column;
  margin-bottom: 6px;
}
.playground-header {
  background: #CCC;
  width: 100%;
  height: 10px;
  border-radius: 3px;
  margin-bottom: 3px;
}
.playground-props {
  display: flex;
  align-items: end;
  justify-content: start;
  flex-wrap: wrap;
}
.prop-checkbox {
  position: relative;
  display: block;
  background: #CCC;
  width: 53px;
  height: 8px;
  border-radius: 3px;
  margin: 10px 2px 0px 16px;
}
.prop-checkbox:nth-of-type(4) {
  width: 68px;
}
.prop-checkbox:nth-of-type(5) {
  width: 90px;
}
.prop-checkbox:before {
  content: '';
  position: absolute;
  top: -1px;
  left: -13px;
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #EEE8;
  border: 2px solid #CCC;
  border-radius: 2px;
  box-sizing: border-box;
}
.prop-input {
  position: relative;
  flex-grow: 1;
  width: 87px;
  height: 10px;
  background: #EEE8;
  border: 2px solid #CCC;
  border-radius: 3px;
  margin: 13px 3px 0px 3px;
}
.prop-input:before {
  content: '';
  position: absolute;
  top: -13px;
  left: -1px;
  width: 50px;
  height: 7px;
  background: #CCC;
  border-radius: 3px;
}
.prop-input:nth-of-type(2):before {
  width: 39px;
}

.slot-input {
  position: relative;
  flex-grow: 1;
  width: 87px;
  height: 24px;
  background: #EEE8;
  border: 2px solid #CCC;
  border-radius: 3px;
  margin: 13px 3px 0px 3px;
}
.slot-input:before {
  content: '';
  position: absolute;
  top: -13px;
  left: -1px;
  width: 50px;
  height: 7px;
  background: #CCC;
  border-radius: 3px;
}

.emit-logger {
  position: relative;
  flex-grow: 1;
  width: 87px;
  height: 24px;
  background: #CCC;
  border-radius: 3px;
  margin: 18px 3px 0px 3px;
}
.emit-logger:after {
  content: '';
  position: absolute;
  top: -17px;
  right: 0px;
  width: 35px;
  height: 10px;
  background: #CCC;
  border: 2px solid #CCC;
  border-radius: 4px;
}
.emit-logger:before {
  content: '';
  position: absolute;
  top: -11px;
  left: 0px;
  width: 35px;
  height: 7px;
  background: #CCC;
  border-radius: 3px;
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
.zone {
  padding: 3.5px 3.5px;
}
.live-code-hover,
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
