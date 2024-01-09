import {beforeEach, expect, jest, test} from "@jest/globals";
import {CartService} from "@/services/cart.service";

const cartState = {
    items: [
        {
            id: 1,
            img: 'img',
            name: 'name',
            description: 'desc',
            price: 20,
            quantity: 1
        },
        {
            id: 2,
            img: 'img2',
            name: 'name2',
            description: 'desc2',
            price: 22,
            quantity: 2
        },
        {
            id: 3,
            img: 'img3',
            name: 'name3',
            description: 'desc3',
            price: 23,
            quantity: 3
        }
    ],
    isPayed: false
}

const getItem = jest.spyOn(Storage.prototype, 'getItem')

beforeEach(() => {
    getItem.mockReturnValue(JSON.stringify(cartState))
})

test('should get cart from local storage', () => {
    const cart = CartService.get()
    expect(getItem).toBeCalledTimes(1)
    expect(getItem).toBeCalledWith('cart')
    expect(cart).toEqual(cartState)
})

test('should add item to cart', () => {
    const setItem = jest.spyOn(Storage.prototype, 'setItem');
    const item = {
        id: 4,
        img: 'img4',
        name: 'name4',
        description: 'desc4',
        price: 24,
        quantity: 4
    }
    CartService.add(item)
    cartState.items.push(item)
    expect(setItem).toBeCalledTimes(1)
    expect(setItem).toBeCalledWith('cart', JSON.stringify(cartState))
})

test('should remove item from cart', () => {
    const setItem = jest.spyOn(Storage.prototype, 'setItem');
    CartService.remove(2)
    const items = cartState.items.filter(item => item.id !== 2)
    expect(setItem).toBeCalledTimes(1)
    expect(setItem).toBeCalledWith('cart', JSON.stringify({...cartState, items}))
})

test('should clear cart', () => {
    const removeItem = jest.spyOn(Storage.prototype, 'removeItem');
    CartService.clear()
    expect(removeItem).toBeCalledTimes(1)
    expect(removeItem).toBeCalledWith('cart')
})
