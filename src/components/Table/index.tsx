import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { useContext } from "react"
import UserContext from "@/context/context"
import type { userType } from "@/Types/types"

function UsersTable() {

  const {usersData, deleteUser, setIsEdit, setUserFormInputFieldValue} = useContext(UserContext)
console.log(usersData)
  const handleEdit = (user: userType) => {
    setIsEdit(true);
    setUserFormInputFieldValue({
      name : user.name,
      city : user.city,
      age: user.age,
      email: user.email
    })
  }

  const handleDelete = (id: number) => {
    const response = confirm('Confirm to delete?');
    if(response){
      deleteUser(id)
    }else{
      return;
    }
  }
  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {usersData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.city}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.email}</TableCell>

              <TableCell className="flex gap-4">
                <Button variant="outline" onClick={()=>handleEdit(user)}>Edit</Button>
                <Button variant="destructive" onClick={()=>handleDelete(user.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default UsersTable