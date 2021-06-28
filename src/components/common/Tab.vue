<template lang="">
  <div class="h-16 border-b">
    <div
      v-for="(item, idx) in tabList"
      :key="idx"
      class="
        pt-2
        pb-2
        pl-4
        pr-4
        relative
        top-6
        inline-block
        rounded-t-lg
        text-sm
        border border-blue-400
        cursor-pointer
      "
      :style="item.meta.active ? toggleActiveObj : ''"
      @click="selectedTab(item)"
    >
      {{ setTabTitle(item) }}

      <!-- x 아이콘 -->
      <div
        class="inline-block relative top-1 left-2 cursor-pointer"
        @click="deleteTab($event, idx, item)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          color="tomato"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  props: [],
  data() {
    return {
      toggleActiveObj: {
        'background-color': '#ecf5ff',
        color: '#409eff',
        'font-weight': 'bold'
      },
      tabList: this.$store.state.tabList
    }
  },
  watch: {
    // ANS 클릭시 선택된 탭 비활성화
  },
  methods: {
    deleteTab(event, idx, selectedTab) {
      // x 버튼만 클릭되도록
      event.stopPropagation()

      const writeList = this.$store.state.writeList

      if (selectedTab.name === 'Write') {
        let count = 0

        // 내용이 있으면 알럿띄움
        const writeItem = writeList.filter((listItem) => {
          return listItem.id == selectedTab.path.slice(-1)
        })

        for (let key in writeItem[0].data) {
          if (writeItem[0].data[key]) {
            count++
          }
        }

        if (count) {
          const result = confirm(
            '탭을 닫으면 작성 중이던 내용이 사라집니다. 탭을 닫으시겠습니까?'
          )

          if (result) {
            selectedTab.meta.menuActive = false
            this.$store.commit('deleteTab', { idx: idx, item: selectedTab })
          }
        } else {
          selectedTab.meta.menuActive = false
          this.$store.commit('deleteTab', { idx: idx, item: selectedTab })
        }
      } else {
        // 탭 활성화를 비활성화로 변경
        selectedTab.meta.active = false
        this.$store.commit('deleteTab', { idx: idx, item: selectedTab })
      }
    },
    selectedTab(tab) {
      if (tab.name === 'Write') {
        // 클릭한 tab으로 라우팅
        this.$router.push({
          name: tab.name,
          params: { id: tab.path.slice(-1) }
        })
      } else {
        this.$router.push({ name: tab.name })
      }

      this.toggleTapActive(tab)
    },
    toggleTapActive(tab) {
      // tab 활성화 색깔 토글
      this.tabList.forEach((item) => {
        if (item.path === tab.path) {
          tab.meta.active = true
        } else {
          item.meta.active = false
        }
      })
    },
    setTabTitle(tab) {
      let tabName = ''

      if (tab.name === 'Write') {
        tabName = tab.meta.menuTitle + tab.path.slice(-1)
      } else {
        if (tab.meta.tabTitle) {
          tabName = tab.meta.tabTitle
        } else {
          tabName = tab.meta.menuTitle
        }
      }

      return tabName
    }
  }
}
</script>
