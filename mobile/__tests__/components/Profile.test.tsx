import {describe, test} from "@jest/globals";
import {renderWithProviders} from "../../utils/test-utils";
import Profile from "../../components/Profile";
import {IUser} from "../../models/IUser";
import {waitFor} from "@testing-library/react-native";
import {Alert} from "react-native";

const userData:IUser = {
    id: 1,
    role: 'user',
    last_name: 'some lastname',
    first_name: 'some firstname',
    email: 'example@gmail.com'
}

describe('Profile', () => {
    const mockSubmit = jest.fn()

    beforeEach(() => {
        mockSubmit.mockReset()
    })
    test('should render initial', () => {
        const {getByTestId, getAllByTestId, queryAllByTestId} = renderWithProviders(<Profile onSubmit={mockSubmit} isLoading={true}/>)

        const formBlocks = getAllByTestId('form-block-input')

        expect(getByTestId('loading')).toBeOnTheScreen()
        expect(formBlocks.length).toBe(3)
        for (let i = 0; i < formBlocks.length; i++) {
            expect(formBlocks[i]).toHaveDisplayValue('')
        }
        expect(queryAllByTestId('order-item').length).toBe(0)
    })

    test('should render with user and orders', () => {
        const {queryByTestId, getAllByTestId, queryAllByTestId} = renderWithProviders(<Profile onSubmit={mockSubmit} isLoading={false} user={userData} orders={[{user_id: userData.id, id: 1, items: [], amount: 10}]}/>)

        const formBlocks = getAllByTestId('form-block-input')

        expect(queryByTestId('loading')).not.toBeOnTheScreen()
        expect(queryByTestId('ios_touchable_wrapper')).not.toBeOnTheScreen()
        expect(formBlocks.length).toBe(3)
        expect(formBlocks[0]).toHaveDisplayValue(userData.first_name)
        expect(formBlocks[1]).toHaveDisplayValue(userData.last_name)
        expect(formBlocks[2]).toHaveDisplayValue(userData.email)
        expect(queryAllByTestId('order-item').length).toBe(1)
    })

    test('should render with role edit', () => {
        const { getByTestId} = renderWithProviders(<Profile onSubmit={mockSubmit} onDelete={jest.fn()} isLoading={false} user={userData} orders={[{user_id: userData.id, id: 1, items: [], amount: 10}]}/>, {initialState: {user: {isAuth: true, status: 2, user: {id: 3, first_name: 'name', last_name: '', email: '', role: 'admin'}}}})
        expect(getByTestId('ios_touchable_wrapper')).toBeOnTheScreen()
    })

    test('should update', async () => {
        const { getAllByTestId, getByText, user} = renderWithProviders(<Profile onSubmit={mockSubmit} onDelete={jest.fn()} isLoading={false} user={userData} orders={[{user_id: userData.id, id: 1, items: [], amount: 10}]}/>, {initialState: {user: {isAuth: true, status: 2, user: {id: 3, first_name: 'name', last_name: '', email: '', role: 'admin'}}}})

        await user.type(getAllByTestId('form-block-input')[0], '123')

        await user.press(getByText('Сохранить'))
        expect(mockSubmit).toHaveBeenCalledTimes(1)
        expect(mockSubmit).toHaveBeenCalledWith({email: "example@gmail.com", first_name: "some firstname123", id: 1, last_name: "some lastname", role: "user"})
    })

    test('should delete', async () => {
        const mockAlert = jest.spyOn(Alert, 'alert');
        const mockDelete = jest.fn()
        const { getAllByTestId,debug, getByText, user} = renderWithProviders(<Profile onSubmit={mockSubmit} onDelete={mockDelete} isLoading={false} user={userData} orders={[{user_id: userData.id, id: 1, items: [], amount: 10}]}/>, {initialState: {user: {isAuth: true, status: 2, user: {id: 3, first_name: 'name', last_name: '', email: '', role: 'admin'}}}})

        await user.press(getByText('Удалить'))

        expect(mockAlert).toHaveBeenCalledTimes(1)

        mockAlert.mock.calls[0][2]?.[1].onPress?.()

        expect(mockDelete).toHaveBeenCalledTimes(1)

    })
})
