import {IProduct} from "./IProduct";

export interface IOrder {
    id: number
    amount: number
    user_id: number | null
    items: IOrderItem[]
}

export interface IOrderItem extends Omit<IProduct, "id"> {
    quantity: number
}
