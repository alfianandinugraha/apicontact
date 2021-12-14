import tokenService from '@src/services/token'
import axios from 'axios'

const httpApiProtected = axios.create({
  baseURL: process.env.NEXT_APP_BASE_URL ?? 'http://localhost:3000/api',
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
  baseURL: process.env.NEXT_APP_BASE_URL ?? 'http://localhost:3000/api',
})

export { httpApi, httpApiProtected }
