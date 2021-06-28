<template>
  <table class="w-full border-collapse">
    <thead>
      <tr class="border">
        <slot name="columns" />
      </tr>
    </thead>

    <tbody>
      <slot name="list"></slot>
      <tr v-if="datas.length === 0">
        <td colspan="30" class="text-center">검색 결과가 없습니다.</td>
      </tr>
    </tbody>

  </table>
</template>

<script>
export default {
  name: 'Table',
  props: {
    datas: Array
  },
  data() {
    return {
      gridDatas: []
    }
  },
  mounted() {
    console.log('datas', this.datas)
  },
  watch: {
    // datas: function () {
    //   this.gridDatas = []
    // }
  }
}
</script>