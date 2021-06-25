import $axios from "axios";
import store from '@/store/index'
import { getCookieValue } from '@/utils/cookies'

const axios = $axios.create({
  baseURL: 'http://geminisoft.iptime.org:7891/zodiac/'
})

// 요청 interceptor
axios.interceptors.request.use(function (config: any) {
  // 요청을 보내기 전에 수행할 일
  config.headers['Authorization'] = 'Bare ' + store.state.accessToken || getCookieValue('accessToken')
  config.headers['refresh_token'] = store.state.refreshToken || getCookieValue('refreshToken');

  // console.log('config', config)

  return config
},
function(err:any) {
  // 오류 요청을 보내기전 수행할 일
  return Promise.reject(err)
})

/** 응답 interceptor */
axios.interceptors.response.use(function (response: any) {
  // console.log('response', response)
  return response;
}, function (err: any) {
  const error = err.response
  
  if (error.status === 401) {
    alert('잘못된 아이디 또는 비밀번호입니다.')
  }
  
  return Promise.reject(error);
});

export {
  axios
}