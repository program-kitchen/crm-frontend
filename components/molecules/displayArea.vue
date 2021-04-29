<template>
  <div class="displayArea">
      <display-text :text="text" />
  </div>
</template>

<script>
import displayText from  "@/components/atoms/displayText";
export default {
    components: {
        displayText
    },
    props: {
        text: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss">
.displayArea {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
