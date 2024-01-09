import {test} from '@jest/globals';
import {renderWithProviders} from '../../utils/test-utils';
import StyledButton from '../../components/StyledButton';

describe('StyledButton', () => {
    test('renders correctly with default props', () => {
        const { getByText } = renderWithProviders(<StyledButton text="Submit" />);
        expect(getByText('Submit')).toBeTruthy();
    });

    test('calls onPress handler when clicked', async () => {
        const onPressMock = jest.fn();
        const { getByText, user } = renderWithProviders(<StyledButton text="Submit" onPress={onPressMock} />);
        await user.press(getByText('Submit'));
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });

    // test('renders with left arrow when withArrow is "left"', () => {
    //     const { getByTestId } = renderWithProviders(<StyledButton text="Submit" withArrow="left" />);
    //     expect(getByTestId('button-arrow-left')).toBeTruthy();
    // });
    //
    // test('renders with right arrow when withArrow is "right"', () => {
    //     const { getByTestId } = renderWithProviders(<StyledButton text="Submit" withArrow="right" />);
    //     expect(getByTestId('button-arrow-right')).toBeTruthy();
    // });

    test('renders with correct background color for different types', () => {
        const { getByTestId, rerender } = renderWithProviders(<StyledButton text="Submit" />);
        expect(getByTestId('button')).toHaveStyle({ backgroundColor: '#000' })

        rerender(<StyledButton text="Delete" type="delete" />);
        expect(getByTestId('button')).toHaveStyle({ backgroundColor: '#ff3131' });
    });
});
