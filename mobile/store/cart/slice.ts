import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICartItem, ICartState} from "./types";

const initialState: ICartState = {
    items: [],
    isPayed: false,
    isOpen: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, {payload}: PayloadAction<ICartItem>) {
            state.items = [payload, ...state.items]
            state.isPayed = false
        },
        removeFromCart(state, {payload}: PayloadAction<number>) {
            state.items = state.items.filter(item => item.id !== payload)
            state.isPayed = false
        },
        setCart(state, {payload}: PayloadAction<ICartState | undefined>) {
            state.items = payload?.items || []
            state.isPayed = payload?.isPayed || false
        },
        setCartPayment(state, {payload}: PayloadAction<boolean>) {
            state.isPayed = payload
        },
        setCartOpen(state, {payload}: PayloadAction<boolean>) {
            state.isOpen = payload
        },
        setQuantity(state, {payload}: PayloadAction<{ id: number, quantity: number }>) {
            const find = state.items.find(item => item.id === payload.id)
            if (find)
                find.quantity = payload.quantity
        }
    },
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer
