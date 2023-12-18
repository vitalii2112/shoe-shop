import axios from 'axios'
import {API_URL} from "@/config/api.config";
import {getToken, removeTokenStorage} from "@/services/auth.helper";

export const axiosClassic = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
})

export const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
})

instance.interceptors.request.use((config) => {
    const token = getToken()

    if (config.headers && token)
        config.headers.Authorization = `Bearer ${token}`

    return config
})

instance.interceptors.response.use(config => config, async (error) => {
    if (error.response?.status === 401 && error.config) {
        removeTokenStorage()
    }
    throw error;
});

export default instance

