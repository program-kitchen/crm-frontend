<template>
  <div class="testForm">
      <display-area :text="text" />
      <form-text-area :title="title" :value="textValue" :placeholder="placeholder" @change="onChange" />
  </div>
</template>

<script>
import displayArea from  "@/components/molecules/displayArea";
import formTextArea from  "@/components/molecules/formTextArea";
export default {
    components: {
        displayArea,
        formTextArea
    },
    data() {
        return {
            textValue: ''
        }
    },
    props: {
        text: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            required: true
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
.testForm {
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
