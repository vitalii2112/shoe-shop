import {describe, test} from '@jest/globals';
import {renderWithProviders} from '../../utils/test-utils';
import Card from '../../components/Card';
import {Dimensions} from 'react-native';

describe('Card', () => {
    test('should render product card', () => {
        const {getByTestId, queryByTestId} = renderWithProviders(<Card price={20} buttonText="Some button text" id={1} img="img" description="desc" name="Some name" isLastChild={false} isLastRow={true} cartHandler={jest.fn()}/>)

        const {width: screenWidth} = Dimensions.get('screen')

        expect(getByTestId('card')).toBeOnTheScreen()
        expect(getByTestId('card')).toHaveStyle({maxWidth: screenWidth / 2, borderBottomWidth: 0, borderRightWidth: 1})
        expect(getByTestId('card-image')).toBeOnTheScreen()
        expect(getByTestId('card-image')).toHaveProp('source', expect.objectContaining({width: screenWidth / 2 - 20}))
        expect(getByTestId('card-title')).toBeOnTheScreen()
        expect(getByTestId('card-title')).toHaveTextContent('Some name'.toUpperCase())
        expect(getByTestId('card-desc')).toBeOnTheScreen()
        expect(getByTestId('card-desc')).toHaveTextContent('desc')
        expect(getByTestId('card-price')).toBeOnTheScreen()
        expect(getByTestId('card-price')).toHaveTextContent('20 грн.')
        expect(queryByTestId('card-quantity')).not.toBeOnTheScreen()
        expect(getByTestId('button')).toBeOnTheScreen()
    })

    test('should render order card', () => {
        const {getByTestId, queryByTestId} = renderWithProviders(<Card price={20} buttonText="Some button text" quantity={2} img="img" description="desc" name="Some name" isLastChild={false} isLastRow={true}/>)

        expect(queryByTestId('button')).not.toBeOnTheScreen()
        expect(getByTestId('card-quantity')).toBeOnTheScreen()
        expect(getByTestId('card-quantity')).toHaveTextContent('2 шт.')
    })

    test('should press on button', async() => {
        const mockCardHandler = jest.fn()
        const {getByTestId, rerender ,user , queryByTestId} = renderWithProviders(<Card cartHandler={mockCardHandler} price={20} buttonText="Some button text" id={2} img="img" description="desc" name="Some name" isLastChild={false} isLastRow={true}/>)

        const button = getByTestId('button')

        expect(button).toBeOnTheScreen()

        await user.press(button)
        expect(mockCardHandler).toHaveBeenCalledTimes(1)
        expect(mockCardHandler).toHaveBeenCalledWith({id: 2, name: 'Some name', description: 'desc', img: 'img', price: 20, quantity: 1})

        rerender(<Card cartHandler={mockCardHandler} price={20} buttonText="Some button text" id={2} img="img" description="desc" name="Some name" isLastChild={false} isLastRow={true} disabledText="Added to cart"/>)

        expect(button).toHaveTextContent('Added to cart')
        await user.press(button)
        expect(mockCardHandler).toHaveBeenCalledTimes(1)
    })
})

