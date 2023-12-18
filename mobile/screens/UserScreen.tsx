import {FC, useEffect, useState} from 'react';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../components/Navigation";
import {useUserProfile} from "../hooks/useUserProfile";
import {IUserUpdate} from "../models/IUser";
import Profile from "../components/Profile";
import {OrderService} from "../services/order.service";
import {IOrder} from "../models/IOrder";
import useUnauthorizedError from "../hooks/useUnauthorizedError";
import Toast from "react-native-toast-message";

interface Props extends NativeStackScreenProps<RootStackParamList, 'User'> {
}

const UserScreen: FC<Props> = ({navigation, route}) => {
    const {isLoading, data: user, updateAsync, deleteAsync} = useUserProfile(route.params.userId)

    const [ordersIsLoading, setOrdersIsLoading] = useState(false)
    const [orders, setOrders] = useState<IOrder[]>([])

    const onAuthError = useUnauthorizedError()
    const onUpdate = async (data: IUserUpdate) => {
        await updateAsync(data)
    }
    const onDelete = async () => {
        await deleteAsync()
        navigation.navigate('Users')
    }

    useEffect(() => {
        setOrdersIsLoading(true)
        if (user)
            OrderService.getAllUser(user.id)
                .then(data => setOrders(data))
                .catch((err) => {
                    const isExpired = onAuthError(err)
                    if (!isExpired)
                        Toast.show({
                            type: 'error',
                            text1: 'Загрузка заказов',
                            text2: 'Возникла проблема'
                        })
                })
                .finally(() => setOrdersIsLoading(false))

    }, [user, onAuthError]);

    return (
        <Profile onSubmit={onUpdate} isLoading={isLoading || ordersIsLoading} user={user} onDelete={onDelete} orders={orders}/>
    );
};

export default UserScreen;
