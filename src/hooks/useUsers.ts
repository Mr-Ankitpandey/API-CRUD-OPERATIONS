import useApi from "@/api/useApi"
import type { userFormType, userType } from "@/Types/types"
import { useState } from "react"
import { toast } from "sonner"

const useUsers = () => {

    const [usersData, setUsersData] = useState<userType[]>([])
    const [isEdit, setIsEdit] = useState(false)
    const [isOperationRunning, setIsOperationRunning] = useState(false)

    const {getUsers, createUser, editUser, removeUser} = useApi()
  
    const fetchUsers = async () => {
    try {
      const response = await getUsers()
      setUsersData(response.data)
    } catch (error) {
      console.error("Error while fetching the data", error)
      throw error
    }
  }

   const addUser = async (user: userType) => {
    setIsOperationRunning(true)
    try {
      const response = await createUser(user)
      if (response.status === 201) {
        await fetchUsers()
        toast.success("User added successfully!", {
          duration: 1200,
        })
        setIsOperationRunning(false)
      }
    } catch (error) {
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
        const response = await editUser(id,data)

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
      const response = await removeUser(id)

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


  return {usersData, fetchUsers, addUser, updateUser, deleteUser, isOperationRunning, isEdit, setIsEdit}


}

export default useUsers;
