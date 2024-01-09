import {describe, test} from "@jest/globals";
import {renderWithProviders} from "../../utils/test-utils";
import CartScreen from "../../screens/CartScreen";

describe('CartScreen', () => {
    test('should render empty cart', () => {
        const {getByTestId, queryByTestId} = renderWithProviders(<CartScreen/>)

        expect(getByTestId('cart-empty-block')).toBeOnTheScreen()
        expect(queryByTestId('cart-list')).not.toBeOnTheScreen()
    })

    test('should render cart', () => {
        const {getByTestId, queryByTestId} = renderWithProviders(<CartScreen/>, {initialState: {cart: {isOpen: false, isPayed: false, items: [{description: '', quantity: 1, img: '', price: 1, name: '', id: 1}]}}})

        expect(getByTestId('cart-list')).toBeOnTheScreen()
        expect(queryByTestId('cart-empty-block')).not.toBeOnTheScreen()
    })
})

