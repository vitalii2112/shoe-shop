import {describe, test} from "@jest/globals";
import {renderWithProviders} from "../../utils/test-utils";
import FormBlock from "../../components/FormBlock";

describe('FormBlock', () => {
    test('should render', () => {
        const {getByTestId, queryByTestId,debug} = renderWithProviders(<FormBlock label="Some label" placeholder="Some placeholder" type="text" value="11" setValue={jest.fn()}/>)

        const input = getByTestId('form-block-input')

        expect(getByTestId('form-block')).toBeOnTheScreen()
        expect(getByTestId('form-block-label')).toBeOnTheScreen()
        expect(getByTestId('form-block-label')).toHaveTextContent('Some label*')
        expect(queryByTestId('form-block-error')).not.toBeOnTheScreen()
        expect(input).toBeOnTheScreen()
        expect(input).toHaveDisplayValue('11')
        expect(input).toHaveProp('secureTextEntry', false)
        expect(input).toHaveProp('placeholder', 'Some placeholder')
        expect(input).toHaveProp('inputMode', 'text')
    })

    test('should show error', () => {
        const {getByTestId} = renderWithProviders(<FormBlock label="Some label" placeholder="Some placeholder" type="text" value="11" errorMessage="Some error message" setValue={jest.fn()}/>)

        expect(getByTestId('form-block')).toBeOnTheScreen()
        expect(getByTestId('form-block-label')).toBeOnTheScreen()
        expect(getByTestId('form-block-error')).toBeOnTheScreen()
        expect(getByTestId('form-block-error')).toHaveTextContent('Some error message')
        expect(getByTestId('form-block-input')).toHaveStyle({borderColor: "#FF3434"})
    })

    test('should render select',  () => {
        const {getByTestId} = renderWithProviders(<FormBlock label="Some label" placeholder="Some placeholder" type="select" value="" options={[{value: 'value1', label: 'label1'}, {value: 'value2', label: 'label2'}]} setValue={jest.fn()}/>)

        expect(getByTestId('ios_touchable_wrapper')).toBeOnTheScreen()
        expect(getByTestId('text_input')).toBeOnTheScreen()
        expect(getByTestId('text_input')).toHaveDisplayValue('label1') //placeholder or first option
    })
})
