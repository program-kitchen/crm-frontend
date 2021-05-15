<template>
  <div class="user-edit-area">
    <SideBar />
    <div class="main">
      <div class="main-edit">
        <h1 class="main-edit__title">ユーザ編集</h1>
        <validation-observer ref="userForm" v-slot="{invalid}">
          <label for="name">
            名前
          </label>
          <validation-provider v-slot="{ errors }" name="名前" rules="required">
            <input id="name" type="text" class="main-edit__name crm__input" name="name" v-model="name">
            <span class="crm__error">{{ errors[0] }}</span>
          </validation-provider>
          <label for="role">
            権限
          </label>
          <select name="role" class="main-edit__role crm__input" v-model="role">
            <option v-for="list in selectRoleLists" :key="list.id" :value="list">
              {{list}}
            </option>
          </select>
          <label for="email">
            メールアドレス
          </label>
          <validation-provider v-slot="{ errors }" name="メールアドレス" rules="email|required">
            <input id="email" type="text" class="main-edit__mail crm__input" name="email" v-model="email">
            <span class="crm__error">{{ errors[0] }}</span>
          </validation-provider>
          <p class="main-edit__mail--reset">
            <span class="main-edit__mail--reset-send" @click="userPassReset">
              リセットメール送信
            </span>
          </p>
          <p class="main-edit__mail--reset-error">{{resetErrorMessage}}</p>
          <button
            class="main-edit__button-auth crm-modal__button"
            @click="userEdit" 
            :disabled="invalid"
          >
            編集
          </button>
          <div class="main-edit__button-return" @click="returnList">
            戻る
          </div>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id, // URLパラメータで渡ってきたid(ユーザのuuid)
      userRole: this.$auth.user.role, // 一旦管理者にする(this.$store.state.user.role)
      name: '',
      role: '',
      email: '',
      // usersData: [{name: 'なおき', role: 'コーチ', email: 'test@test.com'}], // ユーザ一覧から取得したデータ格納用とする
      usersData: [], // ユーザ一覧から取得したデータ格納用とする
      selectRoleLists: ['管理者','バックオフィス','コーチ'],
      btnClickFlag: true,
      resetErrorMessage: ''
    }
  },
  created() {
    // const canPathUser = ['オーナー', '管理者', 'バックオフィス'];
    const canPathUser = [4, 3, 2, 1];
    if (canPathUser.includes(this.userRole)) {
      this.btnClickFlag = false
      this.fetchUserData();
    } else {
      this.$router.push('/');
    }
  },
  mounted() {
    if(this.userRole === 3) {
      this.selectRoleLists = this.selectRoleLists.slice(1);
    } else if(this.userRole === 2 ) {
      this.selectRoleLists = this.selectRoleLists.slice(2);
    }
  },
  methods: {
    async fetchUserData() {
      await
        this.$axios // ※仮指定
          .get(`http://localhost:8000/api/user/${this.id}`)
          .then((res) => {
            console.log(res);
            this.usersData = res.data;
            this.name = res.data.name;
            this.role = res.data.role;
            this.email = res.data.email;
          })
          .catch(error => {
            console.log(error.response);
          })
    },
    async userPassReset() {
      this.btnClickFlag = true
      await
        axios
          .get('メール送信URL')
          .then(res => {
            window.confirm('リセットメールを送信しました');
          })
          .catch(() => {
            this.resetErrorMessage = 'メール送信に失敗しました。メールアドレスの入力を再度ご確認ください。'
          })
    },
    // 更新API
    async userEdit() {
      await
        this.$axios
          .post(`api.coachtech-crm.com/user/register`, {
            "uuid" : this.id,
            "name" : this.name,
            "email" : this.email,
            "role" : this.role,
            "loginUuId" : this.$store.state.userId
          })
          .then(() => {
            this.btnClickFlag = true;
            window.alert('ユーザ編集が完了しました');
            this.$router.push('/users');
          })
          .catch(() => this.$router.push('/error'));
    },
    returnList() {
      this.$router.push('/users');
    },
  },
  // ナビゲーションガード
  // 編集中のページ遷移で確認させる
  beforeRouteLeave (to, from, next) {
    const existData = this.usersData;
    const sameJudge = (
      this.name === existData.name &&
      this.role === existData.role && 
      this.email === existData.email
    );
    if(sameJudge || this.btnClickFlag) {
      next()
    } else {
      let answer = window.confirm("今まで入力していた情報がすべて消えてしまいます。このページから移動してもよろしいですか？");
      if (answer) {
        next()
      } else {
        next(false)
      }
    }
  },
}
</script>

<style scoped>
.user-edit-area {
  display: flex;
  align-items: center;
  height: 100vh;
  color: #707070;
  font-size: 1.6rem;
}

.main {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 16px 54px #89BDBD80;
  border-radius: 10px;
  opacity: 1;
  width: 60%;
  height: 85%;
  margin: 0 auto;
}

.main-edit {
  width: 60%;
  margin: 0 auto;
}

.main-edit__title {
  padding-bottom: 1.5rem;
  text-align: center;
  font-size: 3rem;
}

.main-edit label {
  display: block;
  margin: 0 auto;
  padding-top: 3rem;
  padding-bottom: 1rem;
  font-size: 1.9rem;
}

.main-edit__name,
.main-edit__mail,
.main-edit__role {
  box-sizing:border-box;
  width: 100%;
  color: #707070;
}

.main-edit__role {
  display: block;
  appearance: none;
  background-image: url("@/assets/images/select_arrow.svg");
  background-position: right 2.2rem center;
  background-repeat: no-repeat;
  background-size: 3.7rem 2.9rem;
}

.main-edit__mail--reset {
  text-align: right;
  padding: 5px 0;  
}

.main-edit__mail--reset-send {
  transition: 0.5s;
  color: #567DFF;
}

.main-edit__mail--reset-send:hover {
  cursor: pointer;
  color: #042fbb;
  transition: 0.5s;
}

.main-edit__mail--reset-error {
  text-align: center;
  color: #f5172a;
  font-size: 1.3rem;
}

.main-edit__button-auth {
  display: block;
  margin: 0.5rem auto;

}

.main-edit__button-return {
  text-align: center;
  margin: 0 auto;
  color: #567DFF;
  padding: 0.7rem 0;
  width: 20%;
}
.main-edit__button-return:hover {
  cursor: pointer;
}
</style>
