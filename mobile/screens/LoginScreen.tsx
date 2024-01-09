import {FC, useEffect} from 'react';
import styled from "styled-components/native";
import StyledButton from "../components/StyledButton";
import FormBlock from "../components/FormBlock";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import isEmail from 'validator/es/lib/isEmail'
import {useActions} from "../hooks/useActions";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../components/Navigation";
import {IUserLogin} from "../models/IUser";
import {useAppSelector} from "../hooks/useAppSelector";
import {EStatus} from "../store/user/types";
import Loading from "../components/Loading";

interface Props extends NativeStackScreenProps<RootStackParamList, 'Login'> {
}

const FormContainer = styled.ScrollView`
    padding: 15px;
`

const RegisterButton = styled.Text`
    margin-top: 20px;
    color: #0096FF;
    font-size: 16px;
    text-align: center;
    margin-bottom: 35px;
`


const LoginScreen: FC<Props> = ({navigation, route}) => {
    const {isAuth, status} = useAppSelector(state => state.user)
    const {control, handleSubmit, formState: {errors}} = useForm<IUserLogin>()
    const {login} = useActions()
    const onSubmit: SubmitHandler<IUserLogin> = login

    useEffect(() => {
        if (isAuth && status === EStatus.SUCCESS)
            navigation.navigate(route.params?.callbackUrl === 'User' ? 'Home' : route.params?.callbackUrl || 'Home')
    }, [isAuth, status])

    return (
        <>
            {status === EStatus.LOADING && <Loading overlay/>}
            <FormContainer contentContainerStyle={{alignItems: 'center', justifyContent: 'center', flex: 1}} testID="screen-login">
                <Controller name="email" control={control} rules={{
                    required: "Обязательное поле",
                    validate: value => isEmail(value) ? true : 'Неверный формат почты'
                }}
                            render={({field}) =>
                                <FormBlock placeholder="example@email.com" label="Email" type="email"
                                           value={field.value} setValue={field.onChange} autoComplete="email"
                                           errorMessage={errors.email?.message}/>}/>
                <Controller name="password" control={control} rules={{
                    required: "Обязательное поле",
                    minLength: {message: 'Минимальная длина 6 символов', value: 6}
                }}
                            render={({field}) =>
                                <FormBlock placeholder="password123" label="Пароль" type="text"
                                           autoComplete="current-password"
                                           value={field.value} setValue={field.onChange}
                                           errorMessage={errors.password?.message}/>}/>
                <StyledButton text="Войти" disabled={Object.keys(errors).length > 0} isFull isSmall
                              onPress={handleSubmit(onSubmit)}/>

                <RegisterButton
                    onPress={() => navigation.navigate('Register', {callbackUrl: route.params?.callbackUrl || 'Home'})}>Регистрация</RegisterButton>
            </FormContainer>
        </>
    );
};

export default LoginScreen;
