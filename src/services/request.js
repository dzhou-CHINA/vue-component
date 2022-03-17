import axios from 'axios'
import store from '@/store'
import { ResultCode, ResultMsg } from '@/common'

// 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    // Set Request Timeout
    config.timeout = '1500000'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器 ===> App.vue

let request = {
  post: async function (url, data, headers) {
    store.state.isLoading = true
    let response = null
    if (headers) {
      response = await axios.post(url, data, {headers})
    } else {
      response = await axios.post(url, data)
    }
    store.state.isLoading = false
    if (!response || !response.data) {
      return { resultCode: ResultCode.REQUEST_ERROR, resultMsg: ResultMsg.REQUEST_ERROR }
    } else {
      return { resultCode: ResultCode.OK, data: response.data }
    }
  },

  get: async function (url, params) {
    store.state.isLoading = true
    if (url && params) {
      url += '?'
      for (let key in params) {
        url += key + '=' + (params[key]) + '&'
      }

      url = url.substring(0, url.lastIndexOf('&'))
    }
    const response = await axios.get(url)
    store.state.isLoading = false
    if (!response) {
      return { resultCode: ResultCode.REQUEST_ERROR, resultMsg: ResultMsg.REQUEST_ERROR }
    } else {
      return { resultCode: ResultCode.OK, data: response.data }
    }
  },

  del: async function (url, param) {
    url = url.replace('p_DELETE', param)
    store.state.isLoading = true
    const response = await axios.delete(url)
    store.state.isLoading = false

    if (!response || !response.data) {
      return { resultCode: ResultCode.REQUEST_ERROR, resultMsg: ResultMsg.REQUEST_ERROR }
    } else {
      return { resultCode: ResultCode.OK, data: response.data }
    }
  }
}

export default request
