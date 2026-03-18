import type { UserContextType, userFormType, userType } from "@/Types/types"
import UserContext from "./context"
import { useEffect, useState } from "react"
import axios from "axios"

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [usersData, setUsersData] = useState<userType[]>([])
  const [userFormInputFieldValue, setUserFormInputFieldValue] =useState<userFormType>({ name: "", city: "", age: "", email: "" })
  const [isEdit, setIsEdit] = useState(false)
  const [noOfRows, setNoOfRows] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios?.get(
        "https://69b8eb3de69653ffe6a5e035.mockapi.io/users"
      )
      setUsersData(response.data)
    }
    fetchData()
  }, [])

  const addUser = async (user: userType) => {
    try {
      const response = await axios.post(
        "https://69b8eb3de69653ffe6a5e035.mockapi.io/users",
        user
      )
      if (response.status === 201) {
        setUsersData((prev) => {
          return [...prev, response?.data]
        })
      }
    } catch (error) {
      console.error("Error while adding the user", error)
    }
  }

  const updateUser = async (formValues: userFormType) => {
    if (isEdit && formValues.id) {
      const { id, ...data } = formValues
      try {
        const response = await axios?.put(
          `https://69b8eb3de69653ffe6a5e035.mockapi.io/users/${id}`,
          data
        )
        if (response.status === 200) {
          setUsersData((prev) => {
            const userIdToUpdate = prev?.find((user) => user.id === id)
            const updatedUser = prev.map((user) =>
              user.id === userIdToUpdate?.id ? { ...user, ...data } : user
            )
            return updatedUser
          })
        }
      } catch (error) {
        console.error("Error while updating the user...", error)
      }
    }
    setIsEdit(false)
  }

  const deleteUser = async (id: number) => {
    try {
      const response = await axios.delete(
        `https://69b8eb3de69653ffe6a5e035.mockapi.io/users/${id}`
      )
      if (response.status === 200) {
        setUsersData((prev) => {
          const updated = prev?.filter((user) => user.id !== id)
          if (updated?.length > 0 && updated?.length % noOfRows === 0) {
            setCurrentPage((p) => p - 1)
          }
          return updated
        })
      }
    } catch (error) {
      console.error("Error while deleting the user..", error)
    }
  }

  const ctxValue: UserContextType = {
    usersData,
    addUser,
    updateUser,
    deleteUser,
    isEdit,
    setIsEdit,
    userFormInputFieldValue,
    setUserFormInputFieldValue,
    noOfRows,
    setNoOfRows,
    currentPage,
    setCurrentPage,
  }

  return (
    <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>
  )
}

export default UserContextProvider
