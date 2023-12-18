import {FC} from 'react';
import styles from './Header.module.scss';
import {Link} from "react-router-dom";
import {ReactComponent as OrderSVG} from "@/assets/svg/order.svg";
import {ReactComponent as LoginSVG} from "@/assets/svg/login.svg";
import {ReactComponent as LogoutSVG} from "@/assets/svg/logout.svg";
import {ReactComponent as UsersSVG} from "@/assets/svg/users.svg";
import {ReactComponent as UserSVG} from "@/assets/svg/user.svg";
import {ReactComponent as ProductsSVG} from "@/assets/svg/products.svg";
import {useAppSelector} from "@/hooks/useAppSelector";
import confirmation from "@/components/Confirm";
import {useActions} from "@/hooks/useActions";
import {useNavigate} from "react-router";

type THeaderLinks = {
    setIsAuthOpen: (isAuthOpen: boolean) => void
}
const HeaderLinks: FC<THeaderLinks> = ({setIsAuthOpen}) => {
    const {user, isAuth} = useAppSelector(state => state.user)

    const {logout} = useActions()

    const navigate = useNavigate();

    const logoutHandler = async () => {
        const answer = await confirmation('Вы действительно хотите выйти из аккаунта?', 'Выход', {okLabel: 'Да, выйти из аккаунта'})
        if (answer) {
            navigate('/')
            setIsAuthOpen(false)
            logout()
        }
    }
    return (
        <>
            {isAuth ? <>
                {user?.role === 'admin' && <>
                    <li title="Пользователи">
                        <Link to="/users">
                            <UsersSVG className={styles.strokeSVG}/>
                        </Link>
                    </li>
                    <li title="Товары">
                        <Link to="/items">
                            <ProductsSVG/>
                        </Link>
                    </li>
                    <li>
                        <Link to="/orders" title="Все заказы">
                            <OrderSVG className={styles.strokeSVG}/>
                        </Link>
                    </li>
                </>}
                <li>
                    <Link to="/profile" title="Профиль">
                        <UserSVG/>
                    </Link>
                </li>
                <li onClick={logoutHandler} title="Выйти из аккаунта">
                    <LogoutSVG className={styles.otherSVG}/>
                </li>
            </> : <li onClick={() => setIsAuthOpen(true)} title="Авторизация/Регистрация">
                <LoginSVG className={styles.otherSVG}/>
            </li>}
        </>
    );
};

export default HeaderLinks;
