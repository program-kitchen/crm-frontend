<template>
  <div class="user-register">
    <side-bar />
    <div class="main">
      <div class="user-register-form">
        <div>
          <h1 class="form-title">ユーザー登録</h1>
          <label for="email">メールアドレス</label>
          <input id="email" type="text" class="form-area" name="email">
          <label for="name">名前</label>
          <input id="name" type="text" class="form-area" name="name">
          <label for="position">権限</label>
          <select name="position" class="form-area">
          <option value="サンプル1">管理者</option>
          <option value="サンプル2">バックオフィス</option>
          <option value="サンプル3">コーチ</option>
          </select>
          <button class="sendAuthEmail">認証メールを送信</button>
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
.user-register {
  display: flex;
}

.user-register-form {
  display: flex;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 16px 54px #89BDBD80;
  border-radius: 10px;
  opacity: 1;
}

.form-title {
  padding: 1.2rem;
}

.user-register-form label{
  display: block;
}

.form-area {
  box-sizing:border-box;
  height: 2rem;
  width: 200px;
}

select {
  display: block;
}

.sendAuthEmail {
  background: linear-gradient(270deg, #41DE9D 0%, #2BB8F8 100%) 0% 0% ;
  border-radius: 36px;
  border: none;
  color: #FFFFFF;
  padding: 0.4rem 0.6rem;
}
</style>