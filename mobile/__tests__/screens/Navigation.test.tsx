import {describe, jest, test} from "@jest/globals";
import {renderWithProviders} from "../../utils/test-utils";
import Navigation from "../../components/Navigation";
import {waitFor} from "@testing-library/react-native";
import {OrderService} from "../../services/order.service";
import {ItemsService} from "../../services/items.service";
import {UserService} from "../../services/user.service";

jest.mock("../../services/order.service")
jest.mock("../../services/items.service")
jest.mock("../../services/user.service")

const mockOrderService = OrderService as jest.Mocked<typeof OrderService>
const mockItemsService = ItemsService as jest.Mocked<typeof ItemsService>
const mockUserService = UserService as jest.Mocked<typeof UserService>

const ordersData = [
    {
        id: 1,
        amount: 1000,
        user_id: 1,
        items: []
    }
]

beforeEach(() => {
    mockOrderService.getAllUser.mockResolvedValue(ordersData)
    mockOrderService.getAllAdmin.mockResolvedValue(ordersData)
    mockUserService.getAll.mockResolvedValue([{id: 1, email: '', first_name: 'Some firstname', role: 'user', last_name: ''}])
    mockUserService.getById.mockResolvedValue({id: 1, email: '', first_name: 'Some firstname', role: 'user', last_name: ''})
    mockItemsService.getAll.mockResolvedValue([{id: 1, name: 'name', description: 'desc', img: 'img', price: 10}])
    mockItemsService.getOne.mockResolvedValue({id: 1, name: 'name', description: 'desc', img: 'img', price: 10})
})

describe('Navigation', () => {
    test('should render Home', async () => {
        const {getByTestId, queryByTestId} = renderWithProviders(<Navigation/>)

        await waitFor(() => expect(queryByTestId('loading')).not.toBeOnTheScreen())

        expect(getByTestId('home-screen')).toBeOnTheScreen()
    })

    test('should render Cart', async () => {
        const {getByTestId, queryByTestId, getByText, user} = renderWithProviders(<Navigation/>)

        await waitFor(() => expect(queryByTestId('loading')).not.toBeOnTheScreen())

        await user.press(getByText('Корзина'))

        expect(getByTestId('cart-empty-block')).toBeOnTheScreen()
    })

    test('should render More', async () => {
        const {getByTestId, queryByTestId, getByText, user} = renderWithProviders(<Navigation/>)

        await waitFor(() => expect(queryByTestId('loading')).not.toBeOnTheScreen())

        await user.press(getByText('Ещё'))

        expect(getByTestId('more-screen')).toBeOnTheScreen()
    })

    test('should render Login', async () => {
        const {getByTestId, queryByTestId, getByText, user} = renderWithProviders(<Navigation/>)

        await waitFor(() => expect(queryByTestId('loading')).not.toBeOnTheScreen())

        await user.press(getByText('Ещё'))
        await user.press(getByText('Войти'))

        expect(getByTestId('screen-login')).toBeOnTheScreen()
    })

    test('should render Register', async () => {
        const {getByTestId, queryByTestId, getByText, user} = renderWithProviders(<Navigation/>)

        await waitFor(() => expect(queryByTestId('loading')).not.toBeOnTheScreen())

        await user.press(getByText('Ещё'))
        await user.press(getByText('Регистрация'))

        expect(getByTestId('register-screen')).toBeOnTheScreen()
    })

    test('should render All products', async () => {
        const {getByTestId, queryByTestId, getByText, user} = renderWithProviders(<Navigation/>, {initialState: {user: {isAuth: true, status: 2, user: {id: 1, email: '', role: 'admin', last_name: '', first_name: ''}}}})

        await waitFor(() => expect(queryByTestId('loading')).not.toBeOnTheScreen())

        await user.press(getByText('Ещё'))
        await user.press(getByText('Товары'))

        expect(getByTestId('products-screen')).toBeOnTheScreen()
    })

    test('should render All orders', async () => {
        const {getByTestId, queryByTestId, getByText, user} = renderWithProviders(<Navigation/>, {initialState: {user: {isAuth: true, status: 2, user: {id: 1, email: '', role: 'admin', last_name: '', first_name: ''}}}})

        await waitFor(() => expect(queryByTestId('loading')).not.toBeOnTheScreen())

        await user.press(getByText('Ещё'))
        await user.press(getByText('Все заказы'))

        expect(getByTestId('order-list')).toBeOnTheScreen()
    })

    test('should render Orders', async () => {
        const {getByTestId, queryByTestId, getByText, user} = renderWithProviders(<Navigation/>, {initialState: {user: {isAuth: true, status: 2, user: {id: 1, email: '', role: 'admin', last_name: '', first_name: ''}}}})

        await waitFor(() => expect(queryByTestId('loading')).not.toBeOnTheScreen())

        await user.press(getByText('Заказы'))

        expect(getByTestId('order-list')).toBeOnTheScreen()
    })

    test('should render Product', async () => {
        const {getByTestId, queryByTestId, getByText, user} = renderWithProviders(<Navigation/>, {initialState: {user: {isAuth: true, status: 2, user: {id: 1, email: '', role: 'admin', last_name: '', first_name: ''}}}})

        await waitFor(() => expect(queryByTestId('loading')).not.toBeOnTheScreen())

        await user.press(getByText('Ещё'))
        await user.press(getByText('Товары'))
        await user.press(getByText('Редактировать'))

        expect(getByTestId('product-screen')).toBeOnTheScreen()
    })

    test('should render Profile', async () => {
        const {getByTestId, queryByTestId, getByText, user} = renderWithProviders(<Navigation/>, {initialState: {user: {isAuth: true, status: 2, user: {id: 1, email: '', role: 'admin', last_name: '', first_name: ''}}}})

        await waitFor(() => expect(queryByTestId('loading')).not.toBeOnTheScreen())

        await user.press(getByText('Ещё'))
        await user.press(getByText('Профиль'))

        expect(getByTestId('profile-screen')).toBeOnTheScreen()
    })

    test('should render Users', async () => {
        const {getByTestId, queryByTestId, getByText, user} = renderWithProviders(<Navigation/>, {initialState: {user: {isAuth: true, status: 2, user: {id: 1, email: '', role: 'admin', last_name: '', first_name: ''}}}})

        await waitFor(() => expect(queryByTestId('loading')).not.toBeOnTheScreen())

        await user.press(getByText('Ещё'))
        await user.press(getByText('Пользователи'))

        expect(getByTestId('users-screen')).toBeOnTheScreen()
    })

    test('should render User', async () => {
        const {getByTestId, queryByTestId, getByText, user} = renderWithProviders(<Navigation/>, {initialState: {user: {isAuth: true, status: 2, user: {id: 1, email: '', role: 'admin', last_name: '', first_name: ''}}}})

        await waitFor(() => expect(queryByTestId('loading')).not.toBeOnTheScreen())

        await user.press(getByText('Ещё'))
        await user.press(getByText('Пользователи'))
        await user.press(getByTestId('user-block'))

        expect(getByTestId('profile-screen')).toBeOnTheScreen()
    })
})

