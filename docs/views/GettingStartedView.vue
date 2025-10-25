<template>
  <div class="docs-page">
    <h1
      id="getting-started"
      class="docs-title"
    >
      Getting Started
    </h1>

    <nav>
      <ul>
        <li><a href="#bare-minimum">Bare minimum</a></li>
        <li><a href="#common">Common usage (via npm)</a></li>
        <li><a href="#cdn">CDN Usage</a></li>
      </ul>
    </nav>

    <DocumentationSection id="bare-minimum" title="Bare Minimum">
      <p>
        This is the absolute bare minimum to get up and running with Vue-Doxen.
      </p>

      <DoxenCodeSwapper
        :codeTypes="{
          Options: BARE_MINIMUM_EXAMPLE,
          Composition: BARE_MINIMUM_COMPOSITION_EXAMPLE,
          'Script Setup': BARE_MINIMUM_SCRIPT_SETUP_EXAMPLE
        }"
        fileName="DocumentationPage.vue"
        :styleTokens="styleTokens"
      />

      <p>
        But this is just demoing one component, the below examples show how you can switch between
        components to demo. Or you can look at more advanced ways to set up Vue-Doxen using
        <RouterLink :to="{ name: 'vueRouter', hash: '#vue-router' }">Vue-Router</RouterLink>.
      </p>
    </DocumentationSection>

    <DocumentationSection id="common" title="Common usage">
      <ol>
        <li>
          Install the library
          <ul>
            <li><code>npm install --save vue-doxen</code></li>
          </ul>
        </li>
        <li>
          Create a Vue component similar to the one below.
        </li>
      </ol>
      <DoxenCodeSwapper
        :codeTypes="{
          Options: GETTING_STARTED_EXAMPLE,
          Composition: GETTING_STARTED_COMPOSITION_EXAMPLE,
          'Script Setup': GETTING_STARTED_SCRIPT_SETUP_EXAMPLE
        }"
        fileName="DocumentationPage.vue"
        :styleTokens="styleTokens"
        @tabChanged="commonType = $event"
      />

      <p style="text-align: right;">
        <a :href="vuePlaygroundLink" target="_blank">
          <DoxenButton :styleTokens="styleTokens">
            Open in Vue.js Online Playground
          </DoxenButton>
        </a>
      </p>

      <p>
        <strong>That's it!</strong>
      </p>
      <p>
        To see examples of how Vue-Doxen documents components, click on any of
        <RouterLink to="/vue-doxen/components/DoxenCheckbox#components">the components</RouterLink>
        in the sidebar.
        Everything you see there is auto-generated from the data in the component itself.
      </p>
      <p>
        <strong>What do you want to learn next?</strong>
      </p>
      <ul>
        <li>
          How do I
          <RouterLink :to="{ name: 'documenting', hash: '#documenting' }">add additional documentation</RouterLink>
          about my component?
        </li>
        <li>
          How do I
          <RouterLink :to="{ name: 'styles', hash: '#styles' }">customize the styles</RouterLink>?
        </li>
        <li>
          How do I use my own
          <RouterLink :to="{ name: 'demoFiles', hash: '#demo-files' }">custom components</RouterLink>
          in the Props Playground?
        </li>
        <li>
          How do I
          <RouterLink :to="{ name: 'treeShaking', hash: '#tree-shaking' }">globally replace the built-in components</RouterLink>
          with my own custom components?
        </li>
        <li>
          How do I
          <RouterLink :to="{ name: 'vueRouter', hash: '#vue-router' }">dynamically create URL's</RouterLink>
          for each component demo?
        </li>
      </ul>
    </DocumentationSection>

    <DocumentationSection id="cdn" title="CDN Usage">
      <p>
        It is also possible to load Vue-Doxen via a CDN.
        Scripts loaded via a CDN cannot access local storage in browsers though, for security reasons.
        Because of this, Vue-Doxen will not remember which tab the user selected last (Vue or JavaScript) when loaded via CDN.
      </p>

      <ul>
        <li>
          <a href="https://jsfiddle.net/cwz1xsme" target="_blank">JSFiddle Example</a>
        </li>
      </ul>

      <DoxenCodeSwapper
        :codeTypes="{
          'CDN Example': GETTING_STARTED_CDN
        }"
        fileName="documentation.html"
        :styleTokens="styleTokens"
      />
    </DocumentationSection>
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import DoxenButton from '@/components/DoxenButton.vue';
import DoxenCodeSwapper from '@/components/DoxenCodeSwapper.vue';
import DocumentationSection from '@@@/components/DocumentationSection.vue';

