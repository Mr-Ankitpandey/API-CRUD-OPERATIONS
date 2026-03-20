import type { userType } from "@/Types/types"
import { axiosApi } from "./axiosConfig"

const useApi = () => {
  const getUsers = () => axiosApi.get('/users')
  const createUser = (user : userType) => axiosApi.post('/users', user)
  const editUser = (id:number, data:Omit<userType, 'id'>) => axiosApi.put(`/users/${id}`, data)
  const removeUser = (id:number) => axiosApi.delete(`/users/${id}`)

  return { getUsers, createUser, editUser, removeUser }
}

export default useApi;
