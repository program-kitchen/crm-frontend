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
      loginUser: {}
    };
  },
  created() {
    this.fetchUserData();
  },
  mounted() {
    this.loginUser = this.$auth.user;
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
          alert(this.$MSG_EDIT_USER);
          this.$router.push("/user");
        })
        .catch(() => this.$router.push('/error'))
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
        .catch(() => this.$router.push('/error'))
    },
    confirmSendReset() {
      if(window.confirm(this.$MSG_CONF_PASS_RESET)) {
        this.sendResetMail();
      }
    },
    async sendResetMail() {
      this.$nuxt.$loading.start();
      await
        this.$axios
          .post('https://api.coachtech-crm.com/api/user/reset-pass', {"uuid" : this.uuid})
          .then(() => {
            window.alert(this.$MSG_PASS_RESET)
            this.fetchUserData(); //再度ユーザデータ取得
            this.$nuxt.$loading.finish();
          })
          .catch(() => this.$router.push('/error'))
    },
    back() {
      if (this.checkChange()) {
        this.$router.push("/user");
      } else if (
        window.confirm(this.$MSG_MOVE_PAGE)
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
