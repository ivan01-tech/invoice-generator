import { createContext } from "react"
import { useAsync } from '../hooks/useAsync';
import { getAllUsers } from '../services/UserCrud';

export const UserContext = createContext({})

function UsersContextProvider({ children }) {

    //get the list of users
    const { error, loading, value: Users } = useAsync(getAllUsers)

    const value = {
        error, loading, Users
    }

    return <UserContext.Provider value={value}>  {children}</UserContext.Provider>

}

export default UsersContextProvider
