<template>
  <div div class="flex">
    <!-- Menu Tree -->
    <div class="w-2/12">
      <MenuTree></MenuTree>
    </div>

    <!-- 탭 -->
    <div class="w-full ml-2">
      <Tab></Tab>

      <div class="mt-3 ml-1">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
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

    window.onkeydown = (e) => {
      if (currentPath.value.fullPath === '/' && e.key === 'F5') {
        return e.preventDefault()
      }

      if (e.key === 'F5') {
        e.preventDefault()
        const result = confirm('작업중인 내용이 저장되지 않을 수 있습니다.')

        if (result) {
          console.log('currentPath', currentPath)
          e.preventDefault()

          // params를 보냄으로써 해당 컴포넌트의 데이터를 리셋시킴
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
