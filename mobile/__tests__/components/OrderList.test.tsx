import {describe, test} from "@jest/globals";
import {renderWithProviders} from "../../utils/test-utils";
import OrderList from "../../components/OrderList";

const orders = [
    {
        id: 1,
        amount: 20,
        user_id: 2,
        items: [
            {
                name: 'Some name',
                description: 'desc',
                img: 'img',
                price: 20,
                quantity: 1
            }
        ]
    }
]

describe('OrderList', () => {
    test('should render without flat list', () => {
        const {getAllByTestId, queryByTestId} = renderWithProviders(<OrderList orders={orders} noList={true}/>)

        expect(queryByTestId('order-list')).not.toBeOnTheScreen()
        expect(getAllByTestId('order-item').length).toBe(orders.length)
    })

    test('should render flat list', () => {
        const {getAllByTestId, getByTestId} = renderWithProviders(<OrderList orders={orders}/>)

        expect(getByTestId('order-list')).toBeOnTheScreen()
        expect(getAllByTestId('order-item').length).toBe(orders.length)
    })

    test('should render order item', () => {
        const {getAllByTestId, queryAllByTestId, queryAllByLabelText} = renderWithProviders(<OrderList orders={orders}/>)

        expect(getAllByTestId('order-item').length).toBe(orders.length)
        expect(queryAllByTestId('order-item-client').length).toBe(0)
        expect(getAllByTestId('order-item-amount').length).toBe(orders.length)
        expect(getAllByTestId('order-item-amount')[0]).toHaveTextContent(`${orders[0].amount} грн.`)
        expect(getAllByTestId('card').length).toBe(orders[0].items.length)
        expect(queryAllByLabelText('title').length).toBe(orders.length)
        expect(queryAllByLabelText('title')[0]).toHaveTextContent(`Заказ №${orders[0].id}`)
    })

    test('should render order item for admin', async () => {
        const mockPress = jest.fn()
        const order = {id: 1, amount: 1, user_id: 2, items: []}

        const {getAllByTestId, user, getByLabelText, rerender} = renderWithProviders(<OrderList orders={[order]} isAdmin onClientPress={mockPress}/>)
        expect(getAllByTestId('order-item-client').length).toBe(1)

        expect(getAllByTestId('order-item-client')[0]).toHaveTextContent(`Клиент №${order.user_id}`)

        await user.press(getByLabelText('pressable-button'))

        expect(mockPress).toHaveBeenCalledTimes(1)
        expect(mockPress).toHaveBeenCalledWith(order.user_id)

        rerender(<OrderList orders={[{...order, user_id: null}]} isAdmin onClientPress={mockPress}/>)
        mockPress.mockReset()

        expect(getAllByTestId('order-item-client').length).toBe(1)
        expect(getAllByTestId('order-item-client')[0]).toHaveTextContent(`Клиент удален`)

        await user.press(getByLabelText('pressable-button'))

        expect(mockPress).toHaveBeenCalledTimes(0)
    })
})

