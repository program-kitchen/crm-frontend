<template>
  <div class="term-area">
    <SideBar />
    <div class="term-main">
      <div class="main-term">
        <h1 class="main-term__title">ターム登録</h1>
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
              maxlength="32"
            >
            <span class="crm__error">{{ errors[0] }}</span>
          </validation-provider>
          <label for="period">
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
            maxlength="256"
          >
          <button
            class="crm-modal__submit-button crm-modal__button"
            @click="termRegist"
            :disabled="invalid"
          >
            登録
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
      window.alert('タームを登録しました。');
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
