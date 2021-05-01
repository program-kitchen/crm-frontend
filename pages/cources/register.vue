<template>
  <Cource :sendTitle="title"/>
</template>

<script>
export default {
  middleware: 'redirect',
  data() {
    return {
      title: "登録"
    }
  },
}
</script>