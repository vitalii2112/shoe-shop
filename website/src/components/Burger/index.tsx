import {FC, useEffect, useState} from 'react';
import styles from './Burger.module.scss';
import Mover from "@/components/Mover";
import {ReactComponent as BurgerSVG} from "@/assets/svg/burger.svg";
import {ReactComponent as LoginSVG} from "@/assets/svg/login.svg";
import {ReactComponent as OrderSVG} from "@/assets/svg/order.svg";
import {ReactComponent as LogoutSVG} from "@/assets/svg/logout.svg";
import {ReactComponent as UsersSVG} from "@/assets/svg/users.svg";
import {ReactComponent as UserSVG} from "@/assets/svg/user.svg";
import {ReactComponent as ProductsSVG} from "@/assets/svg/products.svg";
import {ReactComponent as HomeSVG} from "@/assets/svg/home.svg";
import {useAppSelector} from "@/hooks/useAppSelector";
import {TBurgerProps} from "./types";
import {Link} from "react-router-dom";
import {useActions} from "@/hooks/useActions";
import {useLocation, useNavigate} from "react-router";
import confirmation from "@/components/Confirm";

const Burger: FC<TBurgerProps> = ({setIsAuthOpen}) => {
    const [isOpened, setIsOpened] = useState(false)

    const {isAuth, user} = useAppSelector(state => state.user)

    const {logout} = useActions()

    const navigate = useNavigate();
    const location = useLocation()

    const logoutHandler = async () => {
        const answer = await confirmation('Вы действительно хотите выйти из аккаунта?', 'Выход', {okLabel: 'Да, выйти из аккаунта'})
        if (answer) {
            navigate('/')
            setIsAuthOpen(false)
            setIsOpened(false)
            logout()
        }
    }

    useEffect(() => {
        setIsOpened(false)
    }, [location]);

    return (
        <>
            {isAuth
                ? <li onClick={() => setIsOpened(true)}>
                    <BurgerSVG/>
                </li>
                : <li onClick={() => setIsAuthOpen(true)}>
                    <LoginSVG/>
                </li>}

            <Mover onClose={() => setIsOpened(false)} isOpened={isOpened} className={styles.burger} title="Навигация">
                <ul className={styles.nav}>
                    {isAuth && <>
                        {user?.role === 'admin' && <>
                            <li>
                                <Link to="/">
                                    <HomeSVG/>
                                    <span>Главная</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/users">
                                    <UsersSVG/>
                                    <span>Пользователи</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/items">
                                    <ProductsSVG/>
                                    <span>Товары</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/orders">
                                    <OrderSVG/>
                                    <span>Все заказы</span>
                                </Link>
                            </li>
                        </>}
                        <li>
                            <Link to="/profile">
                                <UserSVG/>
                                <span>Профиль</span>
                            </Link>
                        </li>
                        <li onClick={logoutHandler}>
                            <LogoutSVG/>
                            <span>Выйти из аккаунта</span>
                        </li>
                    </>}
                </ul>
            </Mover>
        </>
    );
};

export default Burger;
