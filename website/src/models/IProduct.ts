export interface IProduct extends IProductBase {
    id: number
    img: string
}

export interface IProductCreate extends IProductBase {
    img?: File
}

interface IProductBase {
    name: string
    description: string
    price: number
}
