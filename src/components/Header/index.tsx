import { Plus, X } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useContext} from "react"
import UserContext from "@/context/context"

const Header = () => {
  const { setCurrentPage, setUserFormInputFieldValue, setIsEdit,searchQuery, setSearchQuery, setFormDialogOpen} =
    useContext(UserContext)

  const handleAddClick = () => {
    setIsEdit(false)
    setUserFormInputFieldValue({ name: "", city: "", age: "", email: "" })
    setFormDialogOpen(true)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  return (
    <>
      <div className="mb-5 flex justify-between">
        <h2 className="text-xl font-semibold">User Details</h2>
        <div className="relative md:max-w-sm w-sm">
          <Input
            placeholder="Search..."
            className="pr-9"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => {
                setSearchQuery("")
                setCurrentPage(1)
              }}
              className="absolute right-1 h-7 w-7 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button
          onClick={handleAddClick}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          <Plus />
          Add User
        </Button>
      </div>

      
    </>
  )
}

export default Header
