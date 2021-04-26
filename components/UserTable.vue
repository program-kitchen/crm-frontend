<template>
  <!-- コンポーネント化検討ファイルのため、気にしないでください -->
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
        <tr v-for="user in users" :key="user.id">
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
</template>

<script>
export default {
  data() {
    return {
      checkNames: [],
      users: [
          { id: 1, name: '田中太郎' , email: "test1@test.com", position: "コーチ"},
          { id: 2, name: '斉藤一朗' , email: "test2@test.com", position: "コーチ"},
          { id: 3, name: '中村絵梨子' , email: "test3@test.com", position: "バックオフィス"}
      ],
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
    }
  },
  methods: {
    userDelete() {
      if(window.confirm('ユーザーを削除します。よろしいでしょうか？')) {
        // 削除API処理を実行
      }
    }
  }
}
</script>


<style scoped>
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
</style>