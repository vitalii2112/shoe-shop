import axios from "@/api/axios";
import {getUsersUrl} from "@/config/api.config";
import {IUser, IUserUpdate} from "@/models/IUser";

export const UserService = {
    async getAll() {
        const {data} = await axios.get<IUser[]>(getUsersUrl(''))
        return data
    },
    async getById(userId: number) {
        const {data} = await axios.get<IUser>(getUsersUrl(`/${userId}`))
        return data
    },
    async update(data: { userId: number, data: IUserUpdate }) {
        const response = await axios.patch<IUser>(getUsersUrl(`/${data.userId}`), data.data)
        return response.data
    },
    async delete(userId: number) {
        await axios.delete(getUsersUrl(`/${userId}`))
    },
}
