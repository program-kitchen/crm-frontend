<template>
  <div class="cource-area">
    <SideBar />
    <div class="main">
      <div class="main-cource">
        <h1 class="main-cource__title">コース{{sendTitle}}</h1>
        <label for="name">コース名</label>
        <input id="name" type="text" class="main-cource__name" name="name" value="tesuto" v-model="name">
        <label for="period">期間</label>
        <input id="period" type="text" class="main-cource__period" name="period">
        <label for="description">概要</label>
        <input id="description" type="text" class="main-cource__description" name="description" v-model="description">
        <label class="main-cource__table">ターム</label>
        <table class="main-cource-term__table">
          <tr class="main-cource-term__table-head">
            <th>ターム名</th>
            <th>期間</th>
            <th>概要</th>
            <th><button @click="sendTerm">➕</button></th>
          </tr>
          <tr>
            <td>ベーシック</td>
            <td>4週間</td>
            <td>基本を固める期間です</td>
            <td>❌</td>
          </tr>
          <tr>
            <td>アドバンス</td>
            <td>4週間</td>
            <td>実践力を身につける期間です</td>
            <td>❌</td>
          </tr>
          <tr>
            <td>アドバンス</td>
            <td>4週間</td>
            <td>実践力を身につける期間です</td>
            <td>❌</td>
          </tr>
        </table>
        <button class="main-cource__button-auth" @click="newCourceRegist">登録</button>
        <div class="main-cource__button-return" @click="returnList">
          <a>戻る</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sendTitle: {
      type: String
    }
  },
  data() {
    return {
      name: '',
      period: '',
      description: '',
      number: 4
    }
  },
  methods: {
    returnList() {
      this.$router.push('/cources');
    },
    newCourceRegist() {
      console.log('こんにちは')
    },
  // change(e) {
  //   console.log(e.target.value);
  // },
    sendTerm() {
      this.$router.push({name: "term", params: { pageName: '登録' }})
    }
  },
}
</script>

<style scoped>
.cource-area {
  display: flex;
  align-items: center;
  height: 100vh;
}

.main {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555454;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 16px 54px #89BDBD80;
  border-radius: 10px;
  opacity: 1;
  width: 60%;
  height: 85%;
  margin: 0 auto;
}

.main-cource {
  width: 70%;
  margin: 0 auto;
}

.main-cource__title {
  padding-bottom: 1.5rem;
  text-align: center;
}

.main-cource label{
  display: block;
  margin: 0 auto;
  padding-top: 2.5rem;
  padding-bottom: 5px;
}

.main-cource__name,
.main-cource__period,
.main-cource__description,
.main-cource-term__table {
  border-radius: 9px;
  border: 2px solid #F2F2F2;
  box-sizing:border-box;
  height: 3rem;
  width: 100%;
}

select {
  display: block;
}

/* テーブルのcss */
.main-cource-term__table {
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 1.5rem;
  text-align: left;
}

.main-cource-term__table th {
  border-bottom: 4px solid #F2F2F2;
  padding: 10px;
}
.main-cource-term__table td {
  border-bottom: 1px solid #F2F2F2;
  padding: 5px 10px;
}

.main-cource__table {
  padding: 0;
}


/* ここまで */

.main-cource__button-auth {
  display: block;
  margin: 0.5rem auto;
  background: linear-gradient(270deg, #41DE9D 0%, #2BB8F8 100%);
  border-radius: 36px;
  border: none;
  color: #FFFFFF;
  padding: 0.7rem 1.5em;
  font-size: 1.5rem;
}

.main-cource__button-auth:hover { 
  cursor: pointer;
  background: linear-gradient(270deg, #52e7a9 0%, #40b9f1 100%);
}

.main-cource__button-return {
  text-align: center;
  margin: 0 auto;
  color: #567DFF;
  padding: 0.7rem 0;
  width: 20%;
}
.main-cource__button-return:hover {
  cursor: pointer;
}
</style>