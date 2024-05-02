<template>
  <div class="docs-page">
    <TitleParagraph title="Is this library ready for use?">
      Not yet! But maybe in the next few weeks. Steady progress is being made daily. When it's ready this warning message will be removed.
    </TitleParagraph>

    <TitleParagraph
      title="What is Vue-Doxen?"
      readMore="Read more about demo files"
      readMoreLink="demoFiles"
    >
      Vue-Doxen is a tool to <strong>auto-generate live documentation</strong> specifically built around the <strong>unique capabilites of Vue components</strong>. You can start by just passing in your components and it will automatically render them for you. Or, if you want more control, you can pass in a "demo" object that defines what custom components to use on the documentation page.
    </TitleParagraph>

    <TitleParagraph
      title="Where do I add my documentation?"
      readMore="Read more about documenting your component"
      readMoreLink="documenting"
    >
      We accept a "demo object" you pass in and your documentation can live there, alternatively it can also live right in the component, next to the code it is documenting, or a mix of both. When defining a prop on your component, you can give it a <code>type</code> for example. This is an official part of Vue's API, however we can also add in other information, like a <code>description</code> for the prop, which is not part of Vue's official API, but also doesn't hurt anything either. Vue-Doxen will display this description for users when demoing your component.
    </TitleParagraph>

    <TitleParagraph
      title="Is there a global stylesheet that will mess with my component's CSS?"
      readMore="Read more about customizing styles"
      readMoreLink="styles"
    >
      HELL NO! God that is so annoying, right? I'm looking at YOU <em>Storybook</em> and <em>Vue-StyleGuidest</em>! With Vue-Doxen you can <em>optionally</em> import in a very basic stylesheet we ship with the library to handle simple layout with little emphasis on aesthetics. Or you can pass in your own classes to be applied using the <code>styleTokens</code> prop.
    </TitleParagraph>

    <TitleParagraph title="Why is there a dog?">
      This is a Documentation tool to help you write your "docs". "Docs" sounds like "Doxen", which is the shortened version of the dog breed "Dachshund". So we have a Dachshund dog in the logo.
    </TitleParagraph>

    <TitleParagraph title="Can I pet the dog?">
      Yes, just don't overdo it.
    </TitleParagraph>
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import TitleParagraph from '@@@/components/TitleParagraph.vue';

export default {
  name: 'HomeView',
  components: {
    TitleParagraph
  },
  props: {
    styleTokens
  }
};
</script>
