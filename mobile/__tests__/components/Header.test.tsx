import {describe, test} from "@jest/globals";
import {renderWithProviders} from "../../utils/test-utils";
import Header from "../../components/Header";

describe('Header', () => {
    test('should render', () => {
        const {queryAllByLabelText, getByTestId} = renderWithProviders(<Header/>)

        expect(getByTestId('header-logo')).toBeOnTheScreen()
        expect(queryAllByLabelText('pressable-button').length).toBe(0)
    })

    test('should render with back button', () => {
        const {queryAllByLabelText, getByTestId, queryByTestId} = renderWithProviders(<Header backText="Back text"/>)

        expect(queryByTestId('header-logo')).not.toBeOnTheScreen()
        expect(queryAllByLabelText('pressable-button').length).toBe(1)
        expect(getByTestId('header-back-text')).toHaveTextContent('Back text')
    })

    test('should render with add product btn', () => {
        const {queryAllByLabelText, getByTestId, queryByTestId} = renderWithProviders(<Header addProduct/>)

        expect(getByTestId('header-logo')).toBeOnTheScreen()
        expect(queryAllByLabelText('pressable-button').length).toBe(1)
        expect(queryByTestId('header-back-text')).not.toBeOnTheScreen()
    })

    test('should render with add product btn and back text', () => {
        const {queryAllByLabelText, getByTestId, queryByTestId} = renderWithProviders(<Header addProduct backText="Back text"/>)

        expect(queryByTestId('header-logo')).not.toBeOnTheScreen()
        expect(queryAllByLabelText('pressable-button').length).toBe(2)
        expect(getByTestId('header-back-text')).toBeOnTheScreen()
        expect(getByTestId('header-back-text')).toHaveTextContent('Back text')
    })
})
