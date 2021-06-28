<template>
  <table class="w-full border-collapse">
    <thead class="">
      <tr class="border">
        <th v-for="column in columns" :key="column.prop">
          {{ column.label }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="row in gridDatas" :key="row[key]">
        <td v-for="column in columns" :key="column.prop">
          <div v-if="column.prop === 'action'" class="fals">
            <slot name="actin" :item="row"></slot>
          </div>
          <div v-else>
            {{ row[column.prop] }}
          </div>
        </td>
      </tr>
      <tr v-if="gridDatas.length === 0">
        <td colspan="30" class="text-center">검색 결과가 없습니다.</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Table',
  props: {
    gridDatas: Array,
    columns: Array,
    key: String
  },
  data() {
    return {
      list: []
    }
  },
  mounted() {
    console.log('gridDatas', this.gridDatas)
  },
  watch: {
    // datas: function () {
    //   this.gridDatas = []
    // }
  }
}
</script>