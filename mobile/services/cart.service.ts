import {ICartItem, ICartState} from '../store/cart/types';
import {storage} from '../store/storage';

export const CartService = {
  get(): ICartState {
    return JSON.parse(
      storage.getString('cart') || '{"items": [], "isPayed": false}',
    ) as ICartState;
  },

  add(item: ICartItem) {
    const cart = this.get();
    cart.items.push(item);
    storage.set('cart', JSON.stringify(cart));
  },

  remove(id: number) {
    const cart = this.get();
    const updatedCartItems = cart.items.filter(item => item.id !== id);
    storage.set(
      'cart',
      JSON.stringify({items: updatedCartItems, isPayed: false}),
    );
  },

  clear() {
    storage.delete('cart');
  },

  setPayment(isPayed: boolean) {
    const cart = this.get();
    storage.set('cart', JSON.stringify({...cart, isPayed}));
  },

  setQuantity(id: number, value: number) {
    const cart = this.get();
    cart.items = cart.items.map(item =>
      item.id === id ? {...item, quantity: value} : item,
    );
    storage.set('cart', JSON.stringify(cart));
  },
};
