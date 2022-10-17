<template>
  <v-container>
    <v-row>
      <v-col cols="12">
         <v-text-field
            label="Name*"
            v-model="name"
        ></v-text-field>
        <v-text-field
            label="Email*"
            v-model="email"
        ></v-text-field>
        <v-text-field
            label="Password*"
            type="password"
            v-model="pw"
        ></v-text-field>
        <v-btn
          color="primary"
          @click="createUser()"
        >
            登録
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebaseApp from '@/firebase/firebase.js'
import { getAuth, createUserWithEmailAndPassword, updateProfile, } from "firebase/auth";

const auth = getAuth(firebaseApp)

export default {
  data: () => ({
    name: '',
    email: '',
    pw: ''
  }),
  methods: {
    createUser() {
      createUserWithEmailAndPassword(auth, this.email, this.pw)
        .then((res) => {
          const user = res.user
          console.log('create user success.' + user)
          alert('作成成功')
          updateProfile(auth.currentUser, {
            displayName: this.name
          }).then(() => {
            return
          }).catch((error) => {
            return error
          })
          this.$router.push('/login')
        })
        .catch((error) => {
          alert('作成失敗', error)
        })
    }
  }
}
</script>
