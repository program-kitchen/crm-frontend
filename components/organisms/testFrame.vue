<template>
  <div class="testFrame">
      <test-form
        :text="text"
        title="テストタイトル"
        :value="textValue"
        placeholder="プレースホルダー"
        @change="onChange"
      />
      <button class="submitButton" @click="submit">
          postテスト
      </button>
  </div>
</template>

<script>
import testForm from  "@/components/organisms/testForm";
export default {
    components: {
        testForm
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
            this.$emit('change', value);
        },
        submit:  function () {
            this.$emit('click');
        },
    }
}
</script>

<style lang="scss">
.testFrame {
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.submitButton {
    margin-top: 10px;
}
</style>
