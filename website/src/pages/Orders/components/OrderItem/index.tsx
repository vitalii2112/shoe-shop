import {FC} from 'react';
import ProductList from "@/components/ProductList";
import {IOrderItem} from "@/models/IOrder";
import OrderTitle from "@/pages/Orders/components/OrderTitle";
import styles from './OrderItem.module.scss'

type TOrderItemProps = {
    id: number
    isLoading?: boolean
    amount: number
    user_id?: number | null
    items: IOrderItem[]
}

const OrderItem: FC<TOrderItemProps> = ({items, id, amount, user_id, isLoading}) => {
    return (
        <div key={id}
             className={styles.orderItem}>
            <OrderTitle isLoading={isLoading} id={id} amount={amount} user_id={user_id}/>
            <ProductList products={items.map(item => ({...item, id: -1}))}/>
        </div>
    );
};

export default OrderItem;
