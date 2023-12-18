import Toast from "react-native-toast-message";
import {storage} from "../store/storage";

export const saveTokenToStorage = (token?: string) => {
    if (token)
        storage.set('token', token)
}

export const removeTokenStorage = () => {
    storage.delete('token')
}

export const getToken = () => {
    return storage.getString('token')
}

export const toastAuthError = (error: any, status: number, responseText: string[], errorText: string, cb?: () => void) => {
    if (error.response?.status === status && responseText.includes(error.response?.data)) {
        Toast.show({
            type: 'error',
            text1: 'Ошибка',
            text2: errorText
        })
        cb?.()
    }
}
