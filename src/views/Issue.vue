<template>
  <div>
    reload {{ reload }}
    <div class="flex border border-blue-600 h-10 items-center">
      <div class="border">
        <div class="inline-block">일자</div>
        <div class="inline-block">달력</div>
        <button class="border">오늘</button>
        <input type="checkbox" id="mike" value="Mike" />
        <label for="mike" class="cursor-pointer">삭제데이터</label>
      </div>
      <button class="border">새 이슈</button>
    </div>

    <!-- 테이블 -->
    <input class="border bg-purple-100 h-full" v-model="test" />
  </div>
</template>
<script>
export default {
  name: 'Issue',
  props: ['reload'],
  data() {
    return {
      test: ''
    }
  },
  watch: {
    reload: function () {
      this.test = ''
    }
  }
}
</script>
