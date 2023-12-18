import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthService} from "@/services/auth.service";
import {toast} from "react-toastify";
import {IUser, IUserLogin, IUserRegister, IUserUpdate} from "@/models/IUser";
import {AxiosError} from "axios";
import {toastAuthError} from "@/services/auth.helper";
import {ErrorType, IErrorAuth} from "@/models/IError";

export const register = createAsyncThunk<IUser, IUserRegister>(
    'auth/register',
    async ({password, first_name, last_name, email}, thunkAPI) => {
        try {
            const user = await AuthService.register(email, password, first_name, last_name)
            toast.success('Регистрация успешна')
            return user
        } catch (error) {
            const err = error as AxiosError<{ errors: IErrorAuth }>
            const authError = err.response?.data.errors.email[0]
            if (authError?.error === ErrorType.Taken) {
                toast.error(`Email ${authError.value} уже занят`)
                return thunkAPI.rejectWithValue('email taken');
            } else
                return thunkAPI.rejectWithValue('Произошла ошибка')
        }
    }
)

export const login = createAsyncThunk<IUser, IUserLogin>(
    'auth/login',
    async ({email, password}, {rejectWithValue}) => {
        try {
            const user = await AuthService.login(email, password)
            toast.success('Вы успешно вошли в систему')
            return user
        } catch (error) {
            toastAuthError(error, 401, ["Invalid Email or password."], "Неверный логин или пароль")
            return rejectWithValue("Неверный логин или пароль")
        }
    }
)

export const logout = createAsyncThunk<void, boolean | undefined>('auth/logout', async (isExpired) => {
    if (!isExpired)
        toast.success('Вы вышли из аккаунта')
    await AuthService.logout()
})

export const checkAuth = createAsyncThunk<IUser>(
    'auth/check-auth',
    async (_, thunkAPI) => {
        try {
            return await AuthService.getMe()
        } catch (error) {
            toastAuthError(error, 401, ['Signature has expired', 'revoked token'],
                "Время авторизации закончилось, пожалуйста, войдите снова",
                () => thunkAPI.dispatch(logout(true)))
            return thunkAPI.rejectWithValue('Время авторизации закончилось, пожалуйста, войдите снова')
        }
    }
)

export const updateMe = createAsyncThunk<IUser, IUserUpdate>(
    'auth/update-me',
    async (data, thunkAPI) => {
        try {
            const user = await AuthService.updateMe(data)
            toast.success('Профиль обновлен')
            return user
        } catch (error) {
            const err = error as AxiosError
            if (err?.response?.status === 401) {
                toastAuthError(error, 401, ['Signature has expired', 'revoked token'],
                    "Время авторизации закончилось, пожалуйста, войдите снова",
                    () => thunkAPI.dispatch(logout(true)))
                return thunkAPI.rejectWithValue('Время авторизации закончилось, пожалуйста, войдите снова')
            }
            toast.error('Возникла проблема при попытке обновить профиль')
            return thunkAPI.rejectWithValue('Возникла проблема при попытке обновить профиль');
        }
    }
)
