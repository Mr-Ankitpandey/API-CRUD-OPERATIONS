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
import { useContext, useEffect, useState } from "react"
import UserContext from "@/context/context"
import type { userType } from "@/Types/types"
import { Plus } from "lucide-react"
import { TABLE_HEADINGS } from "@/constants/table_headings"
import { Input } from "../ui/input"
const UsersTable = () => {
  const {
    usersData,
    deleteUser,
    setIsEdit,
    setUserFormInputFieldValue,
    currentPage,
    noOfRows,
  } = useContext(UserContext)

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<number | null>(null)

  const handleAddClick = () => {
    setIsEdit(false)
    setUserFormInputFieldValue({ name: "", city: "", age: "", email: "" })
    setFormDialogOpen(true)
  }

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
      deleteUser(userToDelete)
    }
    setDeleteDialogOpen(false)
    setUserToDelete(null)
  }

  const handleSearchChange = () => {
    // pending.......
  }
  const start = (currentPage - 1) * noOfRows
  const end = start + noOfRows
  return (
    <div>
      <div className="mb-5 flex justify-between">
        <h2 className="text-xl font-semibold">User Details</h2>
        <Input
          placeholder="Search..."
          className="max-w-sm"
          onChange={handleSearchChange}
        />
        <Button
          onClick={handleAddClick}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          <Plus />
          Add User
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border border-border">
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
            {usersData?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              usersData?.slice(start, end).map((user) => (
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
                        {" "}
                        Delete{" "}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <FormDialog open={formDialogOpen} onOpenChange={setFormDialogOpen} />
      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}

export default UsersTable
