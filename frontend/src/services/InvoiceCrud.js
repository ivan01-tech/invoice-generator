import { makeRequest } from "./makeRequest"

/**
 * to add new invoice 
 * @param {{userId:string,items:Array}}} params 
 * @returns 
 */
export const createInvoice = function (params) {
    return makeRequest("/invoices", {
        method: "POST",
        data: JSON.stringify(params)
    })
}