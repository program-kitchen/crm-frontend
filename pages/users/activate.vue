<template>
  <div class="register">
    <SideBar />
    <ValidationObserver class="crm-modal" v-slot="{ invalid }">
      <h1 class="register-modal__title">ユーザー情報有効</h1>
      <validation-provider
        class="register-modal__form"
        v-slot="{ errors }"
        rules="required"
      >
        <label for="name" class="register-modal__label">名前 </label>
        <input
          id="name"
          name="name"
          type="text"
          class="register-modal__input crm__input"
          value="axiosで表示時に値を取得"
          disabled
        />
        <span class="crm__error">{{ errors[0] }}</span>
      </validation-provider>
      <div class="register-modal__form">
        <label for="position" class="register-modal__label">権限</label>
        <input
          id="position"
          name="position"
          type="text"
          class="register-modal__input crm__input"
          value="axiosで表示時に値を取得"
          disabled
        />
      </div>
      <validation-provider
        class="register-modal__form"
        v-slot="{ errors }"
        rules="required|password|password_range"
      >
        <label for="password" class="register-modal__label">パスワード</label>
        <input
          id="password"
          name="password"
          type="password"
          class="register-modal__input crm__input"
          v-model="password"
        />
        <span class="crm__error">{{ errors[0] }}</span>
      </validation-provider>

      <button
        @click="submit"
        :disabled="invalid"
        class="register-modal__button crm-modal__button"
      >
        登録
      </button>
    </ValidationObserver>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      position: "",
      password: ""
    };
  },
  // TODO 画面読み込み時に権限を表示時に取得する

  methods: {
    submit() {
      this.$axios
        .post(
          "localhost:8000/api/user/register",
          {
            uuid: "",
            password: ""
          },
          {
            headers: {
              Authorization: this.$auth.strategy.token.get()
            }
          }
        )
        .then(response => {
          console.log(response);
        });
    }
  }
};
</script>
<style scoped>
.register-modal__button {
  width: 20rem;
}
</style>
