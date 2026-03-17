import type { UserContextType } from "@/Types/types";
import { createContext } from "react";

const UserContext = createContext<UserContextType>({
    usersData : [],
    addUser : ()=> {},
    updateUser : ()=> {},
    deleteUser : ()=> {},
    userFormInputFieldValue: {name:"", age: "", city: "", email: ""},
    setUserFormInputFieldValue : ()=> {},
    isEdit:false,
    setIsEdit : ()=> {}
})

export default UserContext;