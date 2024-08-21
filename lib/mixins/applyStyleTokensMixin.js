export default {
  methods: {
    applyStyleTokens: function (tokenMap) {
      const tokensToApply = [];
      const classesToApply = [];
      let attributes = {};

      for (const token in tokenMap) {
        if (tokenMap[token]) {
          tokensToApply.push(token);
          const providedToken = this.styleTokens[token];
          if (typeof(providedToken) === 'string') {
            classesToApply.push(providedToken);
          } else if (
            typeof(providedToken) === 'object' &&
            !Array.isArray(providedToken)
          ) {
            if (
              providedToken.class &&
              typeof(providedToken.class) === 'string'
            ) {
              classesToApply.push(providedToken.class);
            }
            attributes = {
              ...attributes,
              ...providedToken
            };
          }
        }
      }

      return {
        ...attributes,
        class: classesToApply.filter(Boolean).join(' '),
        'data-applied-style-tokens': tokensToApply.filter(Boolean).join(' '),
        'data-style-tokens': Object.keys(tokenMap).join(' ')
      };
    }
  }
};
