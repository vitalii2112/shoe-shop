import {useEffect, useState} from "react";
import {IOrder} from "@/models/IOrder";
import {OrderService} from "@/services/order.service";
import {useAppSelector} from "@/hooks/useAppSelector";
import {toast} from "react-toastify";
import OrderItem from "@/pages/Orders/components/OrderItem";
import useUnauthorizedError from "@/hooks/useUnauthorizedError";


function Orders() {
    const [orders, setOrders] = useState<IOrder[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const {user} = useAppSelector(state => state.user)

    const onAuthError = useUnauthorizedError()

    useEffect(() => {
        setIsLoading(true)
        OrderService.getAllAdmin()
            .then(data => setOrders(data))
            .catch((err) => {
                const isExpired = onAuthError(err)
                if (!isExpired)
                    toast.error('При загрузке заказов произошла ошибка')
            })
            .finally(() => setIsLoading(false))
    }, [user,onAuthError])
    return (
        <div className="layout">
            <h1>Все заказы</h1>
            <div>
                {!orders.length && <h2 style={{fontSize: 24, textAlign: "center"}}>Список заказов пуст</h2>}
                {(isLoading ? [{id: 0, amount: 0, user_id: 0, items: [...new Array(8)]}] : orders).map(order =>
                    <OrderItem key={order.id} {...order} isLoading={isLoading}/>)}
            </div>
        </div>
    )
}

export default Orders
