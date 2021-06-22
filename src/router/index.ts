import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { menuList } from '@/router/menuList'
import store from '@/store/index'
import { getCookieValue, resetCookie } from '@/utils/cookies'

const routes: Array<RouteRecordRaw> = menuList

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const cookie_ccessToken = getCookieValue('accessToken')
    const cookie_refreshToken = getCookieValue('refreshToken')
    const store_ccessToken = store.state.accessToken
    const store_refreshToken = store.state.refreshToken

    if (!cookie_ccessToken && !cookie_refreshToken) {
      alert('로그인을 해주세요.')
      resetCookie()
      return next({ name: 'login' })
    }

    store.dispatch('setToken', {
      access_token: store_ccessToken || cookie_ccessToken,
      refresh_token: store_refreshToken || cookie_refreshToken
    })
    .then(() => {
      console.log('success')
    })
    .catch((err: void, message: void) => {
      console.log('err:', err, message)
    })
  }
  next()
})

export default router
