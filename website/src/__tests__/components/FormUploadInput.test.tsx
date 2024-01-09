import {describe, expect, jest, test} from "@jest/globals";
import {renderWithProviders} from "@/utils/test-utils";
import FormUploadInput from "@/components/FormUploadInput";

describe('FormUploadInput', () => {
    test('should render input', () => {
        const {getByTestId, queryByTestId} = renderWithProviders(<FormUploadInput onChange={jest.fn()}/>)

        expect(getByTestId('upload-input')).toBeInTheDocument()
        expect(queryByTestId('upload-error')).not.toBeInTheDocument()
        expect(getByTestId('upload-block').classList.contains('uploaded')).toBeFalsy()
    })

    test('should render error message', () => {
        const {getByTestId} = renderWithProviders(<FormUploadInput errorMessage="error" onChange={jest.fn()}/>)

        expect(getByTestId('upload-error')).toBeInTheDocument()
        expect(getByTestId('upload-error').textContent).toBe('error')
    })

    test('should change class if file is uploaded', () => {
        const {getByTestId, queryByTestId} = renderWithProviders(<FormUploadInput onChange={jest.fn()} isFileExist/>)

        expect(queryByTestId('upload-error')).not.toBeInTheDocument()
        expect(getByTestId('upload-block').classList.contains('uploaded')).toBe(true)
    })

    test('should upload file', async () => {
        const mockOnChange = jest.fn()
        const {getByTestId, queryByTestId, user} = renderWithProviders(<FormUploadInput onChange={mockOnChange}/>)

        const file = new File([''], 'file.webp', {type: 'image/webp'})
        await user.upload(getByTestId('upload-input'), [file])

        expect(queryByTestId('upload-error')).not.toBeInTheDocument()
        expect(mockOnChange).toHaveBeenCalledTimes(1)
        expect(mockOnChange).toHaveBeenCalledWith(file)
        expect(getByTestId('upload-block').classList.contains('uploaded')).toBe(true)
    })

    test('should do nothing', async () => {
        const mockOnChange = jest.fn()
        const {getByTestId, user} = renderWithProviders(<FormUploadInput onChange={mockOnChange}/>)

        const file = new File([''], 'file.jpg', {type: 'image/jpg'})
        await user.upload(getByTestId('upload-input'), [file])

        expect(mockOnChange).toHaveBeenCalledTimes(0)
        expect(getByTestId('upload-block').classList.contains('uploaded')).toBe(false)
    })
})
