<template>
  <div class="container">
    <div>
      <h1 class="title">
        テスト
      </h1>
      <div class="list">
          <test-frame
            :text="uuid"
            value="textValue"
            @change="onChange"
            @click="syncData"
          />
      </div>
    </div>
  </div>
</template>

<script>
import testFrame from "@/components/organisms/testFrame";

export default {
    components: {
        testFrame,
    },
    data() {
        return {
            textValue: '',
            // token: '',
            uuid: 'test'
        }
    },
    mounted() {
        this.textValue = '';
        this.getUuid();
    },
    methods: {
        async getUuid () {

            const res = await this.$axios.$get('http://localhost:8000/api/token');
            this.uuid = res;
            // this.token = res.token;
            // document.cookie = `X-CSRF-TOKEN=${res.token}`
        },
        async syncData () {
            const res = await this.$axios.$post('http://localhost:8000/api/login', {
                // _token: this.token,
                test_value: this.testValue
            })
            .then(function(response){
                console.log(response);
            })
        },
        onChange: function (value) {
            this.textValue = value;
        },
    }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
