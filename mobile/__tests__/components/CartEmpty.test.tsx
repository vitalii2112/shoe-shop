import {describe, test} from "@jest/globals";
import {renderWithProviders} from "../../utils/test-utils";
import CartEmpty from "../../components/CartEmpty";

describe('CartEmpty', () => {
    test('should render', () => {
        const image = require('../../assets/img/empty-cart.png')
        const {getByTestId, queryByTestId} = renderWithProviders(<CartEmpty image={image} buttonText="Back"/>)

        expect(getByTestId('cart-empty-block')).toBeOnTheScreen()
        expect(getByTestId('cart-empty-image')).toBeOnTheScreen()
        expect(getByTestId('button')).toBeOnTheScreen()
        expect(getByTestId('button')).toHaveTextContent('Back')
        expect(getByTestId('cart-empty-image')).toHaveProp('source', image)
        expect(queryByTestId('cart-title')).not.toBeOnTheScreen()
        expect(queryByTestId('cart-subtitle')).not.toBeOnTheScreen()
    })

    test('should render with title and subtitle', () => {
        const image = require('../../assets/img/empty-cart.png')
        const {getByTestId} = renderWithProviders(<CartEmpty image={image} title="Some title" subTitle="Some subtitle" buttonText="Back"/>)

        expect(getByTestId('cart-empty-block')).toBeOnTheScreen()
        expect(getByTestId('cart-empty-image')).toBeOnTheScreen()
        expect(getByTestId('button')).toBeOnTheScreen()
        expect(getByTestId('button')).toHaveTextContent('Back')
        expect(getByTestId('cart-empty-image')).toHaveProp('source', image)
        expect(getByTestId('cart-empty-title')).toBeOnTheScreen()
        expect(getByTestId('cart-empty-subtitle')).toBeOnTheScreen()
    })
})
