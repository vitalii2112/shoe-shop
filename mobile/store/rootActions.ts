import * as userActions from './user/actions'
import {cartActions} from "./cart/slice";

export const allActions = {
    ...userActions,
    ...cartActions
}

