<template>
  <div class="contents-head">
    <h2 class="contents-head__text">{{urlText.title}}</h2>
    <button class="contents-head__button" @click="$router.push(`/${urlText.url}/register`)">新規登録</button>
  </div>
</template>

<script>
export default {
  props: {
    urlText: {
      type: Object
    }
  }
}
</script>

<style scoped>
.contents-head {
  display: flex;
  align-items: center;
}

.contents-head {
  padding: 2rem 0;
}
.contents-head__text {
  padding-right: 2.5rem;
  color: #707070;
  font-weight: bold;
  font-size: 3.5rem;
}

.contents-head__button {
  background: #04C6C6;
  border: none;
  width: 17rem;
  height: 5rem;
  border-radius: 27px;
  opacity: 1;
  font-size: 2.5rem;
  text-align: center;
  color: #FFFFFF;
  font-weight: bold;
}
.contents-head__button:hover {
  cursor: pointer;
  transition:  0.3s 0s ease-in;
  background: #40dada;
}
</style>