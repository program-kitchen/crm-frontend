export const state = () => ({
  cource: '',
  term: []
});

export const mutations = {
  addCource(state , value) {
    state.cource = value;
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

// export const actions = {
//   addCource(context, value) {
//     // コミットすることで状態変更が反映される
//     context.commit("add", value);
//   }
// };
