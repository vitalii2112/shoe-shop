import {useActions} from "@/hooks/useActions";
import {useCallback} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";

const useUnauthorizedError = () => {
    const {logout} = useActions()
    const navigate = useNavigate()

    return useCallback((error: any) => {
        if (error.response?.status === 401 && ['Signature has expired', 'revoked token'].includes(error.response?.data)) {
            logout(true)
            navigate('/')
            toast.error('Время авторизации закончилось, пожалуйста, войдите снова')
            return true;
        }
        return false;
    }, [logout, navigate]);
};


export default useUnauthorizedError;
