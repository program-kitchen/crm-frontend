<template>
  <div class="error">
    <SideBar />

    <div class="error-modal">
      <div class="error-modal__message-box">
        <p class="error-modal__message">大変申し訳ございません。</p>
        <p class="error-modal__message">予期せぬエラーが発生しました。</p>
        <p class="error-modal__message">管理者にお問い合わせください。</p>
      </div>
      <button class="error-modal__button crm-modal__button">
        <NuxtLink class="error-modal__button__link" to="/">TOPに戻る</NuxtLink>
      </button>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.error {
  display: flex;
  align-items: center;
  height: 100vh;
}

.error-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #555454;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0rem 1.6rem 5.4rem #89bdbd80;
  border-radius: 1rem;
  opacity: 1;
  width: 60%;
  height: 85%;
  margin: 0 auto;
}
.error-modal__message-box {
  margin-bottom: 6rem;
}
.error-modal__message {
  text-align: left;
  font: normal normal normal 35px/52px Meiryo;
  font-size: 3.5rem;
  letter-spacing: 0px;
  color: #707070;
  opacity: 1;
}

.error-modal__button {
  width: 27rem;
}
.error-modal__button__link,
.error-modal__button__link:link,
.error-modal__button__link:visited,
.error-modal__button__link:hover,
.error-modal__button__link:active {
  text-decoration: none;
  color: #ffffff;
}
</style>
