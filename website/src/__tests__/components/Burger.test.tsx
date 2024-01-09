import {describe, test, jest, expect} from "@jest/globals";
import {renderWithProviders} from "@/utils/test-utils";
import Burger from "@/components/Burger";
import {EStatus} from "@/store/user/types";
import {act} from "@testing-library/react";
import {logout} from "@/store/user/actions";


jest.mock("@/api/axios")

describe('Burger', () => {
    test('should show login button when user is not authenticate', async () => {
        const {queryByTestId, store} = renderWithProviders(<Burger setIsAuthOpen={jest.fn()}/>, {
            initialState: {
                user: {
                    isAuth: true,
                    status: EStatus.SUCCESS
                }
            }
        })

        expect(queryByTestId('burger-open-btn')).toBeInTheDocument()
        expect(queryByTestId('burger-login-btn')).not.toBeInTheDocument()

        await act(async () => {
            store?.dispatch(logout())
        })
        expect(queryByTestId('burger-open-btn')).not.toBeInTheDocument()
        expect(queryByTestId('burger-login-btn')).toBeInTheDocument()
    })

    test('should show link for admin', () => {
        const {queryAllByTestId} = renderWithProviders(<Burger setIsAuthOpen={jest.fn()}/>, {
            initialState: {
                user: {
                    isAuth: true,
                    status: EStatus.SUCCESS,
                    user: {
                        role: "admin",
                        last_name: '',
                        id: 1,
                        email: '',
                        first_name: ''
                    }
                }
            }
        })

        expect(queryAllByTestId('admin-link').length).toBeGreaterThan(0)
        expect(queryAllByTestId('user-link').length).toBeGreaterThan(0)
    })

    test('should show link for user', () => {
        const {queryAllByTestId} = renderWithProviders(<Burger setIsAuthOpen={jest.fn()}/>, {
            initialState: {
                user: {
                    isAuth: true,
                    status: EStatus.SUCCESS,
                    user: {
                        role: "user",
                        last_name: '',
                        id: 1,
                        email: '',
                        first_name: ''
                    }
                }
            }
        })

        expect(queryAllByTestId('admin-link').length).toBe(0)
        expect(queryAllByTestId('user-link').length).toBeGreaterThan(0)
    })

    test('should logout user', async () => {
        const mockAuthOpen = jest.fn()
        const {getByTestId, user, store, debug, getByRole} = renderWithProviders(<Burger setIsAuthOpen={mockAuthOpen}/>, {
            initialState: {
                user: {
                    isAuth: true,
                    status: EStatus.SUCCESS,
                    user: {
                        role: "user",
                        last_name: '',
                        id: 1,
                        email: '',
                        first_name: ''
                    }
                }
            }
        })

        await user.click(getByRole('button'))
        expect(getByTestId('confirm')).toBeInTheDocument()
        await user.click(getByTestId('confirm-yes'))
        expect(mockAuthOpen).toBeCalledTimes(1)
    })
})
