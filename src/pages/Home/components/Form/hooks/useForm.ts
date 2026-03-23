import { INITIAL_FORM_VALUES } from "@/constants/constants"
import UserContext from "@/context/context"
import { useContext } from "react"
import { toast } from "sonner"

const useForm = (onOpenChange: (open: boolean) => void) => {
  const {
    isEdit,
    addUser,
    updateUser,
    userFormInputFieldValue,
    setUserFormInputFieldValue,
  } = useContext(UserContext)

  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e?.target)
    const name = fd.get("name") as string
    const city = fd.get("city") as string
    const age = (fd.get("age") ?? "") as string
    const email = fd.get("email") as string

    if (!name?.trim() || !city?.trim() || !age?.trim() || !email?.trim()) {
      toast.error("Please provide all user details..!")
      return
    }
    if (!isEdit) {
      const user = {
        name: name?.trim(),
        city: city?.trim(),
        age: age?.trim(),
        email: email?.trim(),
      }
      await addUser(user)
    } else {
      await updateUser(userFormInputFieldValue)
    }

    setUserFormInputFieldValue(INITIAL_FORM_VALUES)
    onOpenChange(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserFormInputFieldValue((prevValues) => ({
      ...prevValues,
      [name]: name === "age" ? Number(value) : value,
    }))
  }

  return { handleFormSubmit, handleInputChange }
}

export default useForm
