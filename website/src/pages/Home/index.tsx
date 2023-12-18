import {useAppSelector} from "@/hooks/useAppSelector";
import {useActions} from "@/hooks/useActions";
import {IProduct} from "@/models/IProduct";
import {ICartItem} from "@/store/cart/types";
import {CartService} from "@/services/cart.service";
import ProductList from "@/components/ProductList";
import {useProducts} from "@/components/ProductList/useProducts";
import SearchField from "@/components/SearchFiled";
import {useLocation, useNavigate} from "react-router";
import cn from "classnames";
import styles from './Home.module.scss'

function Home() {
    const cart = useAppSelector(state => state.cart.items)


    const {addToCart} = useActions()

    const navigate = useNavigate()
    const {search} = useLocation()
    const searchParam = new URLSearchParams(search).get('search')

    const {data, searchAsync, isLoading} = useProducts(search)
    const isAddToCart = (id: number): boolean => {
        return cart.some(item => item.id === id)
    }

    const addCartHandler = (item: IProduct) => (quantity: number) => {
        const cartItem: ICartItem = {...item, quantity}
        addToCart(cartItem)
        CartService.add(cartItem)
    }

    const onSearch = async (searchValue: string) => {
        let queryString = ''
        if (searchValue) {
            const urlSearchParams = new URLSearchParams()
            urlSearchParams.append('search', searchValue)
            queryString = `?${urlSearchParams.toString()}`
        }
        navigate(queryString)
        await searchAsync()
    }

    return (
        <div className={cn(styles.home, "layout")}>
            <div className={styles.header}>
                <h1>{searchParam ? `Результаты поиска: ${searchParam}` : 'Все кроссовки'}</h1>
                <SearchField initValue={searchParam || ''} onSearch={onSearch} className={styles.search}
                             placeholder="Поиск..."/>
            </div>
            <ProductList products={!isLoading ? data || [] : [...Array(12)]} onAdd={addCartHandler}
                         isAddToCart={isAddToCart}/>
        </div>
    )
}

export default Home
