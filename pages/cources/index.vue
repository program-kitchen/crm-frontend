<template>
  <div class="main">
    <SideBar />
    <div class="contents">
      <TitleButton :urlText="sendText"/>
      <p class="contents-error">{{authMessage}}</p>
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
              <th class="contents-table__header-summary">概要</th>
              <th class="contents-table__header-button"></th>
              <th class="contents-table__header-button"></th>
            </tr>
          </thead>
          <tbody class="contents-table__record">
            <tr v-for="(cource , index) in getCources" :key="index">
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
              
              <td class="contents-table__header-term">{{cource.name}}</td>
              <td class="contents-table__header-period">{{termToString(cource.term)}}</td>
              <td class="contents-table__header-summary">{{cource.summary}}</td>
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
      <div class="contents-buttom">
        <button
          class="contents-buttom__button--enable"
          v-show="this.checkCources.length == 0"
        >
          削除できません
        </button>
        <button 
          class="contents-buttom__button" 
          @click="confirmSelectedDelete" v-show="this.checkCources.length > 0"
        >
          チェックしたコースを削除
        </button>
        <p class="contents-buttom__check-count">該当件数：{{this.checkCources.length}} 件</p>
      </div>
      <div class="contents-pagination">
        <paginate v-if="(getPageCount > 0)"
          v-model="currentPage"
          :page-count="getPageCount"
          :click-handler="clickViewPage"
          :prev-text="'＜'"
          :next-text="'＞'"
          :container-class="'pagination'"
          :page-class="'pagination-li'"
          :page-link-class="'pagination-a'"
          :active-class="'pagination-active'"
          :prev-class="'prev-pagination'"
          :next-class="'prev-pagination'">
        </paginate>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  middleware: 'courceRedirect',
  data() {
    return {
      sendText: {title:"コース管理", url:"cources"}, // トップ部のコンポーネントへ渡すデータ
      pageInfo: 'course',
      checkCources: [],
      cources: [],
      parPage: this.$LIST_PAGE_COUNT,
      currentPage: 1,
      authMessage: ""
    }
  },
  created() {
    this.fetchCourceInfo();
  },
  methods: {
    async fetchCourceInfo() {
      this.$nuxt.$loading.start();
      await
        this.$axios
          .get(`https://api.coachtech-crm.com/api/course`)
          .then((res) => {
            this.cources = res.data;
            this.clickViewPage(1);
            this.$nuxt.$loading.finish();
          })
    },
    clickViewPage(pageNo) {
      this.selectAll = false; // 全選択チェックボックスは外す
      this.currentPage = Number(pageNo);
    },
    confirmDelete(courceId) {
      if(window.confirm(this.$MSG_CONF_DEL_COURSE)) {
        this.courcesDelete(courceId);
      }
    },
    async courcesDelete(courceId) {
      this.$nuxt.$loading.start();
      await
        this.$axios
          .post('https://api.coachtech-crm.com/api/course/delete', {"id" : courceId,})
          .then(() => {
            window.alert(this.$MSG_DEL_COURSE)
            this.fetchCourceInfo(); //再度コースデータ取得
            this.$nuxt.$loading.finish();
          })
    },
    confirmSelectedDelete() {
      if(window.confirm(this.$MSG_CONF_MULTI_DEL_COURSE)) {
        this.selectedDeleteCources();
      }
    },
    // 削除API処理
    async selectedDeleteCources() {
      this.$nuxt.$loading.start();
      const userData = this.checkCources.join(',');
        await
          this.$axios
            .post(`https://api.coachtech-crm.com/api/course/delete`, {
              "id" : userData
            })
            .then(() => {
              window.alert(this.$MSG_MULTI_DEL_COURSE);
              this.fetchCourceInfo();
              this.$nuxt.$loading.finish();
            })
    },
    // 期間を表示文字列に変換
    termToString(term) {
      let month = Math.floor(term / this.$WEEKS_PER_MONTH);
      let week = term % this.$WEEKS_PER_MONTH;
      let termStr = '';
      if (month > 0) {
        termStr += month + 'ヶ月';
      }
      if (week > 0) {
        termStr += week + '週間';
      }

      return termStr;
    }
  },
  computed: {
    getCources() {
      let current = this.currentPage * this.parPage;
      let start = current - this.parPage;
      return this.cources.slice(start, current);
    },
    getPageCount() {
      return Math.ceil(this.cources.length / this.parPage)
    },
    // チェックボックス処理
    selectAll: {
      get() {
        if(this.checkCources.length == this.getCources.length) {
          return true
        } else {
          return false
        }
      },
      // 全選択のチェックボックスを操作した場合(checkedはtrue)
      set(value) {
        let checkArray = [];
        if(value) {
          this.getCources.forEach(function (cource) {
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
.main,
.contents-buttom {
  display: flex;
}

.contents {
  margin-top: 1rem;
  width: 83%;
  padding: 2rem 0 0 8rem;
}

/* テーブルCSS */
.contents-table {
  margin-top: 6.7rem;
}

.contents-table__header-check-list {
  width: 14rem;
}

.contents-table__header-term {
  width: 25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.contents-table__header-period {
  width: 15rem;
}

.contents-table__header-summary {
  width: 30rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.contents-table__header-button {
  width: 10rem;
}

.contents-buttom {
  display: flex;
}

</style>
