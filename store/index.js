export const state = () => ({
  cource: '',
  term: [],
  auth_user: []
});

export const mutations = {
  addAuthUser(state, value) {
    state.auth_user = value;
  },
  addCource(state , value) {
    state.cource = value;
  },
  viewTerm(state, value) {
    state.term = value
  },
  addTerm(state , {term,period,description}) {
    state.term.push({
      name: term,
      term: period,
      summary: description
    });
  },
  delAllInfo(state) {
    state.cource = '';
    state.term = [];
  },
  delTermInfo(state, index) {
    state.term.splice(index, 1);
  },
  editTermInfo(state, {id,term,period,description}) {
    state.term.splice(id, 1, {
      name: term,
      term: period,
      summary: description
    })
  },
  editDragInfo(state, {dropIndex,deleteList}) {
    state.term.splice(dropIndex, 0, {
      name: deleteList.name,
      term: deleteList.term,
      summary: deleteList.summary
    });
  }
}

// リロードでの取得ができるように設定
// nuxt-client-init-moduleを利用
export const actions = {
  nuxtClientInit({ commit }, context) {
    let data = JSON.parse(sessionStorage.getItem("cource-info")) || [];
    if (data.length !== 0) {
      commit("addCource", data.cource);
      commit("viewTerm", data.term);
      commit("addAuthUser", data.auth_user);
    }
  }
};
