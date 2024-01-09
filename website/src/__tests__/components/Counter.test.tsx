import {afterEach, describe, expect, jest, test} from "@jest/globals";
import {renderWithProviders} from "@/utils/test-utils";
import Counter from "@/components/Counter";

describe('Counter', () => {
    const mockSetValue = jest.fn();
    afterEach(() => {
        mockSetValue.mockReset()
    })
    test('should set initial state value', () => {
        const {getByTestId} = renderWithProviders(<Counter value={10} setValue={jest.fn()}/>)

        const counterInput = getByTestId('counter');
        expect(counterInput).toBeInTheDocument();
        expect(counterInput).toHaveValue("10")
    })

    test('should restricts input to numbers and limits to 10', async () => {
        const {getByTestId, user} = renderWithProviders(<Counter value={4} setValue={mockSetValue}/>)
        const counterInput = getByTestId('counter');

        await user.type(counterInput, 'abc');
        expect(counterInput).toHaveValue("4")

        await user.type(counterInput, '15');
        expect(counterInput).toHaveValue("10")
        expect(mockSetValue).toHaveBeenCalledWith(10);
    });

    test('should resets to 1 if input is empty or 0', async () => {
        const {getByTestId, user} = renderWithProviders(<Counter value={4} setValue={mockSetValue}/>)
        const counterInput = getByTestId('counter');

        await user.clear(counterInput);
        expect(counterInput).toHaveValue("")

        await user.click(getByTestId('counter-block'))
        expect(mockSetValue).toHaveBeenCalledWith(1);

        await user.clear(counterInput);
        await user.type(counterInput, '0');
        expect(counterInput).toHaveValue("0")

        await user.click(getByTestId('counter-block'))
        expect(mockSetValue).toHaveBeenCalledWith(1);
    });

    test('should resets if input starts with 0', async () => {
        const {getByTestId, user} = renderWithProviders(<Counter value={4} setValue={mockSetValue}/>)
        const counterInput = getByTestId('counter');

        await user.clear(counterInput)
        await user.type(counterInput, '05');
        expect(counterInput).toHaveValue("05")
        expect(mockSetValue).toHaveBeenCalledWith(5);
    });
})
