import { useContext } from "react";
import { UserContext } from "../context/UsersContext";

export function useUsers() {
    return useContext(UserContext)
}