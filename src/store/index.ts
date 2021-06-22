import { createStore } from "vuex";
import { login, logout, refresh } from '@/api/auth';
import { getCookieValue, resetCookie } from '@/utils/cookies'
import router from '@/router/index';

export default createStore({
  state: {
    accessToken: '',
    refreshToken: '',
    count: 1,
    tabList: [],
    writeList: []
  },
  mutations: {
    logout() {
      const access_token = getCookieValue('accessToken')
      logout({access_token })
        .then(() => {
          resetCookie()
        })
    },
    setToken(state, payload) {
      const { access_token, refresh_token, expiration_in } = payload
      const expires = new Date(parseInt(expiration_in))

      document.cookie = `accessToken=${access_token}; expires=${expires}; path=/;`
      document.cookie = `refreshToken=${refresh_token}; expires=${expires}; path=/;`
      document.cookie = `expiration_in=${expiration_in}; expires=${expires}; path=/;`

      state.accessToken = access_token
      state.refreshToken = refresh_token
    },
    add_tab(state:any, payload:any) {
      if (state.tabList.length === 0) {
        return state.tabList.push(payload)
      } else {
        // 탭에 중복으로 들어가지 않도록
        let deplicatedPath = state.tabList.some((item: any) => {
          return item.path === payload.path
        })

        if (!deplicatedPath) {
          state.tabList.push(payload)
        }

        // 기사작성 탭이 선택되어있을 경우 해제
        state.tabList.forEach((item: any) => {
          if (item.name === 'write') {
            item.meta.tabActive = false
          }
        })
      }
    },
    delete_tab(state, payload) {
      const { idx, item } = payload

      state.tabList.splice(idx, 1)

      // writeList 삭제
      state.writeList.forEach((listItem, idx) => {
        if (item.path.slice(-1) == listItem.id) {
          state.writeList.splice(idx, 1)
        }
      })

      if (item.name === 'write') {
        --state.count
      }

      // 삭제된 후 리스트의 마지막 인덱스
      const lastIdx = state.tabList.length - 1
      const previousTab = state.tabList[lastIdx]

      if (previousTab && previousTab.name === 'write') {
        item.meta.tabActive = false;
        previousTab.meta.tabActive = true
        router.push({ name: 'write', params: { id: previousTab.path.slice(-1) } })

        return
      }

      // 마지막 tab을 눌렀을 때 이전 tab 색깔 토글, 이전 tab으로 이동
      if (lastIdx > -1) {
        previousTab.meta.active = true
        router.push({ name: previousTab.name })
      }
      // 모든 탭이 닫혔을 경우 메인페이지로 이동
      else if (state.tabList.length === 0) {
        router.push({ name: 'main' })
      }
    },
    add_write_tab(state, payload) {
      payload.meta.tabActive = true
      state.tabList.push(payload)

      // 마지막으로 클릭한 기사작성 메뉴 탭만 활성화되도록
      state.tabList.forEach(menu => {
        if (payload.path !== menu.path) {
          menu.meta.tabActive = false
        }
      })
    },
    create_write_list(state, payload) {
      // id값이 중복되는 것은 덮어씌우기
      if (state.writeList.length) {
        state.writeList.forEach((item, idx) => {
          if (item.id === payload.id) {
            state.writeList.splice(idx, 1)
          }
        })
      }
      state.writeList.push(payload)
      ++state.count
    }
  },
  actions: {},
  modules: {},
});
