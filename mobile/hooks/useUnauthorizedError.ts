import {useActions} from "./useActions";
import {useCallback} from "react";
import Toast from "react-native-toast-message";
import {useNavigation} from "@react-navigation/native";
import {StackNavigation} from "../components/Navigation";

const useUnauthorizedError = () => {
    const {logout} = useActions()
    const navigation = useNavigation<StackNavigation>()

    return useCallback((error: any) => {
        if (error.response?.status === 401 && ['Signature has expired', 'revoked token'].includes(error.response?.data)) {
            logout(true)
            navigation.navigate('Login')
            Toast.show({
                type:'error',
                text1: 'Авторизация',
                text2: 'Время авторизации закончилось, пожалуйста, войдите снова'
            })
            return true;
        }
        return false;
    }, [logout, navigation]);
};


export default useUnauthorizedError;
