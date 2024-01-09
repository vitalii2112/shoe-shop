import {describe, jest, test} from "@jest/globals";
import {renderWithProviders} from "../../utils/test-utils";
import OrdersScreen from "../../screens/OrdersScreen";
import {waitFor} from "@testing-library/react-native";
import {OrderService} from "../../services/order.service";

jest.mock("../../services/order.service")

const mockOrderService = OrderService as jest.Mocked<typeof OrderService>

const ordersData = [
    {
        id: 1,
        amount: 1000,
        user_id: 1,
        items: []
    }
]

describe('Orders screen', () => {
    test('should render empty block', () => {
        const {getByTestId, queryByTestId} = renderWithProviders(<OrdersScreen/>)

        expect(getByTestId('cart-empty-block')).toBeOnTheScreen()
        expect(queryByTestId('order-list')).not.toBeOnTheScreen()
    })

    test('should render orders', async () => {
        mockOrderService.getAllUser.mockResolvedValue(ordersData)
        const {getByTestId, queryByTestId} = renderWithProviders(<OrdersScreen/>, {initialState: {user: {isAuth: true, status: 2, user: {id: 1, last_name: '', first_name: '', email: '', role: 'user'}}}})

        await waitFor(() => expect(getByTestId('order-list')).toBeOnTheScreen())
        expect(queryByTestId('cart-empty-block')).not.toBeOnTheScreen()
    })
})
