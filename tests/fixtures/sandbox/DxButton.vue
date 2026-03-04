<template>
  <button
    :class="['dx-button', 'dx-button--' + variant, 'dx-button--' + size, { 'dx-button--disabled': disabled }]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script>
export default {
  name: 'DxButton',
  props: {
    label: {
      type: String,
      default: 'Button'
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (v) => ['primary', 'secondary', 'ghost', 'danger'].includes(v)
    },
    size: {
      type: String,
      default: 'md',
      validator: (v) => ['sm', 'md', 'lg'].includes(v)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: undefined
    },
    ariaLabel: {
      type: String,
      default: undefined
    }
  },
  emits: ['click'],
  methods: {
    handleClick: function (event) {
      if (!this.disabled) {
        this.$emit('click', event);
      }
    }
  }
};
</script>
