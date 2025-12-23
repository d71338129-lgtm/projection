import axios from 'axios'
import { showFailToast } from 'vant'
import { getStorageToken, removeStorageToken } from './storage'
import router from '@/router'
const request = axios.create({
  baseURL: 'https://interview-api-t.itheima.net/',
  timeout: 20000,
})

request.interceptors.request.use(
  function (config) {
    const token = getStorageToken()
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 401) {
        removeStorageToken()
        router.push('/login')
        showFailToast('登录过期，请重新登录')
      } else {
        showFailToast(error.response.data.message)
      }
    }
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    if (error.response) {
      showFailToast(error.response.data.message)
    }
    return Promise.reject(error)
  },
)
export default request
