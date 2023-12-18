import React, {FC, useCallback, useState} from 'react';
import CartItem from "./CartItem";
import {FlatList, Text} from "react-native";
import {useAppSelector} from "../hooks/useAppSelector";
import styled from "styled-components/native";
import DashedLine from "react-native-dashed-line";
import {useNavigation, useTheme} from "@react-navigation/native";
import Color from "../utils/color";
import StyledButton from "./StyledButton";
import {StackNavigation} from "./Navigation";
import {OrderService} from "../services/order.service";
import {CartService} from "../services/cart.service";
import {useActions} from "../hooks/useActions";
import delay from "../utils/delay";
import useUnauthorizedError from "../hooks/useUnauthorizedError";
import Toast from "react-native-toast-message";
import Loading from "./Loading";
import {ICartItem} from "../store/cart/types";

interface Props {
    setIsOrderComplete: React.Dispatch<React.SetStateAction<boolean>>;
    setOrderId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const CartTotal = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 0 15px;
    margin: 15px 0;
`

const CartTotalPrice = styled.Text`
    font-weight: bold;
`

const CartRequirements = styled.View`
    align-items: center;
    padding: 0 15px;
    margin-bottom: 15px;
`

const CartRequirementsText = styled.Text`
    opacity: 0.6;
    margin-bottom: 15px;
    line-height: 20px;
    text-align: center;
`

const Cart: FC<Props> = ({setIsOrderComplete, setOrderId}) => {
    const {colors} = useTheme()
    const {items: cart, isPayed} = useAppSelector(state => state.cart)
    const isAuth = useAppSelector(state => state.user.isAuth)

    const navigation = useNavigation<StackNavigation>()
    const onAuthError = useUnauthorizedError()

    const [isLoading, setIsLoading] = useState(false)

    const {setCart, setCartPayment} = useActions()

    const cartTotal = cart.reduce((sum, item) => sum + item.quantity * item.price, 0)


    const clearHandler = () => {
        setCart()
        CartService.clear()
    }
    const orderHandler = async () => {
        try {
            setIsLoading(true)
            const createdOrderId = await OrderService.create(cart.map(item => ({id: item.id, quantity: item.quantity})))
            setOrderId(createdOrderId)
            setIsOrderComplete(true)
            clearHandler()
        } catch (e) {
            const isExpired = onAuthError(e)
            if (!isExpired)
                Toast.show({
                    type: 'error',
                    text1: 'Ошибка',
                    text2: 'Не удалось оформить заказ'
                })
        }
        setIsLoading(false)
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

    const renderItem = useCallback(({item}: {item: ICartItem}) => <CartItem {...item}/>, [])

    return (
        <>
            {isLoading && <Loading overlay text={isPayed ? 'Загрузка...' : 'Оплата товара'}/>}
            <FlatList data={cart} contentContainerStyle={{gap: 15}} renderItem={renderItem}/>
            <CartTotal>
                <Text style={{color: colors.text}}>Итого:</Text>
                <DashedLine dashLength={2}
                            style={{flex: 1, marginLeft: 7, marginRight: 7, top: -4, alignSelf: 'flex-end'}}
                            dashColor={Color.convertHexToRGBA(colors.text, 50)}/>
                <CartTotalPrice style={{color: colors.text}}>{cartTotal.toFixed(2)} грн.</CartTotalPrice>
            </CartTotal>
            {<CartRequirements>
                {isAuth
                    ? <StyledButton text={isPayed ? 'Оформить заказ' : 'Перейти к оплате'} isFull withArrow="right"
                                    onPress={cartHandler}/>
                    : <>
                        <CartRequirementsText style={{color: colors.text}}>Для завершения оформления заказа, пожалуйста,
                            войдите в свой аккаунт</CartRequirementsText>
                        <StyledButton text="Войти" isFull
                                      onPress={() => navigation.navigate('Login', {callbackUrl: 'Cart'})}/>
                    </>}
            </CartRequirements>}
        </>
    );
};

export default Cart;
