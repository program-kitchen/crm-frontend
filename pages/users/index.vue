<template>
  <div class="users">
    <div class="main">
      <SideBar />
      <div class="contents">
        <TitleButton :urlText="sendText"/>
        <div class="contents-search">
          <input type="text" placeholder="ユーザ名" v-model="name">
          <input type="mail" placeholder="メールアドレス" v-model="email">
          <select v-model="role">
            <option disabled value="">権限選択</option>
            <option>管理者</option>
            <option>バックオフィス</option>
            <option>コーチ</option>
          </select>
          <button class="contents-search__button" @click="userSearch">検索</button>
          <p>検索結果：{{searchUserData.length}}件</p>
        </div>
        <div class="contents-table">
          <table>
            <thead class="contents-table__head">
              <tr>
                <th>
                  <label>
                    <input type="checkbox" v-model="selectAll" class="contents-table__head-check">
                    <span class="contents-table__head-check--checked"></span>
                  </label>
                </th>
                <th>名前</th>
                <th>メールアドレス</th>
                <th>権限</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody class="contents-table__record">
              <tr v-for="(user, index) in getUsers" :key="index">
                <td>
                  <label>
                    <input type="checkbox" v-model="checkNames" v-bind:value="user.id" class="contents-table__head-check">
                    <span class="contents-table__head-check--checked"></span>
                  </label>
                </td>
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
                <td>{{user.role}}</td>
                <td>
                  <button
                    class="contents-table__record-button--edit" 
                    @click="$router.push(`/users/${user.id}/edit`)" 
                    v-show="canEdit(user.role,userRole)"
                  >
                    編集
                  </button>
                </td>
                <td>
                  <button
                    class="contents-table__record-button--delete"
                    @click="confirmDelete(user.id)" 
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
        <!-- ここはコンポーネント化してるが、一応残す -->
        <!-- <div class="contents-buttom">
          <button class="contents-buttom__button" @click="selectedDeleteUsers">チェックしたユーザを消去</button>
          <p>該当件数：{{checkNames.length}} 件</p>
        </div> -->
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
      searchUserData: [],

      // 一旦ログインユーザはバックオフィスの人と仮定
      // ログイン情報はstoreに本来は保存
      userRole: "バックオフィス", 

      sendText: {title:"ユーザ", url:"users"},
      pageInfo: 'user',
      checkNames: [],
      users: [
          { id: 1, name: '田中太郎' , email: "test1@test.com", role: "コーチ"},
          { id: 2, name: '斉藤一朗' , email: "test2@test.com", role: "コーチ"},
          { id: 3, name: '中村絵梨子' , email: "test3@test.com", role: "バックオフィス"},
          { id: 4, name: '田中一郎' , email: "test4@test.com", role: "コーチ"},
          { id: 5, name: '斉藤二郎' , email: "test5@test.com", role: "管理者"},
          { id: 6, name: '斉藤一朗' , email: "test2@test.com", role: "コーチ"},
          { id: 7, name: '中村絵梨子' , email: "test3@test.com", role: "バックオフィス"},
          { id: 8, name: '田中一郎' , email: "test4@test.com", role: "コーチ"},
          { id: 9, name: '斉藤二郎' , email: "test5@test.com", role: "管理者"},
          { id: 10, name: '斉藤一朗' , email: "test2@test.com", role: "コーチ"},
          { id: 11, name: '中村絵梨子' , email: "test3@test.com", role: "バックオフィス"},
          { id: 12, name: '田中一郎' , email: "test4@test.com", role: "コーチ"},
          { id: 13, name: '斉藤二郎' , email: "test5@test.com", role: "管理者"},
          { id: 14, name: '斉藤一朗' , email: "test2@test.com", role: "コーチ"},
          { id: 15, name: '中村絵梨子' , email: "test3@test.com", role: "バックオフィス"},
          { id: 16, name: '田中一郎' , email: "test4@test.com", role: "コーチ"},
          { id: 17, name: '斉藤一朗' , email: "test2@test.com", role: "コーチ"},
          { id: 18, name: '中村絵梨子' , email: "test3@test.com", role: "バックオフィス"},
          { id: 19, name: '田中一郎' , email: "test4@test.com", role: "コーチ"},
          { id: 20, name: '斉藤二郎' , email: "test5@test.com", role: "管理者"},
          { id: 21, name: '斉藤一朗' , email: "test2@test.com", role: "コーチ"},
          { id: 22, name: '中村絵梨子' , email: "test3@test.com", role: "バックオフィス"},
          { id: 23, name: '田中一郎' , email: "test4@test.com", role: "コーチ"},
          { id: 24, name: '斉藤二郎' , email: "test5@test.com", role: "管理者"},
          { id: 25, name: '斉藤一朗' , email: "test2@test.com", role: "コーチ"},
          { id: 26, name: '中村絵梨子' , email: "test3@test.com", role: "バックオフィス"},
          { id: 27, name: '田中一郎' , email: "test4@test.com", role: "コーチ"},
          { id: 28, name: '斉藤二郎' , email: "test5@test.com", role: "管理者"},
          { id: 29, name: '斉藤一朗' , email: "test2@test.com", role: "コーチ"},
          { id: 30, name: '中村絵梨子' , email: "test3@test.com", role: "バックオフィス"},
          { id: 31, name: '田中一郎' , email: "test4@test.com", role: "コーチ"},
      ],
     parPage: 5,
     currentPage: 1,
    }
  },

  created() {
    this.fetchUserData(1);
  },
  methods: {
    // 取得API
    async fetchUserData(pageNo) {
      await
        axios
          .get(`api.coachtech-crm.com/user/index`,{ "pageIndex" : pageNo})
          .then((res) => this.users = res.data) // 必要なのはid,name,email,role
          .catch(() => this.$router.push('/error'))
    },
    // 取得API
    async userSearch() {
      await
        this.$axios
          .get(`api.coachtech-crm.com/user/index/`,{
            "filterName" : this.name,
            "filterAuth" : this.role,
            "filterEmail" : this.email,
            "filterDeleted" : "0", // 削除フラグは0
          })
          .then((res) => {
            // データを初期化後、検索結果を格納
            this.users = [];
            this.users = res.data
            this.searchUserData = res.data 
          })
          .catch(() => this.$router.push('/error'))
    },
    clickViewPage(pageNo) {
       this.currentPage = Number(pageNo);
    },
    confirmDelete(userId) {
      if(window.confirm('ユーザーを削除します。よろしいでしょうか？')) {
        this.userDelete(userId); // 削除API処理を実行
      }
    },
    // 削除API
    async userDelete(userId) {
      await
        this.$axios
          .post(`api.coachtech-crm.com/user/delete`, {
            "uuid": userId,
            "loginUuid": this.$store.state.id
          })
          .then(() => {
            console.log('成功');
            this.fetchUserData(1); //再度ユーザデータ取得
          })
          .catch(err => {
            this.$router.push('/error');
          })
    },
    // ログインする権限に応じてボタン表示を変更
    canEdit(role,userRole) {
      const roleName = ["管理者","バックオフィス","コーチ"];
      if(userRole == "オーナー" && roleName.includes(role)) {
        return true;
      } else if(userRole == "管理者" && roleName.slice(1).includes(role)){
        return true;
      } else if(userRole == "バックオフィス" && roleName.slice(2).includes(role)) {
        return true;
      } 
    },

    // コンポーネント化できそうなメソッド
    // selectedDeleteUsers() {
    //   if(window.confirm('ユーザーを削除します。よろしいでしょうか？')) {
    //     console.log(this.checkNames);  // チェックされたユーザーIDを確認
    //     // 削除API処理を実行
    //   } 
    // }
  },
  computed: {
    // 見ているページ番号のユーザ情報を表示
    getUsers() {
      let current = this.currentPage * this.parPage;
      let start = current - this.parPage;
      return this.users.slice(start, current);
    },
    // データからページ数を算出
    getPageCount() {
      return Math.ceil(this.users.length / this.parPage);
    },
    // チェックボックス処理
    selectAll: {
      get() {
        //ボックスにすべてチェックが入ったか判定
        if (this.checkNames.length == this.users.length) {
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
            checkArray.push(user.id);
          });
        }
        this.checkNames = checkArray;
      }
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
  width: 83%;
  padding-left: 2.5rem;
}

