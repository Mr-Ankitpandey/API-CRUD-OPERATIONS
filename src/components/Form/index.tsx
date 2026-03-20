import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import UserContext from "@/context/context"
import { useContext } from "react"
import { toast } from "sonner"

interface FormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FormDialog({ open, onOpenChange }: FormDialogProps) {
  const {
    addUser,
    userFormInputFieldValue,
    setUserFormInputFieldValue,
    updateUser,
    isEdit,
  } = useContext(UserContext)

  const handleFormAction = (fd: FormData) => {
    const name = fd.get("name") as string
    const city = fd.get("city") as string
    const age = (fd.get("age") ?? "") as string
    const email = fd.get("email") as string

    if (!name.trim() || !city.trim() || !age.trim() || !email.trim()) {
      toast.error("Please provide all user details..!")
      return
    }

    if (!isEdit) {
      const user = {
        name: name.trim(),
        city: city.trim(),
        age: age.trim(),
        email: email.trim(),
      }
      addUser(user)
    } else {
      updateUser(userFormInputFieldValue)
    }

    setUserFormInputFieldValue({ name: "", city: "", age: "", email: "" })
    onOpenChange(false)
  }

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserFormInputFieldValue((prevValues) => ({
      ...prevValues,
      [name]: name === "age" ? Number(value) : value,
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit User" : "Add New User"}</DialogTitle>
        </DialogHeader>

        <form className="grid gap-5 sm:grid-cols-2" action={handleFormAction}>
          <FieldGroup className="contents">
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Enter name"
                required
                name="name"
                value={userFormInputFieldValue?.name || ""}
                onChange={handleFieldChange}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="city">City</FieldLabel>
              <Input
                id="city"
                type="text"
                placeholder="Enter city"
                name="city"
                value={userFormInputFieldValue?.city || ""}
                required
                onChange={handleFieldChange}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="age">Age</FieldLabel>
              <Input
                id="age"
                type="number"
                placeholder="Enter age"
                name="age"
                min="1"
                value={userFormInputFieldValue?.age || ""}
                required
                onChange={handleFieldChange}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="text"
                placeholder="Enter email"
                name="email"
                value={userFormInputFieldValue?.email || ""}
                required
                onChange={handleFieldChange}
              />
            </Field>
            <Field
              orientation="horizontal"
              className="justify-end sm:col-span-2"
            >
              <Button type="submit" size="lg" className="">
                {isEdit ? "Update User" : "Add User"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}
