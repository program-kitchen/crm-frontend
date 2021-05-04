<template>
  <div class="cources">
    <div class="main">
      <SideBar />
      <div class="contents">
        <TitleButton :urlText="sendText"/>
        <div class="contents-table">
          <table>
            <thead class="contents-table__header">
              <tr>
                <th class="contents-table__header-check-list">   
                  <label>
                    <input type="checkbox" v-model="selectAll" class="contents-table__head-check">
                    <span class="contents-table__head-check_exist"></span>
                  </label>
                </th>
                <th class="contents-table__header-term">コース名</th>
                <th class="contents-table__header-period">期間</th>
                <th>概要</th>
                <th class="contents-table__header-button"></th>
                <th class="contents-table__header-button"></th>
              </tr>
            </thead>
            <tbody class="contents-table__record">
              <tr v-for="(cource , index) in cources" :key="index">
                <td>
                  <label>
                    <input type="checkbox" v-model="checkCources" v-bind:value="cource.id" class="contents-table__head-check">
                    <span class="contents-table__head-check_exist"></span>
                  </label>
                </td>

                <td>{{cource.name}}</td>
                <td>{{cource.period}}</td>
                <td>{{cource.description}}</td>
                <td class="contents-table__record-button">
                  <button class="contents-table__record-button--edit" @click="$router.push(`/cources/${cource.id}/edit`)">
                    編集
                  </button>
                </td>
                <td class="contents-table__record-button">
                  <button
                    class="contents-table__record-button--delete"
                    @click="confirmDelete(cource.id)"
                  >
                    削除
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <SelectedDeleteButton :sendDeleteData="checkCources" :pageInfo="pageInfo"/> 
        <!-- <div class="contents-buttom">
          <button @click="selectedDeleteCources">チェックしたコースを消去</button>
          <p>該当件数：{{checkCources.length}}件</p>
        </div> -->
        <!-- <pagination :parentText="sendText" /> -->
        <div class="contents-pagination">
          <paginate v-if="(getPageCount > 1)"
            :page-count="getPageCount"
            :page-range="3"
            :click-handler="clickViewPage"
            :prev-text="'＜'"
            :next-text="'＞'"
            :container-class="'pagination'"
            :page-class="'pagination-li'"
            :page-link-class="'pagination-a'"
            :active-class="'pagination-active'">
          </paginate>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  middleware: 'redirect',
  data() {
    return {
      // loginUserRole: this.$store.state.user.role,
      loginUserRole: 'コーチ',
      sendText: {title:"コース管理", url:"cources"}, // トップ部のコンポーネントへ渡すデータ
      pageInfo: 'course',
      checkCources: [],
      cources: [
          { id: 1, name: 'スキルアップコースです' , period: "4ヶ月", description: "副業で稼ぐスキルを身につけるためのコース"},
          { id: 2, name: 'フリーランスコースだよ' , period: "6ヶ月", description: "フリーランスとして稼ぐスキルを身につけるためのコース"},
          { id: 3, name: 'たぶんスキルアップコース' , period: "4ヶ月", description: "副業で稼ぐスキルを身につけるためのコース"},
          { id: 4, name: 'きっとフリーランスコース' , period: "6ヶ月", description: "フリーランスとして稼ぐスキルを身につけるためのコース"},
          { id: 5, name: 'スキルアップコースかも' , period: "4ヶ月", description: "副業で稼ぐスキルを身につけるためのコース"},
          { id: 6, name: 'フリーランスコース' , period: "10ヶ月", description: "フリーランスとして稼ぐスキルを身につけるためのコース"},
          { id: 7, name: 'きっとフリーランスコース' , period: "6ヶ月", description: "フリーランスとして稼ぐスキルを身につけるためのコース"},
          { id: 8, name: 'スキルアップコースかも' , period: "4ヶ月", description: "副業で稼ぐスキルを身につけるためのコース"},
          { id: 9, name: 'フリーランスコース' , period: "10ヶ月", description: "フリーランスとして稼ぐスキルを身につけるためのコース"},
      ],
     parPage: 30,
     currentPage: 1,
     getPageCount: 0
    }
  },
  created() {
    this.fetchCourceInfo(1);
  },
  methods: {
    async fetchCourceInfo(pageNo) {
      await
        axios
          .get(`api.coachtech-crm.com/course/index`, {"pageIndex" : pageNo })
          .then((res) => {
            this.cources = res.data;
            this.getPageCount = res.count;
          })
          .catch(errorMsg => {
            console.log(errorMsg);
            this.$router.push('/error');
          })
    },
    clickViewPage(pageNum) {
       this.currentPage = Number(pageNum);
       this.fetchCourceInfo(this.currentPage);
    },
    confirmDelete(courceId) {
      if(window.confirm('コースを削除します。よろしいでしょうか？')) {
        this.courcesDelete();
      }
    },
    async courcesDelete(courceId) {
      await
        axios
          .post('api.coachtech-crm.com/course/delete', {
              "id" : courceId,
              "loginUuId" : this.$store.state.user.id
          })
          .then(() => {
            console.log('削除成功')
            this.fetchCourceInfo(1); //再度コースデータ取得
          })
          .catch(errorMsg => this.$router.push('/error'))
    }
  },
  computed: {
    selectAll: {
      get() {
        if(this.checkCources.length == this.cources.length) {
          return true
        } else {
          return false
        }
      },
      set(value) {
        let checkArray = [];
        if(value) {
          this.cources.forEach(function (cource) {
            checkArray.push(cource.id);
          });
        }
        this.checkCources = checkArray;
      }
    }
  },
}
</script>

