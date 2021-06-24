<template>
  <div>
    <div class="flex">
      <!-- Menu Tree -->
      <div class="w-2/12">
        <MenuTree></MenuTree>
      </div>

      <div class="w-full ml-2">
        <!-- 탭 -->
        <Tab></Tab>

        <!-- 내용 -->
        <div class="mt-3 ml-1">
          <Dashboard
            v-if="$router.options.history.location === '/'"
          ></Dashboard>
          <Content class="mr-2" v-else></Content>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuTree from '@/components/common/MenuTree'
import Dashboard from '@/views/Dashboard'
import Content from '@/components/common/Content'
import Tab from '@/components/common/Tab'

export default {
  name: 'Main',
  components: {
    MenuTree,
    Dashboard,
    Content,
    Tab
  },
  data() {
    return {
      reload: true
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
          
          if (currentPath.value.name === 'Write') {
            this.$router.push({
              name: currentPath.value.name,
              params: { id: currentPath.value.params.id, reload: this.reload }
            })
          } else {
            this.$router.push({
              name: currentPath.value.name,
              params: { reload: this.reload }
            })
          }
        }
      }
    }

    this.reRoad = false
  },
  methods: {}
}
</script>
