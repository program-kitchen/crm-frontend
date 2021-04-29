<template>
  <div class="inputText">
      <input type="text" :value="textValue" :placeholder="placeholder" @change="onChange" />
  </div>
</template>

<script>
export default {
    data() {
        return {
            textValue: ''
        }
    },
    props: {
        placeholder: {
            type: String,
            default: '',
        },
        value: {
            type: String,
            default: '',
        }
    },
    mounted() {
        this.textValue = this.value;
    },
    methods: {
        onChange: function (event) {
            this.$emit('change', event.target.value)
        }
    }
}
</script>

<style lang="scss">
.inputText {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
