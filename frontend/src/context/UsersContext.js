import { createContext, useEffect, useState } from "react"
import { useAsync } from '../hooks/useAsync';
import { getAllUsers } from '../services/UserCrud';

export const UserContext = createContext({})

function UsersContextProvider({ children }) {
    //get the list of users
    const { error, loading, value: Users } = useAsync(getAllUsers)
    // list of user in local
    const [users, setUsers] = useState()

    const updateUsersListLocal = function (params) {
        setUsers(prev => [...prev, params])
    }

    // to st the list of users
    useEffect(function () {
        setUsers(Users)
    }, [Users])

    const value = {
        error, loading, Users:users, updateUsersListLocal
    }

    return <UserContext.Provider value={value}>  {children}</UserContext.Provider>

}

export default UsersContextProvider
