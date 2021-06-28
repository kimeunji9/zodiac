import { axios } from '@/api/index'

const api = 'auth'

function login(params: any) {
  return axios.post(`${api}/login`, params)
}

function refresh(config: { headers: { Authorization: string } } | undefined) {
  return axios.post(`${api}/refresh`, null, config)
}

function logout() {
    return axios.delete(`${api}/logout`)
  }

export {
  login,
  refresh,
  logout
}