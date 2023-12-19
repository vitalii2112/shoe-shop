import React, {FC, useEffect} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import {NavigationContainer, NavigationProp, Theme} from "@react-navigation/native";
import {StatusBar, useColorScheme} from "react-native";
import NavBar from "./NavBar";
import CartScreen from "../screens/CartScreen";
import OrdersScreen from "../screens/OrdersScreen";
import Header from "./Header";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {useActions} from "../hooks/useActions";
import {getToken} from "../services/auth.helper";
import {CartService} from "../services/cart.service";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import MoreScreen from "../screens/MoreScreen";
import {useAppSelector} from "../hooks/useAppSelector";
import ProfileScreen from "../screens/ProfileScreen";
import AllOrdersScreen from "../screens/AllOrdersScreen";
import UsersScreen from "../screens/UsersScreen";
import UserScreen from "../screens/UserScreen";
import ProductScreen from "../screens/ProductScreen";
import ProductsScreen from "../screens/ProductsScreen";


export type RootStackParamList = {
    Home: undefined
    Cart: undefined
    Orders: undefined
    Login?: { callbackUrl: 'Cart' | 'User' }
    Register?: { callbackUrl: keyof RootStackParamList }
    More: undefined
    Profile: undefined
    AllOrders: undefined
    Product: { productId: number | null }
    Products: undefined
    Users: undefined
    User: { userId: number }
};
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>()

const Navigation: FC = () => {
    const colorScheme = useColorScheme();
    const theme: Theme = {
        dark: colorScheme === 'dark',
        colors: {
            primary: '#9dd558',
            background: colorScheme === "dark" ? Colors.dark : Colors.light,
            border: colorScheme === "dark" ? Colors.white : Colors.black,
            card: colorScheme === "dark" ? Colors.darker : Colors.lighter,
            text: colorScheme === "dark" ? Colors.white : Colors.black,
            notification: colorScheme === "dark" ? Colors.darker : Colors.lighter
        }
    }

    const {setCart, checkAuth} = useActions()

    const isPayed = useAppSelector(state => state.cart.isPayed)

    useEffect(() => {
        if (getToken())
            checkAuth()
        setCart(CartService.get())
    }, [checkAuth, setCart]);
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator screenOptions={{animation: 'none'}}>
                <Stack.Screen name="Home" component={HomeScreen} options={{header: () => <Header/>}}/>
                <Stack.Screen name="Cart" component={CartScreen}
                              options={{header: () => <Header backText={`Корзина${isPayed ? ' (Оплачено)' : ''}`}/>}}/>
                <Stack.Screen name="Orders" component={OrdersScreen}
                              options={{header: () => <Header backText="Ваши заказы"/>}}/>
                <Stack.Screen name="Login" component={LoginScreen}
                              options={{header: () => <Header backText="Авторизация"/>}}/>
                <Stack.Screen name="Register" component={RegisterScreen}
                              options={{header: () => <Header backText="Регистрация"/>}}/>
                <Stack.Screen name="More" component={MoreScreen} options={{header: () => <Header backText="Меню"/>}}/>
                <Stack.Screen name="Profile" component={ProfileScreen}
                              options={{header: () => <Header backText="Профиль"/>}}/>
                <Stack.Screen name="AllOrders" component={AllOrdersScreen}
                              options={{header: () => <Header backText="Все заказы"/>}}/>
                <Stack.Screen name="Users" component={UsersScreen}
                              options={{header: () => <Header backText="Пользователи"/>}}/>
                <Stack.Screen name="User" component={UserScreen} options={{
                    header: ({route}) => <Header backText={`Пользователь №${route.params?.userId}`}/>
                }}/>
                <Stack.Screen name="Product" component={ProductScreen}
                              options={{header: ({}) => <Header backText="Редактирование товара"/>}}/>
                <Stack.Screen name="Products" component={ProductsScreen}
                              options={{header: ({}) => <Header backText="Товары" addProduct/>}}/>
            </Stack.Navigator>
            <NavBar/>
            <StatusBar backgroundColor={theme.colors.background}
                       barStyle={theme.dark ? 'light-content' : 'dark-content'}/>
        </NavigationContainer>
    );
};

export default Navigation;
