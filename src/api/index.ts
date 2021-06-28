import $axios from "axios";

const axios = $axios.create({
  baseURL: 'http://geminisoft.iptime.org:7891/zodiac/'
})

// 요청 interceptor
axios.interceptors.request.use(function (config: any) {
  // 요청을 보내기 전에 수행할 일
  return config
},
function(err:any) {
  // 오류 요청을 보내기전 수행할 일
  return Promise.reject(err)
})

/** 응답 interceptor */
axios.interceptors.response.use(function (response: any) {
  return response;
}, function (err: any) {
  return Promise.reject(err);
});

export {
  axios
}