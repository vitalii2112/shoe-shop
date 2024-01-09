import {beforeEach, expect, jest, test} from "@jest/globals";
import axios from "../../api/axios";
import {OrderService} from "../../services/order.service";

jest.mock("../../api/axios")
const mockedAuthAxios = axios as jest.Mocked<typeof axios>

const ordersData = [
    {
        id: 1,
        amount: 1000,
        user_id: 1,
        items: []
    }
]

beforeEach(() => {
    mockedAuthAxios.get.mockReset()
    mockedAuthAxios.get.mockResolvedValue({data: ordersData})
})

test('should create order', async () => {
    mockedAuthAxios.post.mockResolvedValue({data: {order_id: 2}})

    const orderId = await OrderService.create([{id: 1, quantity: 1}])

    expect(orderId).toEqual(2)
    expect(mockedAuthAxios.post).toBeCalledTimes(1)
})

test('should get all orders', async  () => {

    const orders = await OrderService.getAllAdmin()

    expect(orders).toEqual(ordersData)
    expect(mockedAuthAxios.get).toBeCalledTimes(1)
})

test('should get user orders', async  () => {
    const orders = await OrderService.getAllUser(1)

    expect(orders).toEqual(ordersData)
    expect(mockedAuthAxios.get).toBeCalledTimes(1)
})
