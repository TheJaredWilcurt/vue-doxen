<template>
  <footer class="docs-page" aria-label="footer">
    <div class="created-by">
      <div>
        Made in sunny<br />
        <em>Indianapolis, Indiana</em> by
      </div>
      <div>
        <a
          class="created-by-link"
          href="https://twitter.com/TheJaredWilcurt"
          title="@TheJaredWilcurt"
          @focus="signatureKey++"
          @mouseover="signatureKey++"
        >
          <img
            alt="TheJaredWilcurt"
            class="signature"
            :src="'https://raw.githubusercontent.com/TheJaredWilcurt/TheJaredWilcurt/master/TheJaredWilcurt.png?cachebusting=' + signatureKey"
          />
        </a>
      </div>
    </div>

    <div class="github-container">
      <a class="github" href="https://GitHub.com/TheJaredWilcurt/vue-doxen">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 33">
          <path
            fill="currentcolor"
            d="M16.499.613c-8.995 0-16.289 7.293-16.289 16.29 0 7.197 4.667 13.303 11.141 15.457.814.148 1.112-.354 1.112-.785l-.022-2.771c-4.531.984-5.487-2.184-5.487-2.184-.741-1.881-1.809-2.383-1.809-2.383-1.479-1.01.112-.99.112-.99 1.635.115 2.495 1.68 2.495 1.68 1.453 2.488 3.813 1.77 4.741 1.354.148-1.053.569-1.771 1.034-2.178-3.617-.412-7.42-1.809-7.42-8.051 0-1.778.635-3.232 1.677-4.371-.167-.412-.727-2.068.16-4.311 0 0 1.368-.438 4.479 1.67 1.299-.361 2.693-.542 4.078-.548 1.384.006 2.776.187 4.078.548 3.11-2.108 4.476-1.67 4.476-1.67.889 2.243.329 3.899.162 4.311 1.043 1.139 1.674 2.593 1.674 4.371 0 6.258-3.809 7.635-7.438 8.038.585.504 1.105 1.498 1.105 3.018 0 2.178-.02 3.934-.02 4.469 0 .436.293.941 1.12.783 6.468-2.158 11.13-8.26 11.13-15.455.001-8.999-7.292-16.292-16.289-16.292z"
          />
        </svg>
        GitHub
      </a>
      <p v-if="lastUpdated">
        MIT Licensed
      </p>
    </div>

    <div class="last-updated">
      <template v-if="lastUpdated">
        This website was last updated on
        <a
          href="https://github.com/TheJaredWilcurt/vue-doxen/deployments"
          target="_blank"
        >
          {{ lastUpdated.toLocaleDateString() }}
          at
          {{ lastUpdated.toLocaleTimeString() }}
        </a>.
      </template>
      <template v-else>
        MIT Licensed
      </template>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data: function () {
    return {
      lastUpdated: null,
      signatureKey: 0
    };
  },
  methods: {
    checkLastDeployment: async function () {
      const url = 'https://api.github.com/repos/TheJaredWilcurt/vue-doxen/deployments?per_page=1';
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github+json'
        }
      };
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        this.lastUpdated = new Date(data[0].created_at);
      } catch {
        return;
      }
    }
  },
  created: function () {
    this.checkLastDeployment();
  }
};
</script>

<style scoped>
footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 100px auto 80px auto;
  font-size: 20px;
  text-align: center;
}
footer svg {
  display: block;
  width: 33px;
  margin: 0px auto;
}
.github-container {
  width: 34%;
}
.github-container p {
  font-size: 15px;
}
.github {
  display: inline-block;
}
.created-by {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 33%;
  font-size: 15px;
}
.created-by-link {
  display: inline-block;
}
.signature {
  width: 205.233px;
  height: auto;
}
.doxen-dark .signature {
  filter: brightness(20);
}
.last-updated {
  width: 33%;
  margin-top: 25px;
  margin-bottom: 25px;
  font-size: 15px;
}
@media (width < 500px) {
  footer {
    flex-direction: column;
  }
  .github-container,
  .created-by,
  .last-updated {
    width: 100%;
  }
  .github-container {
    order: 3;
  }
}
</style>
