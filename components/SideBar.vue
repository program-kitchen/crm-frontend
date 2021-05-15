<template>
  <nav>
    <img class="logo" src="@/assets/images/coachtech-crm_logo.svg">
    <ul class="menu">
      <nuxt-link class="menu__link" to="/" >
        <li class="menu__link-title" v-bind:class="{ 'menu__link-title-active': this.$route.path == '/' }">
          TOP
        </li>
      </nuxt-link>
      <nuxt-link class="menu__link" to="/user" >
        <li class="menu__link-title" v-bind:class="{ 'menu__link-title-active': this.$route.path.startsWith('/user') }">
          ユーザ
        </li>
      </nuxt-link>
      <nuxt-link class="menu__link" to="/cources" >
        <li class="menu__link-title" v-bind:class="{ 'menu__link-title-active': this.$route.path.startsWith('/cources') }">
          コース
        </li>
      </nuxt-link>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  top: 0px;
  left: 0px;
  width: 17%;
  height: 100vh;
  background: #04C6C6;
  opacity: 1;
}
.logo {
  margin: 0 auto;
  padding: 2.5rem 0;
  width: 90%;
}
.menu {
  width: 100%;
  padding-left: 0px;
}

.menu__link {
  font-weight: bold;
  color: #FFFFFF;
  text-decoration: none;
}

.menu__link-title {
  list-style: none;
  padding: 1.5rem 0;
  padding-left: 2.5rem;
  opacity: 0.64;
  transition: 0.5s;
  font-size: 1.7rem;
}

.menu__link-title:hover {
  background:#00B3B3;
  cursor: pointer;
  opacity: 1;
  transition: 0.5s;
}


.menu__link-title-active {
  background:#00B3B3;
  opacity: 1;
}
</style>
