<template>
  <div class="contents-buttom">
    <div>
      <button
        class="contents-buttom__button--enable"
        v-show="sendDeleteData.length == 0"
      >
        削除できません
      </button>
      <button 
        class="contents-buttom__button" 
        @click="confirmDelete" v-show="sendDeleteData.length >= 1"
      >
        チェックしたユーザを消去
      </button>
    </div>
    <p>該当件数：{{sendDeleteData.length}} 件</p>
  </div>
</template>


<script>
export default {
  props: {
    sendDeleteData: {
      type: Array
    },
    pageInfo: {
      type: String
    }
  },
  methods: {
    confirmDelete() {
      if(window.confirm('選択したユーザを削除します。よろしいですか？')) {
        this.selectedDeleteUsers();
      }
    },
    // 削除API処理
    async selectedDeleteUsers() {
      const userData = this.sendDeleteData.join(',');
      await
        this.$axios
          .post(`https://api.coachtech-crm.com/api/${this.pageInfo}/delete`, {
            "uuid" : userData
          })
          .then(() => {
            window.alert('削除完了しました')
            this.$emit('fetchData')
          })
          .catch(() => this.$router.push('/error'))
    }

  }
}
</script>

<style scoped>
/* Chckedユーザ削除部 */
.contents-buttom {
  padding: 1rem 0;
  margin-top: 1rem;
  display: flex;
  align-items: center;
}

.contents-buttom__button--enable,
.contents-buttom__button {
  border: none;
  border-radius: 27px;
  color: #FFFCFC;
  font-weight: bold;
  margin-right: 2rem;
  padding-top: 2rem;
  height: 5rem;
  width: 28rem;
  padding: 0 1.2rem;
}

.contents-buttom__button {
  background: #FF5561;
}

.contents-buttom__button--enable {
  background: #b8b3b3;
}

.contents-buttom__button:hover {
  cursor: pointer;
  transition:  0.3s 0s ease-in;
  background: #f8717a;
}

.contents-buttom p {
  color: #555454;
}

</style>
