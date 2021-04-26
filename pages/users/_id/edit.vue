<template>
  <div>
    <p>ユーザID:{{id}}編集画面</p>

  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
    }
  },
}
</script>

<style scoped>

</style>