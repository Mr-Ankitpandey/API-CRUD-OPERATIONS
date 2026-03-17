export interface userType {
    id: number
    name: string,
    age : string,
    city : string,
    email : string
}

export interface UserContextType  {
    usersData : userType[]
    addUser : (user : userType)=> void;
    updateUser : (id: number, user: Partial<userType>)=> void;
    deleteUser : (id: number)=> void;
    userFormInputFieldValue : Omit<userType, 'id'>,
    setUserFormInputFieldValue : (value: Omit<userType, 'id'> | ((prev: Omit<userType, 'id'>) => Omit<userType, 'id'>))=> void,
    isEdit : boolean,
    setIsEdit : (val:boolean)=> void
}