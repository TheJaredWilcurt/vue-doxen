/** @typedef {import('../types').DEMOS} DEMOS */

import { processDemos } from '@/helpers/componentHelpers.js';
import {
  combinePropsAndPropsToDemo,
  getSlotDataFromComponent
} from '@/helpers/demoHelpers.js';

/**
 * EXPERIMENTAL.
 * Produces a flattened version of all the demos.
 *
 * @param  {DEMOS} demos  Vue-Doxen demos object (to be flattend).
 * @return {DEMOS}        A new object copying parts from the passed in demos.
 */
export const flattenDemos = function (demos) {
  let flatDemos = {};
  let processedDemos = processDemos(demos);
  for (const demoName in processedDemos) {
    const demo = processedDemos[demoName];
    flatDemos[demoName] = {};


    /* TOP LEVEL */

    const topLevelValues = [
      'deprecationNotice',
      'title',
      'name',
      'description',
      'importStatement'
    ];
    for (const topLevelValue of topLevelValues) {
      flatDemos[demoName] = undefined;
      if (demo[topLevelValue]) {
        flatDemos[demoName] = demo[topLevelValue];
      } else if (
        demo.component &&
        demo.component[topLevelValue]
      ) {
        flatDemos[demoName] = demo.component[topLevelValue];
      }
    }


    /* PROPS */

    const propsToDemo = demo.propsToDemo || {};
    const componentProps = (demo.component && demo.component.props) || {};
    const componentPropsToDemo = (demo.component && demo.component.propsToDemo) || {};
    flatDemos.props = combinePropsAndPropsToDemo(componentPropsToDemo, componentProps);
    flatDemos.props = combinePropsAndPropsToDemo(propsToDemo, flatDemos.props);


    /* SLOTS */

    flatDemos[demoName].slots = getSlotDataFromComponent(demo.component);

    function setupSlots (slotPath) {
      if (Array.isArray(slotPath)) {
        for (const slotName of slotPath) {
          flatDemos[demoName].slots[slotName] = flatDemos[demoName].slots[slotName] || { default: '' };
        }
      } else if (typeof(slotPath) === 'object') {
        for (const slotName in slotPath) {
          flatDemos[demoName].slots[slotName] = {
            default: '',
            ...flatDemos[demoName].slots[slotName],
            ...slotPath
          };
        }
      }
    }

    setupSlots(demo.component?.slots);

    function mergeSlotGroups (slotsGroup) {
      if (!slotsGroup) {
        return;
      }
      if (Array.isArray(slotsGroup)) {
        for (const slotName of slotsGroup) {
          flatDemos[demoName].slots[slotName] = flatDemos[demoName].slots[slotName] || { default: '' };
        }
      } else if (typeof(slotsGroup) === 'object') {
        for (const slotName in slotsGroup) {
          if (typeof(slotsGroup[slotName]) === 'string') {
            flatDemos[demoName].slots[slotName] = {
              ...flatDemos[demoName].slots[slotName],
              default: slotsGroup[slotName]
            };
          } else if (typeof(slotsGroup[slotName]) === 'object') {
            flatDemos[demoName].slots[slotName] = {
              default: '',
              ...flatDemos[demoName].slots[slotName],
              ...slotsGroup[slotName]
            };
          }
        }
      }
    }
    mergeSlotGroups(demo.component?.slots);
    mergeSlotGroups(demo.component?.slotsToDemo);
    mergeSlotGroups(demo.slotstoDemo);


    /* EMITS */

    if (Array.isArray(demo.component?.emits)) {
      for (const emitName of demo.component.emits) {
        flatDemos[demoName].emits[emitName] = flatDemos[demoName].emits[emitName] || {};
      }
    } else if (typeof(demo.component?.emits) === 'object') {
      for (const emitName in demo.component.emits) {
        if (typeof(demo.component.emits[emitName]) === 'function') {
          flatDemos[demoName].emits[emitName] = {
            ...flatDemos[demoName].emits[emitName],
            validator: demo.component.emits[emitName]
          };
        } else {
          flatDemos[demoName].emits[emitName] = {
            ...flatDemos[demoName].emits[emitName],
            description: (demo.component.emits[emitName] || '')
          };
        }
      }
    }
    function mergeEmitsToDemo (emitsGroup) {
      if (Array.isArray(emitsGroup)) {
        for (const emitName of emitsGroup) {
          flatDemos[demoName].emits[emitName] = flatDemos[demoName].emits[emitName] || {};
        }
      } else if (typeof(emitsGroup) === 'object') {
        for (const emitName in emitsGroup) {
          flatDemos[demoName].emits[emitName] = {
            ...flatDemos[demoName].emits[emitName],
            ...emitsGroup[emitName]
          };
        }
      }
    }
    mergeEmitsToDemo(demo.component?.emitsToDemo);
    mergeEmitsToDemo(demo.emitsToDemo);

    // Normalize emits
    for (const emitName in flatDemos[demoName].emits) {
      flatDemos[demoName].emits[emitName] = flatDemos[demoName].emits[emitName] || {};
      flatDemos[demoName].emits[emitName].value = flatDemos[demoName].emits[emitName].value || '';
      flatDemos[demoName].emits[emitName].example = flatDemos[demoName].emits[emitName].example || '';
      flatDemos[demoName].emits[emitName].validator = flatDemos[demoName].emits[emitName].validator || undefined;
      flatDemos[demoName].emits[emitName].description = flatDemos[demoName].emits[emitName].description || '';
    }
  }
  return flatDemos;
};
