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
                    <span class="contents-table__head-check--checked"></span>
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
                    <input
                      type="checkbox"
                      v-model="checkCources"
                      v-bind:value="cource.id"
                      class="contents-table__head-check"
                    >
                    <span class="contents-table__head-check--checked"></span>
                  </label>
                </td>

                <td>{{cource.name}}</td>
                <td>{{cource.period}}</td>
                <td>{{cource.description}}</td>
                <td class="contents-table__record-button">
                  <button
                    class="contents-table__record-button--edit"
                    @click="$router.push(`/cources/${cource.id}/edit`)"
                  >
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
          { id: 4, name: 'きっとフリーランスコース' , period: "6ヶ月", description: "フリーランスとして稼ぐスキルを身につけるためのコース"},
          { id: 5, name: 'スキルアップコースかも' , period: "4ヶ月", description: "副業で稼ぐスキルを身につけるためのコース"},
          { id: 6, name: 'フリーランスコース' , period: "10ヶ月", description: "フリーランスとして稼ぐスキルを身につけるためのコース"},
          { id: 7, name: 'きっとフリーランスコース' , period: "6ヶ月", description: "フリーランスとして稼ぐスキルを身につけるためのコース"},
          { id: 8, name: 'スキルアップコースかも' , period: "4ヶ月", description: "副業で稼ぐスキルを身につけるためのコース"},
          { id: 9, name: 'フリーランスコース' , period: "10ヶ月", description: "フリーランスとして稼ぐスキルを身につけるためのコース"},
          { id: 5, name: 'スキルアップコースかも' , period: "4ヶ月", description: "副業で稼ぐスキルを身につけるためのコース"},
          { id: 6, name: 'フリーランスコース' , period: "10ヶ月", description: "フリーランスとして稼ぐスキルを身につけるためのコース"},
          { id: 7, name: 'きっとフリーランスコース' , period: "6ヶ月", description: "フリーランスとして稼ぐスキルを身につけるためのコース"},
          { id: 8, name: 'スキルアップコースかも' , period: "4ヶ月", description: "副業で稼ぐスキルを身につけるためのコース"},
          { id: 9, name: 'フリーランスコース' , period: "10ヶ月", description: "フリーランスとして稼ぐスキルを身につけるためのコース"},
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
  font-size: 1.6rem;
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
.contents-table__header-term {
  width: 30rem;
}
.contents-table__header-period {
  width: 13rem;
}

</style>