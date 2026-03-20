import { Plus } from "lucide-react"
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
        <Input
          placeholder="Search..."
          className="md:max-w-sm w-sm"
          value={searchQuery}
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

      
    </>
  )
}

export default Header
