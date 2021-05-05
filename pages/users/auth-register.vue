<template>
  <div class="register">
    <SideBar />
    <ValidationObserver class="register-modal" v-slot="{ invalid }">
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
          v-model="name"
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
      // TODO 認証処理を実行
    }
  }
};
</script>
<style scoped>
.register {
  display: flex;
  align-items: center;
  height: 100vh;
}

.register-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #555454;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0rem 1.6rem 5.4rem #89bdbd80;
  border-radius: 1rem;
  opacity: 1;
  width: 60%;
  height: 85%;
  margin: 0 auto;
}
.register-modal__title {
  margin-bottom: 8.6rem;
  font: normal bold 3.2rem/4.8rem Meiryo;
  letter-spacing: 0rem;
  font-size: 3.2rem;
  color: #707070;
  opacity: 1;
}
.register-modal__form {
  width: 60%;
  margin-bottom: 2.8rem;
}
.register-modal__input {
  width: 100%;
}
.register-modal__button {
  width: 20rem;
}
.register-modal__label {
  text-align: left;
  font: normal normal normal 2rem/3rem Meiryo;
  letter-spacing: 0rem;
  font-size: 2rem;
  color: #707070;
  opacity: 1;
}
</style>
