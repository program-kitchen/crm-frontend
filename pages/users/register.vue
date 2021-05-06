<template>
  <div class="register">
    <SideBar />

    <ValidationObserver class="register-modal" v-slot="{ invalid }">
      <h1 class="register-modal__title">ユーザー登録</h1>
      <validation-provider
        class="register-modal__form"
        v-slot="{ errors }"
        rules="email|required"
      >
        <label for="email" class="register-modal__label">メールアドレス</label>
        <input
          id="email"
          name="email"
          type="text"
          class="register-modal__input crm__input"
          v-model="email"
        />
        <span class="crm__error">{{ errors[0] }}</span>
      </validation-provider>
      <validation-provider
        class="register-modal__form"
        v-slot="{ errors }"
        rules="required"
      >
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
      <validation-provider
        class="register-modal__form"
        v-slot="{ errors }"
        rules="required"
      >
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
        <span class="crm__error">{{ errors[0] }}</span>
      </validation-provider>
      <button
        @click="submit"
        :disabled="invalid"
        class="register-modal__button crm-modal__button"
      >
        認証メールを送信
      </button>
    </ValidationObserver>
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
      // TODO 認証処理を実行
    }
  }
};
</script>
<style scoped>
.register-modal__button {
  width: 33rem;
}
</style>
