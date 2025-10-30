/**
 * @file Reusable, flattened, JSDoc comment blocks and types that can be imported by other files.
 */

/**
 * @callback           PROPVALIDATOR
 * @param    {any}     value         The value passed in to be validated.
 * @return   {boolean}               Returns a boolean for if the value was valid.
 */

/**
 * @typedef  {object}                    PROPDEFINITION      These are used for runtime validation of prop inputs.
 * @property {constructor|constructor[]} [type]              Any type constructor like Number, String, etc or array of them.
 * @property {boolean}                   [required=false]    Communicates if a prop requires a value be passed by the parent.
 * @property {boolean}                   [default]           If a prop is not required, this allows setting a default value.
 * @property {PROPVALIDATOR}             [validator]         A custom function to validate a prop input value.
 * @property {string}                    [description]       A description of the prop for documentation purposes.
 * @property {VUECOMPONENT}              [component]         Replaces the default Vue-Doxen prop playground component with a custom one.
 * @property {PROPDEFINITION}            [props]             The props to be handed to the custom playground component.
 * @property {Object<string, string>}    [slots]             The slots to be used by the custom playground component.
 * @property {Object<string, function>}  [events]            The methods to handle emits on the custom playground component.
 * @property {array}                     [allowed]           An array of primitives of the only explicitly allowed values
 * @property {number}                    [min]               The lower bounds of allowed values for some numeric props.
 * @property {number}                    [max]               The upper bounds of allowed values for some numeric props.
 * @property {string}                    [example]           A provided code usage example for the prop, for documentation purposes.
 * @property {boolean}                   [deprecated=false]  Informs the documentation that the prop should not be used, removes it from playground.
 */

/**
 * @typedef  {object}                                  VUECOMPONENT
 * @property {string}                                  [name]              The component name.
 * @property {Object<string, VUECOMPONENT>}            [components]        Registered child components.
 * @property {string[]|Object<string, PROPDEFINITION>} [props]             The component inputs.
 * @property {string[]}                                [emits]             The names of events that can be emitted to the parent component.
 * @property {boolean}                                 [deprecated=false]  Indicates in the documentation that a component should not be used.
 */

/**
 * @typedef  {object}                  CUSTOMCOMPONENT
 * @property {VUECOMPONENT}            component        The custom component to use.
 * @property {Object<string, any>}     props            The props object to pass to the custom component.
 * @property {Object<string, string>}  slots            The slot names as keys and their markup as strings (value)
 * @property {Object<string, function} events           Object with methods for each emit event and a callback to run for your custom component.
 */

/**
 * @typedef  {object} EMITDEFINITION
 * @property {string} description     The intent of how this emit should be used.
 * @property {string} example         Any example code you want to add for how to use this emit.
 * @property {string} value           A description of what value is emitted.
 */

/** @typedef {Object<string, PROPDEFINITION>} PROPSTODEMO */
/** @typedef {Object<string, CUSTOMCOMPONENT>} SLOTSTODEMO */
/** @typedef {Object<string, EMITDEFINITION>} EMITSTODEMO */

/**
 * @typedef  {object}                  DEMO
 * @property {VUECOMPONENT}            component          The component to demo.
 * @property {string|CUSTOMCOMPONENT}  deprecationNotice  Communicates when a component is deprecated and should not be used.
 * @property {string|CUSTOMCOMPONENT}  title              Optional custom title for the demo page.
 * @property {string}                  name               The component name, used as a fallback for `title`, and in live code preview.`
 * @property {string|CUSTOMCOMPONENT}  description        Information and context about the component being demo'd.
 * @property {string|CUSTOMCOMPONENT}  importStatement    Shows how to import the component being demo'd.
 * @property {PROPSTODEMO}             propsToDemo        Documentation details and playground controls for the props of the component to demo.
 * @property {string[]|EMITSTODEMO}    emitsToDemo        To document the component's emits.
 * @property {string[]|SLOTSTODEMO}    slotsToDemo        To document the component's slots.
 */

/** @typedef {Object<string, DEMO|VUECOMPONENT>} DEMOS */

/**
 * @typedef  {object}       OPTIONSCOMPONENTS
 * @property {VUECOMPONENT} deprecationBanner   DoxenDeprecationBanner or a replacement for it.
 * @property {VUECOMPONENT} header              DoxenHeader or a replacement for it.
 * @property {VUECOMPONENT} checkbox            DoxenCheckbox or a replacement for it.
 * @property {VUECOMPONENT} deprecatedProp      DoxenDeprecatedProp or a replacement for it.
 * @property {VUECOMPONENT} dropdown            DoxenDropdown or a replacement for it.
 * @property {VUECOMPONENT} jsonTextarea        DoxenJsonTextarea or a replacement for it.
 * @property {VUECOMPONENT} numberField         DoxenNumberField or a replacement for it.
 * @property {VUECOMPONENT} plainText           DoxenPlainText or a replacement for it.
 * @property {VUECOMPONENT} radioDials          DoxenRadioDials or a replacement for it.
 * @property {VUECOMPONENT} rangeSlider         DoxenRangeSlider or a replacement for it.
 * @property {VUECOMPONENT} textField           DoxenTextField or a replacement for it.
 * @property {VUECOMPONENT} textarea            DoxenTextarea or a replacement for it.
 * @property {VUECOMPONENT} emitLog             DoxenEmitLog or a replacement for it.
 * @property {VUECOMPONENT} propsDocumentation  DoxenPropsDocumentation or a replacement for it.
 * @property {VUECOMPONENT} emitsDocumentation  DoxenEmitsDocumentation or a replacement for it.
 */

