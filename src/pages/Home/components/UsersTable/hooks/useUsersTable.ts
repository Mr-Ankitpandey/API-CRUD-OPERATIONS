import UserContext from "@/context/context"
import type { userType } from "@/Types/types"
import { useContext, useState } from "react"

const useUsersTable = () => {
  const [userToDelete, setUserToDelete] = useState<number | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const {deleteUser, setIsEdit, setUserFormInputFieldValue, setFormDialogOpen} = useContext(UserContext)

  const handleEdit = (user: userType) => {
    setIsEdit(true)
    setUserFormInputFieldValue({
      id: user?.id,
      name: user?.name,
      city: user?.city,
      age: user?.age,
      email: user?.email,
    })
    setFormDialogOpen(true)
  }

  const handleDeleteClick = (id: number) => {
    setUserToDelete(id)
    setDeleteDialogOpen(true)
  }
  const handleDeleteConfirm = async () => {
    if (userToDelete !== null) {
      await deleteUser(userToDelete)
    }
    setDeleteDialogOpen(false)
    setUserToDelete(null)
  }

  return { deleteDialogOpen,setDeleteDialogOpen, handleEdit, handleDeleteClick, handleDeleteConfirm }
}

export default useUsersTable
