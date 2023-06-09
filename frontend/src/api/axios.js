import axios from "axios"
import { getBaseUrl } from "../uitls/fetchData"

export const Axios = axios.create({
	baseURL: `${getBaseUrl()}`,
	withCredentials: true,
	headers: {
		'content-type': 'application/json'
	}
})

