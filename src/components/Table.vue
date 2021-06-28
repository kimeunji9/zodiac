<template>
  <table class="w-full border-collapse">
    <thead>
      <tr class="border">
        <slot name="columns" /> <!-- header slot -->
      </tr>
    </thead>

    <tbody>
      <slot name="list"></slot>
      <tr v-if="datas.length === 0">
        <td colspan="30" class="text-center">검색 결과가 없습니다.</td>
      </tr>

      <!-- <tr
        class="border-b border-gray-200 h-10"
        v-for="data in gridDatas"
        :key="data.id"
      >
        <td v-for="(column, idx) in gridColumns" :key="idx">
          <div v-if="column.prop === 'action'" class="flex">
            <slot name="action"></slot>
          </div>
          <div>
            {{ data[column.prop] }}
          </div>
        </td>
      </tr> -->
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