import axios, { AxiosError } from "axios"
import { toast } from "sonner"
const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const axiosApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
})

axiosApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      toast.error('Failed to get response...')
      return 
    }
  }
)
