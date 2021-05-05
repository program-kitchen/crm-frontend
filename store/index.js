export const state = () => ({
  cource: '',
  term: []
});

export const mutations = {
  addCource(state , value) {
    state.cource = value;
  },
  viewTerm(state, value) {
    state.term = value
  },
  addTerm(state , {term,period,description}) {
    state.term.push({
      name: term,
      period: period,
      description: description
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
      period: period,
      description: description
    })
  },
  editDragInfo(state, {dropIndex,deleteList}) {
    state.term.splice(dropIndex, 0, {
      name: deleteList.name,
      period: deleteList.period,
      description: deleteList.description
    });
  }
}

export const actions = {
  nuxtClientInit({ commit }, context) {
    let data = JSON.parse(sessionStorage.getItem("cource-info")) || [];
    if (data.length !== 0) {
      commit("addCource", data.cource);
      commit("viewTerm", data.term);
    }
  }
};