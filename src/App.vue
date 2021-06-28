<template>
  <div>
    <div v-if="$route.name !== 'Login'" div class="flex">
      <!-- Menu Tree -->
      <div class="w-2/12">
        <MenuTree></MenuTree>
      </div>

      <div class="w-full ml-2">
        <!-- 탭 -->
        <Tab class="ml-1 mr-5"></Tab>

        <!-- 내용 -->
        <div class="ml-1 mr-5">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" :key="$route.path" />
            </keep-alive>
          </router-view>
        </div>
      </div>
    </div>

    <div v-if="$route.name === 'Login'">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MenuTree from '@/components/common/MenuTree'
import Tab from '@/components/common/Tab'

export default {
  components: {
    MenuTree,
    Tab
  },
  data() {
    return {
      count: 0
    }
  },
  created() {
    const currentPath = this.$router.currentRoute

    // 브라우저에 있는 새로고침 버튼을 눌렀을 경우
    window.onbeforeunload = (e) => {
      e.preventDefault()

      if (currentPath.value.fullPath === '/') {
        // 크롬에서는 아래가 필요
        return e.returnValue = ''
      }

      e.returnValue = ''

      // params(reload)를 보냄으로써 해당 컴포넌트의 데이터를 리셋시킴
      if (currentPath.value.name === 'Write') {
        this.$router.push({
          name: currentPath.value.name,
          params: { id: currentPath.value.params.id, reload: this.count++ }
        })
      } else {
        this.$router.push({
          name: currentPath.value.name,
          params: { reload: this.count++ }
        })
      }
    }

    // 키보드에서 키를 눌렀을 경우
    window.onkeydown = (e) => {
      // if (currentPath.value.fullPath === '/' && e.key === 'F5') {
      //   return e.preventDefault()
      // }

      if (e.key === 'F5' || (e.ctrlKey && e.key === 'r') || (e.ctrlKey && e.key === 'F5')) {
        if (currentPath.value.fullPath === '/') {
          return
        }

        e.preventDefault()
        const result = confirm('변경사항이 저장되지 않을 수 있습니다.')

        if (result) {
          e.preventDefault()

          // params(reload)를 보냄으로써 해당 컴포넌트의 데이터를 리셋시킴
          if (currentPath.value.name === 'Write') {
            this.$router.push({
              name: currentPath.value.name,
              params: { id: currentPath.value.params.id, reload: this.count++ }
            })
          } else {
            this.$router.push({
              name: currentPath.value.name,
              params: { reload: this.count++ }
            })
          }
        }
      }
    }
  },
  methods: {
    resetReloadFlag() {
      this.reload = false
    }
  }
}
</script>
