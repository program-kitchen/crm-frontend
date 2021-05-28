<template>
  <div class="register">
    <SideBar />
    <ValidationObserver class="crm-modal" v-slot="{ invalid }">
      <h1 class="crm-modal__title">ユーザ情報有効</h1>
      <validation-provider
        class="register-modal__form"
        v-slot="{ errors }"
        rules="required"
      >
        <label class="crm-modal__label">名前 </label>
        <input
          type="text"
          class="register-modal__input crm__input"
          v-bind:value="name"
          disabled
        />
        <div class="crm__error-area">
          {{ errors[0] }}
        </div>
      </validation-provider>
      <div class="register-modal__form">
        <label class="crm-modal__label">権限</label>
        <input
          type="text"
          class="register-modal__input crm__input"
          v-bind:value="displayRole"
          disabled
        />
      </div>
      <validation-provider
        class="register-modal__form"
        v-slot="{ errors }"
        rules="required|password|password_range"
      >
        <label for="password" class="crm-modal__label">パスワード</label>
        <input
          id="password"
          name="password"
          type="password"
          class="register-modal__input crm__input"
          v-model="password"
          v-bind:maxlength="maxLenPass"
        />
        <div class="crm__error-area">
          {{ errors[0] }}
        </div>
      </validation-provider>

      <button
        @click="submit"
        :disabled="invalid"
        class="crm-modal__submit-button crm-modal__button"
      >
        登録
      </button>
    </ValidationObserver>
  </div>
</template>
<script>
export default {
  auth: false,
  data() {
    return {
      name: "",
      role: "",
      password: ""
    };
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    submit() {
      this.$axios
        .post(
          "https://api.coachtech-crm.com/api/user/activate",
          {
            uuid: this.uuid,
            password: this.password
          },
          {
            headers: {
              Authorization: this.$auth.strategy.token.get()
            }
          }
        )
        .then(response => {
          console.log(response);
          alert(this.$MSG_ACTIVATE_USER);
          this.$router.push("/login");
        })
    },
    async fetchUserData() {
      await this.$axios
        .post(
          "https://api.coachtech-crm.com/api/user/validate-token",
          {
            token: this.$route.query.token
          },
          {
            headers: {
              Authorization: this.$auth.strategy.token.get()
            }
          }
        )
        .then(response => {
          console.log(response["data"]);
          const data = response["data"];
          this.name = data["name"];
          this.role = data["role"];
          this.uuid = data["uuid"];
        })
    },
  },
  computed: {
    displayRole() {
      return this.$getRoleName(this.role)
    },
    // 定数取得用算出プロパティ定義
    maxLenPass() {
      return this.$MAX_LEN_USER_PASS
    },
  }
};
</script>
<style scoped>
.register-modal__button {
  width: 20rem;
}
</style>
