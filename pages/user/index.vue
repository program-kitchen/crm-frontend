<template>
  <div class="users">
    <button @click="$router.push('/login')">ログイン</button>
    <button @click="$router.push('/user/logout')">ログアウト</button>
    <button @click="$router.push(`/user/12/edit`)">ユーザ編集</button>
    <button @click="$router.push('/user/test')">リフレッシュ</button>
    <button @click="$router.push('/cources/register')">コース登録</button>
    <button @click="$router.push(`/cources/1/edit`)">コース登録</button>
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
                <th>名前</th>
                <th>メールアドレス</th>
                <th>権限</th>
                <th class="contents-table__header-button"></th>
                <th class="contents-table__header-button"></th>
              </tr>
            </thead>
            <tbody class="contents-table__record">
              <tr v-for="(user, index) in getUsers" :key="index">
                <td class="contents-table__header-check-list">
                  <label>
                    <input type="checkbox" v-model="checkNames" v-bind:value="user.uuid" class="contents-table__head-check">
                    <!-- <input type="checkbox" v-model="checkNames" v-bind:value="user.id" class="contents-table__head-check"> -->
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
  data() {
    return {
      // 検索用
      name: '',
      email: '',
      role: '',
      // 一旦ログインユーザの権限を取得
      userRole: this.$auth.user.role,
      sendText: {title:"ユーザー", url:"user"},
      pageInfo: 'user',
      checkNames: [],
      users: [
          // { uuid: 1, name: '田中太郎' , email: "test1@test.com", role: "4"},
          // { uuid: 2, name: '斉藤一朗' , email: "test2@test.com", role: "4"},
          // { uuid: 3, name: '中村絵梨子' , email: "test3@test.com", role: "3"},
          // { uuid: 4, name: '田中一郎' , email: "test4@test.com", role: "4"},
          // { uuid: 5, name: '斉藤二郎' , email: "test5@test.com", role: "2"},
          // { uuid: 6, name: '斉藤一朗' , email: "test2@test.com", role: "2"},
          // { uuid: 7, name: '中村絵梨子' , email: "test3@test.com", role: "3"},
          // { uuid: 8, name: '田中一郎' , email: "test4@test.com", role: "1"},
          // { uuid: 9, name: '斉藤二郎' , email: "test5@test.com", role: "2"},
          // { uuid: 10, name: '斉藤一朗' , email: "test2@test.com", role: "3"},
          // { uuid: 11, name: '中村絵梨子' , email: "test3@test.com", role: "3"},
          // { uuid: 12, name: '田中一郎' , email: "test4@test.com", role: "4"},
          // { uuid: 13, name: '斉藤二郎' , email: "test5@test.com", role: "4"},
          // { uuid: 14, name: '斉藤一朗' , email: "test2@test.com", role: "4"},
          // { uuid: 15, name: '中村絵梨子' , email: "test3@test.com", role: "2"},
          // { uuid: 16, name: '田中一郎' , email: "test4@test.com", role: "4"},
          // { uuid: 17, name: '斉藤一朗' , email: "test2@test.com", role: "3"},
          // { uuid: 18, name: '中村絵梨子' , email: "test3@test.com", role: "2"},
          // { uuid: 19, name: '田中一郎' , email: "test4@test.com", role: "3"},
          // { uuid: 20, name: '斉藤二郎' , email: "test5@test.com", role: "4"},
          // { uuid: 21, name: '斉藤一朗' , email: "test2@test.com", role: "4"},
          // { uuid: 22, name: '中村絵梨子' , email: "test3@test.com", role: "4"},
          // { uuid: 23, name: '田中一郎' , email: "test4@test.com", role: "3"},
          // { uuid: 24, name: '斉藤二郎' , email: "test5@test.com", role: "1"},
          // { uuid: 25, name: '斉藤一朗' , email: "test2@test.com", role: "1"},
          // { uuid: 26, name: '中村絵梨子' , email: "test3@test.com", role: "2"},
          // { uuid: 27, name: '田中一郎' , email: "test4@test.com", role: "3"},
          // { uuid: 28, name: '斉藤二郎' , email: "test5@test.com", role: "3"},
          // { uuid: 29, name: '斉藤一朗' , email: "test2@test.com", role: "3"},
          // { uuid: 30, name: '中村絵梨子' , email: "test3@test.com", role: "4"},
          // { uuid: 31, name: '田中一郎' , email: "test4@test.com", role: "4"},
      ],
      parPage: 5,
      currentPage: 1,
      authMessage: ""
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
          .get(`http://localhost:8000/api/user`)
          .then((res) => {
            console.log(res);
            this.users = res.data;
            // this.pageCount = res.data.total;
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
          .get(`http://localhost:8000/api/user`,{
            params: {
              "name": this.name,
              "email": this.email,
              "role": this.role,
              "withDeleted" : 1,
              "page" : 1
            }
          })
          .then((res) => {
            console.log(res);
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
          .post(`http://localhost:8000/api/user/delete`, {
            "uuid": userId,
          })
          .then(() => {
            console.log('成功');
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
      get() {
        //ボックスにすべてチェックが入ったか判定
        // if (this.checkNames.length == this.getUsers.length && this.getUsers.length !== 0 ) {
        if (this.checkNames.length == this.getUsers.length) {
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
            checkArray.push(user.uuid);
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
</style>
