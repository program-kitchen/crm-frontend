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
          maxlength="32"
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
            v-for="option in options"
            v-bind:key="option.name"
            v-bind:value="option.id"
          >
            {{ option.name }}
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
          maxlength="256"
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
      options: [],
      loginUser: {}
    };
  },
  mounted() {
    this.loginUser = this.$auth.user;
    const options = [
      { id: 1, name: "コーチ" },
      { id: 2, name: "バックオフィス " },
      { id: 3, name: "管理者" }
    ];
    for (let i = 0; i < this.loginUser["role"] - 1; i++) {
      this.options.push(options[i]);
    }
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
          this.$router.push("/user");
        })
        .catch(error => {
          const code = parseInt(error.response && error.response.status);
          if (code == 400) {
            alert(error["errorMsg"]);
          } else if (code == 401) {
            alert("アクセストークンが失効しています。");
          } else if (code == 403) {
            alert("権限がありません。");
          } else if ([405, 500].includes(code)) {
            this.$router.push("/error");
          }
        });
    },
    back() {
      if (this.email == "" && this.name == "" && this.role == "") {
        this.$router.push("/user");
      } else if (
        window.confirm(
          "編集中の情報がすべて消えてしまいます。このページから移動してもよろしいですか？"
        )
      ) {
        this.$router.push("/user");
      }
    }
  }
};
</script>
<style scoped>

.register-modal__button {
  width: 33rem;
}
</style>
