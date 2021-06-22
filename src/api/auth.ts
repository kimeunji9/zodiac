import { axios } from '@/api/index'

const api = 'auth'

function login(params: any) {
  return axios.post(`${api}/login`, params)
}

function refresh(params: any) {
  return axios.post(`${api}/refresh`, params)
}

function logout() {
    return axios.delete(`${api}/logout`)
  }

export {
  login,
  refresh,
  logout
}