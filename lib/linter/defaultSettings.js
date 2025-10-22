/** @typedef {import('../../types').LINTERSETTINGS} LINTERSETTINGS */

/**
 * Creates the default settings, then overrides those based on user preference.
 *
 * @param  {LINTERSETTINGS} linterSettings  User provided linter settings.
 * @return {LINTERSETTINGS}                 All settings, normalized, with user preferences applied.
 */
export const createSettingsFromDefaults = function (linterSettings) {
  const defaultSettings = {
    demos: {
      allPropsMustHave: {
        allowed: false,
        description: false,
        example: false,
        requiredOrDefault: false,
        type: false,
        validator: false
      },
      allEmitsMustHave: {
        description: false,
        example: false
      },
      componentMustBeNamed: false,
      descriptionMustEndInPeriod: false,
      mustHaveDescription: false,
      mustHaveImportStatemnet: false,
      noCustomComponentsInComponent: false,
      demosMustHaveComponent: false,
      doNotBreakVueApi: false,
      noDuplicateSettings: false,
      onlyAllowDemoObjects: false
    },
    options: {
      allComponentsMustBeReplaced: false,
      noMissingComponents: false
    }
  };
  if (!linterSettings || typeof(linterSettings) !== 'object' || Array.isArray(linterSettings)) {
    return defaultSettings;
  }

  // Mutate defaults based on input
  for (const rootKey in defaultSettings) {
    if (typeof(defaultSettings[rootKey]) === 'object') {
      for (const key in defaultSettings[rootKey]) {
        if (typeof(defaultSettings[rootKey][key]) === 'object') {
          for (const subKey in defaultSettings[rootKey][key]) {
            const parentKeyPath = linterSettings?.[rootKey]?.[key];
            if (parentKeyPath && Object.hasOwn(parentKeyPath, subKey)) {
              defaultSettings[rootKey][key][subKey] = linterSettings[rootKey][key][subKey];
            }
          }
        } else {
          const parentRootKeyPath = linterSettings?.[rootKey];
          if (parentRootKeyPath && Object.hasOwn(parentRootKeyPath, key)) {
            defaultSettings[rootKey][key] = linterSettings[rootKey][key];
          }
        }
      }
    } else {
      if (linterSettings && Object.hasOwn(linterSettings, rootKey)) {
        defaultSettings[rootKey] = linterSettings[rootKey];
      }
    }
  }
  return defaultSettings;
};
