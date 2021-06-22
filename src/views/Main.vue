<template>
  <div>
    <div class="flex">
      <h1>main</h1>
      <!-- Menu Bar -->
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
    return {}
  },
  methods: {}
}
</script>
