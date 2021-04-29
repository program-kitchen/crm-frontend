<template>
  <div class="formTextArea">
      <p>{{ title }}</p>
      <input-text :value="textValue" :placeholder="placeholder" @change="onChange" />
  </div>
</template>

<script>
import inputText from  "@/components/atoms/inputText";
export default {
    components: {
        inputText
    },
    data() {
        return {
            textValue: ''
        }
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        }
    },
    mounted() {
        this.textValue = this.value;
    },
    methods: {
        onChange: function (value) {
            this.$emit('change', value)
        }
    }
}
</script>

<style lang="scss">
.formTextArea {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
