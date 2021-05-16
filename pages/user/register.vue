<template>
  <div class="register">
    <SideBar />

    <ValidationObserver class="crm-modal" v-slot="{ invalid }">
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
        <label for="role" class="register-modal__label">権限</label>
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
        <span class="crm__error">{{ errors[0] }}</span>
      </validation-provider>
      <button
        @click="submit"
        :disabled="invalid"
        class="register-modal__button crm-modal__button"
      >
        認証メールを送信
      </button>
      <p class="register-modal__return">
        <span class="register-modal__return-inner" @click="back">
          戻る
        </span>
      </p>
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
      console.log(i);
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
          console.log(response);
          this.$router.push("/user");
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    back() {
      if (this.email == "" && this.name == "" && this.role == "") {
        this.$router.push("/user");
      } else if (
        window.confirm(
          "今まで入力していた情報がすべて消えてしまいます。このページから移動してもよろしいですか？"
        )
      ) {
        this.$router.push("/user");
      }
    }
  }
};
</script>
<style scoped>
.register-modal__return {
  text-align: center;
  font-size: 2rem;
  padding: 5px 0;
}

.register-modal__return-inner {
  transition: 0.5s;
  color: #567dff;
}

.register-modal__return-inner:hover {
  cursor: pointer;
  color: #042fbb;
  transition: 0.5s;
}

.register-modal__return-error {
  text-align: center;
  color: #f5172a;
}

.register-modal__button {
  width: 33rem;
}
</style>
