import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
        path: '/home/userInfo',
        name: 'userInfo',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/userInfo/index.vue')
      },
      {
        path: '/home/position',
        name: 'position',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/position/index.vue')
      },
      {
        path: '/home/hotelInfo',
        name: 'hotelInfo',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/hotelInfo/index.vue')
      },
      {
        path: '/home/updateHotelInfo',
        name: 'updateHotelInfo',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/updateHotelInfo/index.vue')
      },
      {
        path: '/home/updateInfo',
        name: 'updateInfo',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/updateInfo/index.vue')
      },
      {
        path: '/home/updateAvatar',
        name: 'updateAvatar',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/updateAvatar/index.vue')
      },
      {
        path: '/home/updatePassword',
        name: 'updatePassword',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/updatePassword/index.vue')
      },
      {
        path: '/room/styleRoom',
        name: 'styleRoom',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/styleRoom/index.vue')
      },
      {
        path: '/home/queryRoom',
        name: 'queryRoom',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/queryRoom/index.vue')
      },
      {
        path: '/home/addRoom',
        name: 'addRoom',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/addRoom/index.vue')
      },
      {
        path: '/home/drink',
        name: 'drink',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/drink/index.vue')
      },
      {
        path: '/staff',
        name: 'staff',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/staff/index.vue')
      },
      {
        path: '/roomKind',
        name: 'roomKind',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/roomKind/index.vue')
      },
      {
        path: '/viewRoom',
        name: 'viewRoom',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/viewRoom/index.vue')
      },
      {
        path: '/orderRoom',
        name: 'orderRoom',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/orderRoom/index.vue')
      },
      {
        path: '/checkOut',
        name: 'checkOut',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/checkOut/index.vue')
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
