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
      {
        path: '/home',
        name: 'adminHome',
        meta: {
          loginRequest: true
        },
        component: () => import('@/components/adminHome.vue')
      },
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
      },
      {
        path: '/settlement',
        name: 'settlement',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/settlement/index.vue')
      },
      {
        path: '/bookRoom',
        name: 'bookRoom',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/bookRoom/index.vue')
      },
      {
        path: '/updatedBook',
        name: 'updatedBook',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/updatedBook/index.vue')
      },
      {
        path: '/transferRoom',
        name: 'transferRoom',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/transferRoom/index.vue')
      },
      {
        path: '/drinkRoom',
        name: 'drinkRoom',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/drinkRoom/index.vue')
      },
      {
        path: '/orderManagement',
        name: 'orderManagement',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/orderManagement/index.vue')
      },
      {
        path: '/checkIn',
        name: 'checkIn',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/checkIn/index.vue')
      },
      {
        path: '/historicalOrder',
        name: 'historicalOrder',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/historicalOrder/index.vue')
      },
      {
        path: '/statistics',
        name: '/statistics',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views//statistics/index.vue')
      },
      {
        path: '/logManagement',
        name: '/logManagement',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/logManagement/index.vue')
      },
      {
        path: '/writeArticle',
        name: '/writeArticle',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/writeArticle/index.vue')
      },
      {
        path: '/articleList',
        name: '/articleList',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/articleList/index.vue')
      },
      {
        path: '/articleDetail',
        name: '/articleDetail',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/articleDetail/index.vue')
      },
      {
        path: '/checkArticle',
        name: '/checkArticle',
        meta: {
          loginRequest: true
        },
        component: () => import('@/views/checkArticle/index.vue')
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
