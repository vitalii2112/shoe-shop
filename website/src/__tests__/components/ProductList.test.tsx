import {describe, expect, jest, test} from "@jest/globals";
import {renderWithProviders} from "@/utils/test-utils";
import ProductList from "@/components/ProductList";
import {IProduct} from "@/models/IProduct";

const products:IProduct[] = [
    {
        id: 1,
        name: 'name1',
        img: 'img1',
        price: 10,
        description: 'desc1'
    },
    {
        id: 2,
        name: 'name2',
        img: 'img2',
        price: 20,
        description: 'desc2'
    }
]

describe('ProductList', () => {
    test('should render skeleton list', () => {
        const {getByTestId, getAllByTestId} = renderWithProviders(<ProductList products={[...Array(5)]}/>)

        expect(getByTestId('product-list')).toBeInTheDocument()
        expect(getAllByTestId('card').length).toBe(5)
        expect(getAllByTestId('card-skeleton').length).toBe(5)
    })
    test('should render common list', async () => {
        const mockOnAddQuantity = jest.fn()
        const mockOnAdd = jest.fn(() => mockOnAddQuantity)
        const {getByTestId, getAllByTestId, user} = renderWithProviders(<ProductList products={products} onAdd={mockOnAdd} isAddToCart={(id) => id === 2}/>)

        const cards = getAllByTestId('card')

        expect(getByTestId('product-list')).toBeInTheDocument()
        expect(cards.length).toBe(2)
        expect(cards[1].querySelector('svg')).toBeInTheDocument()

        await user.click(getAllByTestId('card-add-svg')[0])

        expect(mockOnAddQuantity).toHaveBeenCalledWith(1)
        expect(mockOnAddQuantity).toHaveBeenCalledTimes(1)
    })

    test('should render editable list', async () => {

        const mockOnItemClick = jest.fn()
        const {getByTestId, getAllByTestId, user} = renderWithProviders(<ProductList products={products} onItemClick={mockOnItemClick} isEditable/>)

        const cards = getAllByTestId('card')

        expect(getByTestId('product-list')).toBeInTheDocument()
        expect(cards.length).toBe(2)

        await user.click(cards[0])

        expect(mockOnItemClick).toHaveBeenCalledWith(products[0])
        expect(mockOnItemClick).toHaveBeenCalledTimes(1)
    })
})
