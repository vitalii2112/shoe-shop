import axios from "../api/axios";
import {getOrdersUrl} from "../config/api.config";
import {IOrder} from "../models/IOrder";

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
        const response = await axios.get<IOrder[]>(getOrdersUrl(`/user/${userId}`))
        return response.data
    },
}
