import axios, {axiosClassic} from "../api/axios";
import {IProduct, IProductCreate} from "../models/IProduct";
import {getProductUrl} from "../config/api.config";

export const ItemsService = {
    async getAll(queryString?: string) {
        const {data} = await axiosClassic.get<IProduct[]>(getProductUrl(queryString || ''))

        return data
    },
    async getOne(id: number) {
        const {data} = await axiosClassic.get<IProduct>(getProductUrl(`/${id}`))
        return data
    },
    async create(product: IProductCreate) {
        const formData = new FormData()
        formData.append('item[name]', product.name)
        formData.append('item[description]', product.description)
        formData.append('item[price]', product.price.toString().replace(',', '.'))
        formData.append('item[img]', product.img)
        const {data} = await axios.post<IProduct>(getProductUrl(''), formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return data
    },
    async update(product: { id: number, data: IProductCreate }) {
        const formData = new FormData()
        formData.append('item[name]', product.data.name)
        formData.append('item[description]', product.data.description)
        formData.append('item[price]', product.data.price.toString().replace(',', '.'))
        if (typeof product.data.img !== "string")
            formData.append('item[img]', product.data.img)
        const {data} = await axios.patch<IProduct>(getProductUrl(`/${product.id}`), formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return data
    },
    async delete(id: number) {
        await axios.delete(getProductUrl(`/${id}`))
    },
}
