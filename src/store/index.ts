import { createStore } from "vuex";
import { login, refresh } from '@/api/auth';
import router from '@/router/index';

export default createStore({
  state: {
    accessToken: '',
    refreshToken: '',
    count: 1,
    tabList: [] as any,
    writeList: [] as any
  },
  mutations: {
    setToken(state, payload) {
      const { access_token, refresh_token, expiration_in } = payload
      const expires = new Date(parseInt(expiration_in))

      document.cookie = `accessToken=${access_token}; expires=${expires}; path=/;`
      document.cookie = `refreshToken=${refresh_token}; expires=${expires}; path=/;`
      document.cookie = `expiration_in=${expiration_in}; expires=${expires}; path=/;`

      state.accessToken = access_token
      state.refreshToken = refresh_token
    },
    addTab(state:any, payload:any) {
      if (state.tabList.length === 0) {
        state.tabList.push(payload)
        localStorage.setItem('tabList', JSON.stringify(state.tabList))
      } else {
        // 탭이 중복으로 들어가지 않도록
        const duplicatedPath = state.tabList.some((item: any) => {
          console.log()
          return item.path === payload.path
        })

        if (!duplicatedPath) {
          state.tabList.push(payload)
          localStorage.setItem('tabList', JSON.stringify(state.tabList))
        }

        // 기사작성 탭이 선택되어있을 경우 해제
        state.tabList.forEach((item: any) => {
          if (item.name === 'Write') {
            item.meta.active = false
          }
        })
      }
    },
    deleteTab(state, payload) {
      const { idx, item } = payload

      state.tabList.splice(idx, 1)
      
      // localStorage에 있는 탭 리스트 항목 삭제
      const localTabList = JSON.parse(localStorage.getItem('tabList') || '[]')
      
      localTabList.splice(idx, 1)
      localStorage.setItem('tabList', JSON.stringify(localTabList))

      // writeList 삭제
      state.writeList.forEach((listItem: any, idx: number) => {
        if (item.path.slice(-1) == listItem.id) {
          state.writeList.splice(idx, 1)
        }
      })

      if (item.name === 'Write') {
        --state.count
      }

      // 삭제된 후 리스트의 마지막 인덱스
      const lastIdx = state.tabList.length - 1
      const previousTab = state.tabList[lastIdx]

      if (previousTab && previousTab.name === 'Write') {
        item.meta.tabActive = false
        previousTab.meta.tabActive = true
        router.push({ name: 'Write', params: { id: previousTab.path.slice(-1) } })

        return
      }

      // 마지막 tab을 눌렀을 때 이전 tab 색깔 토글, 이전 tab으로 이동
      if (lastIdx > -1) {
        previousTab.meta.active = true
        router.push({ name: previousTab.name })
      }
      // 모든 탭이 닫혔을 경우 메인페이지로 이동
      else if (state.tabList.length === 0) {
        router.push({ name: 'Main' })
      }
    },
    addWriteTab(state, payload: any) {
      payload.meta.active = true
      state.tabList.push(payload)
      localStorage.setItem('tabList', JSON.stringify(state.tabList))

      // 마지막으로 클릭한 기사작성 메뉴 탭만 활성화되도록
      state.tabList.forEach((menu: any) => {
        if (payload.path !== menu.path) {
          menu.meta.active = false
        }
      })
    },
    createWriteList(state, payload) {
      state.writeList.push(payload)
      ++state.count
    },
    deleteWriteListItems(state, payload) {
      state.writeList.forEach((item: any) => {
        if (item.id === payload.id) {
          item.data = {}
        }
      })
    }
  },
  actions: {
    login({ commit }, payload) {
      return login(payload)
        .then(({ data }) => {
          commit('setToken', data)
      })
    },
    setToken({ commit }, payload) {
      return refresh(payload)
        .then(({ data }) => {
          commit('setToken', data)
        })
    },
  },
  modules: {}
});
