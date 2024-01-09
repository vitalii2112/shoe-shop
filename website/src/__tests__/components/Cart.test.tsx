import {describe, expect, jest, test} from "@jest/globals";
import {renderWithProviders} from "@/utils/test-utils";
import Cart from "@/components/Cart";
import axios from "@/api/axios";
import {toast} from "react-toastify";
import {UserSliceType} from "@/store/user/types";

jest.mock("@/api/axios")
jest.mock('@/utils/delay')
const mockedAuthAxios = axios as jest.Mocked<typeof axios>

const cartInit = {
    isOpen: false,
    isPayed: false,
    items: [
        {
            id: 1,
            quantity: 1,
            name: 'name',
            img: 'img',
            description: 'desc',
            price: 20
        },
        {
            id: 2,
            quantity: 2,
            name: 'name2',
            img: 'img2',
            description: 'desc2',
            price: 22
        }
    ]
}

const userInit: UserSliceType = {
    isAuth: true,
    status: 2,
    user: {
        role: 'user',
        email: '',
        id: 1,
        first_name: '',
        last_name: ''
    }
}

describe('Cart', () => {
    test('should show empty cart', () => {
        const {getByTestId, queryByTestId} = renderWithProviders(<Cart/>)
        expect(getByTestId('cart')).toBeInTheDocument()
        expect(getByTestId('cart-empty')).toBeInTheDocument()
        expect(queryByTestId('cart-items')).not.toBeInTheDocument()
        expect(getByTestId('cart-empty-title').textContent).toBe('Корзина пустая')
        expect(getByTestId('cart-empty-text').textContent).toBe('Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.')
        expect(getByTestId('cart-empty-img')).toHaveAttribute('src', '/img/empty-cart.jpg')
    })

    test('should show cart items', () => {
        const {getByTestId, getAllByTestId, queryByTestId} = renderWithProviders(<Cart/>, {
            initialState: {
                cart: cartInit
            }
        })
        expect(getByTestId('cart')).toBeInTheDocument()
        expect(queryByTestId('cart-empty')).not.toBeInTheDocument()
        expect(getByTestId('cart-items')).toBeInTheDocument()
        expect(getAllByTestId('cart-item').length).toBe(2)
        expect(getByTestId('cart-total').textContent).toBe('64.00 грн.')
    })

    test('should remove cart item', async () => {
        const {getByTestId, getAllByTestId, queryByTestId, user} = renderWithProviders(<Cart/>, {
            initialState: {
                cart: cartInit
            }
        })
        expect(getByTestId('cart')).toBeInTheDocument()
        expect(queryByTestId('cart-empty')).not.toBeInTheDocument()
        expect(getByTestId('cart-items')).toBeInTheDocument()

        await user.click(getAllByTestId('cart-item-remove')[1])

        expect(getAllByTestId('cart-item').length).toBe(1)
        expect(getByTestId('cart-total').textContent).toBe('20.00 грн.')
    })

    test('should show auth require', async () => {
        const {getByTestId, queryByTestId} = renderWithProviders(<Cart/>, {
            initialState: {
                cart: cartInit
            }
        })
        expect(queryByTestId('cart-btn-pay')).not.toBeInTheDocument()
        expect(getByTestId('cart-btn-auth')).toBeInTheDocument()
    })

    test('should imitate payment', async () => {
        const {getByTestId, queryByTestId, user} = renderWithProviders(<Cart/>, {
            initialState: {
                cart: cartInit,
                user: userInit
            }
        })
        expect(queryByTestId('cart-btn-auth')).not.toBeInTheDocument()
        expect(getByTestId('cart-btn-pay')).toBeInTheDocument()

        await user.click(getByTestId('cart-btn-pay'))

        expect(getByTestId('mover-title').textContent).toContain('Оплачено')

        expect(getByTestId('cart-btn-pay').firstElementChild?.textContent).toBe('Оформить заказ')
    })

    test('should show on order error', async () => {
        const {getByTestId, user} = renderWithProviders(<Cart/>, {
            initialState: {
                cart: {...cartInit, isPayed: true},
                user: userInit
            }
        })

        mockedAuthAxios.post.mockRejectedValue({})
        const mockToast = jest.spyOn(toast, 'error')

        await user.click(getByTestId('cart-btn-pay'))

        expect(mockToast).toBeCalledTimes(1)
        expect(mockToast).toBeCalledWith('Ошибка при создании заказа')
    })

    test('should create order', async () => {
        const {getByTestId, queryByTestId, user, store} = renderWithProviders(<Cart/>, {
            initialState: {
                cart: {...cartInit, isPayed: true},
                user: userInit
            }
        })

        mockedAuthAxios.post.mockResolvedValue({data: {order_id: 2}})

        await user.click(getByTestId('cart-btn-pay'))

        expect(store?.getState().cart).toStrictEqual({isPayed: false, isOpen: false, items: []})
        expect(getByTestId('cart-empty')).toBeInTheDocument()
        expect(queryByTestId('cart-items')).not.toBeInTheDocument()
        expect(getByTestId('cart-empty-title').textContent).toBe('Заказ оформлен')
        expect(getByTestId('cart-empty-text').textContent).toBe('Ваш заказ #2 скоро будет передан курьерской доставке')
        expect(getByTestId('cart-empty-img')).toHaveAttribute('src', '/img/complete-order.jpg')
    })
})
