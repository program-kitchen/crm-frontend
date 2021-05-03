<template>
  <div class="login">
    <div class="login-modal">
      <h2 class="login-modal__title">ログイン</h2>
      <div class="login-modal__form">
        <p class="login-modal__label">メールアドレス</p>
        <input
          v-model="email"
          type="text"
          class="login-modal__input crm__input"
        />
      </div>
      <div class="login-modal__form">
        <p class="login-modal__label">パスワード</p>
        <input
          v-model="password"
          type="password"
          class="login-modal__input crm__input"
        />
      </div>
      <button @click="submit" class="login-modal__button crm-modal__button">
        ログイン
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    submit() {
      // ログインAPI処理を実行
    }
  }
};
</script>

<style>
.login {
  height: 100vh;
}

.login-modal {
  width: 94rem;
  height: 67rem;
  margin: 20.5rem auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 1.6rem 5.4rem #89bdbd80;
  border-radius: 10px;
}

.login-modal__title {
  margin-top: 11rem;
  margin-bottom: 8.6rem;
  font: normal bold 3.2rem/4.8rem Meiryo;
  font-style: bold;
  letter-spacing: 0rem;
  font-size: 3.2rem;
  color: #707070;
  opacity: 1;
}

.login-modal__form {
  width: 61rem;
  margin-bottom: 2.8rem;
}

.login-modal__label {
  text-align: left;
  font: normal normal normal 2rem/3rem Meiryo;
  letter-spacing: 0px;
  font-size: 2rem;
  color: #707070;
  opacity: 1;
}

.login-modal__input {
  width: 100%;
}

.login-modal__button {
  width: 24.5rem;
  margin-top: 6rem;
}

.login-modal__button:hover {
  cursor: pointer;
  transition: 0.5s;
  background: transparent linear-gradient(270deg, #2bb8f8 0%, #41de9d 100%);
}
</style>
