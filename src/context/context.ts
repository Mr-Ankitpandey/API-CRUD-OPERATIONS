import type { UserContextType, userType } from "@/Types/types";
import { createContext } from "react";

const UserContext = createContext<UserContextType>({
    usersData : [],
    addUser : ()=> {},
    updateUser : (id:number, updatedUser: Omit<userType, 'id'>)=> {},
    deleteUser : ()=> {},
    userFormInputFieldValue: {name:"", age: 0, city: ""},
    setUserFormInputFieldValue : ()=> {},
    isEdit:false,
    setIsEdit : (val:boolean)=> {}
})

export default UserContext;