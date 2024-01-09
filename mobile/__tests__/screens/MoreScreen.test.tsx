import {describe, test} from "@jest/globals";
import {renderWithProviders} from "../../utils/test-utils";
import MoreScreen from "../../screens/MoreScreen";

describe('More screen', () => {
    test('should render for unauthorized', () => {
        const {getAllByTestId, queryAllByTestId} = renderWithProviders(<MoreScreen navigation={{} as any} route={{} as any}/>)

        expect(getAllByTestId('link-unauthorized').length).toBe(2)
        expect(queryAllByTestId('link-admin').length).toBe(0)
        expect(queryAllByTestId('link-user').length).toBe(0)
    })

    test('should render for user', () => {
        const {getAllByTestId, queryAllByTestId} = renderWithProviders(<MoreScreen navigation={{} as any} route={{} as any}/>, {initialState: {user: {isAuth: true, status: 2, user: {first_name: '', last_name: '', email: '', id: 1, role: 'user'}}}})

        expect(queryAllByTestId('link-unauthorized').length).toBe(0)
        expect(queryAllByTestId('link-admin').length).toBe(0)
        expect(getAllByTestId('link-user').length).toBe(2)
    })

    test('should render for admin', () => {
        const {getAllByTestId, queryAllByTestId} = renderWithProviders(<MoreScreen navigation={{} as any} route={{} as any}/>, {initialState: {user: {isAuth: true, status: 2, user: {first_name: '', last_name: '', email: '', id: 1, role: 'admin'}}}})

        expect(queryAllByTestId('link-unauthorized').length).toBe(0)
        expect(getAllByTestId('link-admin').length).toBe(3)
        expect(getAllByTestId('link-user').length).toBe(2)
    })
})

