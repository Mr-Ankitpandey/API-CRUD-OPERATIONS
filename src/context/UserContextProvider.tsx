import type { UserContextType, userFormType } from "@/Types/types"
import UserContext from "./context"
import { useEffect, useState } from "react"
import useUsers from "@/hooks/useUsers"

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userFormInputFieldValue, setUserFormInputFieldValue] = useState<userFormType>({ name: "", city: "", age: "", email: "" })
  const [noOfRows, setNoOfRows] = useState(10)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [formDialogOpen, setFormDialogOpen] = useState(false)


  const {
    usersData,
    addUser,
    fetchUsers,
    updateUser,
    deleteUser,
    isOperationRunning,
    isEdit,
    setIsEdit,
  } = useUsers()
  
  useEffect(() => {
    fetchUsers()
  }, [])


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
    searchQuery,
    setSearchQuery,
    formDialogOpen,
    setFormDialogOpen
  }

  return (
    <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>
  )
}

export default UserContextProvider
