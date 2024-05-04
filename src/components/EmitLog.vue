<template>
  <fieldset
    title="See browser console"
  >
    <div
    >
      <legend><strong>Emit log:</strong></legend>
      <button
        @click.prevent="$emit('update:modelValue', [])"
      >
        clear&nbsp;log
      </button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Event</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(log, logIndex) in modelValue"
          :key="'log' + logIndex"
        >
          <td>{{ log.emit }}</td>
          <td>{{ log.$event }}</td>
          <td>{{ dataValue(log.value) }}</td>
        </tr>
      </tbody>
    </table>
  </fieldset>
</template>

<script>
import { dataValue } from '@/helpers/snapshotHelpers.js';

export default {
  name: 'EmitLog',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Array,
      default: undefined
    }
  },
  methods: {
    dataValue
  }
};
</script>
