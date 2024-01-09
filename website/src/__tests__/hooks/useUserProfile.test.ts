import {beforeEach, describe, expect, jest, test} from "@jest/globals";
import {UserService} from "@/services/user.service";
import {IUser} from "@/models/IUser";
import {renderHookWithProviders} from "@/utils/test-utils";
import {waitFor} from "@testing-library/dom";
import {useUserProfile} from "@/pages/Users/pages/UserPage/useUserProfile";
import {toast} from "react-toastify";
import {act} from "@testing-library/react";

jest.mock("@/services/user.service")

const mockUserService = UserService as jest.Mocked<typeof UserService>

const user: IUser = {
    id: 1,
    email: '',
    role: 'user',
    first_name: '',
    last_name: ''
}

beforeEach(() => {
    mockUserService.getById.mockResolvedValue(user)
})

describe('useUserProfile', () => {
    test('should return user by id', async () => {
        const {result} = renderHookWithProviders(() => useUserProfile(1))

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
        })
        expect(result.current.data).toStrictEqual(user)
    })
    test('should update user', async () => {
        mockUserService.update.mockResolvedValue(user)
        const mockToast = jest.spyOn(toast, 'success')
        const {result} = renderHookWithProviders(() => useUserProfile(1))

        const {id: _, ...item} = user

        await act(async () => {
            await result.current.updateAsync(item)
            expect(result.current.isRefetching).toBe(true)
        })

        await waitFor(() => {
            expect(result.current.isRefetching).toBe(false)
        })
        expect(mockToast).toHaveBeenCalledTimes(1)
        expect(mockToast).toHaveBeenCalledWith('Пользователь был обновлен')
        expect(result.current.data).toStrictEqual(user)
    })

    test('should delete user', async () => {
        const mockToast = jest.spyOn(toast, 'success')
        const {result} = renderHookWithProviders(() => useUserProfile(1))

        await act(async () => {
            await result.current.deleteAsync()
            expect(result.current.isRefetching).toBe(true)
        })

        await waitFor(() => {
            expect(result.current.isRefetching).toBe(false)
        })
        expect(mockToast).toHaveBeenCalledTimes(1)
        expect(mockToast).toHaveBeenCalledWith('Пользователь был удален')
        expect(result.current.data).toStrictEqual(user)
    })
})
