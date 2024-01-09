import {expect, test} from "@jest/globals";
import cartReducer, {cartActions} from '../../store/cart/slice'

const initialState = {
    items: [],
    isPayed: false,
    isOpen: false
}

const cartItems = [
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
]

const cartState = {
    isOpen: false,
    isPayed: true,
    items: cartItems
}

test('should return initial state', () => {
    expect(cartReducer(undefined, {type: undefined})).toEqual(initialState)
})

test('should add item to state', () => {
    expect(cartReducer(initialState, cartActions.addToCart(cartItems[0]))).toEqual({
        ...initialState,
        items: [cartItems[0]]
    })
})

test('should remove item from state', () => {
    expect(cartReducer({...initialState, items: cartItems}, cartActions.removeFromCart(2))).toEqual({
        ...initialState,
        items: cartItems.filter(item => item.id !== 2)
    })
})

test('should set cart to state', () => {
    expect(cartReducer(initialState, cartActions.setCart(cartState))).toEqual(cartState)
})

test('should set empty cart to state', () => {
    expect(cartReducer(cartState, cartActions.setCart(undefined))).toEqual(initialState)
})

test('should set cart payment to state', () => {
    expect(cartReducer(cartState, cartActions.setCartPayment(false))).toEqual({...cartState, isPayed: false})
})

test('should set cart open to state', () => {
    expect(cartReducer(cartState, cartActions.setCartOpen(true))).toEqual({...cartState, isOpen: true})
})
