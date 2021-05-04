<template>
  <div class="register">
    <SideBar />
    <div class="register-modal">
      <h1 class="register-modal__title">ユーザー登録</h1>
      <ValidationObserver class="register-modal__form" ref="email">
        <validation-provider v-slot="{ errors }" rules="email|required">
          <label for="email" class="register-modal__label"
            >メールアドレス</label
          >
          <input
            id="email"
            name="email"
            type="text"
            class="register-modal__input crm__input"
            v-model="email"
          />
          <span class="crm__error">{{ errors[0] }}</span>
        </validation-provider>
      </ValidationObserver>
      <ValidationObserver class="register-modal__form" ref="name">
        <validation-provider v-slot="{ errors }" rules="required">
          <label for="name" class="register-modal__label">名前</label>
          <input
            id="name"
            name="name"
            type="text"
            class="register-modal__input crm__input"
            v-model="name"
          />
          <span class="crm__error">{{ errors[0] }}</span>
        </validation-provider>
      </ValidationObserver>
      <div class="register-modal__form">
        <label for="position" class="register-modal__label">権限</label>
        <select
          id="position"
          name="position"
          class="register-modal__select register-modal__input crm__input"
          v-model="position"
        >
          <option value="admin">管理者</option>
          <option value="back-office">バックオフィス</option>
          <option value="coach">コーチ</option>
        </select>
      </div>
      <button @click="submit" class="register-modal__button crm-modal__button">
        認証メールを送信
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      name: "",
      position: ""
    };
  },
  methods: {
    submit() {
      //バリデーション
      if (!this.$refs.name.validate() || !this.$refs.email.validate()) return;
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
  width: 33rem;
}
.register-modal__label {
  text-align: left;
  font: normal normal normal 2rem/3rem Meiryo;
  letter-spacing: 0rem;
  font-size: 2rem;
  color: #707070;
  opacity: 1;
}

.register-modal__select {
  appearance: none;
  background-image: url("@/assets/images/select_arrow.svg");
  background-position: right 2.2rem center;
  background-repeat: no-repeat;
  background-size: 3.7rem 2.9rem;
}
</style>
