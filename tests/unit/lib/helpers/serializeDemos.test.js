import { describe, test, expect } from "vitest";

import { serializeDemos, stripHtml } from "@/helpers/serializeDemos.js";

import TierTwoWrapper from "@@/fixtures/TierTwoWrapper.vue";
import TierThreeDescription from "@@/fixtures/TierThreeDescription.vue";

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
      component: TierTwoWrapper,
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
      component: TierThreeDescription,
    },
  },
};

describe("stripHtml", () => {
  test("strips tags and collapses whitespace", () => {
    const result = stripHtml(
      "<p>A simple <strong>string</strong> description.</p>",
    );
    expect(result).toBe("A simple string description.");
  });

  test("decodes HTML entities", () => {
    const result = stripHtml("&lt;code&gt;fill&lt;/code&gt; &amp; more");
    expect(result).toBe("<code>fill</code> & more");
  });

  test("returns non-strings as-is", () => {
    expect(stripHtml(null)).toBe(null);
    expect(stripHtml(undefined)).toBe(undefined);
    expect(stripHtml(42)).toBe(42);
  });
});

describe("serializeDemos", () => {
  test("Tier 1: resolves plain string description and importStatement", async () => {
    const result = await serializeDemos(testDemos);
    const tier1 = result.TierOneComponent;

    expect(tier1.description).toBe("A simple string description.");
    expect(tier1.import).toBe("import { TierOneComponent } from 'my-lib';");
    expect(tier1.deprecated).toBe(false);
    expect(tier1.deprecationNotice).toBe(null);
  });

  test("Tier 1: serializes props with type, default, allowed, description", async () => {
    const result = await serializeDemos(testDemos);
    const props = result.TierOneComponent.props;

    expect(props.size.type).toBe("String");
    expect(props.size.required).toBe(false);
    expect(props.size.default).toBe("md");
    expect(props.size.allowed).toEqual(["sm", "md", "lg"]);
    expect(props.size.description).toBe("Controls the size.");
  });

  test("Tier 1: serializes emits", async () => {
    const result = await serializeDemos(testDemos);
    const emits = result.TierOneComponent.emits;

    expect(emits.clicked).toEqual({ description: "Emitted on click." });
  });

  test("Tier 1: serializes slots", async () => {
    const result = await serializeDemos(testDemos);
    const slots = result.TierOneComponent.slots;

    expect(slots).toContain("default");
  });

  test("Tier 2: extracts text from component props", async () => {
    const result = await serializeDemos(testDemos);
    const tier2 = result.TierTwoComponent;

    expect(tier2.description).toBe("Wrapper description with HTML.");
    expect(tier2.import).toBe(null);
  });

  test("Tier 2: serializes component props correctly", async () => {
    const result = await serializeDemos(testDemos);
    const props = result.TierTwoComponent.props;

    expect(props.disabled.type).toBe("Boolean");
    expect(props.disabled.required).toBe(false);
    expect(props.disabled.default).toBe(false);
    expect(props.disabled.allowed).toBe(null);
    expect(props.disabled.description).toBe(null);
  });

  test("Tier 3: returns null for description without Playwright", async () => {
    const result = await serializeDemos(testDemos);
    const tier3 = result.TierThreeComponent;

    expect(tier3.description).toBe(null);
    expect(tier3.import).toBe(null);
  });

  test("includes all demo keys in output", async () => {
    const result = await serializeDemos(testDemos);
    expect(Object.keys(result)).toEqual([
      "TierOneComponent",
      "TierTwoComponent",
      "TierThreeComponent",
    ]);
  });

  test("output is fully JSON-serializable", async () => {
    const result = await serializeDemos(testDemos);
    const json = JSON.stringify(result);
    const parsed = JSON.parse(json);
    expect(parsed).toEqual(result);
  });

  test("deprecated is consistent with deprecationNotice", async () => {
    const demosWithDeprecation = {
      DeprecatedComponent: {
        component: {
          name: "DeprecatedComponent",
          template: "<div>deprecated</div>",
          props: {},
        },
        deprecationNotice: "<p>This component is deprecated.</p>",
      },
      NotDeprecated: {
        component: {
          name: "NotDeprecated",
          template: "<div>ok</div>",
          props: {},
        },
      },
    };
    const result = await serializeDemos(demosWithDeprecation);

    expect(result.DeprecatedComponent.deprecated).toBe(true);
    expect(result.DeprecatedComponent.deprecationNotice).toBe(
      "This component is deprecated.",
    );
    expect(result.NotDeprecated.deprecated).toBe(false);
    expect(result.NotDeprecated.deprecationNotice).toBe(null);
  });

  test("manual resolvers override component extraction", async () => {
    const result = await serializeDemos(testDemos, {
      resolvers: {
        TierTwoWrapper: (props) => "Custom resolved: " + props.message,
      },
    });
    expect(result.TierTwoComponent.description).toBe(
      "Custom resolved: <p>Wrapper description with <code>HTML</code>.</p>",
    );
  });
});
