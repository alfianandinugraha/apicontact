import tokenService from '@src/services/token'
import axios from 'axios'

const httpApiProtected = axios.create({
  baseURL: '/api',
})

httpApiProtected.interceptors.request.use(
  (config) => {
    if (config.headers) {
      config.headers['Authorization'] = `Bearer ${tokenService.get()}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

const httpApi = axios.create({
  baseURL: '/api',
})

export { httpApi, httpApiProtected }
