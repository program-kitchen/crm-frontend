<template>
  <div class="term-area">
    <SideBar />
    <div class="main">
      <div class="main-term">
        <h1 class="main-term__title">ターム{{this.$route.params.pageName}}</h1>
        <label for="name">
          コース名
        </label>
        <input id="name" type="text" class="main-term__textbox" name="name" v-model="name" readonly>
        <label for="term">
          ターム名
        </label>
        <input id="term" type="text" class="main-term__textbox" name="term" v-model="term">
        <label for="period">
          ターム(週単位)
        </label>
        <input id="period" type="number" class="main-term__textbox" name="period" v-model="period">
        <label for="description">
          概要
        </label>
        <input id="description" type="text" class="main-term__textbox" name="description" v-model="description">
        <button class="main-term__button-auth" @click="termRegist">登録</button>
        <div class="main-term__button-return" @click="returnCource">
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
      id: this.$route.params.id,
      name: '',
      term: '',
      period: '',
      description: '',
      // courceData: [{name: 'フリーランスコース', term: 'アドバンス', period: '8', description: "実践力を身につける"}], // ユーザ一覧から取得したデータ格納用とする
      courceData: [{name: '', term: '', period: '', description: ""}], // ユーザ一覧から取得したデータ格納用とする
      btnClickFlag: false
    }
  },
  mounted() {
    console.log(this.$route);
  },
  // 取得APIのため、コメントアウト
  async created() {
    await
      this.$axios
        .get(`api.coachtech-crm.com/user/index/${this.id}`)
        .then((res) => {
          this.usersData = res.data
        })
        .catch(error => {
          console.log(error.response);
        })
  },
  methods: {
    // 更新APIのためコメントアウト
    async termRegist() {
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
    returnCource() {
      this.$router.go(-1);
    }
  },
  // ナビゲーションガード
  // 編集中のページ遷移で確認させる
  beforeRouteLeave (to, from, next) {
    const existData = this.courceData[0];
    const sameJudge = (
      this.name === existData.name ||
      this.term === existData.term || 
      this.period === existData.period ||
      this.description === existData.description
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
.term-area {
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

.main-term {
  width: 60%;
  margin: 0 auto;
}

.main-term__title {
  padding-bottom: 1.5rem;
  text-align: center;
}

.main-term label {
  display: block;
  margin: 0 auto;
  padding-top: 2.5rem;
  padding-bottom: 5px;
}

.main-term__textbox {
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


.main-term__button-auth {
  display: block;
  margin: 2rem auto;
  background: linear-gradient(270deg, #41DE9D 0%, #2BB8F8 100%);
  border-radius: 36px;
  border: none;
  color: #FFFFFF;
  padding: 0.7rem 1.5em;
  font-size: 1.5rem;
}

.main-term__button-auth:hover { 
  cursor: pointer;
  background: linear-gradient(270deg, #77f5c0 0%, #63c4f1 100%);
}

.main-term__button-return {
  text-align: center;
  margin: 0 auto;
  color: #567DFF;
  padding: 0.7rem 0;
  width: 20%;
}
.main-term__button-return:hover {
  cursor: pointer;
}
</style>
