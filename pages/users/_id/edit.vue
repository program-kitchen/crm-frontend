<template>
  <div class="user-edit-area">
    <SideBar />
    <div class="main">
      <div class="main-edit">
        <h1 class="main-edit__title">ユーザ編集</h1>
        <label for="name">
          名前
        </label>
        <!-- <input id="name" type="text" class="main-edit__name" name="name" @change="change" value="tesuto" v-model="name"> -->
        <input id="name" type="text" class="main-edit__name" name="name" v-model="name">
        <label for="role">
          権限
        </label>
        <select name="role" class="main-edit__role" v-model="role">
          <option v-for="list in selectRoleLists" :key="list.id" :value="list">
            {{list}}
          </option>
        </select>
        <label for="email">
          メールアドレス
        </label>
        <input id="email" type="text" class="main-edit__mail" name="email" v-model="email">
        <p class="main-edit__mail--reset" @click="userPassReset">リセットメール送信</p>
        <button class="main-edit__button-auth" @click="userEdit">登録</button>
        <div class="main-edit__button-return" @click="returnList">
          戻る
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id, // URLパラメータで渡ってきたid(ユーザのid)
      userRole: '管理者', // 一旦管理者にする(this.$store.state.user.role)
      name: '田中太郎',
      role: 'バックオフィス',
      email: 'test1@test.com',
      usersData: [{name: 'なおき', role: 'コーチ', email: 'test@test.com'}], // ユーザ一覧から取得したデータ格納用とする
      selectRoleLists: ['管理者','バックオフィス','コーチ'],
      btnClickFlag: false
    }
  },
  mounted() {
    if(this.userRole == '管理者') {
      this.selectRoleLists = this.selectRoleLists.slice(1);
    } else if(this.userRole == 'バックオフィス') {
      this.selectRoleLists = this.selectRoleLists.slice(2);
    }
  },
  // 取得APIのため、コメントアウト
  async created() {
    await
      this.$axios // ※仮指定
        .get(`api.coachtech-crm.com/user/index/${this.id}`)
        .then((res) => {
          this.usersData = res.data;
          // this.name = res.name;
          // this.role = res.role;
          // this.email = res.email;
        })
        .catch(error => {
          console.log(error.response);
        })
  },
  methods: {
    async userPassReset() {
      this.btnClickFlag = true
      const fetchResetMail = axios.get('メール送信URL');

      await fetchResetMail

      window.confirm('リセットメールを送信しました');
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
            this.btnClickFlag = true
            console.log(this.btnClickFlag)
          })
          .catch(err => console.log(err));
      this.$router.push('/users');
    },
    returnList() {
      this.$router.push('/users');
    },
    // ログインする権限に応じてボタン表示を変更
    canEdit(userRole) {
      return true
    },
  },
  // ナビゲーションガード
  // 編集中のページ遷移で確認させる
  beforeRouteLeave (to, from, next) {
    const existData = this.usersData[0];
    const sameJudge = (
      this.name === existData.name ||
      this.role === existData.role || 
      this.email === existData.email
    );
    if(sameJudge || this.btnClickFlag) {
      next()
    } else {
      let answer = window.confirm("ページが変わりますがよろしいでしょうか？");
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
}

.main-edit label {
  display: block;
  margin: 0 auto;
  padding-top: 2.5rem;
  padding-bottom: 5px;
}

.main-edit__name,
.main-edit__mail,
.main-edit__role {
  border-radius: 9px;
  border: 2px solid #F2F2F2;
  box-sizing:border-box;
  height: 3rem;
  width: 100%;
  padding: 0 10px;
  color: #707070;
}

select {
  display: block;
}

.main-edit__mail--reset {
  text-align: right;
  color: #567DFF;
  padding: 5px 0;
}

.main-edit__mail--reset:hover {
  cursor: pointer;
}

.main-edit__button-auth {
  display: block;
  margin: 0.5rem auto;
  background: linear-gradient(270deg, #41DE9D 0%, #2BB8F8 100%);
  border-radius: 36px;
  border: none;
  color: #FFFFFF;
  padding: 0.7rem 1.5em;
  font-size: 1.5rem;
}

.main-edit__button-auth:hover { 
  cursor: pointer;
  background: linear-gradient(270deg, #77f5c0 0%, #63c4f1 100%);
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
