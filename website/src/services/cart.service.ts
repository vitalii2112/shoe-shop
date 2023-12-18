import { ICartItem, ICartState } from "@/store/cart/types";

export const CartService = {
    get(): ICartState {
        return JSON.parse(localStorage.getItem('cart') || '{"items": [], "isPayed": false}') as ICartState;
    },

    add(item: ICartItem) {
        const cart = this.get();
        cart.items.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
    },

    remove(id: number) {
        const cart = this.get();
        const updatedCartItems = cart.items.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify({items: updatedCartItems, isPayed: false }));
    },

    clear() {
        localStorage.removeItem('cart');
    },

    setPayment(isPayed: boolean) {
        const cart = this.get();
        localStorage.setItem('cart', JSON.stringify({ ...cart, isPayed }));
    }
};
