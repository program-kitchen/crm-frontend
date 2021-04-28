<template>
  <div class="users">
    <div class="main">
      <side-bar />
      <div class="contents">
        <div class="contents-head">
          <h2 class="contents-head__text">ユーザ</h2>
          <!-- <button class="user-register"><nuxt-link class="menu-title-text" to="/users/register" >新規登録</nuxt-link></button> -->
          <button class="contents-head__button" @click="$router.push('/users/register')">新規登録</button>
        </div>

        <div class="contents-search">
          <input type="text" placeholder="検索内容入力">
          <p>検索結果：1件</p>
        </div>

        <div class="contents-table">
          <table>
            <thead class="contents-table__head">
              <tr>
                <th>
                  <label>
                    <input type="checkbox" v-model="selectAll" class="contents-table__head-check">
                    <span class="contents-table__head-check_exist"></span>
                  </label>
                </th>
                <th>名前</th>
                <th>メールアドレス</th>
                <th>権限</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody class="contents-tablle__record">
              <tr v-for="(user, index) in getItems" :key="index">
                <td>
                  <label>
                    <input type="checkbox" v-model="checkNames" v-bind:value="user.id" class="contents-table__head-check">
                    <span class="contents-table__head-check_exist"></span>
                  </label>
                </td>
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
                <td>{{user.position}}</td>
                <td><button class="contents-tablle__record-button_edit" @click="$router.push(`/users/${user.id}/edit`)">編集</button></td>
                <td><button class="contents-tablle__record-button_delete" @click="userDelete">削除</button></td>
              </tr>
            </tbody>
          </table>
        </div>        
        <div class="contents-buttom">
          <button class="contents-buttom__button" @click="selectedDeleteUsers">チェックしたユーザを消去</button>
          <p>該当件数：{{checkNames.length}} 件</p>
        </div>
        <div class="pagenation-section">
          <paginate v-if="(getPageCount > 1)"
            :page-count="getPageCount"
            :page-range="3"
            :margin-pages="2"
            :click-handler="clickViewPage"
            :prev-text="'＜'"
            :next-text="'＞'"
            :container-class="'pagination'"
            :page-class="'pagination-li'"
            :page-link-class="'pagination-a'">
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
      checkNames: [],
      users: [
          { id: 1, name: '田中太郎' , email: "test1@test.com", position: "コーチ"},
          { id: 2, name: '斉藤一朗' , email: "test2@test.com", position: "コーチ"},
          { id: 3, name: '中村絵梨子' , email: "test3@test.com", position: "バックオフィス"},
          { id: 4, name: '田中一郎' , email: "test4@test.com", position: "コーチ"},
          { id: 5, name: '斉藤二郎' , email: "test5@test.com", position: "管理者"},
      ],
     parPage: 2,
     currentPage: 1
    }
  },
   computed: {
     getItems: function() {
       let current = this.currentPage * this.parPage;
       let start = current - this.parPage;
       return this.users.slice(start, current);
     },
     getPageCount: function() {
       return Math.ceil(this.users.length / this.parPage);
     },
    selectAll: {
      get () {
        //ユーザチェックボックスにすべてチェックが入ったかを判定
        if(this.checkNames.length == this.users.length){
          return true //すべてチェックを入れるとselectAllはtrueとなりチェックが入る
        }else{
          return false
        }
      },
      set (value) { //全選択のチェックボックスを操作した場合
        //空の配列を用意
        let checkArray = [];
        //チェックが入った場合（trueでの判定）
        if (value) {
          this.getItems.forEach(function (user) {
            checkArray.push(user.id);
          });
        }
        this.checkNames = checkArray;
      }
    },
  },
  methods: {
    clickViewPage: function (pageNum) {
       this.currentPage = Number(pageNum);
    },
    userDelete() {
      if(window.confirm('ユーザーを削除します。よろしいでしょうか？')) {
        // 削除API処理を実行
      }
    },
    selectedDeleteUsers() {
      if(window.confirm('ユーザーを削除します。よろしいでしょうか？')) {
        console.log(this.checkNames);  // チェックされたユーザーIDを確認
        // 削除API処理を実行
      } 
    }
  }
}
</script>

<style>
.main,
.contents-head,
.contents-search,
.contents-buttom {
  display: flex;
}
.contents {
  width: 85%;
  padding-left: 2.5rem;
}
.contents-head {
  padding: 2rem 0;
}
.contents-head__text {
  padding-right: 2.5rem;
  color: #707070;
  font-weight: bold;
}
.contents-head__button {
  background: #04C6C6;
  border: none;
  padding: 0 1.2rem;
  border-radius: 27px;
  opacity: 1;
  font-size: 1.1rem;
  text-align: center;
  color: #FFFFFF;
  font-weight: bold;
}
.contents-head__button:hover {
  cursor: pointer;
  transition:  0.3s 0s ease-in;
  background: #40dada;
}
.menu-title-text {
  text-decoration: none;
  color: #FFFFFF;
}
.contents-search {
  padding: 0.5rem 0;
  align-items: center;
}
.contents-search input {
  width: 170px;
  padding: 0.3rem;
  margin-right: 2rem;
}
/* テーブルCSS */
.contents-table {
  height: 60%;
  border-collapse: collapse;
  border-spacing: 0;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 16px 54px #89BDBD80;
  border-radius: 6px;
  opacity: 1;
  width: 95%;
}
.contents-table table {
  border-collapse: collapse;
  width: 100%;
}
.contents-table__head {
  background: linear-gradient(270deg, #41DE9D 0%, #2BB8F8 100%) 0% 0% ;
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
.contents-tablle__record tr {
  border-bottom: 1px solid #E3E3E3;
}
.contents-tablle__record td {
  letter-spacing: 0px;
  color: #707070;
  opacity: 1;
  padding: 0.6rem 0;
}
/* 削除・編集ボタンスタイル */
.contents-tablle__record-button_edit,
.contents-tablle__record-button_delete {
  border: none;
  border-radius: 20px;
  color: #FFFFFF;
  padding: 0 0.7rem;
  height: 1.9rem;
  transition:  0.5s;
}
.contents-tablle__record-button_edit p,
.contents-tablle__record-button_delete p {
  font: normal normal normal 20px/30px Meiryo;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;
}
.contents-tablle__record-button_edit {
  background: #04C6C6;
  border: 1px solid #04C6C6;
}
.contents-tablle__record-button_delete {
  background: #FF5561;
  border: 1px solid #FF5561;
}
.contents-tablle__record-button_edit:hover,
.user-delete-button:hover {
  cursor: pointer;
  transition:  0.5s;
}
.contents-tablle__record-button_edit:hover {
  background: #40dada;
}
.contents-tablle__record-button_delete:hover {
  background: #f8717a;
}
/* チェックボックスデザイン */
.contents-table__head-check{
  display: none;
}
.contents-table__head-check_exist {
  padding-left: 20px;
  position:relative;
  margin-right: 20px;
}
.contents-table__head-check_exist::before{
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
.contents-table__head-check:checked + .contents-table__head-check_exist::after{
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 25px;
  width: 7px;
  height: 14px;
  transform: rotate(40deg);
  border-bottom: 2px solid white;
  border-right: 2px solid white;
}
.contents-table__head-check:checked + .contents-table__head-check_exist::before{
  background-color: #04C6C6;
  border: none;
}
/* Chckedユーザ削除部 */
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
}

/* ページネーション */
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
</style>
