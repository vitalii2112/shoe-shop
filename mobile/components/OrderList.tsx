import {FC, memo, useCallback} from 'react';
import Title from "./Title";
import {FlatList, Text, View} from "react-native";
import Card from "./Card";
import {IOrder} from "../models/IOrder";
import styled from "styled-components/native";
import {useTheme} from "@react-navigation/native";
import ButtonCircle from "./ButtonCircle";

type Props = {
    orders: IOrder[]
    isLoading?: boolean
    onRefresh?: () => void
    isAdmin?: boolean
    noList?: boolean
    onClientPress?: (userId: number) => void
}

const Block = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const OrderList: FC<Props> = ({orders, onRefresh, onClientPress, isLoading, isAdmin, noList}) => {
    if (noList)
        return <>
            {orders.map((order, orderIndex) => <OrderItem key={order.id} order={order} ordersLength={orders.length}
                                                          orderIndex={orderIndex} isAdmin={isAdmin}/>)}
        </>

    const renderItem = useCallback(({item: order, index: orderIndex}: { item: IOrder, index: number }) => <OrderItem
        order={order} orderIndex={orderIndex}
        ordersLength={orders.length}
        isAdmin={isAdmin} onPress={() => {
            if (order.user_id && onClientPress) {
                onClientPress(order.user_id)
            }
    }}/>, [orders.length, isAdmin])
    return (
        <FlatList data={orders} removeClippedSubviews testID="order-list"
                  refreshing={isLoading} onRefresh={onRefresh}
                  renderItem={renderItem}
        />
    );
};

type TOrderItemProps = {
    order: IOrder
    isAdmin?: boolean
    ordersLength: number
    orderIndex: number
    onPress?: () => void
}

const OrderItem: FC<TOrderItemProps> = memo(({order, isAdmin, ordersLength, onPress, orderIndex}) => {
    const {colors} = useTheme()
    return <>
        <Block style={{flexWrap: 'wrap'}} testID="order-item">
            <Block style={{width: '100%'}}>
                <Title text={`Заказ №${order.id}`}/>
                {isAdmin && <ButtonCircle onPress={onPress}>
                    <Text style={{
                        color: colors.text,
                        fontSize: 16,
                        textDecorationLine: order.user_id ? 'underline' : 'line-through'
                    }} testID="order-item-client">
                        {order.user_id ? `Клиент №${order.user_id}` : 'Клиент удален'}
                    </Text>
                </ButtonCircle>}
            </Block>
            <Block style={{paddingLeft: 15, paddingBottom: 15}}>
                <Text style={{color: colors.text, fontSize: 16}}>Сумма заказа: </Text>
                <Text style={{
                    color: colors.text,
                    fontSize: 16,
                    fontWeight: "700"
                }} testID="order-item-amount">{order.amount} грн.</Text>
            </Block>
        </Block>
        <View style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
        }}>
            {order.items.map((item, index) => <Card key={index} {...item}
                                                    isLastChild={index % 2 !== 0}
                                                    isLastRow={
                                                        ordersLength - 1 === orderIndex
                                                            ? order.items.length % 2 === 0
                                                                ? index < order.items.length - 2
                                                                : index % 2 === 0 && index !== order.items.length
                                                            : index < order.items.length - 2
                                                    }/>)}
        </View>
    </>
})

export default OrderList;
