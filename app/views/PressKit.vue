<template>
  <div class="docs-page">
    <h1
      id="branding"
      class="docs-title"
    >
      Press Kit/Branding
    </h1>

    <p>
      Below are some assets you can use when making graphics for <strong>blog posts</strong>
      or <strong>tutorial videos</strong> about Vue-Doxen.
    </p>

    <div class="image-container">
      <figure>
        <a href="/vue-doxen/branding/#open-image" @click.prevent="openImage">
          <img src="../assets/branding/vue-doxen-logo-large.png" alt="Vue-Doxen logo" />
        </a>
        <figcaption>Vue-Doxen logo (large)</figcaption>
      </figure>

      <figure>
        <a href="/vue-doxen/branding/#open-image" @click.prevent="openImage">
          <img src="../assets/branding/vue-doxen-text.png" alt="Vue-Doxen text" />
        </a>
        <figcaption>Vue-Doxen text</figcaption>
      </figure>

      <figure>
        <a href="/vue-doxen/branding/#open-image" @click.prevent="openImage">
          <img src="../assets/branding/vue-doxen-dog.png" alt="Vue-Doxen dog" />
        </a>
        <figcaption>Vue-Doxen dog graphic</figcaption>
      </figure>
    </div>

    <p>
      Colors used in the text are Vue's official colors:
    </p>

    <ul>
      <li><code class="color-preview-a">#41B883</code></li>
      <li><code class="color-preview-b">#34495E</code></li>
    </ul>

    <p>
      The font used is <a href="https://github.com/mjlagattuta/hepta-slab" target="_blank" style="font-weight: 900;">Hepta Slab</a> (900 weight).
    </p>

    <p>
      The dog's name is <em>Vienna</em>.
    </p>
  </div>
</template>

<script>
export default {
  name: 'PressKit',
  methods: {
    openImage: function ($event) {
      const src = $event?.currentTarget?.childNodes?.[0]?.src;
      window.open(src, '_blank');
    }
  }
};
</script>

<style scoped>
figure {
  display: inline-block;
  margin-right: 2rem;
  text-align: center;
}
img {
  max-width: 200px;
  max-height: 200px;
}
.image-container {
  text-align: center;
}
.color-preview-a:before,
.color-preview-b:before {
  content: '';
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 1px solid #000A;
  margin-right: 0.25rem;
  margin-left: 0.25rem;
  vertical-align: middle;
}
.color-preview-a:before {
  background: #41B883;
}
.color-preview-b:before {
  background: #34495E;
}
</style>