import {
  BARE_MINIMUM_EXAMPLE,
  BARE_MINIMUM_COMPOSITION_EXAMPLE,
  BARE_MINIMUM_SCRIPT_SETUP_EXAMPLE,
  GETTING_STARTED_CDN,
  GETTING_STARTED_COMPOSITION_EXAMPLE,
  GETTING_STARTED_EXAMPLE,
  GETTING_STARTED_SCRIPT_SETUP_EXAMPLE
} from '@@@/helpers/codeSnippets.js';

export default {
  name: 'GettingStartedView',
  components: {
    DocumentationSection,
    DoxenButton,
    DoxenCodeSwapper
  },
  props: {
    styleTokens
  },
  constants: {
    BARE_MINIMUM_EXAMPLE,
    BARE_MINIMUM_COMPOSITION_EXAMPLE,
    BARE_MINIMUM_SCRIPT_SETUP_EXAMPLE,
    GETTING_STARTED_CDN,
    GETTING_STARTED_COMPOSITION_EXAMPLE,
    GETTING_STARTED_EXAMPLE,
    GETTING_STARTED_SCRIPT_SETUP_EXAMPLE
  },
  data: function () {
    return {
      commonType: 'Options'
    };
  },
  computed: {
    vuePlaygroundLink: function () {
      const apiMap = {
        Options: 'https://play.vuejs.org/#eNqtVk1v4zYQ/StTX9IWsZSg7UV1g8abHLZYJEEd9OQLLY0s2hIpkJQ/EPi/d0hKlOx4jWARA5b5MRy+eTPz5LfRfV1HmwZHyWhisKpLZvBuLgAmGd+4AQ1/Go/9CGDGyQZhy/Ygc9BbbtKCiyVoLDE1mEEqq1oKFOa6OyIVNBphLxsFcitA8wwXTMWCbfiSGS5Ff8ifGY+7mx/kDsXMH+j8bcaVzLD8az7qLn3ASs5H3X6S0VTTtvvt1uPO5X8NOq+f5I64geeX16/PT/ffEvgmWQZcgCkQ6KKxuwm+zGaQc6ItJy4qLujJchpnTKSoB+GWXKy7e5XHZPYl6gLR9IjMvkbaMrgzcaoDJIBCYU4bhTG1TuI4zUS00hQb36hIoIlFXcWU63FmUf1tU61NnHF6hNVo4PB8iEfB6L0wbAcFXxYlfY0thfPhfARbcLPSsQ885mq8KFm6HuL6AW6O0jVlmqdgT1u4lKrKB2MKrsFm+ZouoE5Iqc65KfrKtaH/WHTLIl7LpeAa4y3Rrmw4RwnImFpHVBqfEueEfNrmncSDlqapThWvDY2piaUy8AbD/rq2FesL9gC5khVchbK4+tM6iGP40nWqtrSQDggDRkIm06ai1djSF/wH4/vWXxT3S1Z1rNtT2+l722lnOxe4c9YZ5qwpKQIbrmAVJnD10GJwkvLClnjlJChoi068ORxH7ZeGqnBwaxkzLIG8EamTqJ9/6U4rNI0S3QyC9FnZIBh9hFfe4kDAO6cWTEO2AYoTlbPXvL+I0hvDC9PayUuIy+pNxhVhKPe9aQ8jCLE7T3W+VawG7s4x8Lo2H4FcrMiFTSbLsqMjXXK9VusaU55TA9VK1qgMR33m1mmI0H8CWhKQYDNAZpnw5Ul32GSiYbzUwBayMb4Dgwuf1+5jYehX6dk/upNSIyt8aqoFqndbpxe+2uYXzpa6vixhgVBRiXF63WWw2MPtTdQmtPschtPBJAx95tsFetj5JG67cHQ98qU/rlhNaiEFvYMdyHm7QV0dYM9HoRft6odF/iYi3DenIr9qBcNiIhxGp1LkfHmCwhJOQq+eHUfHaFhZyu0/bi1npcY2JXSowHR9bmOldx75i0KNaoPzUdgzTC2tutntx9kTidpgk17PTUnWFzb/RS3LxqL0ZtNGZAR8YOfwfnW0kui/6sedQaG7sIxqsG9Sx7Wt0u8F38P9Lfp9wOOxuF38S6WNkmJ59/YGFWpNYgWHA5WGX/2Qhl9QwoEEeSk7qvR7eOjnkbdwTRQibCENeubUQ2vRnu5eSAnMjCJ6w2ILjo487pj949hJ4rmGmIshhU7zL1FI1PXtDb9SfxKFHbulNHfk2P58GpnTc1SdVRjPhV8OXNDLPYHbfsp2Cfzxnqnbywwd/gfXBcbl',
        Composition: 'https://play.vuejs.org/#eNqtVs1u4zgMfhVuLuksmrjF7l6ybbHNtIdZLNpiU8wpF8WmYyW2ZEhyflDk3YeSbNlOM0ExqIHENkVS5Efyk98G92U53lQ4mAxuDBZlzgzezQXATcI37oEefxuN/BPAjJMOwpbtQaagt9zEGRdL0JhjbDCBWBalFCjMZWMiFVQaYS8rBXIrQPMEF0xFgm34khkuRWvkbUajZucHuUMx8waNv82okAnmt/NBs+kDFnI+aNYnCb1qWnb3Rh41Lr9X6Lx+kjvCBp5fXr89P93/N4GvsxmknABKKeuCC/rPGWVuIpaSKGEiRiAIldxgQfnqTq45F+tmU+UDMvscdYZo2nDMvkRaMrgzUaxDPACZwpQWMmNKPYmiOBHjlabE+EaNBZpIlEVEhR4lNvl/bJ21iRJOf0E67jj8QH56LwzbQcaXWU4/Y/vgdDofiS24WenIJx5xNVrkLF534/oFbHq1mjLNY7DWNlyTURlcMibjGmyJL2kDGgOqEzV31ratTf3Xsltm0VouBdcYbQl2ZdPpFSBhaj2mbvmUPG/Ip53cm6gzz/SqY8VLQ8/UflIZeHNTV1G/24xTOECqZAFD6obh3x2t7gheQjM9XXXfPNZoLqIIvjbDrC14RBXCgJGQyLiyLR9ZkIP/oHxf+xtHrcgSUyeWsDB9rzttdOcCd047wZRVOWVgQRGswAkMH+oYHOu8sCUOHUsF+tETrw79rL2oSxwHJ9NoqnICaSViR2MXXxrzWAptAilaQoFbi/LFsM1u+MWF26o7giG9pi4X5O/2rnFpG8JUSrTvVPEIXpjWto3bJIALSLiinfN9q9ruG4jZ2VPrbxUrgTs7Bp7n5gOQixW5sJVjSdIzaSrpuVuXGPOUZopIrURlOOoTu04Dsv4K0RKnBJ1OZEBo+I6lPWzl0DCea2ALIlM/lMGFL2Jz2TD0q7SYH+1JBZMFPlXFAtW7peMNXy0fCKdLRJDnsEAoqJ84HX8JLPZwfTXub2wvGuIJXL8Xs90E/upLD93Xzkt4PFB7uHvbJ8cd4Dom7NY7v7ypc0Ee7cNNFChgcDnwMzUqWElkJQWd/87rvF4gUgkQzQdhyK30w2fM1Zgwujo+Y1Y1X9moKA6jqflTvjyKwhaXzhn17OrRj4bludz+62QpyzXWAJBRhvH61MJK73zkLwo1qg3OB2HNMLW05GqXH2dPxKmdRfo0qHLSPrP4P2qZVzZKrzatREKBd/RcvN8crHTmvOrHnUGhm7SMqrClFIe1nYifJd+G+8f4zw6OfdY8+zmnjZJieff2BgVqTSwIhwM1h5d+6Ag5Q7EdfnMJ9afqHh7a93p+3MCGDOuQOvN57KHW6EyfPQ8nMDOK4A3COjgyedwx+9E6rGfipyPRP0zOQUjQtVQCvxMXEIQNurk0d+TY3j4NzOkpqE6ymcfCi99jcX0eg8MPDyLkEA==',
        'Script Setup': 'https://play.vuejs.org/#eNqtVktv4zYQ/itTXZwtYilB24ubBI03OWxRJEYd9KQLLY0s2hIpkJQfMPzfOyT1sjcJsosEiE3Nez7OfPIhuK+qcFNjMAluDJZVwQzexQLgJuUbd6DjL+OxPwHMOdkgbNkeZAZ6y02Sc7EEjQUmBlNIZFlJgcJcti5SQa0R9rJWILcCNE9xwVQk2IYvmeFS9E7eZzxuMz/IHYq5d2jjbcalTLG4jYM26QOWMg5a/SSlR01q993KozbkfzW6qJ8UjrCB59nLt+en+38m8HU+h4wTQBl1XXJBnwWjzk3EMhKlTCQIBKGSGyypXz3oteBi3SZVviCzL1DniKYvx+wrJJXBnYkS3dUDkCvMSJEbU+lJFCWpCFeaGuMbFQo0kajKiC56nNrm/7L3rE2UcvropOEg4Af603th2A5yvswL+jd2Dl5v5yO1dWFWOvKNR1yNFwVL1sO6fgKbk7uaMs0TsN62XJPTNbhmTM412Cu+pAS0BnRPNNx5P7a29Z/rbplHa7kUXGO0JdiVbefkAlKm1iFNy6f0eUMx7ebeRIN9pkedKF4ZWlRTVyShIZTKwMHtXk1Tb/vO4AiZkiWMaCZGfw6shot4Ce0ODc39CFmnWEQRfG1XWlsIiTCEASMhlUltBz+yUHfxO+P7Jl4Y9SJLT4NaOsX0e9tpaxuLFDMu8Lmy/KIvDhYZwUqcwOihKcFRz4wtcRSL4xfnlJCthajnAbi1sFyM+nJGQ1PHCWTTgnhx8QVu78ClU4S0Ev5MlxPBjGltJ66nO+ACUq4oW7H3Zn2ehj/Jj6Zzq1gF3Nkz8FQUByAXK3K1sLI07cxbiD216goTntHIE+dUqAxHfZZpOmlrhL4yWvVO3zF5in6IKK7FEQ3jhQa2IH7ze9K5jzofm1a/SIvlIA+AliU+1eUC1Yn4PMmLXUvh7GgfiwIWCGVdGE5voRQWe7i+Cvtk9o/2aALXpyK2m8AfveTYHpuD+zrStboxuIl8AbQkwWXgp25csoqWWgp6T7pq40ZBy9fVHwfdGljph7n4KqQmrs65eNXsNRV3pDqMponL+PKsCos48bFqBv2kGlYUcvu3k2Ws0NhgQk45JuvXFCu985XPFGpUG4yDTmeYWloSsurH+RNxz0BJr9C6IOt3lP+ilkVtq/Rm01qkVPjAztX7zcFK3PyiH3cGhW7bMqpGh4ezd1jbEX2r+b7c38LfBzie8sq7P3u0UVIs7w4HKFFrIgo4Hmk4vPQHqPZtKhqwiuvqdPbv4aF/DluW8tFmdq18rKa4rvfzII2+WxP79pjA3CgCuRFRTEZLReaPO2Z/4FEyj9j3C3FKtu8BSMD1Ww6/0qoSgC22hTR3FNh+fS6U0zeBeoVyPBZeeI7F9VsYHP8Hrj21Iw=='
      };
      return apiMap[this.commonType] || apiMap.Options;
    }
  }
};
</script>
