import {useAppSelector} from "@/hooks/useAppSelector";
import Loading from "@/components/Loading";
import {Navigate, Outlet} from "react-router";
import {toast} from "react-toastify";
import {EStatus} from "@/store/user/types";

const AuthRequire = () => {
    const {isAuth, status} = useAppSelector((state) => state.user);

    switch (status) {
        case EStatus.SUCCESS:
            if (isAuth)
                return <Outlet/>;
            break;
        case EStatus.IDLE:
            return null;
        case EStatus.LOADING:
            return <Loading/>;
        default:
            toast.error('Ошибка доступа. Пройдите авторизацию');
            return <Navigate to="/" replace state={{isAuthOpen: true}}/>;
    }

    return null;
};

export default AuthRequire;
