export default {
  methods: {
    applyStyleTokens: function (tokenMap) {
      const tokensToApply = [];
      const classesToApply = [];
      for (const token in tokenMap) {
        if (tokenMap[token]) {
          tokensToApply.push(token);
          classesToApply.push(this.styleTokens[token]);
        }
      }
      return {
        class: classesToApply.filter(Boolean).join(' '),
        'data-applied-style-tokens': tokensToApply.filter(Boolean).join(' '),
        'data-style-tokens': Object.keys(tokenMap).join(' ')
      };
    }
  }
};
