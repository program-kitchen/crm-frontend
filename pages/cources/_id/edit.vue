<template>
  <div class="cource-area">
    <SideBar />
    <div class="main">
      <div class="main-cource">
        <h1 class="main-cource__title">コース編集</h1>
        <label for="name">コース名</label>
        <input id="name" type="text" class="main-cource__name" name="name"  v-model="name">
        <label for="period">期間</label>
        <input id="period" type="text" class="main-cource__period" name="period" v-model="sumPeriod" disabled="disabled">
        <label for="description">概要</label>
        <input id="description" type="text" class="main-cource__description" name="description" v-model="description">
        <label class="main-cource__table">ターム</label>
        <table class="main-cource-term__table">
          <tr>
            <th>ターム名</th>
            <th>期間</th>
            <th>概要</th>
            <th class="main-cource-term__table-button">
              <button @click="sendTerm" class="main-cource-term__table-button-new"></button>
            </th>
          </tr>
          <tr
            class="main-cource-term__table-data"
            v-for="(term ,index) in $store.state.term" :key="index"
            draggable
            @dragstart="dragTermList($event, index)"
            @drop="dropTermList($event, index)"
            @dragover.prevent
            @dragenter.prevent
          >
            <td @click="transitionTerm(index)">{{term.name}}</td>
            <td>{{term.period}}週</td>
            <td>{{term.description}}</td>
            <td class="main-cource-term__table-data-button">
              <button @click="removeTerm(index)" class="main-cource-term__table-data-button-remove"></button>
            </td>
          </tr>
        </table>
        <button class="main-cource__button-auth" @click="newCourceRegist">編集</button>
        <div class="main-cource__button-return" @click="returnList">
          <a>戻る</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  middleware: 'redirect',
  data() {
    return {
      id: this.$route.params.id,
      name: this.$store.state.cource.name,
      // period: 0,
      description: this.$store.state.cource.description,
      terms: [],
      btnClickFlag: false
    }
  },
  async creted() {
    axios
      .get(`api.coachtech-crm.com/course/index/${this.id}`)
      .then((res) => {
        this.name = res.data.name;
        this.description = res.data.description;
        this.terms = res.data.terms;
        // その後Vuexに入れる？
        this.$store.commit("addCource");
        this.$store.commit("addTerm");
      })
      .catch(error => console.log(error));
  },
  mounted() {
    setTimeout(() => {
      this.name = this.$store.state.cource.name;
      this.description = this.$store.state.cource.description;
      console.log(this.$store.state.cource);
      console.log(this.sumPeriod);
    }, 1000);
  },
  methods: {
    returnList() {
      this.$router.push('/cources');
      this.$store.commit("delAllInfo");
    },
    // 登録API
    // async newCourceRegist() {
    //   await
    //     axios
    //       .post('api.coachtech-crm.com/course/register', {
    //         "name" : this.name,
    //         "term" : this.sumPeriod,
    //         "summary" : this.description,
    //         "termInfo" : this.term,
    //         "loginUuId" : this.$store.state.user.UuId
    //       })
    //       .then(() => {
    //         window.alert('成功しました');
    //         this.$store.commit("delCourceInfo");
    //       })
    //       .catch(res => window.alert(res.errorMsg))
    // },

    // axios導入までの代わりの処理
    newCourceRegist() {
      this.btnClickFlag = true;
      this.$store.commit("delCourceInfo");
      window.alert('編集しました');
      this.$router.push("/cources");
    },
    sendTerm() {
      console.log(this.$store.state.cource);
      this.btnClickFlag = true;
      this.$store.commit("addCource", {
        name: this.name,
        period: this.sumPeriod,
        description: this.description
      });
      this.$router.push({name: "term"})
    },
    removeTerm(index) {
      if(window.confirm('削除してもよろしいでしょうか？')) {
        this.$store.commit("delTermInfo", index);
      }
    },
    transitionTerm(index) {
      this.btnClickFlag = true;
      this.$router.push(`/term/${index}/edit`);
    },
    dragTermList(event, index) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.setData('drag-index',index)
    },
    dropTermList(event, dropIndex) {
      const dragIndex = event.dataTransfer.getData('drag-index');
      const deleteList = this.$store.state.term[dragIndex];
      this.$store.commit("delTermInfo", dragIndex);
      this.$store.commit("editDragInfo", {dropIndex,deleteList});
    }
  },
  computed: {
    sumPeriod() {
      // タームの期間合計処理を入れる
      const courceTerm = this.$store.state.term.map((obj) => Number(obj.period));
      // const reducer = ((accumulator, currentValue) => {accumulator + currentValue}, 0);
      const termSum = courceTerm.reduce( (previousValue, currentValue) => previousValue + currentValue, 0);
      return Math.ceil( termSum / 4 ) + 'ヶ月';
    },
  },
  // ナビゲーションガード
  // 編集中のページ遷移で確認させる
  beforeRouteLeave (to, from, next) {
    // const existData = this.usersData[0];
    // const sameJudge = (
    //   this.name === existData.name ||
    //   this.role === existData.role || 
    //   this.email === existData.email
    // );
    if(this.btnClickFlag) {
    // if(sameJudge || this.btnClickFlag) {
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

.main-cource-term__table-button,
.main-cource-term__table-data-button {
  text-align: right;
}

.main-cource-term__table-data {
  transition: 0.5s;
}

.main-cource-term__table-data:hover {
  background: #c7c5c5;
  cursor: pointer;
  transition: 0.5s;
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

/* 新規追加円ボタン */
.main-cource-term__table-button-new {
  text-align: right;
	font-size: 1.5rem;
	position: relative;
	width: 1.8rem;
	height: 1.8rem;
	border: 0.1rem solid #04C6C6;
  background-color: #04C6C6;
	border-radius: 100%;
}

.main-cource-term__table-button-new::before {
	position: absolute;
  top: 50%;
  left: 50%;
	width: 1rem;
	height: 0.1rem;
	content: "";
	background-color: white;
  transform: translate(-50%, -50%);
}

.main-cource-term__table-button-new::after {
	position: absolute;
  top: 50%;
  left: 50%;
	width: 1rem;
	height: 0.1rem;
	content: "";
	background-color: white;
  transform: translate(-50%, -50%) rotate(90deg);
}

/* 円ボタン */
.main-cource-term__table-data-button-remove {
  text-align: right;
	font-size: 1.5rem;
	position: relative;
	width: 1.8rem;
	height: 1.8rem;
	border: 0.1rem solid #FF5561;
  background-color: #FF5561;
	border-radius: 100%;
}
/* 左線 */
.main-cource-term__table-data-button-remove::before {
	position: absolute;
  top: 50%;
  left: 50%;
	width: 1rem;
	height: 0.1rem;
	content: "";
	background-color: white;
  transform: translate(-50%, -50%) rotate(45deg);
}
/* 右線 */
.main-cource-term__table-data-button-remove::after {
	position: absolute;
  top: 50%;
  left: 50%;
	width: 1rem;
	height: 0.1rem;
	content: "";
	background-color: white;
  transform: translate(-50%, -50%) rotate(-45deg);
}
</style>