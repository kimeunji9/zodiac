<template lang="">
  <!-- 포커스를 잃으면 내용이 저장되도록 -->
  <div @blur.capture="saveContentWriteList">
    <!-- <h2>기사작성</h2> -->
    <div class="flex mt-5 mb-2">
      <input
        class="w-4/12 border pl-2 pr-2 h-10 float-left"
        v-model="enInput"
      />
      <div class="border inline-block">
        <IconList></IconList>
      </div>
    </div>
    <div>
      <input class="w-4/12 border pl-2 pr-2 h-10" v-model="koInput" />
      <div class="border inline-block">
        <input class="inline-block" type="checkbox" />Article Fix
        <input class="inline-block" type="checkbox" />Editing Fix
        <input class="inline-block" type="checkbox" />Anchor Fix
        <input class="inline-block" type="checkbox" />Urgent
        <input class="inline-block" type="checkbox" />Reserved
      </div>
    </div>
  </div>
</template>

<script>
import IconList from '@/components/write/IconList'

export default {
  name: 'Write',
  components: {
    IconList
  },
  data() {
    return {
      enInput: '',
      koInput: ''
    }
  },
  computed: {},
  watch: {
    $route(to) {
      this.$store.state.writeList.forEach((item) => {
        if (item.id == to.params.id) {
          this.enInput = item.data.enInput
          this.koInput = item.data.koInput
        }
      })
    }
  },
  methods: {
    saveContentWriteList() {
      const currentPathId = this.$router.currentRoute.value.params.id

      this.$store.state.writeList.forEach((item) => {
        if (item.id == currentPathId) {
          item.data = {
            enInput: this.enInput,
            koInput: this.koInput
          }
        }
      })
    }
  }
}
</script>
