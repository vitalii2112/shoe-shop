import {describe, test} from "@jest/globals";
import {renderWithProviders} from "../../utils/test-utils";
import Loading from "../../components/Loading";

describe('Loading', () => {
    test('should render', () => {
        const {getByTestId} = renderWithProviders(<Loading/>)

        expect(getByTestId('loading')).toBeOnTheScreen()
        expect(getByTestId('loading-text')).toBeOnTheScreen()
        expect(getByTestId('loading-text')).toHaveTextContent('Загрузка...')
    })

    test('should render with custom text', () => {
        const {getByTestId} = renderWithProviders(<Loading text="Loading..."/>)

        expect(getByTestId('loading')).toBeOnTheScreen()
        expect(getByTestId('loading-text')).toBeOnTheScreen()
        expect(getByTestId('loading-text')).toHaveTextContent('Loading...')
    })
})
