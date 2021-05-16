<template>
  <div class="users">
    <div class="main">
      <SideBar />
      <div class="contents">
        <TitleButton :urlText="sendText"/>
        <p class="contents-error">{{authMessage}}</p>
        <div class="contents-search">
          <input type="text" placeholder="ユーザ名" v-model="name">
          <input type="mail" placeholder="メールアドレス" v-model="email">
          <select v-model="role" class="contents-search__select">
            <option value="">権限選択</option>
            <option value="3">管理者</option>
            <option value="2">バックオフィス</option>
            <option value="1">コーチ</option>
          </select>
          <button class="contents-search__button" @click="userSearch">検索</button>
          <p>表示件数：{{users.length}}件</p>
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
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
                <td v-if="user.role=='4'">オーナー</td>
                <td v-if="user.role=='3'">管理者</td>
                <td v-if="user.role=='2'">バックオフィス</td>
                <td v-if="user.role=='1'">コーチ</td>
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
        <SelectedDeleteButton :sendDeleteData="checkNames" :pageInfo="pageInfo" @fetchData='fetchUserData(1)'/>
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
  middleware: 'userRedirect',
  data() {
    return {
      // 検索用
      name: '',
      email: '',
      role: '',
      // ログインユーザの権限を取得
      userRole: this.$auth.user.role,
      sendText: {title:"ユーザー", url:"user"},
      pageInfo: 'user',
      checkNames: [],
      users: [],
      parPage: 5,
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
      await
        this.$axios
          .get(`https://api.coachtech-crm.com/api/user`)
          .then((res) => {
            this.users = res.data;
            this.currentPage = 1
          })
          .catch((error) => {
            const code = parseInt(error.response && error.response.status);
            if(code === 401 ){
              this.authMessage = "アクセストークンが失効しております"
            }
          })
    },
    // 検索API
    async userSearch() {
      await
        this.$axios
          .get(
            `https://api.coachtech-crm.com/api/user?name=${this.name}&email=${this.email}&role=${this.role}&withDeleted=0`
          )
          .then((res) => {
            this.selectAll = false; // 全選択チェックボックスは外す
            this.users = res.data;
            // this.currentPage = res.data.current_page;
            // this.pageCount = res.data.total;
          })
          .catch((error) => {
            const code = parseInt(error.response && error.response.status);
            if(code === 401 ){
              this.authMessage = "アクセストークンが失効しております"
            }
          })
    },
    // 削除API
    async userDelete(userId) {
      await
        this.$axios
          .post(`https://api.coachtech-crm.com/api/user/delete`, {
            "uuid": userId,
          })
          .then(() => {
            this.fetchUserData(); //再度ユーザデータ取得
          })
          .catch((error) => {
            const code = parseInt(error.response && error.response.status);
            if(code === 401 ){
              this.authMessage = "アクセストークンが失効しております"
            }
          })
    },
    clickViewPage(pageNo) {
      this.selectAll = false; // 全選択チェックボックスは外す
      this.currentPage = Number(pageNo);
    },
    confirmDelete(userId) {
      if(window.confirm('ユーザーを削除します。よろしいでしょうか？')) {
        this.userDelete(userId); // 削除API処理を実行
      }
    },
    // ログインする権限に応じてボタン表示を変更
    canEdit(role,userRole) {
      const roleNo = [4, 3, 2, 1];
      if(userRole == "4" && roleNo.slice(1).includes(role)) {
        return true;
      } else if(userRole == "3" && roleNo.slice(2).includes(role)){
        return true;
      } else if(userRole == "2" && roleNo.slice(3).includes(role)) {
        return true;
      } 
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
  }
}
</script>

<style scoped>
.users {
  font-size: 1.6rem;
}

.main,
.contents-search,
.contents-buttom {
  display: flex;
}

.contents {
  width: 83%;
  padding-left: 2.5rem;
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
  width: 20rem;
  padding: 0.5rem;
  margin-right: 2rem;
  box-sizing:border-box;
  height: 3.5rem;
  outline: none;
}

.contents-search__button {
  background: #04C6C6;
  border: none;
  padding: 0.5rem 1.2rem;
  margin-right: 1rem;
  border-radius: 27px;
  opacity: 1;
  text-align: center;
  color: #FFFFFF;
  font-weight: bold;
}

.contents-search__button:hover {
  cursor: pointer;
  transition:  0.3s 0s ease-in;
  background: #40dada;
}

.contents-table__header-name {
  width: 15rem;
}
.contents-table__header-email {
  width: 30rem;
}
.contents-table__header-role {
  width: 15rem;
}
</style>
