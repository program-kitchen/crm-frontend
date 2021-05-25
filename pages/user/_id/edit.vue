<template>
  <div class="register">
    <SideBar />

    <ValidationObserver class="crm-modal" v-slot="{ invalid }">
      <h1 class="crm-modal__title">ユーザ編集</h1>

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
        <p class="main-edit__mail--reset">
          <span class="main-edit__mail--reset-send" @click="confirmSendReset()">
            リセットメール送信
          </span>
        </p>
        <div class="crm__error-area">
          {{ errors[0] }}
        </div>
      </validation-provider>

      <button
        @click="submit"
        :disabled="invalid"
        class="crm-modal__submit-button crm-modal__button"
      >
        編集
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
      initialEmail: "",
      initialName: "",
      initialRole: "",
      email: "",
      name: "",
      role: "",
      uuid: "",
      options: [],
      loginUser: {}
    };
  },
  created() {
    this.fetchUserData();
  },
  mounted() {
    //プルダウンリストの準備
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
        .post("https://api.coachtech-crm.com/api/user/register", {
          uuid: this.uuid,
          name: this.name,
          email: this.email,
          role: this.role
        })
        .then(response => {
          console.log(response);
          alert("ユーザを編集しました。");
          this.$router.push("/user");
        })
        .catch(error => {
          const code = parseInt(error.response && error.response.status);
          if (code == 400) {
            alert(error["errorMsg"]);
          } else if (code == 401) {
            alert("ログインセッションが切れました。");
            this.$router.push("/login");
          } else if (code == 403) {
            this.$router.push("/");
          } else if (code == 422) {
            alert("予期せぬエラーが発生しました。");
            this.$router.push("/");
          } else if ([405, 500].includes(code)) {
            this.$router.push("/error");
          }
        });
    },
    async fetchUserData() {
      await this.$axios
        .get(`https://api.coachtech-crm.com/api/user/${this.$route.params.id}`)
        .then(response => {
          console.log(response);
          const user = response["data"];
          this.initialEmail = user["email"];
          this.initialName = user["name"];
          this.initialRole = user["role"];
          this.email = user["email"];
          this.name = user["name"];
          this.role = user["role"];
          this.uuid = user["uuid"];
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
    confirmSendReset() {
      if(window.confirm('パスワードリセットメールを送信します。よろしいですか？')) {
        this.sendResetMail();
      }
    },
    async sendResetMail() {
      this.$nuxt.$loading.start();
      await
        this.$axios
          .post('https://api.coachtech-crm.com/api/user/reset-pass', {"uuid" : this.uuid})
          .then(() => {
            window.alert('パスワードリセットメールを送信しました。')
            this.fetchUserData(); //再度ユーザデータ取得
            this.$nuxt.$loading.finish();
          })
          .catch(() => {
            const code = parseInt(error.response && error.response.status);
            if(code === 401 ){
              this.authMessage = "アクセストークンが失効しております。"
            }
          })
    },
    back() {
      if (this.checkChange()) {
        this.$router.push("/user");
      } else if (
        window.confirm(
          "編集中の情報がすべて消えてしまいます。このページから移動してもよろしいですか？"
        )
      ) {
        this.$router.push("/user");
      }
    },
    checkChange() {
      return (
        this.initialEmail == this.email &&
        this.initialName == this.name &&
        this.initialRole == this.role
      );
    }
  }
};
</script>
<style scoped>

.main-edit__mail--reset {
  text-align: right;
  padding: 5px 0;
}

.main-edit__mail--reset-send {
  transition: 0.5s;
  color: #567dff;
  font-size: 2rem;
}

.main-edit__mail--reset-send:hover {
  cursor: pointer;
  color: #042fbb;
  transition: 0.5s;
}
</style>
