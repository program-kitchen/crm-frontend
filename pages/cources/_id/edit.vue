<template>
  <div class="cource-area">
    <SideBar />
    <div class="cource-main">
      <div class="main-cource">
        <h1 class="crm-modal__title">コース編集</h1>
        <p class="contents-error">{{authMessage}}</p>
        <validation-observer ref="courceForm" v-slot="{invalid}">
          <label for="name" class="crm-modal__label">コース名</label>
          <validation-provider v-slot="{ errors }" name="コース名" rules="required">
            <input
              id="name"
              type="text"
              class="main-cource__name crm__input"
              name="name"
              v-model="name"
              v-bind:maxlength="maxLenName"
            >
            <div class="crm__error-area">
              {{ errors[0] }}
            </div>
          </validation-provider>
          <validation-provider v-slot="{ errors }"
            name="コース期間"
            immediate
            :rules="'termCheck|max_value:' + maxPeriod"
          >
            <label for="period" class="crm-modal__label">コース期間(週単位)</label>
            <input
              id="period"
              type="text"
              class="main-cource__period crm__input"
              name="period"
              v-model="sumPeriod"
              disabled="disabled"
            >
            <div class="crm__error-area">
              {{ errors[0] }}
            </div>
          </validation-provider>
          <label for="description" class="crm-modal__label">概要</label>
          <input
            id="description"
            type="text"
            class="main-cource__description crm__input"
            name="description"
            v-model="description"
            v-bind:maxlength="maxLenSummary"
          >
          <label class="main-cource__table">ターム</label>
          <table class="main-cource-term__table">
            <tr>
              <th class="main-cource-term__table-term">ターム名</th>
              <th class="main-cource-term__table-period">期間</th>
              <th class="main-cource-term__table-column">概要</th>
              <th class="main-cource-term__table-space"></th>
              <th class="main-cource-term__table-space">
                <button
                  @click="sendTerm"
                  class="main-cource-term__table-button-new"
                >
                </button>
              </th>
            </tr>
            <tr 
              v-show="$store.state.term.length === 0"
            >
              <td class="main-cource-term__table-data--space"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
              <td class="main-cource-term__table-data--over">{{term.name}}</td>
              <td class="main-cource-term__table-data--over">{{term.term}}週間</td>
              <td class="main-cource-term__table-data--over">{{term.summary}}</td>
              <td class="main-cource-term__table-space">
                <button
                  class="contents-table__record-button--edit"
                  @click="transitionTerm(index)"
                >
                  編集
                </button>
              </td>
              <td class="main-cource-term__table-space">
                <button
                  @click="removeTerm(index)"
                  class="main-cource-term__table-data-button-remove"
                >
                </button>
              </td>
            </tr>
          </table>
          <button
            class="crm-modal__submit-button crm-modal__button"
            @click="editCourceRegist"
            :disabled="invalid"
          >
            編集
          </button>
          <div class="crm-modal__return" @click="returnList">
            戻る
          </div>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'courceRedirect',
  data() {
    return {
      id: this.$route.params.id,
      name: this.$store.state.cource.name,
      description: this.$store.state.cource.description,
      terms: this.$store.state.term,
      btnClickFlag: false,
      prevRoute: null,
      authMessage: ""
    }
  },
  mounted() {
    if(this.prevRoute.fullPath == "/cources") {
      this.getCourceData()
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from
    })
  },
  methods: {
    // APIで取得したデータは一度Vuexに格納する
    async getCourceData() {
      this.$nuxt.$loading.start();
      await this.$axios
        .get(`https://api.coachtech-crm.com/api/course/${this.id}`, {
          params: {
            "id": this.id
          }
        })
        .then((res) => {
          this.name = res.data.name;
          this.description = res.data.summary;
          this.terms = res.data.termInfo;
          this.$store.commit("addCource", {
            name: res.data.name,
            term: res.data.term,
            summary: res.data.summary
          });
          res.data.termInfo.forEach(element => { 
            this.$store.commit("addTerm", {
              term: element.name,
              period: element.term,
              description: element.summary
            });
          });
          this.$nuxt.$loading.finish();
        })
        .catch(error => console.log(error));
    },
    returnList() {
      this.$router.push('/cources');
    },
    // 更新API
    async editCourceRegist() {
      this.$nuxt.$loading.start();
      this.btnClickFlag = true;
      await
        this.$axios
          .post('https://api.coachtech-crm.com/api/course/register', {
            "id": this.id,
            "name" : this.name,
            "term" : this.sumPeriod,
            "summary" : this.description,
            "termInfo" : this.terms,
          })
          .then(() => {
            window.alert(this.$MSG_EDIT_COURSE);
            this.$store.commit("delAllInfo");
            this.$router.push('/cources');
            this.$nuxt.$loading.finish();
          })
    },
    sendTerm() {
      this.btnClickFlag = true;
      this.$store.commit("addCource", {
        name: this.name,
        period: this.sumPeriod,
        description: this.description
      });
      this.$router.push('/term/register')
    },
    removeTerm(index) {
      if(window.confirm(this.$MSG_CONF_DEL_TERM)) {
        this.$store.commit("delTermInfo", index);
        window.alert(this.$MSG_DEL_TERM);
      }
    },
    transitionTerm(index) {
      this.btnClickFlag = true;
      this.$router.push(`/term/${index}/edit`);
    },
    dragTermList(event, index) {
      this.$dragTermList(event,index);
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
      // タームの期間合計処理を入れる処理
      return this.$sumPeriod(this.$store.state.term,this.terms.length);
    },
    // 定数取得用算出プロパティ定義
    maxLenName() {
      return this.$MAX_LEN_COURSE_NAME
    },
    maxLenSummary() {
      return this.$MAX_LEN_COURSE_SUMMARY
    },
    maxPeriod() {
      return this.$MAX_COURSE_PERIOD
    },
  },
  // ナビゲーションガード
  // 編集中のページ遷移で確認させる
  beforeRouteLeave (to, from, next) {
    if(this.btnClickFlag) {
      next()
    } else {
      let answer = window.confirm(this.$MSG_MOVE_PAGE);
      if (answer) {
        this.$store.commit("delAllInfo");
        next()
      } else {
        next(false)
      }
    }
  },
}
</script>
