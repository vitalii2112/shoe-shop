import axios from "@/api/axios";
import {IOrder} from "@/models/IOrder";
import {getOrdersUrl} from "@/config/api.config";

export const OrderService = {
    async create(data: { id: number, quantity: number }[]) {
        const response = await axios.post<{ order_id: number }>(getOrdersUrl(''), {order: data})
        return response.data.order_id
    },
    async getAllAdmin() {
        const {data} = await axios.get<IOrder[]>(getOrdersUrl(''))
        return data
    },
    async getAllUser(userId: number) {
        const {data} = await axios.get<IOrder[]>(getOrdersUrl(`/user/${userId}`))
        return data
    },
    // async create(data: IOrderCreate) {
    //     return await axios.post(getOrdersUrl(''), data)
    // },
}
