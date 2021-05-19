<template>
  <div class="term-area">
    <SideBar />
    <div class="term-main">
      <div class="main-term">
        <h1 class="main-term__title">ターム編集</h1>
        <validation-observer ref="courceForm" v-slot="{invalid}">
          <label for="name">
            コース名
          </label>
          <input
            id="name"
            type="text"
            class="main-term__textbox crm__input"
            name="name"
            v-model="name"
            disabled="disabled"
          >
          <label for="term">
            ターム名
          </label>
          <validation-provider v-slot="{ errors }" name="ターム名" rules="required">
            <input
              id="term"
              type="text"
              class="main-term__textbox crm__input"
              name="term"
              v-model="term"
            >
            <span class="crm__error">{{ errors[0] }}</span>
          </validation-provider>
          <label for="period">
            ターム(週単位)
          </label>
          <validation-provider v-slot="{ errors }" name="ターム期間" rules="required|min_value:1|max_value:26">
            <input
              id="period"
              type="number"
              class="main-term__textbox crm__input"
              name="period"
              v-model="period"
            >
            <span class="crm__error">{{ errors[0] }}</span>
          </validation-provider>
          <label for="description">
            概要
          </label>
          <input
            id="description"
            type="text"
            class="main-term__textbox crm__input"
            name="description"
            v-model="description"
          >
          <button
            class="main-term__button-auth crm-modal__button"
            @click="termEdit"
            :disabled="invalid"
          >
            編集
          </button>
          <div class="main-term__button-return" @click="returnCource">
            戻る
          </div>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'courceRedirect',
  data() {
    return {
      id: this.$route.params.id,
      name: this.$store.state.cource.name,
      term: '',
      period: '',
      description: '',
      termData: [], // Vuexから取得したデータ格納用とする
      btnClickFlag: false
    }
  },
  mounted() {
    const term = this.$store.state.term[this.id];
    this.termData = term
    this.term = term.name;
    this.period = term.term;
    this.description = term.summary;
  },
  methods: {
    termEdit() {
      this.btnClickFlag = true;
      this.$store.commit("editTermInfo", {
        id: this.id,
        term: this.term,
        period: this.period,
        description: this.description
      });
      window.alert('タームを編集しました。');
      this.$router.go(-1);

    },
    returnCource() {
      this.$router.go(-1);
    }
  },
  // ナビゲーションガード
  // 編集中のページ遷移で確認させる
  beforeRouteLeave (to, from, next) {
    const existData = this.termData;
    const sameJudge = (
      this.term === existData.name &&
      this.period === existData.term && 
      this.description === existData.summary
    );
    if(this.btnClickFlag || sameJudge) {
      next()
    } else {
      let answer = window.confirm("編集中の情報がすべて消えてしまいます。このページから移動してもよろしいですか？");
      if (answer) {
        next()
      } else {
        next(false)
      }
    }
  },
}
</script>
