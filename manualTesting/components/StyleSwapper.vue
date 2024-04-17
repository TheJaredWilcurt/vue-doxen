<template>
  <div>
    <div>
      <input
        v-model="includeNormalize"
        id="include-normalize"
        type="checkbox"
      />
      <label for="include-normalize">
        Include Normalize
      </label>
    </div>
    <label for="style-picker">
      Swap styles:
    </label>
    <select
      v-model="styleToDemo"
      id="style-picker"
    >
      <option value="none">None</option>
      <option value="water">Water.css</option>
    </select>

    <link
      v-if="includeNormalize"
      rel="stylesheet"
      type="text/css"
      href="https://unpkg.com/normalize.css@8.0.1/normalize.css"
    />
    <link
      v-if="styleToDemo !== 'none'"
      rel="stylesheet"
      type="text/css"
      :href="styles[styleToDemo].url"
    />
  </div>
</template>
<script>
export default {
  name: 'StyleSwapper',
  data: function () {
    return {
      includeNormalize: true,
      styleToDemo: 'water',
      styles: {
        none: {
          name: 'None'
        },
        water: {
          name: 'Water.css',
          url: 'https://unpkg.com/water.css@2.1.1/out/dark.min.css'
        }
      }
    };
  }
}
</script>
