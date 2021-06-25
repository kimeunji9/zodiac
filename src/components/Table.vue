<template>
  <table class="w-full border-collapse">
    <thead>
      <tr>
        <th
          class="border border-gray-200"
          v-for="(column, idx) in gridColumns"
          :key="idx"
        >
          {{ column.label }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        class="border-b border-gray-200"
        v-for="data in gridDatas"
        :key="data.id"
      >
        <td
          class="border-b border-gray-200"
          v-for="(column, idx) in gridColumns"
          :key="idx"
        >
          {{ data[column.prop] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Table',
  props: {
    columns: Array,
    datas: Array
  },
  data() {
    return {
      gridColumns: [],
      gridDatas: []
    }
  },
  mounted() {
    this.gridColumns = this.columns
    // this.gridDatas = this.datas

    // console.log('gridDatas', this.gridDatas)
  },
  watch: {
    datas: function () {
      this.gridDatas = this.datas
    }
  }
}
</script>