<template>
  <nav>
    <p class="main-logo">(コーチテックの画像が入る予定)</p>
    <ul class="menu">
      <nuxt-link class="menu-title-text" to="/" ><li class="menu-title">TOP</li></nuxt-link>
      <nuxt-link class="menu-title-text" to="/users" ><li class="menu-title">ユーザ</li></nuxt-link>
      <nuxt-link class="menu-title-text" to="/cources" ><li class="menu-title">コース</li></nuxt-link>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    }
  },
  // mounted() {
  //   if(this.$route.path == '/') {
  //     this.isActive == true ? this.isActive = false : this.isActive = true

  //     console.log(this.$route.path);
  //     console.log(this.isActive);
  //   } else {
  //     console.log(this.isActive);
  //   }
  // }
}
</script>

<style scoped>
.bgColorClass {
  background-color: gray;
}
nav {
  top: 0px;
  left: 0px;
  width: 15%;
  height: 100vh;
  background: #04C6C6;
  opacity: 1;
}

.main-logo {
  margin: 20px 0;
}

.menu {
  width: 100%;
  padding-left: 0px;
}

.menu-title {
  list-style: none;
  padding: 0.8rem 0;
  padding-left: 1.5rem;
  opacity: 0.64;
  transition: 0.5s;
}

.menu-title:hover {
  background:#00B3B3;
  cursor: pointer;
  opacity: 1;
  transition: 0.5s;
}

.menu-title-text {
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #FFFFFF;
  text-decoration: none;
}
</style>