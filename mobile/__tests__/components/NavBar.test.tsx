import {describe, test} from "@jest/globals";
import {renderWithProviders} from "../../utils/test-utils";
import NavBar from "../../components/NavBar";
import {Dimensions} from "react-native";

describe('NavBar', () => {
    test('should have 1/4 width of the screen', () => {
        const {getAllByTestId} = renderWithProviders(<NavBar/>)

        const buttons = getAllByTestId('nav-bar-btn')
        const {width: screenWidth} = Dimensions.get('screen')

        expect(buttons.length).toBe(4)

        for (let i = 0; i < buttons.length; i++) {
            expect(buttons[i]).toHaveStyle({width: screenWidth / 4 - 20})
        }
    })
})
