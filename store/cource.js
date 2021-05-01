export const state = () => ({
  cources: []
});

export const mutations = {
  // this.$store.commit('cource/add', e.target.value)
  add(state, list) {
    state.cources.push({
      list,
    })
  },
  // remove(state, { todo }) {
  //   state.list.splice(state.list.indexOf(todo), 1)
  // },
  // toggle(state, cource) {
  //   todo.done = !todo.done
  // }
}