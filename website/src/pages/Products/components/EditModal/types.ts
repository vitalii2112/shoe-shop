import {IProduct, IProductCreate} from "@/models/IProduct";

export type TEditModalProps = {
    isOpen: boolean
    item?: IProduct
    onClose: () => void
    onSubmit: (data: IProductCreate, id?: number) => void
    onDelete: (id: number) => void
}
