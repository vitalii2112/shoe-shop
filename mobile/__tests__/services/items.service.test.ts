import {expect, jest, test} from "@jest/globals";
import * as api from "../../api/axios";
import {ItemsService} from "../../services/items.service";
import {getProductUrl} from "../../config/api.config";

jest.mock("../../api/axios")

const mockedAxios = api.axiosClassic as jest.Mocked<typeof api.axiosClassic>
const mockedAuthAxios = api.default as jest.Mocked<typeof api.default>

test('should return all products', async () => {
    const items = [
        {
            id: 1,
            img: "img",
            name: "name",
            description: "desc",
            price: 20,
        },
        {
            id: 2,
            img: "img2",
            name: "name2",
            description: "desc2",
            price: 22,
        }
    ]
    mockedAxios.get.mockResolvedValue({
        data: items
    })

    const products = await ItemsService.getAll()

    expect(products).toEqual(items)
})

test('should create product', async () => {
    const item = {
        id: 1,
        img: "img",
        name: "name",
        description: "desc",
        price: 20,
    }
    mockedAuthAxios.post.mockResolvedValue({
        data: item
    })

    const product = await ItemsService.create({name: 'name', img: '', description: 'desc', price: 20})

    expect(product).toEqual(item)
})

test('should delete product', async () => {
    await ItemsService.delete(1)

    expect(mockedAuthAxios.delete).toBeCalledTimes(1)
    expect(mockedAuthAxios.delete).toBeCalledWith(getProductUrl('/1'))
})
