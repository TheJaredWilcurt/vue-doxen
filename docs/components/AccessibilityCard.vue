<template>
  <div class="vdta-card">
    <div class="vdta-heading">
      <h3>{{ title.replaceAll(' ', '&nbsp;') }}</h3>
      <p class="vdta-subheading">
        {{ subHeading }}
      </p>
    </div>
    <p>
      {{ description }}
      <a
        class="rule-learn-more"
        :href="learnLink"
        target="_blank"
        :title="learnLink.replace('https://', '')"
      >
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Learn more</title>
          <path
            d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </p>

    <DoxenCodeBox
      :code="dom"
      :copy="false"
      :styleTokens="styleTokens"
    />

    <DoxenButton
      :class="'vdta-highlight-button'"
      :styleTokens="styleTokens"
      @click="$emit('highlight')"
    >
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>target icon</title>
        <path
          d="M22.08,11.04H20.08V4H13.05V2H11.04V4H4V11.04H2V13.05H4V20.08H11.04V22.08H13.05V20.08H20.08V13.05H22.08V11.04M18.07,18.07H13.05V16.06H11.04V18.07H6V13.05H8.03V11.04H6V6H11.04V8.03H13.05V6H18.07V11.04H16.06V13.05H18.07V18.07M13.05,12.05A1,1 0 0,1 12.05,13.05C11.5,13.05 11.04,12.6 11.04,12.05C11.04,11.5 11.5,11.04 12.05,11.04C12.6,11.04 13.05,11.5 13.05,12.05Z"
          fill="currentColor"
        />
      </svg>
      Highlight element on page
    </DoxenButton>

    <slot></slot>
  </div>
</template>

<script>
import { styleTokens } from '@/helpers/props.js';

import DoxenButton from '@/components/DoxenButton.vue';
import DoxenCodeBox from '@/components/DoxenCodeBox.vue';

const requiredString = {
  type: String,
  required: true
};

export default {
  name: 'AccessibilityCard',
  components: {
    DoxenButton,
    DoxenCodeBox
  },
  props: {
    styleTokens,
    title: requiredString,
    subHeading: requiredString,
    description: requiredString,
    learnLink: requiredString,
    dom: requiredString
  },
  emits: ['highlight']
};
</script>

<style scoped>
.vdta-card {
  border: 1px solid currentColor;
  margin: 1rem;
  padding: 1rem;
}
.vdta-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom: 1px solid currentColor;
}
.vdta-subheading {
  display: inline-block;
  max-width: 677px;
  margin-left: auto;
  text-align: right
}
.vdta-card h3 {
  margin: 0px;
  font-weight: 700;
}

.rule-learn-more {
  text-decoration: none;
}
.rule-learn-more svg {
  height: 20px;
  vertical-align: sub;
}
.vdta-highlight-button {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
}
.vdta-highlight-button svg {
  height: 17px;
}
</style>
