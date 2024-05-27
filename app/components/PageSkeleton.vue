<template>
  <div class="page">
    <div class="blocks header"></div>
    <div class="blocks description"></div>
    <div class="component-container">
      <div class="hr"></div>
      <div class="blocks component"></div>
      <div class="hr"></div>
    </div>
    <div class="props-playground">
      <div class="props-1">
        <div
          v-for="prop in 4"
          class="blocks prop"
          :key="'prop' + prop"
        ></div>
      </div>
      <div class="props-2">
        <div class="blocks prop"></div>
        <div class="slots-playground">
          <div
            v-for="slot in 2"
            class="blocks slot"
            :key="'slot' + slot"
          ></div>
        </div>
        <div class="blocks emit-logger"></div>
      </div>
    </div>
    <div class="live-code">
      <div class="buttons-container">
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
    <div class="blocks props-documentation"></div>
    <div class="blocks slots-documentation"></div>
  </div>
</template>

<script>
export default {
  name: 'PageSkeleton',
  data: function () {
    return {
      codeBlocksAmount: 0,
      codeBlockWidth: 0,
      codeBlockColor: 0,
      skeletonKey: 0,
      skeletonInterval: null
    };
  },
  methods: {
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
  padding: 10px;
}
.blocks {
  background: #CCC;
  border-radius: 7px;
  margin: 7px 0px;
}
.header {
  height: 30px;
}
.description {
  width: 190px;
  height: 10px;
}
.component {
  width: 100px;
  height: 40px;
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
.props-documentation {}
.slots-documentation {}

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
.props-documentation {
  height: 80px;
}
.slots-documentation {
  height: 40px;
}
</style>
