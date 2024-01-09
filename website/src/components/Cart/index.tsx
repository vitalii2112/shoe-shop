import {FC, useEffect, useState} from 'react';
import styles from './Cart.module.scss';
import {useAppSelector} from "@/hooks/useAppSelector";
import cn from "classnames";
import {useActions} from "@/hooks/useActions";
import {CartService} from "@/services/cart.service";
import {toast} from "react-toastify";
import delay from "@/utils/delay";
import Loading from "@/components/Loading";
import {useLocation, useNavigate} from "react-router";
import {OrderService} from "@/services/order.service";
import Mover from "@/components/Mover";
import useUnauthorizedError from "@/hooks/useUnauthorizedError";
import {ReactComponent as RemoveSVG} from "@/assets/svg/remove.svg";
import {ReactComponent as ArrowSVG} from "@/assets/svg/arrow.svg";
import {API_URL} from "@/config/api.config";


const Cart: FC = () => {
    const [isOrderCompleted, setIsOrderCompleted] = useState(false)
    const [orderId, setOrderId] = useState<number>()
    const [isLoading, setIsLoading] = useState(false)

    const {items: cart, isPayed, isOpen} = useAppSelector(state => state.cart)
    const {user} = useAppSelector(state => state.user)
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const {removeFromCart, setCart, setCartPayment, setCartOpen} = useActions()

    const location = useLocation();
    const navigate = useNavigate();

    const onAuthError = useUnauthorizedError()

    const removeHandler = (id: number) => () => {
        removeFromCart(id)
        CartService.remove(id)
    }

    const clearHandler = () => {
        setCart()
        CartService.clear()
    }

    const closeHandler = () => {
        if (isOrderCompleted) {
            setIsOrderCompleted(false)
            setOrderId(undefined)
        }
        setCartOpen(false)
    }

    const orderHandler = async () => {
        try {
            setIsLoading(true)
            const createdOrderId = await OrderService.create(cart.map(item => ({id: item.id, quantity: item.quantity})))
            setOrderId(createdOrderId)
            setIsOrderCompleted(true)
            clearHandler()
        } catch (e) {
            const isExpired = onAuthError(e)
            if (!isExpired)
                toast.error('Ошибка при создании заказа')
        } finally {
            setIsLoading(false)
        }
    }

    const paymentHandler = async () => {
        setIsLoading(true)
        await delay(3000)
        CartService.setPayment(true)
        setCartPayment(true)
        setIsLoading(false)
    }

    const cartHandler = async () => {
        if (isPayed)
            await orderHandler()
        else
            await paymentHandler()
    }

    const authHandler = () => {
        navigate({...location}, {state: {isAuthOpen: true}});
        closeHandler()
    }

    useEffect(() => {
        document.documentElement.style.overflow = isOpen ? 'hidden' : 'auto'
    }, [isOpen]);
    return (
        <Mover onClose={closeHandler} isOpened={isOpen} className={styles.cart} data-testid="cart"
               title={`Корзина ${isPayed ? '(Оплачено)' : ''}`}>
            {isLoading && <Loading absolute text="Происходит оплата товара..."/>}
            {cart.length > 0 ?
                <>
                    <div className={styles.cartItems} data-testid="cart-items">
                        {cart.map(item => (
                            <div className={styles.cartItem} key={item.id} data-testid="cart-item">
                                <img className={styles.cartItemImg} src={`${API_URL}${item.img}`} alt={item.name}/>
                                <div className={styles.cartItemText}>
                                    <p>{item.name}</p>
                                    <p>{item.quantity} шт.</p>
                                    <b>{item.price} грн.</b>
                                </div>
                                <RemoveSVG data-testid="cart-item-remove" className={styles.cartItemRemove} onClick={removeHandler(item.id)}/>
                            </div>
                        ))}
                    </div>
                    <div className={styles.cartTotalBlock}>
                        <ul>
                            <li>
                                <span>Итого:</span>
                                <div></div>
                                <b data-testid="cart-total">{totalPrice.toFixed(2)} грн.</b>
                            </li>
                        </ul>
                        {user ?
                            <button onClick={cartHandler} className="btn" data-testid="cart-btn-pay">
                                <span>{isPayed ? 'Оформить заказ' : 'Перейти к оплате'}</span>
                                <ArrowSVG/>
                            </button>
                            : <>
                                <p className={cn(styles.authRequired, styles.text)}>Для завершения оформления
                                    заказа, пожалуйста,
                                    войдите в свой аккаунт</p>
                                <button onClick={authHandler} className="btn" data-testid="cart-btn-auth">
                                    <span>Войти</span>
                                </button>
                            </>}
                    </div>
                </>
                : <div className={styles.cartEmpty} data-testid="cart-empty">
                    <img width={120} data-testid="cart-empty-img"
                         src={isOrderCompleted ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
                         alt="Empty cart"/>
                    <h2 data-testid="cart-empty-title">{isOrderCompleted ? "Заказ оформлен" : "Корзина пустая"}</h2>
                    <p data-testid="cart-empty-text" className={styles.text}>{isOrderCompleted ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}</p>
                    <button className={cn("btn", styles.cartEmptyBtn)} onClick={closeHandler}>
                        <ArrowSVG/>
                        <span>Вернуться назад</span>
                    </button>
                </div>}
        </Mover>
    );
};

export default Cart;
