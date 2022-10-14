<template>
  <v-container>
    <v-btn color="primary" @click="errorC"
    >エラーチェックbtn</v-btn>

    <v-list
      v-for="item in loglog"
      :key="item.id"
    >
      <template
      >{{ item.logs }}</template>
    </v-list>

    <div class="message">
      <v-text-field
        v-model="msg"
      >aaa</v-text-field>
      <v-btn color="primary" @click="addLogs"
      >そうしんっ！</v-btn>
    </div>
  </v-container>
</template>

<script>
import { db } from '@/firebase/firebase';
import { collection, addDoc, serverTimestamp, query, onSnapshot, orderBy} from 'firebase/firestore'
// , where, getDocs, deleteDoc, doc,

export default {
  data: () => ({
    msg: null,
    logId: 0,
    logs: [], //DBからmsgたちを呼び出した時に入る箱
  }),

  mounted() {
    const q = query(collection(db, 'chats'), orderBy('logId'))
    onSnapshot(q, snapshot => {
      //dbの全てのmenuIdを取得（配列になる）
      const allId = snapshot.docs.map(doc => {
        return doc.data().logId;
      })
      //現在のdb登録済みのID番号の最大値を取得
      if(allId.length > 0) {
        this.logId = allId.reduce((a,b) => a > b ? a:b) + 1;
      }
      snapshot.docChanges().forEach(change => {
        if(change.type === 'added') {
          this.logs.push(change.doc.data());
        }
      })
    })
  },
  computed: {
    loglog() {
      if(this.logs) {
        return this.logs
      }
      return null
    }
  },

  methods: {
    addLogs() {
      this.logs.push(this.msg);
      addDoc(collection(db, 'chats'), {
        createdAt: serverTimestamp(),
        logs: this.msg,
        logId: this.logId,
      })
      .then((doc) => {
        console.log(`データ追加に成功しました！ (${doc.id})`);
        this.logId++;
        this.msg = "";
      })
      .catch(error => {
        //エラー時の処理
        console.log(`データ追加に失敗しました (${error}`);
      })
    },
    errorC() {
      console.log()
    }
  },
}
</script>

<style scoped>

.message {
  position: absolute;
  bottom: 5%;
}

</style>
