<template>
  <div class="login">
    <div class="login-modal">
      <h2 class="login-modal__title">ログイン</h2>
      <div class="login-modal__form">
        <p class="login-modal__label">メールアドレス</p>
        <input v-model="email" type="text" class="login-modal__input" />
      </div>
      <div class="login-modal__form">
        <p class="login-modal__label">パスワード</p>
        <input v-model="password" type="text" class="login-modal__input" />
      </div>
      <button @click="submit" class="login-modal__button">ログイン</button>
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
  width: 940px;
  height: 671px;
  margin: 205px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 16px 54px #89bdbd80;
  border-radius: 10px;
}

.login-modal__title {
  margin-top: 110px;
  margin-bottom: 86px;
  font: italic normal bold 32px/48px Meiryo;
  font-style: bold;
  letter-spacing: 0px;
  font-size: 32px;
  color: #707070;
  opacity: 1;
}

.login-modal__form {
  width: 609px;
  margin-bottom: 28px;
}

.login-modal__label {
  text-align: left;
  font: normal normal normal 20px/30px Meiryo;
  letter-spacing: 0px;
  font-size: 20px;
  color: #707070;
  opacity: 1;
}

.login-modal__input {
  width: 100%;
  height: 65px;
  border: 4px solid #f2f2f2;
  border-radius: 12px;
  opacity: 1;
}

.login-modal__button {
  width: 247px;
  height: 72px;
  margin-top: 60px;
  background: transparent linear-gradient(270deg, #41de9d 0%, #2bb8f8 100%);
  border: none;
  border-radius: 36px;
  opacity: 1;
  font: normal normal normal 28px/42px Meiryo;
  text-align: center;
  color: #ffffff;
  font-weight: bold;
}

.login-modal__button:hover {
  cursor: pointer;
  transition: 0.5s;
  background: transparent linear-gradient(270deg, #2bb8f8 0%, #41de9d 100%);
}
</style>
