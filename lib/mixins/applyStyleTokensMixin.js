export default {
  methods: {
    applyStyleTokens: function (tokenMap) {
      const tokensToApply = [];
      const classesToApply = [];
      const attributes = {};
      for (const token in tokenMap) {
        if (tokenMap[token]) {
          tokensToApply.push(token);
          const providedToken = this.styleTokens[token];
          if (typeof(tokensToApply) === 'string') {
            classesToApply.push(tokensToApply);
          }
          if (typeof(tokensToApply) === 'object') {
            if (typeof(tokensToApply.class) === 'string') {
              classesToApply.push(tokensToApply.class);
            }
            attributes = {
              ...tokensToApply
            };
          }
        }
      }
      delete attributes.class;
      return {
        ...attributes,
        class: classesToApply.filter(Boolean).join(' '),
        'data-applied-style-tokens': tokensToApply.filter(Boolean).join(' '),
        'data-style-tokens': Object.keys(tokenMap).join(' ')
      };
    }
  }
};
