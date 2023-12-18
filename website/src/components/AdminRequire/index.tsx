import {EStatus} from "@/store/user/types";
import {Navigate, Outlet} from "react-router";
import Loading from "@/components/Loading";
import {toast} from "react-toastify";
import {useAppSelector} from "@/hooks/useAppSelector";
import {FC} from "react";

const AdminRequire: FC = () => {
    const {isAuth, status, user} = useAppSelector(state => state.user);
    if (user?.role === 'admin' && status === EStatus.SUCCESS)
        return <Outlet/>;
    else if (status === EStatus.IDLE) {
        return <></>;
    } else if (status === EStatus.LOADING)
        return <Loading/>;
    else {
        toast.error('Ошибка доступа');
        return <Navigate to="/" replace state={{isOpenAuth: !isAuth}}/>;
    }
};

export default AdminRequire;
