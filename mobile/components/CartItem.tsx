import {FC, memo} from 'react';
import styled from "styled-components/native";
import {ICartItem} from "../store/cart/types";
import {API_URL} from "@env";
import {Platform, Text, View} from "react-native";
import MenuSVG from '../assets/svg/menu.svg'
import {MenuView, NativeActionEvent} from "@react-native-menu/menu";
import {useTheme} from "@react-navigation/native";
import ButtonCircle from "./ButtonCircle";
import Counter from "./Counter";
import {CartService} from "../services/cart.service";
import {useActions} from "../hooks/useActions";

type Props = Omit<ICartItem, 'description'>

const CartItemContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 0 15px;
    gap: 20px;
`

const CartItemInfo = styled.View`
    flex-direction: row;
    flex: 1;
`

const CartItemImage = styled.Image`
    height: 120px;
    width: 90px;
    object-fit: contain;
    border-radius: 15px;
`

const CartItemPrice = styled.Text`
    font-weight: bold;
`

const CartItem: FC<Props> = memo(({id, quantity, img, name, price}) => {
    const {dark, colors} = useTheme()

    const {removeFromCart, setQuantity} = useActions()


    const quantityHandler = (id: number) => (value: number) => {
        setQuantity({id, quantity: value})
        CartService.setQuantity(id, value)
    }

    const menuHandler = (id: number) => ({nativeEvent}: NativeActionEvent) => {
        if (nativeEvent.event === 'destruct') {
            removeFromCart(id)
            CartService.remove(id)
        }
    };
    return (
        <CartItemContainer testID="cart-item-block">
            <CartItemImage source={{uri: `${API_URL}${img}`}} testID="cart-item-image"/>
            <CartItemInfo>
                <View style={{flex: 1}}>
                    <Text style={{color: colors.text}} testID="cart-item-name">{name.toUpperCase()}</Text>
                    <Counter initialValue={quantity} onChange={quantityHandler(id)}/>
                    <CartItemPrice testID="cart-item-price">{price} грн.</CartItemPrice>
                </View>
                <MenuView onPressAction={menuHandler(id)} themeVariant={dark ? 'dark' : 'light'} actions={[{
                    id: 'destruct',
                    title: 'Удалить',
                    titleColor: '#000',
                    subtitle: 'Удалить товар из корзины',
                    attributes: {
                        destructive: true
                    },
                    image: Platform.select({
                        ios: 'trash',
                        android: 'ic_menu_delete',
                    }),
                }]}>
                    <ButtonCircle>
                        <MenuSVG fill="#fff"/>
                    </ButtonCircle>
                </MenuView>
            </CartItemInfo>
        </CartItemContainer>
    );
})

export default CartItem;
