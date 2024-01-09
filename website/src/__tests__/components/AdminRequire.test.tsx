import {test, describe, expect, jest} from "@jest/globals";
import {renderWithProviders} from "@/utils/test-utils";
import AdminRequire from "@/components/AdminRequire";
import {EStatus} from "@/store/user/types";
import '@testing-library/jest-dom'
import {toast} from "react-toastify";

// const mockNavigate = jest.mock

describe('AdminRequire component', () => {
    test('renders Outlet when user is admin and status is SUCCESS', () => {
        const {queryByTestId} = renderWithProviders(<AdminRequire/>, {
            initialState: {
                user: {
                    isAuth: false, status: EStatus.SUCCESS,
                    user: {
                        role: 'admin',
                        email: '',
                        first_name: '',
                        last_name: '',
                        id: 1
                    }
                }
            }
        })

        expect(queryByTestId('loading')).toBeFalsy()
    });

    test('renders nothing when status is IDLE', () => {
        const {queryByTestId} = renderWithProviders(<AdminRequire/>, {
            initialState: {
                user: {
                    isAuth: false, status: EStatus.IDLE,
                    user: {
                        role: 'admin',
                        email: '',
                        first_name: '',
                        last_name: '',
                        id: 1
                    }
                }
            }
        })

        expect(queryByTestId('loading')).toBeFalsy()
        expect(queryByTestId('home')).toBeFalsy()
    });

    test('renders Loading component when status is LOADING', () => {
        const {queryByTestId} = renderWithProviders(<AdminRequire/>, {
            initialState: {
                user: {
                    isAuth: false, status: EStatus.LOADING,
                    user: {
                        role: 'admin',
                        email: '',
                        first_name: '',
                        last_name: '',
                        id: 1
                    }
                }
            }
        })

        // @ts-ignore
        expect(queryByTestId('loading')).toBeInTheDocument()
        expect(queryByTestId('home')).toBeFalsy()
    });

    test('renders Navigate component with error toast when status is not SUCCESS', () => {
        const MockToast = jest.spyOn(toast, 'error')
        const {queryByTestId} = renderWithProviders(<AdminRequire/>, {
            initialState: {
                user: {
                    isAuth: false, status: EStatus.ERROR,
                    user: {
                        role: 'admin',
                        email: '',
                        first_name: '',
                        last_name: '',
                        id: 1
                    }
                }
            }
        })

        expect(queryByTestId('loading')).toBeFalsy()
        expect(queryByTestId('home')).toBeFalsy()
        expect(MockToast).toHaveBeenCalledWith('Ошибка доступа');
    });
});
