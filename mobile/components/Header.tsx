import React, {FC} from 'react';
import styled from "styled-components/native";
import {View} from "react-native";
import {useNavigation, useTheme} from "@react-navigation/native";
import BackSVG from '../assets/svg/back.svg'
import ProductAddSVG from '../assets/svg/product-add.svg'
import ButtonCircle from "./ButtonCircle";
import {StackNavigation} from "./Navigation";

type Props = {
    backText?: string
    addProduct?: boolean
}

const HeaderView = styled.View`
    justify-content: center;
    align-items: center;
    padding: 15px;
    flex-direction: row;
    //gap: 15px;
    width: 100%;
`

const HeaderLogo = styled.Image`
    width: 60px;
    height: 40px;
    margin-right: 15px;
`

const HeaderTitle = styled.Text`
    text-transform: uppercase;
    font-weight: 700;
    font-size: 18px;
`

const HeaderSubTitle = styled.Text`
    font-size: 14px;
    opacity: 0.5;
`

const BackText = styled.Text`
    font-size: 24px;
    text-align: center;
    flex: 1;
    padding-right: 30px;
`

const Header: FC<Props> = ({backText, addProduct}) => {
    const navigation = useNavigation<StackNavigation>()
    const {colors} = useTheme()
    return (
        <HeaderView style={{backgroundColor: colors.background}}>
            {backText ? <>
                <ButtonCircle onPress={() => navigation.goBack()}>
                    <BackSVG fill={colors.text} width={30} height={30}/>
                </ButtonCircle>
                <BackText testID="header-back-text" style={{color: colors.text}}>{backText}</BackText>
            </> : <>
                <HeaderLogo source={require('../assets/img/logo.png')} testID="header-logo"/>
                <View>
                    <HeaderTitle style={{color: colors.text}}>shoe store</HeaderTitle>
                    <HeaderSubTitle style={{color: colors.text}}>Лучшие кроссовки в одном месте</HeaderSubTitle>
                </View>
            </>}
            {addProduct && <ButtonCircle onPress={() => navigation.navigate('Product', {productId: null})}>
                <ProductAddSVG fill={colors.text} width={30} height={30}/>
            </ButtonCircle>}
        </HeaderView>
    );
};

export default Header;
