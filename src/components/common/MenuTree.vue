<template>
  <div>
    <div class="pt-2 h-screen border-r rounded-lg">
      <p
        class="p-4 mb-3 font-bold border-b shadow-md border-gray-300 cursor-pointer"
        @click="$router.push('/')"
      >
        ANS
      </p>

      <!-- 상위메뉴 -->
      <div v-for="parentMenu in menuList" :key="parentMenu.path">
        <router-link
          v-if="!parentMenu.path.includes('write')"
          :to="`${parentMenu.path}`"
          :style="
            !parentMenu.children && parentMenu.meta.active
              ? toggleActiveMenuObj
              : ''
          "
          class=" py-4 cursor-pointer hover:bg-blue-50 text-sm pl-5 rounded block"
          @click="clickMenu($event, parentMenu)"
          >{{ parentMenu.meta.menuTitle }}
        </router-link>

        <!-- 하위메뉴 -->
        <div v-for="subMenu in parentMenu.children" :key="subMenu.path">
          <router-link
            v-if="
              !subMenu.path.includes('write') &&
              parentMenu.path === subMenu.meta.parent
            "
            :to="`${parentMenu.path}/${subMenu.path}`"
            class=" list-none block py-4 pl-8 hover:bg-blue-50 rounded text-sm cursor-pointer"
            :style="subMenu.meta.active ? toggleActiveMenuObj : ''"
            @click="clickMenu($event, subMenu)"
          >
            {{ subMenu.meta.menuTitle }}
          </router-link>

          <!-- 기사작성 -->
          <router-link
            v-if="
              subMenu.path.includes('write') &&
              parentMenu.path === subMenu.meta.parent
            "
            :to="{ name: 'Write', params: { id: count } }"
            class="list-none block py-4 pl-8 hover:bg-blue-50 rounded text-sm cursor-pointer"
            :style="subMenu.meta.active ? toggleActiveMenuObj : ''"
            @click="addArticle($event, subMenu)"
          >
            {{ subMenu.meta.menuTitle }}
          </router-link>
        </div>
      </div>

      <div>
        <LogoutBtn class="mt-16 mb-4"></LogoutBtn>
      </div>
    </div>
  </div>
</template>

<script>
import { routerList } from '@/router/routerList'
import LogoutBtn from '@/components/common/LogoutButton.vue'
import _ from 'lodash'

export default {
  name: 'MenuTree',
  components: {
    LogoutBtn
  },
  data() {
    return {
      showChildren: false,
      menuList: [],
      toggleSubMenu: false,
      toggleActiveMenuObj: {
        'background-color': '#ecf5ff',
        color: '#409eff',
        'font-weight': 'bold'
      },
      count: 1,
      obj: ''
    }
  },
  mounted() {
    routerList.forEach((item) => {
      if (item.name !== 'Login' && item.name !== 'Main') {
        this.menuList.push(item)
      }
    })
  },
  computed: {},
  watch: {
    // 기사작성 탭이 선택되었을 경우, 기사작성 메뉴 활성화시키기
    $route(to) {
      this.menuList.forEach(item => {
        if (item.name === to.name) {
          item.meta.active = true
        } else {
          item.meta.active = false
        }
      })
    }
  },
  methods: {
    addTab(menu) {
      if (menu.children) return

      this.$store.commit('addTab', menu)
    },
    // menu 활성화 토글
    toggleActiveMenu(menu) {
      this.menuList.forEach((item) => {
        if (item.name === menu.name) {
          menu.meta.active = true
        } else {
          item.meta.active = false
        }
      })
    },
    clickMenu(e, menu) {
      this.toggleActiveMenu(menu)
      this.addTab(menu)

      if (!menu.children) return
      else e.preventDefault() // children을 가진 메뉴는 탭(예로 기사 탭)이 생기지 않도록
    },
    addArticle(e, menu) {
      let writeId = 1
      const writeList = this.$store.state.writeList

      if (writeList.length !== 0) {
        // writeList의 마지막 요소의 id 값에 1을 더함 (맨 마지막의 id값으로 router의 값을 올리고 내리고)
        writeId = writeList[writeList.length - 1].id + 1
      }

      let writeObj = {
        id: writeId,
        data: {}
      }

      // 탭이 생길때마다 생성된 탭에 해당되는 컨텐츠를 넣을 obj 만들어서 push
      this.$store.commit('createWriteList', writeObj)

      // 생성된 메뉴가 독립적으로 움직일 수 있도록
      let obj = _.cloneDeep(menu)
      obj.path = obj.path.replace(':id', writeId)

      this.obj = obj

      // 왼쪽 메뉴 활성화
      this.toggleActiveMenu(menu)

      // 탭 생성
      this.$store.commit('addWriteTab', obj)

      // 라우터 이동 (새로 생성됬을때 바로 라우터로 이동될 수 있도록)
      this.$router.push({ name: 'Write', params: { id: writeId } })
    }
  }
}
</script>
