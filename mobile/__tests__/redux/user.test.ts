import {expect, test} from "@jest/globals";
import userReducer from '../../store/user/slice'
import {EStatus} from "../../store/user/types";


test('should return initial state', () => {
    expect(userReducer(undefined, {type: ''})).toEqual({
        status: EStatus.IDLE,
        isAuth: false,
        user: undefined
    })
})
