import {DocumentPickerResponse} from "react-native-document-picker";

export interface IProduct extends IProductBase {
    id: number
    img: string
}

export interface IProductCreate extends IProductBase {
    img: DocumentPickerResponse | string
}

interface IProductBase {
    name: string
    description: string
    price: number
}
