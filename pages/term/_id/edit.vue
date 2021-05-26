<template>
  <div class="term-area">
    <SideBar />
    <div class="term-main">
      <div class="main-term">
        <h1 class="crm-modal__title">ターム編集</h1>
        <validation-observer ref="courceForm" v-slot="{invalid}">
          <label for="name" class="crm-modal__label">
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
          <label for="term" class="crm-modal__label">
            ターム名
          </label>
          <validation-provider v-slot="{ errors }" name="ターム名" rules="required">
            <input
              id="term"
              type="text"
              class="main-term__textbox crm__input"
              name="term"
              v-model="term"
              maxlength="32"
            >
            <div class="crm__error-area">
              {{ errors[0] }}
            </div>
          </validation-provider>
          <label for="period" class="crm-modal__label">
            ターム期間(週単位)
          </label>
          <validation-provider v-slot="{ errors }" name="ターム期間" rules="required|min_value:1|max_value:26">
            <input
              id="period"
              type="number"
              class="main-term__textbox crm__input"
              name="period"
              v-model="period"
            >
            <div class="crm__error-area">
              {{ errors[0] }}
            </div>
          </validation-provider>
          <label for="description" class="crm-modal__label">
            概要
          </label>
          <input
            id="description"
            type="text"
            class="main-term__textbox crm__input"
            name="description"
            v-model="description"
            maxlength="256"
          >
          <button
            class="crm-modal__submit-button crm-modal__button"
            @click="termEdit"
            :disabled="invalid"
          >
            編集
          </button>
          <div class="crm-modal__return" @click="returnCource">
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
      window.alert(this.$MSG_EDIT_TERM);
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
      let answer = window.confirm(this.$MSG_MOVE_PAGE);
      if (answer) {
        next()
      } else {
        next(false)
      }
    }
  },
}
</script>
