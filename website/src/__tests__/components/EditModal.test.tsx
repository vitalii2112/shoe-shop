import {describe, expect, jest, test} from "@jest/globals";
import {renderWithProviders} from "@/utils/test-utils";
import EditModal from "@/pages/Products/components/EditModal";

describe('EditModal', () => {
    test('should render for editing', async () => {
        const mockOnDelete = jest.fn()
        const mockOnSubmit = jest.fn()
        const {getByTestId, getAllByTestId, user} = renderWithProviders(<EditModal isOpen={true} onClose={jest.fn()} item={{
            id: 1,
            img: 'img',
            name: 'name',
            description: 'desc',
            price: 10
        }} onSubmit={mockOnSubmit} onDelete={mockOnDelete}/>)

        const removeBtn = getByTestId('edit-remove')
        const submitBtn = getByTestId('edit-submit')

        expect(getByTestId('edit')).toBeInTheDocument()
        expect(removeBtn).toBeInTheDocument()
        expect(submitBtn).toBeInTheDocument()

        const inputs = getAllByTestId('form-input')

        for (let i = 0; i < inputs.length; i++) {
            await user.clear(inputs[i])
            if(i === 2)
                await user.type(inputs[i], '255')
             else
                await user.type(inputs[i], 'test value')
        }

        await user.click(submitBtn)

        expect(mockOnSubmit).toHaveBeenCalledTimes(1)
        expect(mockOnSubmit).toHaveBeenCalledWith({
            img: undefined,
            name: 'test value',
            description: 'test value',
            price: 255
        }, 1)

        await user.click(removeBtn)

        expect(mockOnDelete).toHaveBeenCalledTimes(1)
        expect(mockOnDelete).toHaveBeenCalledWith(1)
    })

    test('should render for create', async () => {
        const mockOnDelete = jest.fn()
        const mockOnSubmit = jest.fn()
        const {getByTestId, getAllByTestId, queryByTestId, user} = renderWithProviders(<EditModal isOpen={true} onClose={jest.fn()} onSubmit={mockOnSubmit} onDelete={mockOnDelete}/>)

        const submitBtn = getByTestId('edit-submit')

        expect(getByTestId('edit')).toBeInTheDocument()
        expect(queryByTestId('edit-remove')).not.toBeInTheDocument()
        expect(submitBtn).toBeInTheDocument()

        const inputs = getAllByTestId('form-input')

        for (let i = 0; i < inputs.length; i++) {
            if(i === 2)
                await user.type(inputs[i], '255')
            else
                await user.type(inputs[i], 'test value')
        }

        const file = new File([''], 'file.webp', {type: 'image/webp'})
        await user.upload(getByTestId('upload-input'), [file])
        await user.click(submitBtn)

        expect(mockOnSubmit).toHaveBeenCalledTimes(1)
        expect(mockOnSubmit).toHaveBeenCalledWith({
            img: file,
            name: 'test value',
            description: 'test value',
            price: 255
        }, undefined)
    })
})
