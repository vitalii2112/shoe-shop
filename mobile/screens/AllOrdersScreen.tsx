import {FC, useCallback, useEffect, useState} from 'react';
import OrderList from "../components/OrderList";
import Container from "../components/Container";
import {IOrder} from "../models/IOrder";
import useUnauthorizedError from "../hooks/useUnauthorizedError";
import {useAppSelector} from "../hooks/useAppSelector";
import {OrderService} from "../services/order.service";
import Toast from "react-native-toast-message";
import Loading from "../components/Loading";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../components/Navigation";

interface Props extends NativeStackScreenProps<RootStackParamList, 'AllOrders'> {
}

const AllOrdersScreen: FC<Props> = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [orders, setOrders] = useState<IOrder[]>([])

    const onAuthError = useUnauthorizedError()

    const user = useAppSelector(state => state.user.user)

    const loadOrder = useCallback(() => {
        setIsLoading(true)
        if (user && user.role === 'admin')
            OrderService.getAllAdmin()
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
    }, [user])

    useEffect(() => {
        loadOrder()
    }, [loadOrder]);


    if (isLoading)
        return <Loading/>

    if (!user || user.role !== 'admin') {
        navigation.navigate('Login')
    }

    return (
        <Container>
            <OrderList orders={orders} isLoading={isLoading} onRefresh={loadOrder} isAdmin
                       onClientPress={userId => navigation.navigate('User', {userId})}/>
        </Container>
    );
};

export default AllOrdersScreen;
