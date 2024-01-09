import React, {PropsWithChildren} from 'react'
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from "react-redux";
import {render, renderHook, RenderOptions, userEvent} from "@testing-library/react-native";
import {store as RootStore, TypeRootState} from "../store/store";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {reducers} from '../store/rootReducer';
import {NavigationContainer, Theme} from "@react-navigation/native";

interface ExtendedRenderOptions extends RenderOptions {
    initialState?: Partial<TypeRootState>
    store?: typeof RootStore
    isDark?: boolean
}

const queryClient = new QueryClient();

export function renderWithProviders(
    ui: React.ReactElement,
    {
        initialState,
        store = configureStore({
            reducer: reducers as any,
            preloadedState: initialState,
        }),
        isDark = true,
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {

    const theme:Theme = {
        dark: isDark,
        colors: {
            primary: isDark ? '#000' :'#fff2',
            text: isDark ? '#000' :'#fff',
            border: isDark ? '#000' :'#fff',
            card: isDark ? '#000' :'#fff',
            background: isDark ? '#000' :'#fff',
            notification: isDark ? '#000' :'#fff'
        }
    }

    function Wrapper({children}: PropsWithChildren<{}>) {

        return (
            <NavigationContainer theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        {children}
                    </Provider>
                    {/*<Toast topOffset={0}/>*/}
                </QueryClientProvider>
            </NavigationContainer>
        )
    }

    return {user: userEvent.setup(), store, ...render(ui, {wrapper: Wrapper, ...renderOptions})}
}

export function renderHookWithProviders<Result, Props>(
    hook: (initialProps: Props) => Result,
    {
        initialState = {},
        store = configureStore({
            reducer: reducers as any,
            preloadedState: initialState
        }),
        isDark = true
    }: ExtendedRenderOptions = {}) {

    const theme:Theme = {
        dark: isDark,
        colors: {
            primary: isDark ? '#000' :'#fff',
            text: isDark ? '#000' :'#fff',
            border: isDark ? '#000' :'#fff',
            card: isDark ? '#000' :'#fff',
            background: isDark ? '#000' :'#fff',
            notification: isDark ? '#000' :'#fff'
        }
    }

    function Wrapper({children}: PropsWithChildren<{}>) {
        return (
            <NavigationContainer theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        {children}
                    </Provider>
                    {/*<Toast topOffset={0}/>*/}
                </QueryClientProvider>
            </NavigationContainer>
        )
    }

    return {...renderHook(hook, {wrapper: Wrapper}), store}
}
