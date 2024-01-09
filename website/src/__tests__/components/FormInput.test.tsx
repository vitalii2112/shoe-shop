import {describe, expect, jest, test} from "@jest/globals";
import {renderWithProviders} from "@/utils/test-utils";
import FormInput from "@/components/FormInput";
import {fireEvent} from "@testing-library/dom";
import {act} from "@testing-library/react";

describe('FormInput', () => {
    test('should render select', () => {
        const {getByTestId} = renderWithProviders(<FormInput label="label" value="value" setValue={jest.fn()}
                                                             type="select"/>)

        expect(getByTestId('form-select')).toBeInTheDocument()
    })

    test('should render text type input', () => {
        const {getByTestId, rerender} = renderWithProviders(<FormInput label="label" value="value" setValue={jest.fn()}
                                                                       type="text"/>)

        expect(getByTestId('form-input')).toBeInTheDocument()
        expect(getByTestId('form-input')).toHaveAttribute('type', 'text')

        rerender(<FormInput label="label" value="value" setValue={jest.fn()} type="number"/>)

        expect(getByTestId('form-input')).toHaveAttribute('type', 'text')
    })

    test('should render password input', () => {
        const {getByTestId} = renderWithProviders(<FormInput label="label" value="value" setValue={jest.fn()}
                                                             type="password"/>)

        expect(getByTestId('form-input')).toBeInTheDocument()
        expect(getByTestId('form-input')).toHaveAttribute('type', 'password')
    })

    test('should render date input', () => {
        const {getByTestId} = renderWithProviders(<FormInput label="label" value="value" setValue={jest.fn()}
                                                             type="date"/>)

        expect(getByTestId('form-input')).toBeInTheDocument()
        expect(getByTestId('form-input')).toHaveAttribute('type', 'date')
    })

    test('should render required label input', () => {
        const {getByTestId} = renderWithProviders(<FormInput label="label" required value="value" setValue={jest.fn()}
                                                             type="text"/>)

        expect(getByTestId('form-label')).toBeInTheDocument()
        expect(getByTestId('form-label').textContent).toContain('*')
    })

    test('should render error message', () => {
        const {getByTestId, queryByTestId, rerender} = renderWithProviders(<FormInput label="label"
                                                                                      errorMessage="error message"
                                                                                      value="value" setValue={jest.fn()}
                                                                                      type="text"/>)

        expect(getByTestId('form-error')).toBeInTheDocument()
        expect(getByTestId('form-error').textContent).toBe('error message')

        rerender(<FormInput label="label" errorMessage="" value="value" setValue={jest.fn()} type="text"/>)

        expect(queryByTestId('form-error')).not.toBeInTheDocument()
    })

    test('should set value for text type input', async () => {
        const mockSetValue = jest.fn()
        const {getByTestId} = renderWithProviders(<FormInput label="label" value="value" setValue={mockSetValue}
                                                                   type="text"/>)

        const input = getByTestId('form-input')

        expect(input).toHaveValue('value')

        await act(async () => {
            fireEvent.change(input, {target: {value: 'value test'}})
        })
        expect(mockSetValue).toHaveBeenCalledWith('value test')
    })

    test('should set value for number type input', async () => {
        const mockSetValue = jest.fn()
        const {getByTestId} = renderWithProviders(<FormInput label="label" value="3" setValue={mockSetValue}
                                                                   type="number"/>)

        const input = getByTestId('form-input')

        expect(input).toHaveValue('3')

        await act(async () => {
            fireEvent.change(input, {target: {value: 'value test'}})
        })
        expect(mockSetValue).toHaveBeenCalledTimes(0)

        await act(async () => {
            fireEvent.change(input, {target: {value: '1'}})
        })
        expect(mockSetValue).toHaveBeenCalledWith('1')

        await act(async () => {
            fireEvent.change(input, {target: {value: '.'}})
        })
        expect(mockSetValue).toHaveBeenCalledWith('0.')

        await act(async () => {
            fireEvent.change(input, {target: {value: '0.35'}})
        })
        expect(mockSetValue).toHaveBeenCalledWith('0.35')
    })
})
