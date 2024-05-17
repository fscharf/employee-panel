import axios from 'axios'
import { setupCache } from 'axios-cache-interceptor'

const axiosInstance = axios.create({
  baseURL: 'https://employee-api-three.vercel.app/api'
})

export const httpClient = setupCache(axiosInstance)
