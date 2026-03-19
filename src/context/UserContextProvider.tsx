import type { UserContextType, userFormType, userType } from "@/Types/types"
import UserContext from "./context"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [usersData, setUsersData] = useState<userType[]>([])
  const [userFormInputFieldValue, setUserFormInputFieldValue] =
    useState<userFormType>({ name: "", city: "", age: "", email: "" })
  const [isEdit, setIsEdit] = useState(false)
  const [noOfRows, setNoOfRows] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [isOperationRunning, setIsOperationRunning] = useState(false)
  const [isSomeData, setIsSomeData] = useState(false)

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://69b8eb3de69653ffe6a5e035.mockapi.io/users"
      )
      setUsersData(response.data)
      const totalPages = Math.ceil(response.data.length / noOfRows)

      if (currentPage > totalPages) {
        setCurrentPage(totalPages || 1)
      }
    } catch (error) {
      console.error("Error while fetching the data", error)
      throw error
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const addUser = async (user: userType) => {
    setIsOperationRunning(true)
    try {
      const response = await axios.post(
        "https://69b8eb3de69653ffe6a5e035.mockapi.io/users",
        user
      )

      if (response.status === 201) {
        await fetchUsers()
        toast.success("User added successfully!", {
          duration: 1200,
        })
        setIsOperationRunning(false)
      }
    } catch (error) {
      console.error("Error while adding the user", error)
      toast.error("Failed to add user. Please try again.")
      setIsOperationRunning(false)
      throw error
    }
  }

  const updateUser = async (formValues: userFormType) => {
    setIsOperationRunning(true)
    if (isEdit && formValues.id) {
      const { id, ...data } = formValues
      try {
        const response = await axios.put(
          `https://69b8eb3de69653ffe6a5e035.mockapi.io/users/${id}`,
          data
        )

        if (response.status === 200) {
          await fetchUsers()
          toast.success("User updated successfully!", {
            duration: 1200,
          })
          setIsOperationRunning(false)
        }
      } catch (error) {
        toast.error("Failed to update user. Please try again.")
        setIsOperationRunning(false)
        throw error
      }
    }

    setIsEdit(false)
  }

  const deleteUser = async (id: number) => {
    setIsOperationRunning(true)
    try {
      const response = await axios.delete(
        `https://69b8eb3de69653ffe6a5e035.mockapi.io/users/${id}`
      )

      if (response.status === 200) {
        await fetchUsers()
        toast.success("User deleted successfully!", {
          duration: 1200,
        })
        setIsOperationRunning(false)
      }
    } catch (error) {
     
      toast.error("Failed to delete user. Please try again.")
      setIsOperationRunning(false)
      throw error
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
    isOperationRunning,
    isSomeData,
    setIsSomeData,
  }

  return (
    <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>
  )
}

export default UserContextProvider
