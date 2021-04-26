<template>
  <div class="cources">
    <div class="main">
      <side-bar />
      <div class="contents">
        <div class="title-section">
          <h2 class="main-title">コース管理</h2>
          <button class="cource-register">新規登録</button>
        </div>
        <div class="table-section">
          <table>
            <thead class="table-header">
              <tr>
                <th class="cell-small-area"><input type="checkbox" id="cource-select"><label></label></th>
                <th>コース名</th>
                <th>期間</th>
                <th>概要</th>
                <th class="cell-small-area"></th>
                <th class="cell-small-area"></th>
              </tr>
            </thead>
            <tbody class="table-contents">
              <tr>
                <td><input id="cource-check-1" type="checkbox"><label for="cource-check-1"></label></td>
                <td>スキルアップコース</td>
                <td>4ヶ月</td>
                <td>副業で稼ぐスキルを身につけるためのコース</td>
                <td class="button-area"><button class="cource-edit-button">編集</button></td>
                <td class="button-area"><button class="cource-delete-button">削除</button></td>
              </tr>
              <tr>
                <td><input id="cource-check-2" type="checkbox"><label for="cource-check-2"></label></td>
                <td>フリーランスコース</td>
                <td>6ヶ月</td>
                <td>最短でフリーランスになるための高レベルコース</td>
                <td class="button-area"><button class="cource-edit-button">編集</button></td>
                <td class="button-area"><button class="cource-delete-button">削除</button></td>
              </tr>
              <tr>
                <td><input id="cource-check-3" type="checkbox"><label for="cource-check-3"></label></td>
                <td>スキルアップコース</td>
                <td>3ヶ月</td>
                <td>副業で稼ぐスキルを身につけるためのコース</td>
                <td class="button-area"><button class="cource-edit-button">編集</button></td>
                <td class="button-area"><button class="cource-delete-button">削除</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="delete-section">
          <button>チェックしたコースを消去</button>
          <p>該当件数：1件</p>
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
  
}
</script>

<style scoped>
.cources {
  background: #EEF2F2 0% 0% no-repeat padding-box;

}

.main,
.title-section,
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

.cource-register {
  background: #04C6C6 0% 0% no-repeat padding-box;
  border: none;
  padding: 0 20px;
  border-radius: 27px;
  opacity: 1;
  font-size: 1.1rem;
  text-align: center;
  color: #FFFFFF;
  font-weight: bold;
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
  table-layout: fixed;
}


.table-header {
  background: linear-gradient(270deg, #41DE9D 0%, #2BB8F8 100%) 0% 0% ;
  color: #FFFFFF;
}

.table-header th {
  padding: 0.9rem 0;
  text-align: left;
  font-size: 1.2rem;
  /* border: 1px solid black; */
  /* width: 100px; */
  
}

.table-section input[type="checkbox"] {
  width: 4rem;
  text-align: center;
}

.table-contents tr {
  border-bottom: 1px solid #E3E3E3;
}

.table-contents td {
  color: #707070;
  opacity: 1;
  padding: 0.6rem 0;
  /* width: 100px; */
}


/* 2ボタン共通スタイル */
.cell-small-area {
  width: 9rem;
}
.button-area {
  text-align: center;
}
.cource-edit-button,
.cource-delete-button {
  border: none;
  border-radius: 20px;
  color: #FFFFFF;
  padding: 0 0.7rem;
  height: 1.9rem;
}

.cource-edit-button p,
.cource-delete-button p {
  font: normal normal normal 20px/30px Meiryo;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;
}

.cource-edit-button {
  background: #04C6C6 0% 0% no-repeat padding-box;
  border: 1px solid #04C6C6;
}

.cource-delete-button {
  background: #FF5561 0% 0% no-repeat padding-box;
  border: 1px solid #FF5561;

}

/* チェックボックス変更 */
/* .table-contents input[type="checkbox"]{
  display: none;
}

.table-contents input[type="checkbox"]+label{
    display: none;
    cursor: pointer;
    display: inline-block;
    position: relative;
    padding-left: 25px;
    padding-right: 10px;
}

.table-contents input[type="checkbox"]+label::before{
    content: "";
    position: absolute;
    display: block;
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    left: 0;
    top: 50%;
    border: 0.5px solid;
    border-color:  #585753; 
    background: #04C6C6;
}

.table-contents input[type="checkbox"]:checked+label::after{
    content: "";
    position: absolute;
    display: block;
    box-sizing: border-box;
    width: 18px;
    height: 9px;
    margin-top: -9px;
    top: 50%;
    left: 3px;
    transform: rotate(-45deg);
    border-bottom: 3px solid;
    border-left: 3px solid;
    border-color:  white; 
} */


/* チェックユーザ削除部 */
.delete-section {
  padding: 1rem 0;
}

.delete-section button{
  background: #FF5561 0% 0% no-repeat padding-box;
  border: none;
  border-radius: 27px;
  color: #FFFCFC;
  font-weight: bold;
  margin-right: 2rem;
  height: 2rem;
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