import {describe, expect, jest, test} from "@jest/globals";
import {renderWithProviders} from "@/utils/test-utils";
import Card from "@/components/Card";

describe('Card', () => {
    test('should show skeleton', () => {
        const {getByTestId, queryByTestId} = renderWithProviders(<Card isLoading={true}/>)

        expect(getByTestId('card-skeleton')).toBeInTheDocument()
        expect(queryByTestId('card-quantity')).not.toBeInTheDocument()
    })

    test('should show order card', () => {
        const {queryByTestId} = renderWithProviders(<Card quantity={1}/>)

        expect(queryByTestId('card-skeleton')).not.toBeInTheDocument()
        expect(queryByTestId('card-quantity')).toBeInTheDocument()
        expect(queryByTestId('card-quantity')?.textContent).toBe('1 шт.')
    })

    test('should show editable card', async () => {
        const mockOnClick = jest.fn()
        const {queryByTestId, getByTestId, user, rerender} = renderWithProviders(<Card quantity={1} isEdit onClick={mockOnClick}/>)

        const card = getByTestId('card')

        expect(queryByTestId('card-skeleton')).not.toBeInTheDocument()
        expect(card.classList.contains('editable')).toBe(true)

        await user.click(card)
        expect(mockOnClick).toHaveBeenCalledTimes(0)

        rerender(<Card quantity={1} isEdit onClick={mockOnClick} id={1} price={10} img="img" name="name" description="desc"/>)

        await user.click(card)
        expect(mockOnClick).toHaveBeenCalledTimes(1)
        expect(mockOnClick).toHaveBeenCalledWith({id: 1, name: 'name', description: 'desc', price: 10, img: 'img'})
    })

    test('should show common card', async () => {
        const mockOnAdd = jest.fn()
        const {getByTestId, queryByTestId, user,rerender} = renderWithProviders(<Card quantity={3} onAdd={mockOnAdd}/>)

        expect(queryByTestId('card-skeleton')).not.toBeInTheDocument()
        expect(queryByTestId('card-quantity')).not.toBeInTheDocument()
        expect(getByTestId('card-add-svg')).toBeInTheDocument()

        await user.click(getByTestId('card-add-svg'))
        expect(mockOnAdd).toBeCalledTimes(1)
        expect(mockOnAdd).toBeCalledWith(3)

        rerender(<Card quantity={3} onAdd={mockOnAdd} isCartExist={true}/>)
        expect(queryByTestId('card-add-svg')).not.toBeInTheDocument()
        expect(getByTestId('card-done-svg')).toBeInTheDocument()
    })
})
