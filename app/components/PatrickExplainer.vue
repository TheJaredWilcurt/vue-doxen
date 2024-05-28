<template>
  <div class="patrick-explainer">
    <h2 class="docs-title">
      TLDR
    </h2>
    <div class="meme-container">
      <div class="panel-1">
        <h2 class="panel-1-text">
          Put your docs in the components
        </h2>
        <img
          alt="Patrick (from SpongeBob) taking the previous text"
          class="panel-1-image"
          src="@@@/assets/patrick1.png"
        />
      </div>
      <div class="panel-2">
        <img
          alt="Patrick putting the following text 'over there' (following an old meme format)"
          class="panel-2-image"
          src="@@@/assets/patrick2.png"
        />
        <h2 class="panel-2-text">
          Pass components into Vue-Doxen
        </h2>
      </div>
    </div>
    <p class="easy"><em>that's it</em></p>
  </div>
</template>

<script>
export default {
  name: 'PatrickExplainer'
};
</script>

<style scoped>
.patrick-explainer {
  container-type: inline-size;
  margin-bottom: 30px;
}
.docs-title {
  margin-bottom: 0px;
}
.meme-container {
  display: flex;
  margin-bottom: 30px;
}
.panel-1 {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.panel-2 {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
}
.panel-1-text {
  padding-right: 10px;
  text-align: right;
}
.panel-2-text {
  padding-left: 10px;
}
.panel-1-text,
.panel-2-text {
  font-size: 30px;
}
.panel-1-image {
  max-width: 200px;
}
.panel-2-image {
  max-width: 200px;
}
.easy {
  text-align: center;
}
@container (width < 987px) {
  .panel-1-text,
  .panel-2-text {
    font-size: 25px;
  }
}
@container (width < 869px) {
  .panel-1-text,
  .panel-2-text {
    font-size: 20px;
  }
}
@container (width < 814px) {
  .panel-1-image,
  .panel-2-image {
    max-width: 150px;
  }
}
@container (width < 599px) {
  .panel-1-text,
  .panel-2-text {
    font-size: 16px;
  }
  .panel-1-image,
  .panel-2-image {
    max-width: 125px;
  }
}
@container (width < 550px) {
  .meme-container {
    flex-direction: column;
  }
}
@media (width < 485px) {
  .panel-1-text,
  .panel-2-text {
    font-size: 20px;
  }
  .panel-1-image,
  .panel-2-image {
    max-width: 100px;
  }
}
@media (width < 265px) {
  .panel-1-text,
  .panel-2-text {
    font-size: 12px;
  }
  .panel-1-image,
  .panel-2-image {
    max-width: 50px;
  }
}
@media (width < 160px) {
  .panel-1-image,
  .panel-2-image {
    display: none;
  }
}
</style>
