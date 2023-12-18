import {IProduct} from "@/models/IProduct";

export interface ICartState {
    items: ICartItem[]
    isPayed: boolean
    isOpen: boolean
}

export interface ICartItem extends IProduct{
    quantity: number
}
