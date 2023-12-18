import {FC} from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import isEmail from "validator/es/lib/isEmail";
import FormBlock from "../components/FormBlock";
import StyledButton from "../components/StyledButton";
import styled from "styled-components/native";
import {useActions} from "../hooks/useActions";
import {IUserRegister} from "../models/IUser";

const FormContainer = styled.ScrollView`
    flex: 1;
    padding: 15px;
`

const RegisterScreen: FC = () => {
    const {control, handleSubmit, formState: {errors}} = useForm<IUserRegister>()
    const {register} = useActions()

    const onSubmit: SubmitHandler<IUserRegister> = register

    return (
        <FormContainer>
            <Controller name="first_name" control={control} rules={{
                required: "Обязательное поле",
                minLength: {value: 2, message: 'Минимальная длина 2 символа'},
                maxLength: {value: 50, message: 'Максимальная длина 50 символов'}
            }}
                        render={({field}) =>
                            <FormBlock placeholder="Павел" label="Имя" type="text"
                                       value={field.value} setValue={field.onChange} autoComplete="name"
                                       errorMessage={errors.first_name?.message}/>}/>
            <Controller name="last_name" control={control} rules={{
                required: "Обязательное поле",
                minLength: {value: 2, message: 'Минимальная длина 2 символа'},
                maxLength: {value: 50, message: 'Максимальная длина 50 символов'}
            }}
                        render={({field}) =>
                            <FormBlock placeholder="Павел" label="Фамилия" type="text"
                                       value={field.value} setValue={field.onChange} autoComplete="name-family"
                                       errorMessage={errors.last_name?.message}/>}/>
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
                                       autoComplete="new-password"
                                       value={field.value} setValue={field.onChange}
                                       errorMessage={errors.email?.message}/>}/>
            <StyledButton text="Зарегистрироваться" disabled={Object.keys(errors).length > 0} isFull isSmall
                          onPress={handleSubmit(onSubmit)} marginBottom={35}/>
        </FormContainer>
    );
};

export default RegisterScreen;
