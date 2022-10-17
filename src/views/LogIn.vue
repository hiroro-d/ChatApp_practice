<template>
  <v-container>
    <v-row
        justify="center" align-content="center"
    >
      <v-col cols="md">
        <v-card>
          <v-card-title>ログイン</v-card-title>
            <v-form
                ref="form"
            >
              <v-row
                  justify="center" align-content="center"
              >
                <v-col
                    cols="10"
                >
                  <v-text-field
                      label="ログインID"
                      v-model="email"
                  ></v-text-field>
                  <v-text-field
                      label="パスワード"
                      v-model="pw"
                  ></v-text-field>
                  <v-spacer></v-spacer>
                  <v-btn
                      depressed
                      color="primary"
                      @click="login()"
                  >
                      ログイン
                  </v-btn>
                  <v-btn
                      link to="/signin"
                      text
                      depressed
                      color="primary"
                      @click="this.$router.push('/signin')"
                  >
                      登録はこちら
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebaseApp from '@/firebase/firebase.js'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebaseApp)

export default {
  data: () => ({
    email: '',
    pw: ''
  }),
  methods: {
    login() {
      signInWithEmailAndPassword(auth, this.email, this.pw)
        .then((res) => {
          const user = res.user
          console.log('create user success.' + user)
          this.$refs.form.reset();
          // ★成功レスポンスだった場合は『this.$router.push('/top')』で遷移します
          const userInfo = {
            displayName: user.displayName,
          }
          sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
          this.$router.push('/mypage')
        })
        .catch((error) => {
          alert('認証失敗', error)
        })
    }
  }
}
</script>