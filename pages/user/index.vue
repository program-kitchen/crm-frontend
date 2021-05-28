<template>
  <div class="main">
    <SideBar />
    <div class="contents">
      <TitleButton :urlText="sendText"/>
      <p class="contents-error">{{authMessage}}</p>
      <div class="contents-search">
        <input type="text"
          placeholder="ユーザ名"
          v-model="name"
          v-bind:maxlength="maxLenName"
        >
        <input type="mail"
          placeholder="メールアドレス"
          v-model="email"
          v-bind:maxlength="maxLenEmail"
        >
        <select v-model="role" class="contents-search__select">
          <option value="">権限選択</option>
          <option
            v-for="auth in userAuth"
            v-bind:key="auth.name"
            v-bind:value="auth.code"
          >
            {{ auth.name }}
          </option>
        </select>
        <button class="contents-search__button" @click="userSearch">検索</button>
        <p>検索結果：{{users.length}}件</p>
      </div>
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
              <th class="contents-table__header-name">名前</th>
              <th class="contents-table__header-email">メールアドレス</th>
              <th class="contents-table__header-role">権限</th>
              <th class="contents-table__header-button"></th>
              <th class="contents-table__header-button"></th>
            </tr>
          </thead>
          <tbody class="contents-table__record">
            <tr v-for="(user, index) in getUsers" :key="index">
              <td class="contents-table__header-check-list">
                <label v-show="canEdit(user.role,userRole)">
                  <input type="checkbox" v-model="checkNames" v-bind:value="user.uuid" class="contents-table__head-check">
                  <span class="contents-table__head-check--checked"></span>
                </label>
              </td>
              <td class="contents-table__header-name">{{user.name}}</td>
              <td class="contents-table__header-email">{{user.email}}</td>
              <td class="contents-table__header-role">{{ getRoleName(user.role) }}</td>
              <td class="contents-table__record-button">
                <button
                  class="contents-table__record-button--edit" 
                  @click="$router.push(`/user/${user.uuid}/edit`)" 
                  v-show="canEdit(user.role,userRole)"
                >
                  編集
                </button>
              </td>
              <td>
                <button
                  class="contents-table__record-button--delete"
                  @click="confirmDelete(user.uuid)" 
                  v-show="canEdit(user.role,userRole)"
                >
                  削除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="contents-buttom">
        <div>
          <button
            class="contents-buttom__button--enable"
            v-show="checkNames.length == 0"
          >
            削除できません
          </button>
          <button 
            class="contents-buttom__button" 
            @click="confirmDeleteSelected" v-show="checkNames.length > 0"
          >
            チェックしたユーザを削除
          </button>
        </div>
        <p class="contents-buttom__check-count">該当件数：{{checkNames.length}} 件</p>
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
  middleware: 'userRedirect',
  data() {
    return {
      // 検索用
      name: '',
      email: '',
      role: '',
      // ログインユーザの権限を取得
      userRole: this.$auth.user.role,
      sendText: {title:"ユーザ管理", url:"user"},  
      pageInfo: 'user',
      checkNames: [],
      users: [],
      parPage: this.$LIST_PAGE_COUNT,
      currentPage: 1,
      authMessage: "",
    }
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    // 取得API
    async fetchUserData() {
      this.$nuxt.$loading.start();
      await
        this.$axios
          .get(`https://api.coachtech-crm.com/api/user`)
          .then((res) => {
            this.users = res.data;
            this.clickViewPage(1);
            this.$nuxt.$loading.finish();
          })
    },
    // 検索API
    async userSearch() {
      this.$nuxt.$loading.start();
      await
        this.$axios
          .get(
            `https://api.coachtech-crm.com/api/user?name=${this.name}&email=${this.email}&role=${this.role}&withDeleted=0`
          )
          .then((res) => {
            this.users = res.data;
            this.clickViewPage(1);
            this.$nuxt.$loading.finish();
          })
    },
    // 削除API
    async userDelete(userId) {
      this.$nuxt.$loading.start();
      await
        this.$axios
          .post(`https://api.coachtech-crm.com/api/user/delete`, {
            "uuid": userId,
          })
          .then(() => {
            window.alert(this.$MSG_DEL_USER);
            this.fetchUserData(); //再度ユーザデータ取得
            this.$nuxt.$loading.finish();
          })
    },
    clickViewPage(pageNo) {
      this.selectAll = false; // 全選択チェックボックスは外す
      this.currentPage = Number(pageNo);
    },
    confirmDelete(userId) {
      if(window.confirm(this.$MSG_CONF_DEL_USER)) {
        this.userDelete(userId); // 削除API処理を実行
      }
    },
    // 編集可能か判定する
    canEdit(userRole,loginRole) {
      return loginRole > userRole;
    },
    confirmDeleteSelected() {
      if(window.confirm(this.$MSG_CONF_MULTI_DEL_USER)) {
        this.deleteSelectedRow();
      }
    },
    // 削除API処理
    async deleteSelectedRow() {
      const userData = this.checkNames.join(',');
      await
        this.$axios
          .post(`https://api.coachtech-crm.com/api/${this.pageInfo}/delete`, {
            "uuid" : userData
          })
          .then(() => {
            window.alert(this.$MSG_MULTI_DEL_USER);
            this.fetchUserData(); //再度ユーザデータ取得
          })
    },
    // 権限名取得
    getRoleName(role) {
      return this.$getRoleName(role);
    },
  },
  computed: {
    getUsers() {
      let current = this.currentPage * this.parPage;
      let start = current - this.parPage;
      return this.users.slice(start, current);
    },
    getPageCount() {
      return Math.ceil(this.users.length / this.parPage);
    },
    // チェックボックス処理
    selectAll: {
      // 表示されているユーザに全てチェックが入ったら全選択チェックボックスにチェックを入れる
      get() {
        let checkUsers = [];
        this.getUsers.forEach((user) => {
          // 権限に応じてユーザ数を絞る
          if(user.role < this.userRole) {
            checkUsers.push(user.uuid);
          }
        });
        //ボックスにすべてチェックが入ったか判定
        if (this.checkNames.length == checkUsers.length) {
          return true;
        } else {
          return false;
        }
      },
      // 全選択のチェックボックスを操作した場合(checkedはtrue)
      set(value) { 
        //空の配列を用意
        let checkArray = [];
        if (value) {
          this.getUsers.forEach((user) => {
            if(user.role < this.userRole) {
              checkArray.push(user.uuid);
            }
          });
        }
        this.checkNames = checkArray;
      }
    },
    // 定数取得用算出プロパティ定義
    maxLenName() {
      return this.$MAX_LEN_USER_NAME
    },
    maxLenEmail() {
      return this.$MAX_LEN_USER_EMAIL
    },
    userAuth() {
      return this.$USER_ROLE
    },
  }
}
</script>

<style scoped>
.main,
.contents-search,
.contents-buttom {
  display: flex;
}

.contents {
  margin-top: 1rem;
  width: 83%;
  padding: 2rem 0 0 8rem;
}

.menu-title-text {
  text-decoration: none;
  color: #FFFFFF;
}

.contents-search {
  padding: 1rem 0;
  align-items: center;
}

.contents-search input,
.contents-search select {
  width: 25rem;
  padding: 0.5rem;
  margin-right: 2rem;
  box-sizing:border-box;
  height: 4.5rem;
  border: 1px solid #707070;
  border-radius: 5px;
  outline: none;
}

.contents-search__button {
  background: #04C6C6;
  border: none;
  padding: 1rem 2.5rem;
  margin-right: 1rem;
  border-radius: 27px;
  opacity: 1;
  text-align: center;
  color: #FFFFFF;
}

.contents-search__button:hover {
  cursor: pointer;
  transition:  0.3s 0s ease-in;
  background: #40dada;
}

.contents-table__header-check-list {
  width: 14rem;
}
.contents-table__header-name {
  width: 15rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.contents-table__header-email {
  width: 30rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.contents-table__header-role {
  width: 15rem;
}
</style>
