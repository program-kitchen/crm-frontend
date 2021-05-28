<template>
  <div class="register">
    <SideBar />

    <ValidationObserver class="crm-modal" v-slot="{ invalid }">
      <h1 class="crm-modal__title">ユーザ登録</h1>
      <validation-provider
        class="register-modal__form"
        v-slot="{ errors }"
        rules="required"
      >
        <label for="name" class="crm-modal__label">名前</label>
        <input
          id="name"
          name="name"
          type="text"
          class="register-modal__input crm__input"
          v-model="name"
          v-bind:maxlength="maxLenName"
        />
        <div class="crm__error-area">
          {{ errors[0] }}
        </div>
      </validation-provider>
      <validation-provider
        class="register-modal__form"
        v-slot="{ errors }"
        rules="required"
      >
        <label for="role" class="crm-modal__label">権限</label>
        <select
          id="role"
          name="role"
          class="register-modal__select register-modal__input crm__input"
          v-model="role"
        >
          <option
            v-for="role in userRole"
            v-bind:key="role.name"
            v-bind:value="role.code"
            v-if="role.code < loginUser.role"
          >
            {{ role.name }}
          </option>
        </select>
        <div class="crm__error-area">
          {{ errors[0] }}
        </div>
      </validation-provider>
      <validation-provider
        class="register-modal__form"
        v-slot="{ errors }"
        rules="email|required"
      >
        <label for="email" class="crm-modal__label">メールアドレス</label>
        <input
          id="email"
          name="email"
          type="text"
          class="register-modal__input crm__input"
          v-model="email"
          v-bind:maxlength="maxLenEmail"
        />
        <div class="crm__error-area">
          {{ errors[0] }}
        </div>
      </validation-provider>
      <button
        @click="submit"
        :disabled="invalid"
        class="register-modal__button crm-modal__button"
      >
        認証メールを送信
      </button>
      <div class="crm-modal__return" @click="back">
        戻る
      </div>
    </ValidationObserver>
  </div>
</template>
<script>
export default {
  middleware: "userRedirect",
  data() {
    return {
      email: "",
      name: "",
      role: "",
      loginUser: {}
    };
  },
  mounted() {
    this.loginUser = this.$auth.user;
  },
  methods: {
    submit() {
      this.$axios
        .post(
          "https://api.coachtech-crm.com/api/user/register",
          {
            uuid: "",
            name: this.name,
            email: this.email,
            role: this.role
          },
          {
            headers: {
              Authorization: this.$auth.strategy.token.get()
            }
          }
        )
        .then(response => {
          window.alert(this.$MSG_REGISTER_USER);
          this.$router.push("/user");
        })
    },
    back() {
      if (this.email == "" && this.name == "" && this.role == "") {
        this.$router.push("/user");
      } else if (
        window.confirm(this.$MSG_MOVE_PAGE)
      ) {
        this.$router.push("/user");
      }
    }
  },
  computed: {
    // 定数取得用算出プロパティ定義
    maxLenName() {
      return this.$MAX_LEN_USER_NAME
    },
    maxLenEmail() {
      return this.$MAX_LEN_USER_EMAIL
    },
    userRole() {
      return this.$USER_ROLE
    },
  },
};
</script>
<style scoped>

.register-modal__button {
  width: 33rem;
}
</style>
