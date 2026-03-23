import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useContext } from "react"
import UserContext from "@/context/context"

interface ConfirmDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}
export function ConfirmDeleteDialog({
  open,
  onOpenChange,
  onConfirm,
}: ConfirmDeleteDialogProps) {
  const { isOperationRunning } = useContext(UserContext)

  return (
    <Dialog open={open} onOpenChange={(val) => { if (!isOperationRunning) onOpenChange(val) }}>
      <DialogContent className="sm:max-w-md bg-gray-300" onInteractOutside={(e) => { if (isOperationRunning) e.preventDefault() }}>
        <DialogHeader>
          <DialogTitle className="text-center">Delete User</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to delete this user?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button variant="destructive" onClick={onConfirm} disabled={isOperationRunning}>
            {isOperationRunning ? (
              <>
                <Spinner className="size-4" />
                Please wait...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
