/** @type {import('../../../../../types').RULEDEFINITION} */
export const allEmitsMustHaveDescription = {
  rule: function (demos, options, linterSettings, errors) {
    if (linterSettings.demos.allEmitsMustHave.description) {
      for (const demoName in demos) {
        const demo = demos[demoName];

        const combinedEmits = {};

        function appendEmitNamesFromArray (collection) {
          for (const emitName of collection) {
            combinedEmits[emitName] = false;
          }
        }
        function appendEmitNamesFromObject (collection) {
          for (const emitName in collection) {
            combinedEmits[emitName] = false;
          }
        }
        function appendEmitNames (collection) {
          if (collection) {
            if (Array.isArray(collection)) {
              appendEmitNamesFromArray(collection);
            } else if (typeof(collection) === 'object') {
              appendEmitNamesFromObject(collection);
            }
          }
        }

        if (demo) {
          appendEmitNames(demo.emits);
          appendEmitNames(demo.emitsToDemo);
          if (demo.component) {
            appendEmitNames(demo.component.emits);
            appendEmitNames(demo.component.emitsToDemo);
          }
        }

        for (const emitName in combinedEmits) {
          let valid = false;
          if (
            demo?.emitsToDemo?.[emitName] &&
            Object.hasOwn(demo.emitsToDemo[emitName], 'description') &&
            ['string', 'undefined'].includes(typeof(demo.emitsToDemo[emitName].description))
          ) {
            valid = true;
          }
          if (
            demo?.component?.emitsToDemo?.[emitName] &&
            Object.hasOwn(demo.component.emitsToDemo[emitName], 'description') &&
            ['string', 'undefined'].includes(typeof(demo.component.emitsToDemo[emitName].description))
          ) {
            valid = true;
          }
          if (!valid) {
            const message = 'The ' + demoName + ' emit ' + emitName + ' must have a description.';
            console.info(message);
            errors.push(demoName);
          }
        }
      }
    }
  },
  description: 'Requires all emits have a description (string) on all demos and/or components. (can be set to undefined)',
  url: 'https://TheJaredWilcurt.com/vue-doxen/documenting#emits',
  examples: [
    {
      title: 'Add description to emit.',
      description: 'Your description can live in the demo object.',
      code: `
import MyComponent from '@/components/MyComponent.vue';

export const myComponentDemo = {
  component: MyComponent,
  emitsToDemo: {
    foo: {
      description: '<p>Detailed description of the emit.</p>'
    }
  }
};
`.trim()
    },
    {
      title: 'Add emit description to Options or Composition API component.',
      description: 'Your description can live in the component.',
      code: `
<script>
export default {
  name: 'MyComponent',
  emitsToDemo: {
    foo: {
      description: '<p>Detailed description of the component.</p>'
    }
  }
};
</script>
`.trim()
    },
    {
      title: 'Add emit description to a Script Setup component.',
      description: 'Your description can live in the component.',
      code: `
<script setup>
defineOptions({
  name: 'MyComponent',
  emitsToDemo: {
    foo: {
      description: '<p>Detailed description of the component.</p>'
    }
  }
});
</script>
`.trim()
    }
  ]
};
