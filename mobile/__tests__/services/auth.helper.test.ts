import {beforeEach, describe, expect, jest, test} from "@jest/globals";
import * as authHelper from '../../services/auth.helper'
import Toast from "react-native-toast-message";
import {storage} from "../../store/storage";

describe('should save token to local storage', () => {
    test('should not save', ()=> {
        const mockSet = jest.spyOn(storage, 'set')
        authHelper.saveTokenToStorage('')
        expect(mockSet).toBeCalledTimes(0)
    })
    test('should save', ()=> {
        const mockSet = jest.spyOn(storage, 'set')

        authHelper.saveTokenToStorage('123')
        expect(mockSet).toBeCalledTimes(1)
        expect(mockSet).toHaveBeenCalledWith('token', '123')
    })
    test('should remove token from local storage', ()=> {
        const mockRemove = jest.spyOn(storage, 'delete')

        authHelper.removeTokenStorage()
        expect(mockRemove).toBeCalledWith('token')
        expect(mockRemove).toBeCalledTimes(1)
    })

    test('should get token from local storage', ()=> {
        const mockGet = jest.spyOn(storage, 'getString').mockReturnValue('token value')

        const token = authHelper.getToken()
        expect(mockGet).toBeCalledWith('token')
        expect(mockGet).toBeCalledTimes(1)
        expect(token).toEqual('token value')
    })
})

describe('should show auth error', () => {
    const toastError = jest.spyOn(Toast, 'show');

    beforeEach(() => {
        toastError.mockReset()
    })

    test('should show', ()=> {
        const cb = jest.fn()
        authHelper.toastAuthError({response: {status: 401, data: "some response text"}}, 401, ['some response text'], 'some error text', cb)
        expect(cb).toBeCalledTimes(1)
        expect(toastError).toBeCalledTimes(1)
        expect(toastError).toBeCalledWith({
            type: 'error',
            text1: 'Ошибка',
            text2: 'some error text'
        })
    })
    test('should not show', ()=> {
        const cb = jest.fn()
        authHelper.toastAuthError(undefined, 200, ['some response text'], 'some error text', cb)
        expect(cb).toBeCalledTimes(0)
        expect(toastError).toBeCalledTimes(0)
    })
})
