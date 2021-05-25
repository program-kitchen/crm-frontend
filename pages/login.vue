<template>
  <div class="login">
    <ValidationObserver class="login-modal" v-slot="{ invalid }">
      <h1 class="crm-modal__title login-modal__title">ログイン</h1>
      <validation-provider
        class="login-modal__form"
        v-slot="{ errors }"
        rules="required"
      >
        <label for="email" class="crm-modal__label">メールアドレス</label>
        <input
          id="email"
          type="text"
          class="login-modal__input crm__input"
          v-model="email"
          maxlength="256"
        />
        <div class="crm__error-area">
          {{ errors[0] }}
        </div>
      </validation-provider>
      <validation-provider
        class="login-modal__form"
        v-slot="{ errors }"
        rules="required"
      >
        <label for="password" class="crm-modal__label">パスワード</label>
        <input
          id="password"
          type="password"
          class="login-modal__input crm__input"
          v-model="password"
          maxlength="32"
        />
        <div class="crm__error-area">
          {{ errors[0] }}
        </div>
      </validation-provider>
      <button
        @click="submit"
        :disabled="invalid"
        class="login-modal__button crm-modal__button"
      >
        ログイン
      </button>
      <div class="crm__error-area">
        {{ errorMessage }}
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  auth: false,
  middleware: "loginRedirect",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: ""
    };
  },
  methods: {
    async submit() {
      this.$nuxt.$loading.start();
      await this.$auth
        .loginWith("laravelJWT", {
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then(
          response => {
            console.log(response);
            this.$nuxt.$loading.finish();
            this.$router.push("/");
            location.reload();
          },
          error => {
            const code = parseInt(error.response && error.response.status);
            console.log(code);
            alert("ユーザID、パスワードが一致しません。");
            this.errorMessage = "ユーザID、パスワードが一致しません。";
          }
        );
    }
  }
};
</script>

<style>
.login {
  height: 100%;
  width: 100%;
}

.login-modal {
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  width: 94rem;
  height: 67rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 1.6rem 5.4rem #89bdbd80;
  border-radius: 10px;
}

.login-modal__form {
  width: 61rem;
  margin-bottom: 2.8rem;
}

.login-modal__title {
  padding: 4rem !important;
}

.login-modal__input {
  width: 100%;
}

.login-modal__button {
  width: 24.5rem;
  margin-top: 6rem;
}
</style>
