<template>
  <Cource :sendTitle="title"/>
</template>

<script>
export default {
  middleware: 'redirect',
  data() {
    return {
      title: "編集"
    }
  },
}
</script>