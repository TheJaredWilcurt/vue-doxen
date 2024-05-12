<template>
  <div>
    This is the VueDoxen Custom component. Normally Vue-Doxen ships with many built in components
    but if you want to pass in your own custom Vue components to perform the same functionality,
    you can! This is a more advanced option, but can also result in smaller build sizes, as it
    doesn't ship with any additional internal Vue-Doxen components (textarea, emitlog, checkbox,
    JSON textarea, dropdown, etc.) unless you explicitly import them. View the
    <RouterLink :to="{ name: 'treeShaking', hash: '#tree-shaking' }">Tree Shaking</RouterLink>
    documentation page to learn more.
  </div>
</template>

<script>
export default {
  name: 'VueDoxenCustomDescription'
};
</script>
