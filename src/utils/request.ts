import axios from 'axios'
import { showFailToast } from 'vant'
const request = axios.create({
  baseURL: 'https://interview-api-t.itheima.net/',
  timeout: 20000,
})

request.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  function(response){
    return response.data
  },
  function(error){
    if(error.response){
      showFailToast(error.response.data.message)
    }
    return Promise.reject(error)
  }
)
export default request
