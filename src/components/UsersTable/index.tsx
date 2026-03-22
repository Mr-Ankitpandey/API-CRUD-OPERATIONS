import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { ConfirmDeleteDialog } from "@/components/Confirm_Delete_Dialog"
import { FormDialog } from "@/components/Form"
import { useContext, useState } from "react"
import UserContext from "@/context/context"
import type { userType } from "@/Types/types"
import { TABLE_HEADINGS } from "@/constants/table_headings"
import { Loader } from "../Loader"
import usePagination from "@/hooks/usePagination"

const UsersTable = () => {
  const {
    usersData,
    deleteUser,
    setIsEdit,
    setUserFormInputFieldValue,
    currentPage,
    noOfRows,
    // isOperationRunning,
    formDialogOpen,
    setFormDialogOpen,
    setCurrentPage
  } = useContext(UserContext)

  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<number | null>(null)


  const { paginatedData} = usePagination({
    data: usersData,
    currentPage,
    rowsPerPage: noOfRows,
    setCurrentPage,
  })

  const handleEdit = (user: userType) => {
    setIsEdit(true)
    setUserFormInputFieldValue({
      id: user.id,
      name: user.name,
      city: user.city,
      age: user.age,
      email: user.email,
    })
    setFormDialogOpen(true)
  }

  const handleDeleteClick = (id: number) => {
    setUserToDelete(id)
    setDeleteDialogOpen(true)
  }
  const handleDeleteConfirm = async () => {
    if (userToDelete !== null) {
      try {
        await deleteUser(userToDelete)
      } catch {
        // toast errors are already handled in useUsers
      }
    }
    setDeleteDialogOpen(false)
    setUserToDelete(null)
  }

  return (
    <>
      {!usersData?.length ? (
        <Loader text="Loading..." />
      ) : (
        <div className="h-[50%] overflow-scroll rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {TABLE_HEADINGS?.map((heading) => (
                  <TableHead key={heading} className="text-[16px] font-bold">
                    {heading}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-2xl">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((user) => (
                  <TableRow key={user?.id}>
                    <TableCell className="font-medium">{user?.id}</TableCell>
                    <TableCell>{user?.name}</TableCell>
                    <TableCell>{user?.city}</TableCell>
                    <TableCell>{user?.age}</TableCell>
                    <TableCell>{user?.email}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-6">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteClick(user?.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <FormDialog open={formDialogOpen} onOpenChange={setFormDialogOpen} />
      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
      />
    </>
  )
}

export default UsersTable
