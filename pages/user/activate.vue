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
        <label class="register-modal__label">名前 </label>
        <input
          type="text"
          class="register-modal__input crm__input"
          v-bind:value="name"
          disabled
        />
        <span class="crm__error">{{ errors[0] }}</span>
      </validation-provider>
      <div class="register-modal__form">
        <label class="register-modal__label">権限</label>
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
      role: "",
      password: ""
    };
  },
  // TODO 画面読み込み時に権限を表示時に取得する
  mounted() {
    console.log(this.$route.query.token);

    this.$axios
      .post(
        "http://localhost:8000/api/user/validate-token",
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
      .catch(({ response }) => {
        console.log(response["data"]);
      });
  },
  methods: {
    submit() {
      this.$axios
        .post(
          "http://localhost:8000/api/user/activate",
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
          alert("登録が完了しました");
          this.$router.push("/login");
        });
    }
  },
  computed: {
    displayRole() {
      switch (this.role) {
        case 1:
          return "コーチ";
          break;
        case 2:
          return "バックオフィス";
          break;
        case 3:
          return "管理者";
          break;
        case 4:
          return "オーナー";
          break;
        default:
          return "";
      }
    }
  }
};
</script>
<style scoped>
.register-modal__button {
  width: 20rem;
}
</style>
