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
    meta: {
      loginRequest: true
    },
    component: () => import('@/views/home/index.vue'),
    children: [
      // {
      //   path:'/home',
      //   redirect: '/home/community'
      // },
      {
        path:'/home/updateAvatar',
        name: 'updateAvatar',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/updateAvatar/index.vue')
      },
      {
        path:'/home/updatePassword',
        name: 'updatePassword',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/updatePassword/index.vue')
      }
    ]
  },
  {
    path: '/lock',
    name: 'lock',
    meta: {
      loginRequest: true
    },
    component: () => import('@/views/lock/index.vue')
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
