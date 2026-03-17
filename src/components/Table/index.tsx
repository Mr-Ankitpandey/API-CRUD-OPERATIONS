import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog"
import { FormDialog } from "@/components/FormDialog"
import { useContext, useState } from "react"
import UserContext from "@/context/context"
import type { userType } from "@/Types/types"
import { Pencil, Plus, Trash2 } from "lucide-react"

function UsersTable() {
  const {
    usersData,
    deleteUser,
    setIsEdit,
    setUserFormInputFieldValue,
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

  const handleDeleteConfirm = () => {
    if (userToDelete !== null) {
      deleteUser(userToDelete)
    }
    setDeleteDialogOpen(false)
    setUserToDelete(null)
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Users</h2>
        <Button onClick={handleAddClick}>
          <Plus />
          Add User
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {usersData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-10 text-center text-muted-foreground"
                >
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              usersData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.city}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(user)}
                      >
                        <Pencil />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteClick(user.id)}
                      >
                        <Trash2 />
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

      <FormDialog open={formDialogOpen} onOpenChange={setFormDialogOpen} />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}

export default UsersTable