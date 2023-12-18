import {IProduct} from "@/models/IProduct";

export type TProductProps = {
    products: (IProduct  | undefined)[]
    onAdd?: (item: IProduct) => (quantity: number) => void
    isAddToCart?: (id: number) => boolean
    isEditable?: boolean
    onItemClick?: (item: IProduct) => void
}

