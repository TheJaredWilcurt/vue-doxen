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
        @click.prevent="$emit('update:model-value', [])"
      >
        clear&nbsp;log
      </button>
    </div>
    <div v-bind="applyStyleTokens({ emitLogTableContainer: true })">
      <table
        v-bind="applyStyleTokens({ emitLogTable: true })"
        :id="idFor"
      >
        <thead v-bind="applyStyleTokens({ emitLogThead: true })">
          <tr v-bind="applyStyleTokens({ emitLogTr: true })">
            <th v-bind="applyStyleTokens({ emitLogTh: true })">Emit Name</th>
            <th v-bind="applyStyleTokens({ emitLogTh: true })">Value</th>
          </tr>
        </thead>
        <tbody v-bind="applyStyleTokens({ emitLogTbody: true })">
          <tr
            v-for="(log, logIndex) in modelValue"
            v-bind="applyStyleTokens({ emitLogTr: true })"
            :key="'log' + logIndex"
          >
            <td v-bind="applyStyleTokens({ emitLogTd: true })">{{ log.emitName }}</td>
            <td v-bind="applyStyleTokens({ emitLogTd: true })">{{ dataValue(log.value) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </FormFieldsetWrapper>
</template>

<script>
import {
  createIdFor,
  createImportStatement,
  generateRandomId
} from '@/helpers/componentHelpers.js';
import {
  createModelValueProp,
  styleTokens
} from '@/helpers/props.js';
import { dataValue } from '@/helpers/snapshotHelpers.js';

import applyStyleTokens from '@/mixins/applyStyleTokensMixin.js';

import FormFieldsetWrapper from '@/components/formFields/FormFieldsetWrapper.vue';

const COMPONENT_NAME = 'DoxenEmitLog';
const modelValue = createModelValueProp(Array);

export default {
  ...createImportStatement(COMPONENT_NAME),
  name: COMPONENT_NAME,
  components: {
    FormFieldsetWrapper
  },
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
      return generateRandomId();
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
