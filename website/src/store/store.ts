import { configureStore } from '@reduxjs/toolkit'
import {reducers} from "./rootReducer";

export const store = configureStore({
	reducer: reducers,
	devTools: process.env.NODE_ENV === 'production'
})

export type TypeRootState = ReturnType<typeof store.getState>
