<template>
  <div class="term-area">
    <SideBar />
    <div class="term-main">
      <div class="main-term">
        <h1 class="crm-modal__title">ターム登録</h1>
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
              v-bind:maxlength="maxLenName"
            >
            <div class="crm__error-area">
              {{ errors[0] }}
            </div>
          </validation-provider>
          <label for="period" class="crm-modal__label">
            ターム期間(週単位)
          </label>
          <validation-provider v-slot="{ errors }" name="ターム期間" rules="required">
            <input
              id="period"
              type="number"
              class="main-term__textbox crm__input"
              name="period"
              v-model="period"
              :min="minPeriod"
              :max="maxPeriod"
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
            v-bind:maxlength="maxLenSummary"
          >
          <button
            class="crm-modal__submit-button crm-modal__button"
            @click="termRegist"
            :disabled="invalid"
          >
            登録
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
      name: this.$store.state.cource.name,
      term: '',
      period: '',
      description: '',
      btnClickFlag: false
    }
  },
  methods: {
    termRegist() {
      this.btnClickFlag = true;
      this.$store.commit("addTerm", {
        term: this.term,
        period: this.period,
        description: this.description
      });
      window.alert(this.$MSG_REGISTER_TERM);
      this.$router.go(-1);

    },
    returnCource() {
      this.$router.go(-1);
    }
  },
  // ナビゲーションガード
  // 編集中のページ遷移で確認させる
  beforeRouteLeave (to, from, next) {
    const inputCheck = (
      !this.term && !this.period && !this.description
    );
    if(this.btnClickFlag || inputCheck) {
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
  computed: {
    // 定数取得用算出プロパティ定義
    maxLenName() {
      return this.$MAX_LEN_TERM_NAME
    },
    maxLenSummary() {
      return this.$MAX_LEN_TERM_SUMMARY
    },
    minPeriod() {
      return this.$MIN_TERM_PERIOD
    },
    maxPeriod() {
      return this.$MAX_TERM_PERIOD
    },
  },
}
</script>
