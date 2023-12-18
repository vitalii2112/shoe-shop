import {IUser, IUserUpdate} from "@/models/IUser";
import axios, {axiosClassic} from "@/api/axios";
import {getAuthUrl} from "@/config/api.config";
import {removeTokenStorage, saveTokenToStorage} from "@/services/auth.helper";

export const AuthService = {
    async register(email: string, password: string, first_name: string, last_name: string) {
        const response = await axiosClassic.post<{user: IUser}>(
            getAuthUrl('/register'),
            {
                user: {email, password, first_name, last_name}
            }
        )

        if (response.headers.authorization) {
            saveTokenToStorage(response.headers.authorization?.split(' ')[1])
        }

        return response.data.user
    },
    async login(email: string, password: string) {
        const response = await axiosClassic.post<{user: IUser}>(
            getAuthUrl('/login'),
            {
                user: {email, password,}
            }
        )

        if (response.headers.authorization) {
            saveTokenToStorage(response.headers.authorization?.split(' ')[1])
        }

        return response.data.user
    },
    async logout() {
        await axios.delete(getAuthUrl('/logout'))
        removeTokenStorage()
    },
    async getMe() {
        const response = await axios.get<{user: IUser}>(getAuthUrl('/me'))
        if (response.headers.authorization) {
            saveTokenToStorage(response.headers.authorization?.split(' ')[1])
        }

        return response.data.user
    },
    async updateMe(data: IUserUpdate) {
        const response = await axios.patch<IUser>(getAuthUrl('/me'), data)
        return response.data
    },
}
