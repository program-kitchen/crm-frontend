import createPersistedState from "vuex-persistedstate";

// storeはセッションストレージに格納する
export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: "cource-info",
      storage: window.sessionStorage
    })(store);
  });
};
