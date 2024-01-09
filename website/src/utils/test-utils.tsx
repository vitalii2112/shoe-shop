import React, {PropsWithChildren} from 'react'
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from "react-redux";
import {render, renderHook, RenderOptions} from "@testing-library/react";
import {store as RootStore, TypeRootState} from "@/store/store";
import {reducers} from "@/store/rootReducer";
import {BrowserRouter} from "react-router-dom";
import {userEvent} from "@testing-library/user-event";
import {QueryClient, QueryClientProvider} from "react-query";


interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    initialState?: Partial<TypeRootState>
    store?: typeof RootStore
    route?: string
    locationState?: any
}

const queryClient = new QueryClient();

export function renderWithProviders(
    ui: React.ReactElement,
    {
        initialState,
        route = '/',
        store = configureStore({
            reducer: reducers,
            preloadedState: initialState
        }),
        locationState = {},
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    window.history.pushState(locationState, 'Test page', route)

    function Wrapper({children}: PropsWithChildren<{}>) {
        return (
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        {children}
                    </BrowserRouter>
                </QueryClientProvider>
            </Provider>
        )
    }

    return {user: userEvent.setup(), store, ...render(ui, {wrapper: Wrapper, ...renderOptions})}
}

export function renderHookWithProviders<Result, Props>(
    hook: (initialProps: Props) => Result,
    {
    initialState = {},
    route = '/',
    store = configureStore({
        reducer: reducers,
        preloadedState: initialState
    }),
    locationState = {},
}: ExtendedRenderOptions = {}) {

    window.history.pushState(locationState, 'Test page', route)

    function Wrapper({children}: PropsWithChildren<{}>) {
        return (
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        {children}
                    </BrowserRouter>
                </QueryClientProvider>
            </Provider>
        )
    }

    return {...renderHook(hook, {wrapper: Wrapper}), store}
}
