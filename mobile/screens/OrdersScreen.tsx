import {FC, useCallback, useEffect, useState} from 'react';
import Container from "../components/Container";
import Loading from "../components/Loading";
import {OrderService} from "../services/order.service";
import {useAppSelector} from "../hooks/useAppSelector";
import {IOrder} from "../models/IOrder";
import useUnauthorizedError from "../hooks/useUnauthorizedError";
import Toast from "react-native-toast-message";
import CartEmpty from "../components/CartEmpty";
import OrderList from "../components/OrderList";


const OrdersScreen: FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [orders, setOrders] = useState<IOrder[]>([])

    const onAuthError = useUnauthorizedError()

    const user = useAppSelector(state => state.user.user)

    const loadOrder = useCallback(() => {
        if (user) {
            setIsLoading(true)
            OrderService.getAllUser(user.id)
                .then(data => setOrders(data))
                .catch((err) => {
                    const isExpired = onAuthError(err)
                    if (!isExpired)
                        Toast.show({
                            type: 'error',
                            text1: 'Ошибка',
                            text2: 'Не удалось загрузить заказы'
                        })
                })
                .finally(() => setIsLoading(false))
        }
    }, [user])


    useEffect(() => {
        loadOrder()
    }, [loadOrder]);


    if (isLoading)
        return <Loading/>

    return (
        <Container>
            {orders.length === 0
                ? <CartEmpty image={require('../assets/img/empty-order.png')}
                             buttonText="Сделать заказ"
                             title="Список заказов пуст"
                             subTitle="У вас пока нет оформленных заказов"/>
                : <OrderList orders={orders} isLoading={isLoading} onRefresh={loadOrder}/>
            }
        </Container>
    );
};

export default OrdersScreen;
