import {describe, expect, jest, test} from "@jest/globals";
import {renderWithProviders} from "@/utils/test-utils";
import AuthModal from "@/components/AuthModal";
import {fireEvent} from "@testing-library/dom";
import * as api from "@/api/axios";
import {EStatus} from "@/store/user/types";
import {act} from "@testing-library/react";
import {toast} from "react-toastify";


jest.mock("@/api/axios")


describe('AuthModal', () => {
    test('should open modal', () => {
        const {queryByTestId} = renderWithProviders(<AuthModal open={true} onClose={jest.fn}/>)

        expect(queryByTestId('auth-modal')).toBeInTheDocument()
        expect(queryByTestId('auth-modal-login')).toBeInTheDocument()
        expect(queryByTestId('auth-modal-register')).not.toBeVisible()
    })

    test('should close modal', () => {
        const {queryByTestId} = renderWithProviders(<AuthModal open={false} onClose={jest.fn}/>)

        expect(queryByTestId('auth-modal')).not.toBeInTheDocument()
        expect(queryByTestId('auth-modal-login')).not.toBeInTheDocument()
        expect(queryByTestId('auth-modal-register')).not.toBeInTheDocument()
    })

    test('should change tab modal', () => {
        const {queryByTestId} = renderWithProviders(<AuthModal open={true} onClose={jest.fn}/>)

        const loginTab = queryByTestId('login-tab')
        const loginPanel = queryByTestId('auth-modal-login')
        const registerTab = queryByTestId('register-tab')
        const registerPanel = queryByTestId('auth-modal-register')

        expect(queryByTestId('auth-modal')).toBeInTheDocument()
        expect(loginPanel?.classList.contains('selected')).toBe(true)
        expect(loginTab?.classList.contains('selected')).toBe(true)
        expect(registerTab?.classList.contains('selected')).toBe(false)
        expect(registerPanel?.classList.contains('selected')).toBe(false)

        fireEvent.click(registerTab!)

        expect(loginPanel?.classList.contains('selected')).toBe(false)
        expect(loginTab?.classList.contains('selected')).toBe(false)
        expect(registerTab?.classList.contains('selected')).toBe(true)
        expect(registerPanel?.classList.contains('selected')).toBe(true)
    })

    test('should show loading', () => {
        const {queryByTestId} = renderWithProviders(<AuthModal open={true} onClose={jest.fn}/>, {
            initialState: {
                user: {
                    status: EStatus.LOADING,
                    isAuth: false
                }
            }
        })

        expect(queryByTestId('loading')).toBeInTheDocument()
    })

    test('should close modal on success auth', async () => {
        const mockedAxios = api.axiosClassic as jest.Mocked<typeof api.axiosClassic>
        mockedAxios.post.mockResolvedValue({
            headers: {
                authorization: 'Bearer auth_token'
            },
            data: {
                user: {
                    id: 1,
                    role: 'user',
                    email: 'email@email.com',
                    password: 'pass hash',
                    first_name: 'John',
                    last_name: 'Doe',
                }
            }
        })
        const onClose = jest.fn()
        const {queryByTestId, queryAllByTestId} = renderWithProviders(<AuthModal open={true} onClose={onClose}/>, {
            initialState: {
                user: {
                    status: EStatus.IDLE,
                    isAuth: false
                }
            }
        })

        await act(async () => {
            const inputs = queryAllByTestId('login-input')
            inputs.forEach(input => {
                fireEvent.change(input, {target: {value: 'email@email.com'}})
            })
            fireEvent.click(queryByTestId('login-btn')!)
        })
        expect(onClose).toHaveBeenCalledTimes(1)
    })

    test('should show errors on invalid auth', async () => {
        const mockedAxios = api.axiosClassic as jest.Mocked<typeof api.axiosClassic>
        mockedAxios.post.mockRejectedValue({response: {status: 401, data: 'Invalid Email or password.'}})
        const mockErrorToast = jest.spyOn(toast, 'error')
        const mockSuccessToast = jest.spyOn(toast, 'success')

        const onClose = jest.fn()
        const {queryByTestId, queryAllByTestId, store} = renderWithProviders(<AuthModal open={true} onClose={onClose}/>, {
            initialState: {
                user: {
                    status: EStatus.IDLE,
                    isAuth: false
                }
            }
        })
        const inputs = queryAllByTestId('login-input')

        await act(async () => {
            fireEvent.click(queryByTestId('login-btn')!)
        })
        const invalids = queryAllByTestId('login-invalid')
        expect(invalids[0].textContent).toBe('Введите email')
        expect(store?.getState().user.status === EStatus.IDLE).toBe(true)
        expect(onClose).toHaveBeenCalledTimes(0)

        await act(async () => {
            fireEvent.change(inputs[0], {target: {value: 'email@email.com'}})
            fireEvent.change(inputs[1], {target: {value: '124'}})
            fireEvent.click(queryByTestId('login-btn')!)
        })
        expect(invalids[1].textContent).toBe('Минимальная длина 6 символов')
        expect(store?.getState().user.status === EStatus.IDLE).toBe(true)
        expect(onClose).toHaveBeenCalledTimes(0)

        await act(async () => {
            fireEvent.change(inputs[1], {target: {value: '123123'}})
            fireEvent.click(queryByTestId('login-btn')!)
        })

        expect(mockErrorToast).toHaveBeenCalledTimes(1)
        expect(mockErrorToast).toHaveBeenCalledWith("Неверный логин или пароль")
        expect(queryAllByTestId('login-invalid').length).toBe(0)
        expect(store?.getState().user.status === EStatus.ERROR).toBe(true)
        expect(onClose).toHaveBeenCalledTimes(0)

        mockedAxios.post.mockResolvedValue({
            headers: {
                authorization: 'Bearer auth_token'
            },
            data: {
                user: {
                    id: 1,
                    role: 'user',
                    email: 'email@email.com',
                    password: 'pass hash',
                    first_name: 'John',
                    last_name: 'Doe',
                }
            }
        })

        await act(async () => {
            fireEvent.click(queryByTestId('login-btn')!)
        })
        expect(mockSuccessToast).toHaveBeenCalledTimes(1)
        expect(mockSuccessToast).toHaveBeenCalledWith("Вы успешно вошли в систему")
        expect(store?.getState().user.status === EStatus.SUCCESS).toBe(true)
        expect(onClose).toHaveBeenCalledTimes(1)
    })
})


