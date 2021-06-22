<template>
  <div class="">
    <div class="flex">
      <!-- 첫번째 라인 -->
      <div class="flex-col w-1/6">
        <!-- 이슈 -->
        <div class="">
          <div class="text-sm mb-2">이슈</div>
          <div class="text-lg text-center mb-2 p-2 border cursor-pointer">
            이슈
          </div>
          <div class="text-lg text-center mb-2 p-2 border cursor-pointer">
            뉴스기획
          </div>
        </div>

        <!-- 기사작성 -->
        <div class="">
          <div class="text-sm mb-2 mt-6">기사작성</div>
          <div class="text-lg text-center mb-2 p-2 border cursor-pointer">
            기사작성
          </div>
        </div>

        <!-- 기사관리 -->
        <div class="">
          <div class="text-sm mb-2 mt-6">기사관리</div>
          <div class="text-lg text-center mb-2 p-2 border cursor-pointer">
            연합기사
          </div>
          <div class="text-lg text-center mb-2 p-2 border cursor-pointer">
            외신기사
          </div>
          <div class="text-lg text-center mb-2 p-2 border cursor-pointer">
            아리랑기사
          </div>
        </div>
      </div>

      <!-- 두번째 라인 -->
      <div class="flex-col w-1/6 ml-5">
        <!-- 큐시트 -->
        <div class="">
          <div class="text-sm mb-2">큐시트</div>
          <div class="text-lg text-center mb-2 p-2 border cursor-pointer">
            큐시트
          </div>
        </div>

        <!-- 의뢰 -->
        <div>
          <div class="text-sm mb-2 mt-6">의뢰</div>
          <div class="text-lg text-center mb-2 p-2 border cursor-pointer">
            의뢰
          </div>
        </div>

        <!-- CG 템플릿 -->
        <div>
          <div class="text-sm mb-2 mt-6">CG 템플릿</div>
          <div class="text-lg text-center mb-2 p-2 border cursor-pointer">
            CG 템플릿
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Dashboard'
}
</script>
