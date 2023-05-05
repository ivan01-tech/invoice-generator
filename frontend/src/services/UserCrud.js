import { makeRequest } from "./makeRequest"

/**
 * to get the list of user
 * @param {} options 
 * @returns 
 */
export const getAllUsers = function () {
    return makeRequest("users", { method: "GET" })
}

/**
 * to get the list of user
 * @param {} options 
 * @returns 
 */
export const createUser = function ({ email, phone, fullname, }) {
    return makeRequest("users", {
        method: "POST",
        data: JSON.stringify({ email, phone, fullname, })
    })
}