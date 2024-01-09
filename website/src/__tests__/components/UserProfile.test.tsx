import {describe, expect, jest, test} from "@jest/globals";
import {renderWithProviders} from "@/utils/test-utils";
import UserProfile from "@/components/UserProfile";
import {IUser} from "@/models/IUser";
import axios from "@/api/axios";
import {waitFor} from "@testing-library/dom";

jest.mock("@/api/axios")
const mockedAuthAxios = axios as jest.Mocked<typeof axios>


const userUser: IUser = {
    id: 1,
    role: 'user',
    first_name: '',
    last_name: '',
    email: ''
}

const userAdmin: IUser = {
    id: 2,
    role: 'admin',
    first_name: '',
    last_name: '',
    email: ''
}

describe('UserProfile', () => {
    test('should render for current user', async () => {
        const mockOnUpdate = jest.fn()
        mockedAuthAxios.post.mockResolvedValue([])
        const {getByTestId, getAllByTestId, queryByTestId, user} = renderWithProviders(<UserProfile
            user={userUser} onUpdate={mockOnUpdate}/>, {
            initialState: {
                user: {
                    isAuth: true,
                    status: 2,
                    user: userUser
                }
            }
        })

        expect(getByTestId('user-profile')).toBeInTheDocument()
        expect(queryByTestId('user-profile-role')).not.toBeInTheDocument()

        await waitFor(() => {
            expect(getByTestId('user-profile-current-user-orders-empty')).toBeInTheDocument()
        })

        expect(queryByTestId('user-profile-orders-empty')).not.toBeInTheDocument()
        expect(getByTestId('user-profile-orders-title').textContent).toBe('Ваши заказы')

        const inputs = getAllByTestId('form-input')

        for (let i = 0; i < inputs.length; i++) {
            await user.type(inputs[i], 'test value')
        }

        await user.click(getByTestId('user-profile-submit'))

        expect(mockOnUpdate).toHaveBeenCalledTimes(1)
        expect(mockOnUpdate).toHaveBeenCalledWith(expect.objectContaining({
            role: 'user',
            first_name: 'test value',
            last_name: 'test value',
            email: 'test value'
        }), expect.anything())
    })

    test('should render for admin', async () => {
        const mockOnUpdate = jest.fn()
        const mockOnDelete = jest.fn()
        mockedAuthAxios.post.mockResolvedValue([])
        const {getByTestId, getAllByTestId, queryByTestId, user} = renderWithProviders(<UserProfile
            user={userUser} onDelete={mockOnDelete} onUpdate={mockOnUpdate}/>, {
            initialState: {
                user: {
                    isAuth: true,
                    status: 2,
                    user: userAdmin
                }
            }
        })

        expect(getByTestId('user-profile')).toBeInTheDocument()
        expect(getByTestId('user-profile-role')).toBeInTheDocument()

        await waitFor(() => {
            expect(getByTestId('user-profile-orders-empty')).toBeInTheDocument()
        })

        expect(queryByTestId('user-profile-current-user-orders-empty')).not.toBeInTheDocument()
        expect(getByTestId('user-profile-orders-title').textContent).toBe('Заказы')

        const inputs = getAllByTestId('form-input')

        for (let i = 0; i < inputs.length; i++) {
            await user.type(inputs[i], 'test value')
        }

        await user.click(getAllByTestId('select-item')[0])

        await user.click(getByTestId('user-profile-submit'))

        expect(mockOnUpdate).toHaveBeenCalledTimes(1)
        expect(mockOnUpdate).toHaveBeenCalledWith(expect.objectContaining({
            role: 'admin',
            first_name: 'test value',
            last_name: 'test value',
            email: 'test value'
        }), expect.anything())

        expect(getByTestId('user-profile-delete')).toBeInTheDocument()

        await user.click(getByTestId('user-profile-delete'))

        expect(mockOnDelete).toHaveBeenCalledTimes(0)
        expect(getByTestId('confirm')).toBeInTheDocument()

        await user.click(getByTestId('confirm-yes'))

        expect(mockOnDelete).toHaveBeenCalledTimes(1)
        expect(mockOnDelete).toHaveBeenCalledWith()
    })
})
