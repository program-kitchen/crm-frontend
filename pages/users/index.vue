<template>
  <div class="users">
    <div class="main">
      <side-bar />
      <div class="contents">
        <div class="title-section">
          <h2 class="main-title">ユーザ</h2>
          <!-- <button class="user-register"><nuxt-link class="menu-title-text" to="/users/register" >新規登録</nuxt-link></button> -->
          <button class="user-register" @click="$router.push('/users/register')">新規登録</button>
        </div>
        <div class="search-section">
          <input type="text" placeholder="検索内容入力">
          <p>検索結果：1件</p>
        </div>
        <div class="table-section">
          <table>
            <thead class="table-header">
              <tr>
                <th>
                  <label>
                    <input type="checkbox" v-model="selectAll" class="checkbox-input">
                    <span class="checkbox-parts"></span>
                  </label>
                </th>
                <th>名前</th>
                <th>メールアドレス</th>
                <th>権限</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody class="table-contents">
              <tr v-for="user in perPageUsers" :key="user.id">
                <td>
                  <label>
                    <input type="checkbox" v-model="checkNames" v-bind:value="user.id" class="checkbox-input">
                    <span class="checkbox-parts"></span>
                  </label>
                </td>
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
                <td>{{user.position}}</td>
                <td><button class="user-edit-button" @click="$router.push(`/users/${user.id}/edit`)">編集</button></td>
                <td><button class="user-delete-button" @click="userDelete">削除</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="delete-section">
          <button class="delete-button" @click="selectedDeleteUsers">チェックしたユーザを消去</button>
          <p>該当件数：{{checkNames.length}} 件</p>
        </div>
        <div class="pagenation-section">
          <a>＜</a>
          <a class="page-number">2</a>
          <a class="page-number">3</a>
          <a class="page-number">4</a>
          <a>＞</a>
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
      page: 1,
      perPage: 3,
      // totalPage: Math.ceil(items.length/ perPage),
      // count: users.length
    }
  },
  computed: {
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
          this.users.forEach(function (user) {
            checkArray.push(user.id);
          });
        }
        this.checkNames = checkArray;
      }
    },
    perPageUsers() {
      return this.users.filter(
        (user, i) => 
          i >= (this.page -  1) * this.perPage &&
          i < this.page * this.perPage
      );
    }
  },
  methods: {
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

<style scoped>
.main,
.title-section,
.search-section,
.delete-section {
  display: flex;
}

.contents {
  width: 85%;
  padding-left: 2.5rem;
}

.title-section {
  padding: 2rem 0;
}

.main-title {
  padding-right: 2.5rem;
  color: #707070;
  font-weight: bold;
}

.user-register {
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

.user-register:hover {
  cursor: pointer;
  transition:  0.3s 0s ease-in;
  background: #40dada;
}

.menu-title-text {
  text-decoration: none;
  color: #FFFFFF;
}



.search-section {
  padding: 0.5rem 0;
  align-items: center;
}

.search-section input {
  width: 170px;
  padding: 0.3rem;
  margin-right: 2rem;
}




/* テーブルCSS */
.table-section {
  height: 60%;
  border-collapse: collapse;
  border-spacing: 0;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 16px 54px #89BDBD80;
  border-radius: 6px;
  opacity: 1;
  width: 95%;
}

.table-section table {
  border-collapse: collapse;
  width: 100%;
}


.table-header {
  background: linear-gradient(270deg, #41DE9D 0%, #2BB8F8 100%) 0% 0% ;
  color: #FFFFFF;
}

.table-header th {
  padding: 0.9rem 0;
  text-align: left;
  font-size: 1.2rem;
}

.table-section input[type="checkbox"] {
  width: 4rem;
  text-align: center;
}

.table-contents tr {
  border-bottom: 1px solid #E3E3E3;
}

.table-contents td {
  letter-spacing: 0px;
  color: #707070;
  opacity: 1;
  padding: 0.6rem 0;
}


/* 削除・編集ボタンスタイル */
.user-edit-button,
.user-delete-button {
  border: none;
  border-radius: 20px;
  color: #FFFFFF;
  padding: 0 0.7rem;
  height: 1.9rem;
  transition:  0.5s;
}

.user-edit-button p,
.user-delete-button p {
  font: normal normal normal 20px/30px Meiryo;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;
}

.user-edit-button {
  background: #04C6C6;
  border: 1px solid #04C6C6;
}

.user-delete-button {
  background: #FF5561;
  border: 1px solid #FF5561;
}

.user-edit-button:hover,
.user-delete-button:hover {
  cursor: pointer;
  transition:  0.5s;
}

.user-edit-button:hover {
  background: #40dada;
}

.user-delete-button:hover {
  background: #f8717a;
}

/* チェックボックスデザイン */
.checkbox-input{
  display: none;
}
.checkbox-parts{
  padding-left: 20px;
  position:relative;
  margin-right: 20px;
}
.checkbox-parts::before{
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

.checkbox-input:checked + .checkbox-parts::after{
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

.checkbox-input:checked + .checkbox-parts::before{
  background-color: #04C6C6;
  border: none;
}


/* Chckedユーザ削除部 */
.delete-section {
  padding: 1rem 0;
  align-items: center;
}

.delete-button{
  background: #FF5561;
  border: none;
  border-radius: 27px;
  color: #FFFCFC;
  font-weight: bold;
  margin-right: 2rem;
  height: 2rem;
  padding: 0 1.2rem;
}

.delete-button:hover {
  cursor: pointer;
  transition:  0.3s 0s ease-in;
  background: #f8717a;
}



/* ページネーション */
.pagenation-section {
  margin: 0 auto;
  text-align: center;
}

.page-number {
  background: #FFFFFF 0% 0% no-repeat padding-box;
  padding: 0.3rem 0.5rem;
  margin: 0 0.1rem;
  border-radius: 3px;
  color: #55BBBB;
}

.page-number:hover {
  background: #04C6C6 0% 0% no-repeat padding-box;
  padding: 0.3rem 0.5rem;
  margin: 0 0.1rem;
  border-radius: 3px;
  color: #FFFFFF;
  transition:  0.3s 0s ease-in;
  cursor: pointer;
}

</style>