<template>
  <v-container>
    <p> {{ loginUser.displayName }} </p>
    <v-btn @click="logout">ろぐあうと</v-btn>
    <ChatComp/>
  </v-container>
</template>

<script>
// import firebaseApp from '@/firebase/firebase.js'
// import { getAuth, } from "firebase/auth";
import ChatComp from "@/components/ChatComp.vue";
import { auth,} from '@/firebase/firebase';
import { signOut, } from 'firebase/auth';


export default {
  components: {
    ChatComp,
  },
  data() {
    return {
      loginUser: ''
    }
  },
  mounted() {
    this.loginUser = JSON.parse(sessionStorage.getItem('userInfo'));
  },
  methods: {
    logout() {
      const authApp = auth;
      signOut(authApp).then(() => {
        this.$router.push('login')
      }).catch((error) => {
        alert('しっぱい', error)
      })
    }
  }
}
</script>
