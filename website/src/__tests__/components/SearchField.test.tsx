import {describe, expect, jest, test} from "@jest/globals";
import {renderWithProviders} from "@/utils/test-utils";
import SearchField from "@/components/SearchFiled";

describe('SearchField', () => {
    test('should render field', () => {
        const {getByTestId, queryByTestId} = renderWithProviders(<SearchField onSearch={jest.fn()}/>)

        expect(getByTestId('search')).toBeInTheDocument()
        expect(getByTestId('search')).toHaveValue('')
        expect(getByTestId('search-btn')).toBeInTheDocument()
        expect(queryByTestId('search-clear')).not.toBeInTheDocument()
    })

    test('should render clear button', () => {
        const {getByTestId} = renderWithProviders(<SearchField initValue="init" onSearch={jest.fn()}/>)

        expect(getByTestId('search')).toHaveValue('init')
        expect(getByTestId('search-clear')).toBeInTheDocument()
    })

    test('should search', async () => {
        const mockOnSearch = jest.fn()
        const {getByTestId, user} = renderWithProviders(<SearchField initValue="init" onSearch={mockOnSearch}/>)

        const searchInput = getByTestId('search')

        expect(searchInput).toHaveValue('init')
        expect(getByTestId('search-clear')).toBeInTheDocument()

        await user.type(searchInput, '[Enter]')

        expect(mockOnSearch).toHaveBeenCalledTimes(1)
        expect(mockOnSearch).toHaveBeenCalledWith('init')

        await user.clear(searchInput)
        await user.type(searchInput, 'new value')
        await user.click(getByTestId('search-btn'))

        expect(searchInput).toHaveValue('new value')
        expect(mockOnSearch).toHaveBeenCalledTimes(2)
        expect(mockOnSearch).toHaveBeenCalledWith('new value')
    })
})
