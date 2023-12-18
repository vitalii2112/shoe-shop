import {IProduct} from "@/models/IProduct";

export type TCardProps = {
    id?: number
    name?: string
    description?: string
    img?: string
    price?: number
    quantity?: number
    onAdd?: (quantity: number) => void
    isLoading?: boolean
    isCartExist?: boolean
    isEdit?: boolean
    onClick?: (item: IProduct) => void
}

