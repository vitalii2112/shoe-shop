import {FC, useEffect, useState} from 'react';
import styles from './Header.module.scss';
import {Link} from "react-router-dom";
import AuthModal from "@/components/AuthModal";
import {useLocation, useNavigate} from "react-router";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import HeaderLinks from "@/components/Header/HeaderLinks";
import Burger from "@/components/Burger";
import {useAppSelector} from "@/hooks/useAppSelector";
import {ReactComponent as CartSVG} from "@/assets/svg/cart.svg";
import {useActions} from "@/hooks/useActions";

const Header: FC = () => {
    const [isAuthOpen, setIsAuthOpen] = useState(false)

    const cart = useAppSelector(state => state.cart.items)
    const {setCartOpen} = useActions()

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const isTablet = useMediaQuery('(max-width: 800px)')
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.isAuthOpen) {
            navigate({...location}, {state: null});
            setIsAuthOpen(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state]);
    return (
        <header className={styles.header}>
            <Link to="/">
                <div className={styles.logo}>
                    <img src="/img/logo.png" alt="logo" height={40}/>
                    <div className={styles.logoText}>
                        <h3>Shoe store</h3>
                        <p>Лучшие кроссовки в одном месте</p>
                    </div>
                </div>
            </Link>
            <ul className={styles.headerLinks}>
                <li onClick={() => setCartOpen(true)} title="Корзина">
                    <CartSVG/>
                    <span>{totalPrice.toFixed(2)} грн.</span>
                </li>
                {isTablet
                    ? <Burger setIsAuthOpen={setIsAuthOpen}/>
                    : <HeaderLinks setIsAuthOpen={setIsAuthOpen}/>}
            </ul>
            {isAuthOpen && <AuthModal open={isAuthOpen} onClose={() => setIsAuthOpen(false)}/>}
        </header>
    );
};

export default Header;
