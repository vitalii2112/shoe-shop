import {describe, test} from "@jest/globals";
import {renderWithProviders} from "../../utils/test-utils";
import CartItem from "../../components/CartItem";
import {waitFor} from "@testing-library/react-native";


describe('CartItem', () => {
    // test('should render', () => {
    //     const {getByTestId} = renderWithProviders(<CartItem quantity={2} id={1} img="img" name="Some name" price={20}/>)
    //
    //     expect(getByTestId('cart-item-block')).toBeOnTheScreen()
    //     expect(getByTestId('cart-item-image')).toBeOnTheScreen()
    //     expect(getByTestId('cart-item-image')).toHaveProp('source')
    //     expect(getByTestId('cart-item-name')).toBeOnTheScreen()
    //     expect(getByTestId('cart-item-name')).toHaveTextContent('SOME NAME')
    //     expect(getByTestId('cart-item-price')).toBeOnTheScreen()
    //     expect(getByTestId('cart-item-price')).toHaveTextContent('20 грн.')
    // })

    test('should change quantity', async () => {
        const {user, getAllByLabelText, store} = renderWithProviders(<CartItem quantity={2} id={1} img="img" name="Some name" price={20}/>, {initialState: {cart: {isPayed: false, isOpen: false, items: [{id: 1, img: "img", name: "Some name", price: 20, quantity: 2, description: "desc"}]}}})

        const counterButtons = getAllByLabelText('pressable-button')

        await user.press(counterButtons[0])

        expect(store?.getState().cart.items[0].quantity).toBe(1)

        await user.press(counterButtons[1])

        await waitFor(() => expect(store?.getState().cart.items[0].quantity).toBe(2))
    })
})
