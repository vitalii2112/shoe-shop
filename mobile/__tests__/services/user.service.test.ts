import {beforeEach, expect, jest, test} from "@jest/globals";
import axios from "../../api/axios";
import {UserService} from "../../services/user.service";
import {getUsersUrl} from "../../config/api.config";

jest.mock("../../api/axios")
const mockedAuthAxios = axios as jest.Mocked<typeof axios>

const usersData = [
    {
        id: 1,
        role: 'user',
        email: 'email@email.com',
        password: '',
        first_name: '345',
        last_name: '123',
    }
]

beforeEach(() => {
    mockedAuthAxios.get.mockReset()
})

test('should get all users', async () => {
    mockedAuthAxios.get.mockResolvedValue({data: usersData})

    const users = await UserService.getAll()

    expect(users).toEqual(usersData)
    expect(mockedAuthAxios.get).toBeCalledTimes(1)
})

test('should get user', async () => {
    mockedAuthAxios.get.mockResolvedValue({data: usersData[0]})

    const user = await UserService.getById(1)

    expect(user).toEqual(usersData[0])
    expect(mockedAuthAxios.get).toBeCalledTimes(1)
})

test('should update user', async () => {
    mockedAuthAxios.patch.mockResolvedValue({data: usersData[0]})

    const user = await UserService.update({userId: 1, data: {...usersData[0], role: "user"}})

    expect(user).toEqual(usersData[0])
    expect(mockedAuthAxios.patch).toBeCalledTimes(1)
    expect(mockedAuthAxios.patch).toBeCalledWith(getUsersUrl(`/${1}`), {...usersData[0], role: "user"})
})

test('should delete user', async () => {
    await UserService.delete(1)

    expect(mockedAuthAxios.delete).toBeCalledTimes(1)
    expect(mockedAuthAxios.delete).toBeCalledWith(getUsersUrl(`/${1}`))
})

