import {FC} from 'react';
import HomeSVG from '../assets/svg/home.svg'
import CartSVG from '../assets/svg/cart.svg'
import MoreSVG from '../assets/svg/burger.svg'
import OrderSVG from '../assets/svg/order.svg'
import styled from "styled-components/native";
import {useNavigation, useTheme} from "@react-navigation/native";
import {StackNavigation} from "./Navigation";
import ButtonCircle from "./ButtonCircle";
import {useWindowDimensions} from "react-native";
import {useAppSelector} from "../hooks/useAppSelector";


const NavView = styled.View`
    bottom: 0;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    border-top-width: 1px;
`

const SVGView = styled.View`
    justify-content: center;
    align-items: center;
`

const SVGText = styled.Text`
    color: #9b9b9b;
`

const NavBar: FC = () => {
    const navigation = useNavigation<StackNavigation>()
    const {colors} = useTheme()
    const dimensions = useWindowDimensions()

    const isAuth = useAppSelector(state => state.user.isAuth)

    return (
        <NavView style={{backgroundColor: colors.background}}>
            <ButtonCircle onPress={() => navigation.navigate('Home')}>
                <SVGView style={{width: dimensions.width / 4 - 20}}>
                    <HomeSVG stroke="#9B9B9B"/>
                    <SVGText>Главная</SVGText>
                </SVGView>
            </ButtonCircle>
            <ButtonCircle onPress={() => navigation.navigate('Cart')}>
                <SVGView style={{width: dimensions.width / 4 - 20}}>
                    <CartSVG fill="#9B9B9B"/>
                    <SVGText>Корзина</SVGText>
                </SVGView>
            </ButtonCircle>
            <ButtonCircle onPress={() => navigation.navigate(isAuth ? 'Orders' : 'Login')}>
                <SVGView style={{width: dimensions.width / 4 - 20}}>
                    <OrderSVG stroke="#9B9B9B"/>
                    <SVGText>Заказы</SVGText>
                </SVGView>
            </ButtonCircle>
            <ButtonCircle onPress={() => navigation.navigate('More')}>
                <SVGView style={{width: dimensions.width / 4 - 20}}>
                    <MoreSVG fill="#9B9B9B"/>
                    <SVGText>Ещё</SVGText>
                </SVGView>
            </ButtonCircle>
        </NavView>
    );
};

export default NavBar;
