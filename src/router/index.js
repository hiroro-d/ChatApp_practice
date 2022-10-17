import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { auth } from '@/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: () => import('../views/MyPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/login',
    name: 'LogIn',
    component: () => import('../views/LogIn.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    const authApp = auth;
    onAuthStateChanged(authApp, (user) => {
      if(!user) {
        next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  });
  } else {
    next() // next() を常に呼び出すようにしてください!
  }
})

export default router
