import type { UserContextType, userType } from "@/Types/types"
import UserContext from "./context"
import { useEffect, useState } from "react"
import axios from "axios"

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [usersData, setUsersData] = useState<userType[]>([])
  const [userFormInputFieldValue, setUserFormInputFieldValue] = useState<Omit<userType, 'id'>>({ name: "", city: "", age: "", email: "" });
  const [isEdit, setIsEdit] =  useState(false)
  const fetchData = async () => {
    const response = await axios.get(
      "https://69b8eb3de69653ffe6a5e035.mockapi.io/users"
    )
    setUsersData(response.data)
  }

  useEffect(()=>{
      fetchData()
  }, [])

  const addUser = async (user: userType) => {
    const response = await axios.post(
      "https://69b8eb3de69653ffe6a5e035.mockapi.io/users",
      user
    )
    fetchData()
    console.log('response after add', response)
  }
  const updateUser = (userFormInputFieldValue) => {
    console.log(usersData[0].id)
    if(isEdit){
    axios.put(`https://69b8eb3de69653ffe6a5e035.mockapi.io/users/${+usersData.id}`, userFormInputFieldValue)
      .then(() => fetchData())
      .catch(err => console.error('Error updating user:', err))
    }
    setIsEdit(false);
  }

  const deleteUser = (id: number) => {
    axios.delete(`https://69b8eb3de69653ffe6a5e035.mockapi.io/users/${id}`)
      .then(() => fetchData())
      .catch(err => console.error('Error deleting user:', err))
  }

  const ctxValue: UserContextType = {
    usersData,
    addUser,
    updateUser,
    deleteUser,
    isEdit,
    setIsEdit,
    userFormInputFieldValue,
    setUserFormInputFieldValue
  }

  return (
    <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>
  )
}

export default UserContextProvider