<style scoped>
.cources {
  background: #EEF2F2;
}

.main,
.contents-buttom {
  display: flex;
}

.contents {
  width: 83%;
  padding-left: 2.5rem;
}

/* テーブルCSS */
.contents-table {
  height: 70%;
  border-collapse: collapse;
  /* border-spacing: 0; */
  background: #FFFFFF;
  box-shadow: 0px 16px 54px #89BDBD80;
  border-radius: 6px;
  opacity: 1;
  width: 95%;
  overflow: auto;
}

.contents-table table {
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
  overflow: auto;
}


.contents-table__header {
  background: linear-gradient(270deg, #41DE9D 0%, #2BB8F8 100%);
  color: #FFFFFF;
}

.contents-table__header th {
  padding: 0.9rem 0;
  text-align: left;
  font-size: 1.2rem;
  /* width: 11rem; */
}

.contents-table__header-check-list {
  width: 5rem;
}

.contents-table__record tr {
  border-bottom: 1px solid #E3E3E3;
}

.contents-table__record td {
  color: #707070;
  opacity: 1;
  padding: 0.6rem 0;
  /* width: 100px; */
}


/* 2ボタン共通スタイル */

.contents-table__header-term {
  width: 16rem;
}
.contents-table__header-period {
  width: 8rem;
}

.contents-table__header-button {
  width: 6.5rem;
  padding-left: 10rem;
}

.contents-table__record-button {
  text-align: center;
}
.contents-table__record-button--edit,
.contents-table__record-button--delete {
  border: none;
  border-radius: 20px;
  color: #FFFFFF;
  padding: 0 0.7rem;
  height: 1.9rem;
}

.contents-table__record-button--edit:hover,
.contents-table__record-button--delete:hover {
  cursor: pointer;
  transition:  0.5s;
}

.contents-table__record-button--edit p,
.contents-table__record-button--delete p {
  font: normal normal normal 20px/30px Meiryo;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;
}

.contents-table__record-button--edit {
  background: #04C6C6;
  border: 1px solid #04C6C6;
}

.contents-table__record-button--delete {
  background: #FF5561;
  border: 1px solid #FF5561;

}

.contents-table__record-button--edit:hover {
  background: #40dada;
}
.contents-table__record-button--delete:hover {
  background: #f8717a;
}

/* チェックボックスデザイン */
.contents-table__head-check{
  display: none;
}
.contents-table__head-check_exist {
  position:relative;
  
}

.contents-table__head-check_exist::before{
  content: "";
  display: block;
  position: absolute;
  top: -5px;
  left: 30px;
  width: 18px;
  height: 18px;
  border: 1px solid #999;
  background-color: #ffffff;
}
.contents-table__head-check:checked + .contents-table__head-check_exist::after{
  content: "";
  display: block;
  position: absolute;
  top: -5px;
  left: 35px;
  width: 7px;
  height: 14px;
  transform: rotate(40deg);
  border-bottom: 2px solid white;
  border-right: 2px solid white;
}
.contents-table__head-check:checked + .contents-table__head-check_exist::before{
  background-color: #04C6C6;
  border: none;
}
</style>

<style>
/* ページネーション */
/* scopeを入れると反映されないため、別タグで切り出し */
.pagination {
  list-style: none;
  display: flex;
  justify-content: center;
  text-align: center;

}
.pagination-li {
  margin: 0 6px;
  
}
.pagination-a {
  background: #FFFFFF 0% 0% no-repeat padding-box;
  padding: 0.3rem 0.5rem;
  margin: 0 0.1rem;
  border-radius: 3px;
  color: #55BBBB;
}

.pagination-a:hover {
  background: #04C6C6 0% 0% no-repeat padding-box;
  padding: 0.3rem 0.5rem;
  margin: 0 0.1rem;
  border-radius: 3px;
  color: #FFFFFF;
  transition:  0.3s 0s ease-in;
  cursor: pointer;
}
.pagination-active a {
  background: #04C6C6 0% 0% no-repeat padding-box;
  color: #FFFFFF;
}
</style>