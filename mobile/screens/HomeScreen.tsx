import {FC, useCallback, useEffect, useState} from 'react';
import {FlatList} from "react-native";
import Title from "../components/Title";
import Container from "../components/Container";
import Card from "../components/Card";
import Loading from "../components/Loading";
import {CartService} from "../services/cart.service";
import {ICartItem} from "../store/cart/types";
import {useActions} from "../hooks/useActions";
import {useAppSelector} from "../hooks/useAppSelector";
import {ItemsService} from "../services/items.service";
import Toast from "react-native-toast-message";
import {IProduct} from "../models/IProduct";

const HomeScreen: FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState<IProduct[]>([])
    const {addToCart} = useActions()
    const cart = useAppSelector(state => state.cart.items)

    const loadProducts = useCallback(() => {
        setIsLoading(true)
        ItemsService.getAll().then(res => {
            if (res) {
                setProducts(res)
            }
        }).catch((e) => {
            console.log(e)
            Toast.show({
                type: 'error',
                text1: 'Загрузка товаров',
                text2: 'Возникла проблема'
            })
        }).finally(() => setIsLoading(false))
    }, [])

    const addCartHandler = (item: ICartItem) => {
        addToCart(item)
        CartService.add(item)
    }

    useEffect(() => {
        loadProducts()
    }, []);

    const renderItem = useCallback(({item, index}: {item: IProduct, index: number}) => <Card buttonText="В корзину" {...item}
                                                            disabledText={cart.find(cartItem => cartItem.id === item.id) ? 'Добавлено' : ''}
                                                            cartHandler={addCartHandler} isLastChild={index % 2 !== 0}
                                                            isLastRow={index >= (products?.length || 0) - ((products?.length || 0) % 2 === 0 ? 2 : 1)}/>, [products, cart])

    if (isLoading)
        return <Loading/>

    return (
        <Container>
            <Title text="Все кроссовки"/>
            <FlatList data={products} numColumns={2} removeClippedSubviews testID="home-screen"
                      refreshing={isLoading} onRefresh={() => loadProducts()}
                      renderItem={renderItem}
                      contentContainerStyle={{gap: 15}}
            />
        </Container>
    );
};

export default HomeScreen;