.menu-title-text {
  text-decoration: none;
  color: #FFFFFF;
}

.contents-search {
  padding: 0.5rem 0;
  align-items: center;
}

.contents-search input,
.contents-search select {
  width: 170px;
  padding: 0.3rem;
  margin-right: 2rem;
  box-sizing:border-box;
  height: 2rem;
}

.contents-search__button {
  background: #04C6C6;
  border: none;
  padding: 0.5rem 1.2rem;
  margin-right: 1rem;
  border-radius: 27px;
  opacity: 1;
  font-size: 1.1rem;
  text-align: center;
  color: #FFFFFF;
  font-weight: bold;
}

.contents-search__button:hover {
  cursor: pointer;
  transition:  0.3s 0s ease-in;
  background: #40dada;
}

/* テーブルCSS */
.contents-table {
  height: 70vh;
  border-collapse: collapse;
  border-spacing: 0;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 16px 54px #89BDBD80;
  border-radius: 6px;
  opacity: 1;
  width: 95%;
  overflow: auto;
}

.contents-table table {
  border-collapse: collapse;
  width: 100%;
	border-spacing: 0;
}

.contents-table__head {
  background: linear-gradient(270deg, #41DE9D 0%, #2BB8F8 100%);
  color: #FFFFFF;
}

.contents-table__head th {
  padding: 0.9rem 0;
  text-align: left;
  font-size: 1.2rem;
}


.contents-table input[type="checkbox"] {
  width: 4rem;
  text-align: center;
}

.contents-table__record tr {
  border-bottom: 1px solid #E3E3E3;
}

.contents-table__record td {
  letter-spacing: 0px;
  color: #707070;
  opacity: 1;
  padding: 0.6rem 0;
}


/* 削除・編集ボタンスタイル */
.contents-table__record-button--edit,
.contents-table__record-button--delete {
  border: none;
  border-radius: 20px;
  color: #FFFFFF;
  padding: 0 0.7rem;
  height: 1.9rem;
  transition:  0.5s;
}

.contents-table__record-button--edit p,
.contents-table__record-button--delete p {
  font: normal normal normal 20px/30px Meiryo;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;
}

.contents-table__record-button--edit {
  background: #04C6C6;
  border: 1px solid #04C6C6;
}

.contents-table__record-button--delete {
  background: #FF5561;
  border: 1px solid #FF5561;
}

.contents-table__record-button--edit:hover,
.contents-table__record-button--delete:hover {
  cursor: pointer;
  transition:  0.5s;
}

.contents-table__record-button--edit:hover {
  background: #40dada;
}

.contents-table__record-button--delete:hover {
  background: #f8717a;
}


/* チェックボックスデザイン */
.contents-table__head-check{
  display: none;
}

.contents-table__head-check--checked {
  padding-left: 20px;
  position:relative;
  margin-right: 20px;
}

.contents-table__head-check--checked::before{
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 20px;
  width: 18px;
  height: 18px;
  border: 1px solid #999;
  background-color: #ffffff;
}

.contents-table__head-check:checked + .contents-table__head-check--checked::after{
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 25px;
  width: 7px;
  height: 14px;
  transform: rotate(40deg);
  border-bottom: 2px solid #ffffff;
  border-right: 2px solid #ffffff;
}

.contents-table__head-check:checked + .contents-table__head-check--checked::before{
  background-color: #04C6C6;
  border: none;
}

/* Chckedユーザ削除部はコンポーネント化できそうなので保留
.contents-buttom {
  padding: 1rem 0;
  align-items: center;
}
.contents-buttom__button {
  background: #FF5561;
  border: none;
  border-radius: 27px;
  color: #FFFCFC;
  font-weight: bold;
  margin-right: 2rem;
  height: 2rem;
  padding: 0 1.2rem;
}
.contents-buttom__button:hover {
  cursor: pointer;
  transition:  0.3s 0s ease-in;
  background: #f8717a;
} */
</style>


<style>
/* ページネーションスタイル */
/* scopedでは適用されないため */
.contents-pagination {
  margin: 0 auto;
  padding-left: 0;

}

.pagination {
  list-style: none;
  display: flex;
  justify-content: center;
  text-align: center;
}

.pagination-li {
  margin: 0 6px;
}

.pagination-a {
  background: #FFFFFF 0% 0% no-repeat padding-box;
  padding: 0.3rem 0.5rem;
  margin: 0 0.1rem;
  border-radius: 3px;
  color: #55BBBB;
}

.pagination-a:hover {
  background: #04C6C6 0% 0% no-repeat padding-box;
  padding: 0.3rem 0.5rem;
  margin: 0 0.1rem;
  border-radius: 3px;
  color: #FFFFFF;
  transition:  0.3s 0s ease-in;
  cursor: pointer;
}

.pagination-active a {
  background: #04C6C6 0% 0% no-repeat padding-box;
  color: #FFFFFF;
}
</style>
