import axios from 'axios'

const httpApiProtected = axios.create({
  baseURL: process.env.NEXT_APP_BASE_URL ?? 'http://localhost:3000/api',
})

const httpApi = axios.create({
  baseURL: process.env.NEXT_APP_BASE_URL ?? 'http://localhost:3000/api',
})

export { httpApi, httpApiProtected }
