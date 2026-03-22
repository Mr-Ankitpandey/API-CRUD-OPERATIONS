import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
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
    isOperationRunning,
  } = useContext(UserContext)

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
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
        await addUser(user) 
      } else {
        await updateUser(userFormInputFieldValue)
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
    <Dialog open={open} onOpenChange={(val) => { if (!isOperationRunning) onOpenChange(val) }}>
      <DialogContent className="sm:max-w-lg" onInteractOutside={(e) => { if (isOperationRunning) e.preventDefault() }}>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit User" : "Add New User"}</DialogTitle>
        </DialogHeader>

        <form className="grid gap-5 sm:grid-cols-2" onSubmit={handleFormSubmit}>
          <FieldGroup className="contents">
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Enter name"
                required
                name="name"
                disabled={isOperationRunning}
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
                disabled={isOperationRunning}
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
                disabled={isOperationRunning}
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
                disabled={isOperationRunning}
                value={userFormInputFieldValue?.email || ""}
                required
                onChange={handleFieldChange}
              />
            </Field>
            <Field
              orientation="horizontal"
              className="justify-end sm:col-span-2 gap-3"
            >
              <Button
                type="button"
                size="lg"
                variant="outline"
                disabled={isOperationRunning}
                onClick={() =>
                  setUserFormInputFieldValue({ name: "", city: "", age: "", email: "" })
                }
              >
                Clear
              </Button>
              <Button type="submit" size="lg" disabled={isOperationRunning}>
                {isOperationRunning ? (
                  <>
                    <Spinner className="size-4" />
                    Please wait...
                  </>
                ) : (
                  isEdit ? "Update User" : "Add User"
                )}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}
