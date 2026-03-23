import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog"
import { FormDialog } from "@/pages/Home/components/Form"
import { useContext } from "react"
import UserContext from "@/context/context"
import { TABLE_HEADINGS } from "@/constants/constants"
import { Loader } from "../../../../components/Loader"
import usePagination from "@/hooks/usePagination"
import useUsersTable from "./hooks/useUsersTable"

const UsersTable = () => {
  const {
    usersData,
    currentPage,
    noOfRows,
    formDialogOpen,
    setFormDialogOpen,
    setCurrentPage,
    isLoading
  } = useContext(UserContext)

  const { paginatedData } = usePagination({
    data: usersData,
    currentPage,
    rowsPerPage: noOfRows,
    setCurrentPage,
  })

  const {
    deleteDialogOpen,
    setDeleteDialogOpen,
    handleEdit,
    handleDeleteClick,
    handleDeleteConfirm,
  } = useUsersTable()

  return (
    <>
      {isLoading? (
        <Loader text="Loading..." />
      ) : (
        <div  >
          <Table >
            <TableHeader>
              <TableRow >
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
                paginatedData?.map((user) => (
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
