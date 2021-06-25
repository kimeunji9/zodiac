<template>
  <div>
    <div class="flex py-4">
      <div>
        <div class="inline-block">일자
        </div>
        <div class="inline-block">달력</div>
        <button class="border">오늘</button>
        <input type="checkbox" id="mike" value="Mike" />
        <label for="mike" class="cursor-pointer">삭제데이터</label>
      </div>
      <button
        class="border hover:bg-blue-200"
        @click="showCreateIssueModal = true"
      >
        새 이슈
      </button>
    </div>

    <!-- 테이블 -->
    <Table :columns="columns" :datas="issueList"></Table>

    <!-- 이슈 모달 -->
    <IssueModal
      v-if="showCreateIssueModal"
      @close="closeIssueModal"
      @addIssue="addIssue"
    ></IssueModal>
  </div>
</template>

<script>
import Table from '@/components/Table.vue'
import IssueModal from '@/components/modal/IssueModal.vue'
import { getIssues } from '@/api/issue'

export default {
  name: 'Issue',
  props: ['reload'],
  components: { Table, IssueModal },
  data() {
    return {
      test: '',
      dates: null,
      showCreateIssueModal: false,
      columns: [
        { label: '순번', prop: 'issu_id' },
        { label: '핵심어', prop: 'issu_kwd' },
        { label: '내용', prop: 'issu_ctt' },
        { label: '작성일시', prop: 'input_dtm' },
        { label: '작성자', prop: 'inputr_id' },
        { label: '액션', prop: '' }
      ],
      issueList: []
    }
  },
  mounted() {
    const params = {
      sdate: '2021-01-01',
      edate: '2021-06-30',
      issu_del_yn: 'N'
    }

    getIssues(params)
      .then((res) => {
        this.issueList = res.data.data
      })
      .catch((err) => {
        console.log('error', err)
      })
  },
  watch: {
    reload: function () {
      this.test = ''
    }
  },
  methods: {
    closeIssueModal() {
      console.log('close')
      this.showCreateIssueModal = false
    },
    addIssue() {
      console.log('add')
    }
  }
}
</script>
