import {beforeEach, describe, expect, jest, test} from "@jest/globals";
import {renderWithProviders} from "@/utils/test-utils";
import Header from "@/components/Header";
import * as router from 'react-router'

const matchMediaMock = jest.fn();
window.matchMedia = matchMediaMock as any;

beforeEach(() => {
    matchMediaMock.mockReturnValue({
        matches: false,
        addEventListener: jest.fn(),
        addListener: jest.fn(),
        removeEventListener: jest.fn(),
    });
})

describe('Header', () => {
    test('should render desktop header', () => {
        const {getByTestId} = renderWithProviders(<Header/>)

        expect(getByTestId('header')).toBeInTheDocument()
        expect(getByTestId('header-desktop-link')).toBeInTheDocument()
    })

    test('should render desktop header for user', () => {
        const {getByTestId, getAllByTestId, queryAllByTestId} = renderWithProviders(<Header/>, {initialState: {user: {isAuth: true, status: 2}}})

        expect(getByTestId('header')).toBeInTheDocument()
        expect(getAllByTestId('header-desktop-user-link').length).toBe(2)
        expect(queryAllByTestId('header-desktop-admin-link').length).toBe(0)
    })

    test('should render desktop header for admin',  () => {
        const {getByTestId, getAllByTestId, queryAllByTestId} = renderWithProviders(<Header/>, {initialState: {user: {isAuth: true, status: 2, user: {role: 'admin', email: '', first_name: '', last_name: '', id: 1}}}})

        expect(getByTestId('header')).toBeInTheDocument()
        expect(getAllByTestId('header-desktop-user-link').length).toBe(2)
        expect(queryAllByTestId('header-desktop-admin-link').length).toBe(3)
    })

    test('should render tablet header', () => {
        matchMediaMock.mockReturnValue({
            matches: true,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        });
        const {getByTestId, queryByTestId} = renderWithProviders(<Header/>)

        expect(getByTestId('header')).toBeInTheDocument()
        expect(queryByTestId('header-desktop-link')).not.toBeInTheDocument()
        expect(getByTestId('mover')).toBeInTheDocument()
    })

    test('should open cart', async () => {
        const {store, getByTestId, user} = renderWithProviders(<Header/>)

        expect(getByTestId('header')).toBeInTheDocument()

        await user.click(getByTestId('cart-open'))
        expect(store?.getState().cart.isOpen).toBe(true)
    })

    test('should change AuthModal state', async () => {
        const {getByTestId, user, queryByTestId} = renderWithProviders(<Header/>)

        expect(getByTestId('header')).toBeInTheDocument()
        expect(getByTestId('header-desktop-link')).toBeInTheDocument()

        await user.click(getByTestId('header-desktop-link'))
        expect(getByTestId('auth-modal')).toBeInTheDocument()

        await user.click(getByTestId('modal-close'))
        expect(queryByTestId('auth-modal')).not.toBeInTheDocument()
    })

    test('should open AuthModal by location state', async () => {
        const mockUseLocation = jest.spyOn(router, 'useLocation')
        mockUseLocation.mockReturnValue({
            pathname: '/',
            search: '',
            hash: '',
            state: { isAuthOpen: true },
            key: 'default',
        })

        const {getByTestId, user, queryByTestId} = renderWithProviders(<Header/>)

        expect(getByTestId('auth-modal')).toBeInTheDocument()
        await user.click(getByTestId('modal-close'))

        expect(queryByTestId('auth-modal')).not.toBeInTheDocument()
    })
})
