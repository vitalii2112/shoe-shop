import {expect, jest, test} from "@jest/globals";
import {AuthService} from "@/services/auth.service";
import * as api from "@/api/axios";
import * as AuthHelpers from "@/services/auth.helper";

jest.mock("@/api/axios")

const mockedAxios = api.axiosClassic as jest.Mocked<typeof api.axiosClassic>
const mockedAuthAxios = api.default as jest.Mocked<typeof api.default>

test('should register user', async () => {
    const saveToken = jest.spyOn(AuthHelpers, 'saveTokenToStorage')
    const userResponse = {
        headers: {
            authorization: 'Bearer auth_token'
        },
        data: {
            user: {
                id: 1,
                role: 'user',
                email: 'email@email.com',
                password: 'pass hash',
                first_name: 'John',
                last_name: 'Doe',
            }
        }
    }
    mockedAxios.post.mockResolvedValue(userResponse)
    const user = await AuthService.register('email@email.com', '123123', 'John', 'Doe')
    expect(user).toEqual(userResponse.data.user)
    expect(saveToken).toBeCalledWith('auth_token')
    expect(saveToken).toBeCalledTimes(1)
})

test('should login user', async () => {
    const saveToken = jest.spyOn(AuthHelpers, 'saveTokenToStorage')
    const userResponse = {
        headers: {
            authorization: 'Bearer auth_token'
        },
        data: {
            user: {
                id: 1,
                role: 'user',
                email: 'email@email.com',
                password: 'pass hash',
                first_name: 'John',
                last_name: 'Doe',
            }
        }
    }
    mockedAxios.post.mockResolvedValue(userResponse)
    const user = await AuthService.login('email@email.com', '123123')
    expect(user).toEqual(userResponse.data.user)
    expect(saveToken).toBeCalledWith('auth_token')
    expect(saveToken).toBeCalledTimes(1)
})

test('should update user', async () => {
    const userResponse = {
        data: {
            id: 1,
            role: 'user',
            email: 'email@email.com',
            password: 'pass hash',
            first_name: 'Mark',
            last_name: 'Doe',
        }
    }
    mockedAuthAxios.patch.mockResolvedValue(userResponse)
    const user = await AuthService.updateMe({
        role: 'user',
        email: 'email@email.com',
        first_name: 'Mark',
        last_name: 'Doe',
    })
    expect(user).toEqual(userResponse.data)
})


