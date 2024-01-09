import {describe, test} from "@jest/globals";
import {renderWithProviders} from "../../utils/test-utils";
import Counter from "../../components/Counter";

describe('Counter', () => {
    const mockOnChange = jest.fn()

    beforeEach(() => {
        mockOnChange.mockReset()
        mockOnChange.mockClear()
    })

    test('should render', () => {
        const {getAllByLabelText, getByTestId, debug} = renderWithProviders(<Counter initialValue={1} onChange={mockOnChange}/>)

        const buttons = getAllByLabelText('pressable-button')

        expect(getByTestId('counter')).toBeOnTheScreen()
        expect(buttons.length).toBe(2)
        expect(buttons[0].props.accessibilityState.disabled).toBe( true)
        expect(buttons[1].props.accessibilityState.disabled).toBe( false)
        expect(getByTestId('counter-value')).toHaveTextContent('1')
        expect(mockOnChange).toHaveBeenCalledTimes(1)
    })

    test('should decrease value', async() => {
        const {getAllByLabelText, user} = renderWithProviders(<Counter initialValue={3} onChange={mockOnChange}/>)

        await user.press(getAllByLabelText('pressable-button')[0])
        expect(mockOnChange).toHaveBeenCalledTimes(2)
        expect(mockOnChange).toHaveBeenCalledWith(2)
    })

    test('should increase value', async() => {
        const {getAllByLabelText, user} = renderWithProviders(<Counter initialValue={3} onChange={mockOnChange}/>)

        await user.press(getAllByLabelText('pressable-button')[1])
        expect(mockOnChange).toHaveBeenCalledTimes(2)
        expect(mockOnChange).toHaveBeenCalledWith(4)
    })

    test('should limit max value', async() => {
        const {getAllByLabelText, getByTestId, user} = renderWithProviders(<Counter initialValue={10} maxValue={10} onChange={mockOnChange}/>)

        const buttons = getAllByLabelText('pressable-button')

        expect(getByTestId('counter-value')).toHaveTextContent('10')
        expect(buttons[1].props.accessibilityState.disabled).toBe( true)


        await user.press(buttons[1])
        expect(mockOnChange).toHaveBeenCalledTimes(1)
    })
})
