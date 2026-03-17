import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import UserContext from "@/context/context";
import { useContext } from "react";

export function Form() {

 const {addUser, userFormInputFieldValue, setUserFormInputFieldValue, updateUser, isEdit} = useContext(UserContext)

 const handleFormAction = (fd: FormData) => {
    const name = fd.get('name') as string
    const city = fd.get('city') as string
    const age = (fd.get('age') ?? "") as string
    const email = fd.get('email') as string
    
    if(!isEdit){
        addUser({ name, city, age, email })
    }else{
        updateUser(userFormInputFieldValue)
    }
    
    setUserFormInputFieldValue({ name: "", city: "", age: "" , email: ""});
  };

 const handleFieldChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
    const {name, value} =  e.target
    setUserFormInputFieldValue((prevValues)=>({
        ...prevValues,
        [name] : name === 'age' ? Number(value) : value
    }))
 }

  return (
    <form className="w-full max-w-sm " action={handleFormAction}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Name : </FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="Enter name"
            required
            name="name"
            value={userFormInputFieldValue?.name || ''}
            onChange={handleFieldChange}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="city">City : </FieldLabel>
          <Input id="city" type="text" placeholder="Enter city" name="city" value={userFormInputFieldValue?.city || ''} required onChange={handleFieldChange}/>
        </Field>
        <Field>
          <FieldLabel htmlFor="age">Age : </FieldLabel>
          <Input id="age" type="number" placeholder="Enter age" name="age" min="1" value={userFormInputFieldValue?.age || ''} required onChange={handleFieldChange}/>
        </Field>
        <Field>
          <FieldLabel htmlFor="city">Email : </FieldLabel>
          <Input id="email" type="email" placeholder="Enter Email" name="email" value={userFormInputFieldValue?.email || ''} required onChange={handleFieldChange}/>
        </Field>
        <Field orientation="horizontal">
            {isEdit ? <Button type="submit">Update</Button> : <Button type="submit">Add</Button> }
        </Field>
      </FieldGroup>
    </form>
  )
}
