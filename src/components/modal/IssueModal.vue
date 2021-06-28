<template>
  <transition name="modal" appear>
    <div
      class="flex fixed z-10 top-40 left-1/3 m-auto align-middle justify-center w-4/12 h-3/6 border shadow-2xl"
      @click.self="$emit('close')"
    >
      <div class="bg-white w-full">
        <div class="border-b py-2 pl-4">
          <div class="inline-block font-semibold">새 이슈</div>
          <button
            class="inline-block relative left-3/4"
            @click="$emit('close')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 pt-1 ml-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="py-2 pl-5 pt-6">
          <div class="mb-1">이슈 일자</div>
          <input type="text" v-model="date" class="border p-1 mb-3">
          <div class="mb-1">핵심어</div>
          <input
            type="text"
            v-model="keyword"
            class="border p-1 mb-3 w-11/12"
          />
          <div class="mb-1">내용</div>
          <input
            type="text"
            v-model="content"
            class="border p-1 mb-3 w-11/12"
          />
        </div>
        <div class="pl-5 mt-3 ml-80">
          <button
            @click="$emit('close')"
            class="
              border
              p-1
              mr-2
              w-16
              rounded-md
              hover:text-indigo-50 hover:bg-blue-500
              font-normal
            "
          >
            취소
          </button>
          <button
            @click="addIssue"
            class="
              border
              p-1
              w-16
              rounded-md
              hover:text-indigo-50 hover:bg-blue-500
              font-normal
            "
          >
            추가
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { submitIssue } from '@/api/issue'

export default {
  name: 'IssueModal',
  data() {
    return {
      date: '',
      keyword: '',
      content: ''
    }
  },
  methods: {
    // 키워드, 날짜 필수
    addIssue() {
      const params = {
        issu_dtm: this.date,
        issu_ctt: this.content,
        issu_kwd: this.keyword
      }

      submitIssue(params)
        .then(() => {
          console.log('success!')
        })
        .catch((err) => {
          if(err.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          } else if (err.request) {
            // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          } else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          }
        })
    }
  }
}
</script>