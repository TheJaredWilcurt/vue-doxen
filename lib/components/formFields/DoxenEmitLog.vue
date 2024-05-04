<template>
  <FormFieldsetWrapper
    :modelValue="modelValue"
    :styleTokens="styleTokens"
    title="See browser console"
  >
    <div v-bind="applyStyleTokens({ emitLogHeader: true })">
      <legend v-bind="applyStyleTokens({ formFieldLegend: true })">
        <label
          v-bind="applyStyleTokens({ formFieldLabel: true })"
          :for="idFor"
        >
          Emit log:
        </label>
      </legend>
      <button
        v-bind="applyStyleTokens({ emitLogClearButton: true })"
        @click.prevent="$emit('update:modelValue', [])"
      >
        clear&nbsp;log
      </button>
    </div>
    <table v-bind="applyStyleTokens({ emitLogTable: true })">
      <thead v-bind="applyStyleTokens({ emitLogThead: true })">
        <tr v-bind="applyStyleTokens({ emitLogTr: true })">
          <th v-bind="applyStyleTokens({ emitLogTh: true })">Name</th>
          <th v-bind="applyStyleTokens({ emitLogTh: true })">Event</th>
          <th v-bind="applyStyleTokens({ emitLogTh: true })">Value</th>
        </tr>
      </thead>
      <tbody v-bind="applyStyleTokens({ emitLogTbody: true })">
        <tr
          v-for="(log, logIndex) in modelValue"
          v-bind="applyStyleTokens({ emitLogTr: true })"
          :key="'log' + logIndex"
        >
          <td v-bind="applyStyleTokens({ emitLogTd: true })">{{ log.emit }}</td>
          <td v-bind="applyStyleTokens({ emitLogTd: true })">{{ log.$event }}</td>
          <td v-bind="applyStyleTokens({ emitLogTd: true })">{{ dataValue(log.value) }}</td>
        </tr>
      </tbody>
    </table>
  </FormFieldsetWrapper>
</template>

<script>
import { createIdFor } from '@/helpers/componentHelpers.js';
import {
  createModelValueProp,
  styleTokens
} from '@/helpers/props.js';
import { dataValue } from '@/helpers/snapshotHelpers.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

import FormFieldsetWrapper from '@/components/formFields/FormFieldsetWrapper.vue';

const modelValue = createModelValueProp(Array);

export default {
  name: 'DoxenEmitLog',
  components: [
    FormFieldsetWrapper
  ],
  mixins: [
    applyStyleTokens
  ],
  emits: [
    'update:model-value'
  ],
  props: {
    modelValue,
    styleTokens
  },
  methods: {
    dataValue
  },
  computed: {
    uniqueId: function () {
      return crypto.randomUUID();
    },
    idFor: function () {
      return createIdFor({
        label: 'DoxenEmitLog',
        uniqueId: this.uniqueId
      });
    }
  }
};
</script>
