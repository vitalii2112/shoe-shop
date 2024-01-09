import {FC, useCallback, useState} from 'react';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../components/Navigation";
import {FlatList} from "react-native";
import Card from "../components/Card";
import {ICartItem} from "../store/cart/types";
import {IProduct} from "../models/IProduct";
import {ItemsService} from "../services/items.service";
import Toast from "react-native-toast-message";
import {useFocusEffect} from "@react-navigation/native";

interface Props extends NativeStackScreenProps<RootStackParamList, 'Products'> {
}

const ProductsScreen: FC<Props> = ({navigation}) => {
    // const {isLoading, refetch, data} = useProducts()
    const [products, setProducts] = useState<IProduct[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const productHandler = (item: ICartItem) => {
        navigation.navigate('Product', {productId: item.id})
    }

    const loadProducts = useCallback(() => {
        setIsLoading(true)
        ItemsService.getAll().then(res => {
            if (res) {
                setProducts(res)
            }
        }).catch(() => {
            Toast.show({
                type: 'error',
                text1: 'Загрузка товаров',
                text2: 'Возникла проблема'
            })
        }).finally(() => setIsLoading(false))
    }, [])

    useFocusEffect(loadProducts)

    const renderItem = useCallback(({item, index}: {item: IProduct, index: number}) => <Card buttonText="Редактировать" {...item}
                                                            cartHandler={productHandler}
                                                            isLastChild={index % 2 !== 0}
                                                            isLastRow={index >= (products.length || 0) - ((products.length || 0) % 2 === 0 ? 2 : 1)}/>, [products.length])
    return (
        <FlatList data={products} numColumns={2} removeClippedSubviews testID="products-screen"
                  refreshing={isLoading} onRefresh={() => loadProducts()}
                  renderItem={renderItem}
                  contentContainerStyle={{gap: 15}}
        />
    );
};

export default ProductsScreen;
