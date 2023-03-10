export function getBaseUrl() {
	return process.env.NODE_ENV === "production" ? process.env.REACT_APP_DB_URI_PROD : process.env.REACT_APP_DB_URI_DEV
}