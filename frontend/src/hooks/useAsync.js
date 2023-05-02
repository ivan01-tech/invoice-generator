
import { useCallback, useEffect, useState } from 'react';

export const useAsync = function (func) {
	const { executeFn, ...state } = useAsyncInternal(func, [], true)

	useEffect(function () {
		executeFn()
	}, [])

	return state
}
export const useAsyncFn = function (func, dependencies = []) {
	return useAsyncInternal(func, dependencies, false)
}

/**
 * 
 * @param {Function} func 
 * @param {Array} dependencies 
 * @param {boolean} initial 
 * @returns 
 */
export function useAsyncInternal(func, dependencies = [], initial) {

	//state to handle to resquest correctly
	const [error, setError] = useState(initial || false)
	const [loading, setLoading] = useState(undefined)
	const [value, setValue] = useState(undefined)

	/**
	 * a function that will be call in orderto make the resquest at needed time
	 */
	const executeFn = useCallback(function (...params) {
		setLoading(true)
		return func(...params)
			.then(res => {

				if(res?.status){
					setError(res?.message)
					setValue(undefined)
					return Promise.reject(res?.message)
				}

				setValue(res)
				setError(undefined)
				return res
			})
			.catch(err => {
				setError(err)
				setValue(undefined)
				return Promise.reject(err)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [...dependencies])

	return { error, loading, value, executeFn }

}