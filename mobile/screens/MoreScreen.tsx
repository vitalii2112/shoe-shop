import {FC} from 'react';
import styled from "styled-components/native";
import ButtonCircle from "../components/ButtonCircle";
import LoginSVG from '../assets/svg/login.svg'
import LogoutSVG from '../assets/svg/logout.svg'
import RegisterSVG from '../assets/svg/register.svg'
import UsersSVG from '../assets/svg/users.svg'
import ProductsSVG from '../assets/svg/products.svg'
import OrdersSVG from '../assets/svg/order.svg'
import ProfileSVG from '../assets/svg/user.svg'
import {useAppSelector} from "../hooks/useAppSelector";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../components/Navigation";
import {useActions} from "../hooks/useActions";
import {Alert} from "react-native";
import {useTheme} from "@react-navigation/native";

interface Props extends NativeStackScreenProps<RootStackParamList, 'More'> {
}

const MoreContainer = styled.ScrollView`
    padding: 15px;
`

const MoreItem = styled.View`
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: #EAEAEA;
    gap: 10px;
    width: 90%;
    padding-bottom: 10px;
    padding-left: 5px;
`

const MoreItemText = styled.Text`
    font-size: 16px;
    color: #9B9B9B;
`

const MoreScreen: FC<Props> = ({navigation}) => {
    const {isAuth, user} = useAppSelector(state => state.user)
    const {logout} = useActions()

    const {dark} = useTheme()

    const logoutHandler = () => {
        Alert.alert('Вы уверены?', 'Вы уверены, что вы хотите выйти?', [
            {
                text: 'Нет',
                isPreferred: true,
                style: 'cancel'
            },
            {
                text: 'Да',
                style: 'destructive',
                onPress: () => {
                    logout()
                    navigation.navigate('Home')
                }
            }
        ])
    }

    return (
        <MoreContainer>
            {!isAuth ? <>
                <ButtonCircle onPress={() => navigation.navigate('Login')}>
                    <MoreItem style={{borderBottomColor: dark ? '#EAEAEA': '#9B9B9B'}}>
                        <LoginSVG/>
                        <MoreItemText>Войти</MoreItemText>
                    </MoreItem>
                </ButtonCircle>
                <ButtonCircle onPress={() => navigation.navigate('Register')}>
                    <MoreItem style={{borderBottomColor: dark ? '#EAEAEA': '#9B9B9B'}}>
                        <RegisterSVG/>
                        <MoreItemText>Регистрация</MoreItemText>
                    </MoreItem>
                </ButtonCircle>
            </> : <>
                {user?.role === 'admin' && <>
                    <ButtonCircle onPress={() => navigation.navigate('Users')}>
                        <MoreItem style={{borderBottomColor: dark ? '#EAEAEA': '#9B9B9B'}}>
                            <UsersSVG/>
                            <MoreItemText>Пользователи</MoreItemText>
                        </MoreItem>
                    </ButtonCircle>
                    <ButtonCircle onPress={() => navigation.navigate('Products')}>
                        <MoreItem style={{borderBottomColor: dark ? '#EAEAEA': '#9B9B9B'}}>
                            <ProductsSVG/>
                            <MoreItemText>Товары</MoreItemText>
                        </MoreItem>
                    </ButtonCircle>
                    <ButtonCircle onPress={() => navigation.navigate('AllOrders')}>
                        <MoreItem style={{borderBottomColor: dark ? '#EAEAEA': '#9B9B9B'}}>
                            <OrdersSVG/>
                            <MoreItemText>Все заказы</MoreItemText>
                        </MoreItem>
                    </ButtonCircle>
                </>}
                <ButtonCircle onPress={() => navigation.navigate('Profile')}>
                    <MoreItem style={{borderBottomColor: dark ? '#EAEAEA': '#9B9B9B'}}>
                        <ProfileSVG/>
                        <MoreItemText>Профиль</MoreItemText>
                    </MoreItem>
                </ButtonCircle>
                <ButtonCircle onPress={logoutHandler}>
                    <MoreItem style={{borderBottomColor: dark ? '#EAEAEA' : '#9B9B9B'}}>
                        <LogoutSVG/>
                        <MoreItemText>Выйти</MoreItemText>
                    </MoreItem>
                </ButtonCircle>
            </>}
        </MoreContainer>
    );
};

export default MoreScreen;
