import {createSlice} from '@reduxjs/toolkit';
import {EStatus, UserSliceType} from './types';
import {checkAuth, login, logout, register, updateMe} from "@/store/user/actions";

const initialState: UserSliceType = {
    status: EStatus.IDLE,
    isAuth: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(register.pending, state => {
            state.status = EStatus.LOADING;
            state.isAuth = false;
            state.user = undefined;
        }).addCase(register.fulfilled, (state, { payload }) => {
            state.status = EStatus.SUCCESS;
            state.isAuth = true;
            state.user = payload;
        }).addCase(register.rejected, state => {
            state.status = EStatus.ERROR;
            state.isAuth = false;
            state.user = undefined;
        }).addCase(login.pending, state => {
            state.status = EStatus.LOADING;
            state.isAuth = false;
            state.user = undefined;
        }).addCase(login.fulfilled, (state, { payload }) => {
            state.status = EStatus.SUCCESS;
            state.isAuth = true;
            state.user = payload;
        }).addCase(login.rejected, state => {
            state.status = EStatus.ERROR;
            state.isAuth = false;
            state.user = undefined;
        }).addCase(logout.pending, state => {
            state.status = EStatus.LOADING;
            state.isAuth = false;
            state.user = undefined;
        }).addCase(logout.fulfilled, state => {
            state.status = EStatus.IDLE;
            state.isAuth = false;
            state.user = undefined;
        }).addCase(logout.rejected, state => {
            state.status = EStatus.ERROR;
            state.isAuth = false;
            state.user = undefined;
        }).addCase(checkAuth.pending, (state) => {
            state.status = EStatus.LOADING;
            state.isAuth = false;
            state.user = undefined;
        }).addCase(checkAuth.fulfilled, (state, { payload }) => {
            state.status = EStatus.SUCCESS;
            state.isAuth = true;
            state.user = payload;
        }).addCase(checkAuth.rejected, (state) => {
            state.status = EStatus.ERROR;
            state.isAuth = false;
            state.user = undefined;
        }).addCase(updateMe.pending, (state) => {
            state.status = EStatus.LOADING;
            state.isAuth = false;
            state.user = undefined;
        }).addCase(updateMe.fulfilled, (state, { payload }) => {
            state.status = EStatus.SUCCESS;
            state.isAuth = true;
            state.user = payload;
        }).addCase(updateMe.rejected, (state) => {
            state.status = EStatus.ERROR;
            state.isAuth = false;
            state.user = undefined;
        })
    },
});

export default userSlice.reducer;
