import * as userActions from './user/actions'
import {cartActions} from "@/store/cart/slice";

export const allActions = {
    ...userActions,
    ...cartActions
}

