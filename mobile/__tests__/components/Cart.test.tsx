import {describe, jest, test} from "@jest/globals";
import {renderWithProviders} from "../../utils/test-utils";
import Cart from "../../components/Cart";
import {act, waitFor} from "@testing-library/react-native";
import axios from "../../api/axios";

const cartItems = [
    {
        id: 1,
        img: 'img',
        name: 'Some name 1',
        quantity: 3,
        description: "desc",
        price: 21
    },
    {
        id: 2,
        img: 'img',
        name: 'Some name 2',
        quantity: 2,
        description: "desc",
        price: 24
    },
    {
        id: 3,
        img: 'img',
        name: 'Some name 3',
        quantity: 4,
        description: "desc",
        price: 20
    },
]

jest.mock("../../api/axios")
const mockedAuthAxios = axios as jest.Mocked<typeof axios>


describe('Cart', () => {
    test('should render items (unauthorized)', () => {
        const {getAllByTestId, queryByTestId, getByTestId} = renderWithProviders(<Cart setIsOrderComplete={jest.fn()}
                                                                                       setOrderId={jest.fn()}/>, {
            initialState: {
                cart: {
                    isPayed: false,
                    isOpen: false,
                    items: cartItems
                }
            }
        })

        expect(queryByTestId('loading')).not.toBeOnTheScreen()

        expect(getByTestId('cart-list')).toBeOnTheScreen()
        expect(getAllByTestId('cart-item-block').length).toBe(3)
        expect(getByTestId('button')).toHaveTextContent('Войти')
        expect(getByTestId('cart-total')).toHaveTextContent('191.00 грн.')
    })

    test('should render items (authorized)', () => {
        const {getAllByTestId, queryByTestId, getByTestId} = renderWithProviders(<Cart setIsOrderComplete={jest.fn()}
                                                                                       setOrderId={jest.fn()}/>, {
            initialState: {
                cart: {
                    isPayed: false,
                    isOpen: false,
                    items: cartItems
                }, user: {isAuth: true, status: 2}
            }
        })

        expect(queryByTestId('loading')).not.toBeOnTheScreen()

        expect(getByTestId('cart-list')).toBeOnTheScreen()
        expect(getAllByTestId('cart-item-block').length).toBe(3)
        expect(getByTestId('button')).toHaveTextContent('Перейти к оплате')
        expect(getByTestId('cart-total')).toHaveTextContent('191.00 грн.')
    })

    test('should set payment', async () => {
        const {getByText, store, user, queryByTestId, getByTestId} = renderWithProviders(<Cart
            setIsOrderComplete={jest.fn()} setOrderId={jest.fn()}/>, {
            initialState: {
                cart: {
                    isPayed: false,
                    isOpen: false,
                    items: cartItems
                }, user: {isAuth: true, status: 2}
            }
        })

        await user.press(getByText('Перейти к оплате'))

        expect(getByTestId('loading')).toBeOnTheScreen()

        act(() => {
            jest.runAllTimers()
        })

        await waitFor(() => {
            expect(queryByTestId('loading')).not.toBeOnTheScreen()
        })

        expect(store?.getState().cart.isPayed).toBe(true)
        expect(queryByTestId('Перейти к оплате')).not.toBeOnTheScreen()
        expect(getByText('Оформить заказ')).toBeOnTheScreen()
    })

    test('should create order', async () => {
        mockedAuthAxios.post.mockResolvedValue({data: {order_id: 2}})
        const mockSetOrderId = jest.fn()
        const mockSetIsOrderComplete = jest.fn()
        const {getByText, store, user, queryByTestId, getByTestId} = renderWithProviders(<Cart
            setIsOrderComplete={mockSetIsOrderComplete} setOrderId={mockSetOrderId}/>, {
            initialState: {
                cart: {isPayed: true, isOpen: false, items: cartItems},
                user: {isAuth: true, status: 2}
            }
        })

        await user.press(getByText('Оформить заказ'))

        expect(store?.getState().cart.items.length).toBe(0)
        expect(queryByTestId('Оформить заказ')).not.toBeOnTheScreen()
        expect(mockSetOrderId).toHaveBeenCalledTimes(1)
        expect(mockSetOrderId).toHaveBeenCalledWith(2)
        expect(mockSetIsOrderComplete).toHaveBeenCalledTimes(1)
        expect(mockSetIsOrderComplete).toHaveBeenCalledWith(true)
    })

})
