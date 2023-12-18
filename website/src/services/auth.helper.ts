import {toast} from "react-toastify";

export const saveTokenToStorage = (token?: string) => {
    if (token)
        localStorage.setItem('token', token)
}

export const removeTokenStorage = () => {
    localStorage.removeItem('token')
}

export const getToken = () => {
    return localStorage.getItem('token')
}

export const toastAuthError = (error: any, status: number, responseText: string[], errorText: string, cb?: () => void) => {
    if (error.response?.status === status && responseText.includes(error.response?.data)) {
        toast.error(errorText)
        cb?.()
    }
}
