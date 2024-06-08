<template>
  <div id="home" class="docs-page">
    <PatrickExplainer />

    <TitleParagraph
      title="What is Vue-Doxen?"
      readMore="Read more about demo files"
      readMoreLink="demoFiles"
      readMoreHash="#demo-files"
    >
      Vue-Doxen is a tool to <strong>auto-generate live documentation</strong> specifically built around the <strong>unique capabilites of Vue components</strong>. You can start by just passing in your components and it will automatically render them for you. Or, if you want more control, you can pass in a "demo" object that defines what custom components to use on the documentation page. Almost everything about Vue-Doxen is customizable!
    </TitleParagraph>

    <TitleParagraph title="Is this library ready for use?">
      <em>Yes!</em> We've reached the <strong>Release Candidate</strong> stage.
      Which means you can <code>npm install</code> it and try it out now to give early feedback.
      The documentation and API are both completely finished, but may get slight tweaks before v1 based on <strong>your</strong> feedback.
      <ul>
        <li>
          <strong>Looking for feedback on:</strong>
          <ul>
            <li>Does it explain itself well? (The core concept)</li>
            <li>Is the API easy to use?</li>
            <li>Is there anything in the documentation that could be improved, around onboarding, or just in general</li>
            <li>Any bugs you find when passing in your own weird components</li>
            <li>Any features you need that are missing</li>
          </ul>
        </li>
        <li>
          <a
            v-text="'Give Feedback on GitHub Issues'"
            href="https://github.com/TheJaredWilcurt/vue-doxen/issues"
            target="_blank"
          ></a>
        </li>
      </ul>
    </TitleParagraph>

    <TitleParagraph
      title="Where do I add my documentation?"
      readMore="Read more about documenting your component"
      readMoreLink="documenting"
      readMoreHash="#documenting"
    >
      We accept a "demo object" you pass in and your documentation can live there, alternatively it can also live right in the component, next to the code it is documenting, or a mix of both. When defining a prop on your component, you can give it a <code>type</code> for example. This is an official part of Vue's API, however we can also add in other information, like a <code>description</code> for the prop, which is not part of Vue's official API, but also doesn't hurt anything either. Vue-Doxen will display this description for users when demoing your component.
    </TitleParagraph>

    <TitleParagraph
      title="Is there a global stylesheet that will mess with my component's CSS?"
      readMore="Read more about customizing styles"
      readMoreLink="styles"
      readMoreHash="#styles"
    >
      HELL NO! God that is so annoying, right? I'm looking at YOU <em>Storybook</em> and <em>Vue-StyleGuidest</em>! With Vue-Doxen you can <em>optionally</em> import in a very basic stylesheet we ship with the library to handle simple layout with little emphasis on aesthetics. Or you can pass in your own classes to be applied using the <code>styleTokens</code> prop.
    </TitleParagraph>

    <TitleParagraph title="Is there a non-Vue version of Doxen?">
      Nope! I designed Vue-Doxen exclusively around the component architecture used internally by Vue. I get that you want to use Vue-Doxen's approach elsewhere, but until a frontend framework comes out that is better than Vue, I won't be the one porting it. Similar to how, if you want Pinia, you gotta use Vue, same goes for Vue-Doxen.
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

import PatrickExplainer from '@@@/components/PatrickExplainer.vue';
import TitleParagraph from '@@@/components/TitleParagraph.vue';

export default {
  name: 'HomeView',
  components: {
    PatrickExplainer,
    TitleParagraph
  },
  props: {
    styleTokens
  }
};
</script>
