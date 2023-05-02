import { Axios } from "../api/axios"
/**
 * to make any kind of resquest
 * @param {string} url 
 * @param {import("axios").AxiosRequestConfig} options 
 */
export function makeRequest(url, options) {
    return Axios(url, options).then(res => {
        console.log("res : ", res)
        const data = res.data
        return data
    }).catch(err => {
        console.log("error : ", err)
        return err?.response?.data || err.message || "Error"
    })
}