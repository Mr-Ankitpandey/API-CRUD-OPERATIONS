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
import useForm from "./hooks/useForm"

interface FormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FormDialog({ open, onOpenChange }: FormDialogProps) {
  const {
    userFormInputFieldValue,
    isEdit,
    isOperationRunning,
    setFormDialogOpen,
  } = useContext(UserContext)

  const { handleFormSubmit, handleInputChange } = useForm(onOpenChange)

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!isOperationRunning) onOpenChange(val)
      }}
    >
      <DialogContent
        className="sm:max-w-lg"
        onInteractOutside={(e) => {
          if (isOperationRunning) e.preventDefault()
        }}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                name="email"
                disabled={isOperationRunning}
                value={userFormInputFieldValue?.email || ""}
                required
                onChange={handleInputChange}
              />
            </Field>
            <Field
              orientation="horizontal"
              className="justify-end gap-3 sm:col-span-2"
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="lg" disabled={isOperationRunning}>
                {isOperationRunning ? (
                  <>
                    <Spinner className="size-4" />
                    Please wait...
                  </>
                ) : isEdit ? (
                  "Update User"
                ) : (
                  "Add User"
                )}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}
