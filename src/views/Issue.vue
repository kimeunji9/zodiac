<template>
  <div>
    <div class="flex py-4">
      <div class="flex-1">
        <div class="inline-block mr-4">일자</div>
        <div class="inline-block mr-4">달력</div>
        <button class="border p-2 rounded-md mr-4">오늘</button>
        <input type="checkbox" id="delData" v-model="deletedData" class="mr-1" />
        <label for="delData" class="cursor-pointer">삭제데이터</label>
      </div>
      <button
        class="border p-2 rounded-md hover:bg-blue-200"
        @click="showCreateIssueModal = true"
      >
        새 이슈
      </button>
    </div>

    <!-- 테이블 -->
    <!-- key값은 그리드 데이터의 key값을 넘긴다. -->
    <Table :gridDatas="issueList" :columns="issueColumns" :key="'issu_id'">
      <template v-slot:actin="item">
        <div class="flex">
          <div class="mr-3 cursor-pointer" @click="editIssue(item)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 hover:text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </div>
          <div class="cursor-pointer hover:text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        </div>
      </template>
    </Table>

    <!-- 이슈 모달 -->
    <IssueModal
      v-if="showCreateIssueModal"
      @close="closeIssueModal"
      @addIssue="addIssue"
    ></IssueModal>

    <!-- <div class="loader relative bottom-60"></div> -->
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
      issueColumns: [
        { label: '순번', prop: 'issu_id' },
        { label: '핵심어', prop: 'issu_kwd' },
        { label: '내용', prop: 'issu_ctt' },
        { label: '작성일시', prop: 'input_dtm' },
        { label: '작성자', prop: 'inputr_id' },
        { label: '액션', prop: 'action' }
      ],
      issueList: [],
      deletedData: false
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
        const gridDatas = res.data.data
        console.log('gridDatas', gridDatas)

        gridDatas.forEach((item) => {
          item.action = ''
        })

        this.issueList = gridDatas
      })
      .catch((err) => {
        console.log('error', err)
      })
  },
  watch: {
    reload: function () {
      this.deletedData = false

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
    }
  },
  methods: {
    closeIssueModal() {
      console.log('close')
      this.showCreateIssueModal = false
    },
    addIssue() {
      console.log('add')
    },
    editIssue(row) {
      console.log('row', row)
    }
  }
}
</script>

<style>
.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
}
.loader {
  color: #c2c2c2;
  font-size: 11px;
  text-indent: -99999em;
  margin: 55px auto;
  position: relative;
  width: 10em;
  height: 10em;
  box-shadow: inset 0 0 0 1em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.loader:before,
.loader:after {
  position: absolute;
  content: '';
}
.loader:before {
  width: 5.2em;
  height: 10.2em;
  background: #ffffff;
  border-radius: 10.2em 0 0 10.2em;
  top: -0.1em;
  left: -0.1em;
  -webkit-transform-origin: 5.1em 5.1em;
  transform-origin: 5.1em 5.1em;
  -webkit-animation: load2 2s infinite ease 1.5s;
  animation: load2 2s infinite ease 1.5s;
}
.loader:after {
  width: 5.2em;
  height: 10.2em;
  background: #ffffff;
  border-radius: 0 10.2em 10.2em 0;
  top: -0.1em;
  left: 4.9em;
  -webkit-transform-origin: 0.1em 5.1em;
  transform-origin: 0.1em 5.1em;
  -webkit-animation: load2 2s infinite ease;
  animation: load2 2s infinite ease;
}
@-webkit-keyframes load2 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load2 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
