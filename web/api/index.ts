import axios, { AxiosError } from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  timeout: 20000,
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API REQUEST] ${config.method?.toUpperCase()} ${config.url}`)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API RESPONSE] ${response.status} ${response.config.url}`)
    }
    return response
  },
  (error: AxiosError) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[API ERROR] ${error.response?.status} ${error.config?.url}`, error.response?.data)
    }
    return Promise.reject(error)
  }
)
