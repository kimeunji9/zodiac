import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { routerList } from '@/router/routerList'
import store from '@/store/index'
import { getCookieValue, resetCookie } from '@/utils/cookies'
import { refresh } from '@/api/auth'

const routes: Array<RouteRecordRaw> = routerList

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
      return next({ name: 'Login' })
    }

    if (!store_ccessToken || !cookie_ccessToken) {
      const accessToken = store_ccessToken || cookie_ccessToken

      const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
      };

      store.dispatch('setToken', config)
      .then( res => {
        console.log('success')
      })
      .catch( e => {
        resetCookie()
        next({ name: 'Login' })
      })
    }
  }
  next()
})

export default router
