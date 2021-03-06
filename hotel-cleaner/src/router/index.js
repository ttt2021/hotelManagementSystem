import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  },
  // {
  //   path: '/catering',
  //   name: 'catering',
  //   component: () => import('@/views/catering/index.vue')
  // }
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
