import {beforeEach, describe, expect, jest, test} from "@jest/globals";
import * as authHelper from '@/services/auth.helper'
import {toast} from "react-toastify";


describe('should save token to local storage', () => {
    const setItem = jest.spyOn(Storage.prototype, 'setItem');
    test('should not save', ()=> {
        authHelper.saveTokenToStorage('')
        expect(setItem).toBeCalledTimes(0)
    })
    test('should save', ()=> {
        authHelper.saveTokenToStorage('123')
        expect(setItem).toBeCalledWith('token', '123')
        expect(setItem).toBeCalledTimes(1)
    })
})

test('should remove token from local storage', ()=> {
    const removeItem = jest.spyOn(Storage.prototype, 'removeItem');
    authHelper.removeTokenStorage()
    expect(removeItem).toBeCalledWith('token')
    expect(removeItem).toBeCalledTimes(1)
})

test('should get token from local storage', ()=> {
    const getItem = jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('token value');
    const token = authHelper.getToken()
    expect(getItem).toBeCalledWith('token')
    expect(getItem).toBeCalledTimes(1)
    expect(token).toEqual('token value')
})

describe('should show auth error', () => {
    const toastError = jest.spyOn(toast, 'error');

    beforeEach(() => {
        toastError.mockReset()
    })

    test('should show', ()=> {
        const cb = jest.fn()
        authHelper.toastAuthError({response: {status: 401, data: "some response text"}}, 401, ['some response text'], 'some error text', cb)
        expect(cb).toBeCalledTimes(1)
        expect(toastError).toBeCalledTimes(1)
        expect(toastError).toBeCalledWith('some error text')
    })
    test('should not show', ()=> {
        const cb = jest.fn()
        authHelper.toastAuthError(undefined, 200, ['some response text'], 'some error text', cb)
        expect(cb).toBeCalledTimes(0)
        expect(toastError).toBeCalledTimes(0)
    })
})
