import React from 'react';
import {renderWithProviders} from "../../utils/test-utils";
import {act} from '@testing-library/react-native';
import ButtonCircle from '../../components/ButtonCircle';

describe('ButtonCircle', () => {
    test('should render', () => {
        const { getByLabelText } = renderWithProviders(<ButtonCircle>Test</ButtonCircle>);
        const buttonCircle = getByLabelText('pressable-button');
        expect(buttonCircle).toBeOnTheScreen();
        expect(buttonCircle).toHaveTextContent('Test');
    });

    test('should calls onPress when pressed', async () => {
        const mockOnPress = jest.fn();
        const { getByLabelText, user } = renderWithProviders(<ButtonCircle onPress={mockOnPress}>Test</ButtonCircle>);
        const buttonCircle = getByLabelText('pressable-button');
        await act(async () => {
            await user.press(buttonCircle);
            jest.runAllTimers()
        })
        expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    test('should does not call onPress when disabled', async () => {
        const mockOnPress = jest.fn();
        const { getByLabelText, user } = renderWithProviders(<ButtonCircle onPress={mockOnPress} disabled>Test</ButtonCircle>);
        const buttonCircle = getByLabelText('pressable-button');

       await act(async () => {
            await user.press(buttonCircle);
           jest.runAllTimers()
        })

        expect(mockOnPress).not.toHaveBeenCalled();
    });
});
