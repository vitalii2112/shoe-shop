import {beforeEach, describe, expect, jest, test} from "@jest/globals";
import {renderWithProviders} from "@/utils/test-utils";
import App from "../../App";
import {waitFor} from "@testing-library/dom";

jest.mock("@/api/axios")

beforeEach(() => {
    const matchMediaMock = jest.fn();
    window.matchMedia = matchMediaMock as any;

    matchMediaMock.mockReturnValue({
        matches: false,
        addEventListener: jest.fn(),
        addListener: jest.fn(),
        removeEventListener: jest.fn(),
    });
})

describe('App', () => {
    test('should render Home page', async () => {
        const {getByTestId} = renderWithProviders(<App/>)

        await waitFor(() => {
            expect(getByTestId('home')).toBeInTheDocument()
        })
    })

    test('should render orders page', async () => {
        const {getByTestId} = renderWithProviders(<App/>, {route: '/orders', initialState: {user: {isAuth: true, status: 2}}})

        await waitFor(() => {
            expect(getByTestId('orders')).toBeInTheDocument()
        })
    })

    test('should render profile page', async () => {
        const {getByTestId} = renderWithProviders(<App/>, {route: '/profile', initialState: {user: {isAuth: true, status: 2}}})

        await waitFor(() => {
            expect(getByTestId('profile')).toBeInTheDocument()
        })
    })

    test('should render products page', async () => {
        const {getByTestId} = renderWithProviders(<App/>, {route: '/items', initialState: {user: {isAuth: true, status: 2, user: {id: 1, role: 'admin', last_name: '', first_name: '', email: ''}}}})

        await waitFor(() => {
            expect(getByTestId('products')).toBeInTheDocument()
        })
    })

    test('should render users page', async () => {
        const {getByTestId} = renderWithProviders(<App/>, {route: '/users', initialState: {user: {isAuth: true, status: 2, user: {id: 1, role: 'admin', last_name: '', first_name: '', email: ''}}}})

        await waitFor(() => {
            expect(getByTestId('users')).toBeInTheDocument()
        })
    })

    test('should render user page', async () => {
        const {getByTestId} = renderWithProviders(<App/>, {route: '/users/1', initialState: {user: {isAuth: true, status: 2, user: {id: 1, role: 'admin', last_name: '', first_name: '', email: ''}}}})

        await waitFor(() => {
            expect(getByTestId('user-page')).toBeInTheDocument()
        })
    })

    test('should not render page without admin access', async () => {
        const {getByTestId, queryByTestId} = renderWithProviders(<App/>, {route: '/items', initialState: {user: {isAuth: true, status: 2, user: {id: 1, role: 'user', last_name: '', first_name: '', email: ''}}}})

        await waitFor(() => {
            expect(getByTestId('home')).toBeInTheDocument()
        })

        expect(queryByTestId('products')).not.toBeInTheDocument()
    })

    test('should not render page without auth access', async () => {
        const {getByTestId, queryByTestId} = renderWithProviders(<App/>, {route: '/profile', initialState: {user: {isAuth: false, status: 2}}})

        await waitFor(() => {
            expect(getByTestId('home')).toBeInTheDocument()
        })

        expect(queryByTestId('profile')).not.toBeInTheDocument()
    })
})
