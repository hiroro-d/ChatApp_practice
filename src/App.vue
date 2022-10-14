<template>
  <v-app>
    <v-main>
          <router-link to="/login">login</router-link> |
          <router-link to="/signin">signin</router-link> |
          <router-link to="/mypage">MyPage</router-link>
        <router-view/>
    </v-main>
  </v-app>
</template>

