import createPersistedState from "vuex-persistedstate";

// storeはセッションストレージに
export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: "cource-info",
      storage: window.sessionStorage
    })(store);
  });
};
