import {test} from "@jest/globals";
import {renderWithProviders} from "../../utils/test-utils";
import Title from "../../components/Title";
import {useTheme} from "@react-navigation/native";

test('Should render title', () => {
    const {getByLabelText} = renderWithProviders(<Title text="Some title"/>)

    const title = getByLabelText('title')

    expect(title).toBeOnTheScreen()
    expect(title).toHaveTextContent('Some title')
})

