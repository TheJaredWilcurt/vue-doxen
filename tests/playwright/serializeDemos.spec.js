import { test, expect } from "@playwright/test";

// Imports from the built dist — run `npm run build:library` before these tests.
// This avoids needing Vite alias resolution (@/) and .vue SFC compilation at runtime.
import { serializeDemos } from "../../dist/vue-doxen.js";

const testDemos = {
  TierOneComponent: {
    component: {
      name: "TierOneComponent",
      template: "<div>Tier one</div>",
      props: {
        size: {
          type: String,
          default: "md",
          validator: (v) => ["sm", "md", "lg"].includes(v),
        },
      },
    },
    description: "<p>A simple <strong>string</strong> description.</p>",
    importStatement: "import { TierOneComponent } from 'my-lib';",
    propsToDemo: {
      size: { description: "Controls the size." },
    },
    emitsToDemo: {
      clicked: { description: "Emitted on click." },
    },
    slotsToDemo: { default: "Slot content" },
  },
  TierTwoComponent: {
    component: {
      name: "TierTwoComponent",
      template: "<div>Tier two</div>",
      props: {
        disabled: {
          type: Boolean,
          default: false,
        },
      },
    },
    description: {
      component: {
        name: "TierTwoWrapper",
        template: '<div v-html="message"></div>',
        props: { message: { type: String, default: "" } },
      },
      props: {
        message: "<p>Wrapper description with <code>HTML</code>.</p>",
      },
    },
  },
  TierThreeComponent: {
    component: {
      name: "TierThreeComponent",
      template: "<div>Tier three</div>",
      props: {},
    },
    description: {
      component: {
        name: "TierThreeDescription",
        template:
          "<div><p>Template-only description text.</p><ul><li>Feature one</li></ul></div>",
      },
    },
  },
};

const expectedOutput = {
  TierOneComponent: {
    title: null,
    description: "A simple string description.",
    import: "import { TierOneComponent } from 'my-lib';",
    deprecated: false,
    deprecationNotice: null,
    props: {
      size: {
        type: "String",
        required: false,
        default: "md",
        allowed: ["sm", "md", "lg"],
        description: "Controls the size.",
      },
    },
    emits: {
      clicked: { description: "Emitted on click." },
    },
    slots: ["default"],
  },
  TierTwoComponent: {
    title: null,
    description: "Wrapper description with HTML.",
    import: null,
    deprecated: false,
    deprecationNotice: null,
    props: {
      disabled: {
        type: "Boolean",
        required: false,
        default: false,
        allowed: null,
        description: null,
      },
    },
    emits: {},
    slots: [],
  },
  TierThreeComponent: {
    title: null,
    description: null,
    import: null,
    deprecated: false,
    deprecationNotice: null,
    props: {},
    emits: {},
    slots: [],
  },
};

test.describe("serializeDemos", () => {
  test("sync mode resolves Tier 1 and Tier 2 correctly, leaves Tier 3 as null", async () => {
    const result = await serializeDemos(testDemos);
    expect(result).toEqual(expectedOutput);
  });
});
