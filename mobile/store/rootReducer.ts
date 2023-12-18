import userReducer from './user/slice'
import cartReducer from './cart/slice'

export const reducers = {
	user: userReducer,
	cart: cartReducer
}
