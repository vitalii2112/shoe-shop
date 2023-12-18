import {FC, useState} from 'react';
import Container from "../components/Container";
import {useAppSelector} from "../hooks/useAppSelector";
import CartEmpty from "../components/CartEmpty";
import Cart from "../components/Cart";

const CartScreen: FC = () => {
    const cart = useAppSelector(state => state.cart)

    const [isOrderComplete, setIsOrderComplete] = useState(false)
    const [orderId, setOrderId] = useState<number>()

    return (
        <Container>
            {cart.items.length
                ? <Cart setIsOrderComplete={setIsOrderComplete} setOrderId={setOrderId}/>
                : <CartEmpty
                    image={isOrderComplete
                        ? require('../assets/img/empty-order.png')
                        : require('../assets/img/empty-cart.png')}
                    title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
                    buttonArrow
                    subTitle={isOrderComplete
                        ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                        : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                    buttonText="Вернуться назад"/>}
        </Container>
    );
};

export default CartScreen;
