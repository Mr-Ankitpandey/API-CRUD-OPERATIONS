export interface userType {
    id: number
    name: string,
    age : string,
    city : string,
    email : string
}

export type userFormType = Omit<userType, 'id'> & { id?: number }

export interface UserContextType  {
    usersData : userType[]
    addUser : (user : userFormType)=> void;
    updateUser : (formValues: userFormType)=> void;
    deleteUser : (id: number)=> void;
    userFormInputFieldValue : userFormType,
    setUserFormInputFieldValue : (value: userFormType | ((prev: userFormType) => userFormType))=> void,
    isEdit : boolean,
    setIsEdit : (val:boolean)=> void,
    noOfRows: number,
    setNoOfRows : (val:number)=>void,
    isLoading : boolean
    currentPage : number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    isOperationRunning : boolean,
    searchQuery: string,
    setSearchQuery : (val:string)=>void
    formDialogOpen: boolean,
    setFormDialogOpen : (val : boolean)=>void
}