/**
 * @typedef  {object}            OPTIONS
 * Used for advance tree-shaking to skip bundling Vue-Doxen's built-in components by globally replacing them with your own.
 * @property {OPTIONSCOMPONENTS} components  The components to be used internally by Vue-Doxen, either those supplied by the library
 *                                           or your own custom replacements with matching APIs.
 */

/********** LINTER TYPES **********/

/**
 * @typedef  {object}  LINTERSETTINGSALLEMITS
 * @property {boolean} [description=false]     `description` key must be on the object (can be set to undefined).
 * @property {boolean} [example=false]         `example` key must be on the object (can be set to undefined).
 * @property {boolean} [value=false]           `value` key must be on the object (can be set to undefined).`
 */

/**
 * @typedef  {object}  LINTERSETTINGSALLPROPS
 * @property {boolean} [allowed=false]            `allowed` key must be on the object (can be set to undefined).
 * @property {boolean} [deprecated=false]         Prop must have either `deprecated: true` or `deprecated: false` set.
 * @property {boolean} [description=false]        `description` key must be on the object (can be set to undefined).
 * @property {boolean} [example=false]            `example` key must be on the object (can be set to undefined).
 * @property {boolean} [requiredOrDefault=false]  Must have either a `required: true` or a `default` key on the object (can be set to undefined).
 * @property {boolean} [type=false]               `type` key must be on the object (can be set to undefined).
 * @property {boolean} [validator=false]          `validator` key must be on the object (can be set to undefined).
 */

/**
 * @typedef  {object}                 LINTERSETTINGSDEMOS
 * @property {LINTERSETTINGSALLEMITS} [allEmitsMustHave]                     Linter settings for component emit documentation.
 * @property {LINTERSETTINGSALLPROPS} [allPropsMustHave]                     Linter settings for component prop documentation.
 * @property {boolean}                [componentMustBeNamed=false]           Requires a name be defined on the component.
 * @property {boolean}                [demosMustHaveComponent=false]         If passing in a demo object, it must include the component to demo.
 * @property {boolean}                [deprecatedMustBeSet=false]            All components/demos must have `deprecationNotice` set (can be undefined).
 * @property {boolean}                [descriptionMustEndInPeriod=false]     Warns when description on a demo page does not end in a period.
 *                                                                           Ignores custom component descriptions, missing or empty strings.
 * @property {boolean}                [doNotViolateVueEmitApi=false]         Requires all components with emits defined follow Vue's API.
 *                                                                           `emits`` must be an array of strings, or an object with key values
 *                                                                           that are `null` or functions.
 * @property {boolean}                [mustHaveDescription=false]            Requires a description (string or custom component) on all
 *                                                                           demos and/or components. (can be set to undefined).
 * @property {boolean}                [mustHaveImportStatement=false]        Requires an import statement (string or custom component) on all
 *                                                                           demos and/or components. (can be set to undefined).
 * @property {boolean}                [noCustomComponentsInComponent=false]  If using custom components, they must be imported in a demo object,
 *                                                                           rather than in the component being demo'd to avoid file size bloat.
 * @property {boolean}                [onlyAllowDemoObjects=false]           Your demos object must not have any top-level components.
 */

/**
 * @typedef  {object}  LINTERSETTINGSOPTIONS
 * @property {boolean} [allComponentsMustBeReplaced=false]  If enabled, requires all built-in components are replaced with custom ones.
 * @property {boolean} [noMissingComponents=false]          If enabled, warns about missing required components (strongly recommended).
 */

/**
 * @typedef  {object}                LINTERSETTINGS
 * @property {LINTERSETTINGSDEMOS}   [demos]         Linting settings related to Vue-Doxen demos.
 * @property {LINTERSETTINGSOPTIONS} [options]       Linting settings related to Vue-Doxen options.
 */

/**
 * @callback                  RULE
 * @param    {DEMOS}          demos           Vue-Doxen demos object (to be linted).
 * @param    {OPTIONS}        options         Vue-Doxen options object (to be linted).
 * @param    {LINTERSETTINGS} linterSettings  The user's desired settings for what linting rules should be enforced.
 * @param    {string[]}       errors          An array of demo/file names, each entry represents one violation of any rule.
 */

/**
 * @typedef  {object} RULEEXAMPLES
 * @property {string} ['Demo File']     An example using a Demo File that passes the rule.
 * @property {string} [Options]         An example using the Options API that passes the rule.
 * @property {string} [Composition]     An example using the Composition API that passes the rule.
 * @property {string} ['Script Setup']  An example using the Script Setup API that passes the rule.
 */

/**
 * @typedef  {object}       RULEDEFINITION
 * @property {RULE}         rule            A function to validate demos pass or violate this rule.
 * @property {string}       description     An explanation of what this rule enforces.
 * @property {string}       url             Online resource for more information about this rule/topic.
 * @property {RULEEXAMPLES} examples        Examples for how to correct the linting violation.
 */

export const types = {};
