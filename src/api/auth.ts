import { axios } from '@/api/index'

const api = 'auth'

function login(params: object) {
  return axios.post(`${api}/login`, params)
}

function refresh(params: object) {
  return axios.post(`${api}/refresh`, params)
}

function logout(params: object) {
    return axios.delete(`${api}/logout`, params)
  }

export {
  login,
  refresh,
  logout
}