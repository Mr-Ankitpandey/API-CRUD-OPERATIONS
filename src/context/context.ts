import type { UserContextType } from "@/Types/types";
import { createContext } from "react";

const UserContext = createContext<UserContextType>({
    usersData: [],
    addUser: () => { },
    updateUser: () => { },
    deleteUser: () => { },
    userFormInputFieldValue: { name: "", age: "", city: "", email: "" },
    setUserFormInputFieldValue: () => { },
    isEdit: false,
    setIsEdit: () => { },
    noOfRows: 0,
    setNoOfRows: () => { },
    currentPage: 0,
    setCurrentPage: () => { },
    isOperationRunning: false,
    searchQuery: "",
    setSearchQuery: () => { },
    formDialogOpen: false,
    setFormDialogOpen: () => { },
})

export default UserContext;