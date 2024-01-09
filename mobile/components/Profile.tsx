import {FC, useEffect} from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import FormBlock from "./FormBlock";
import StyledButton from "./StyledButton";
import {Alert, ScrollView, View} from "react-native";
import {IUser, IUserUpdate} from "../models/IUser";
import Loading from "./Loading";
import {IOrder} from "../models/IOrder";
import OrderList from "./OrderList";
import {useAppSelector} from "../hooks/useAppSelector";
import {useTheme} from "@react-navigation/native";

type Props = {
    onDelete?: () => void
    onSubmit: SubmitHandler<IUserUpdate>
    user?: IUser
    isLoading: boolean
    orders?: IOrder[]
}

const Profile: FC<Props> = ({user, orders, onSubmit, onDelete, isLoading}) => {
    const {control, handleSubmit, setValue, formState: {errors}} = useForm<IUserUpdate>({defaultValues: user})
    const {colors} = useTheme()

    const currentUser = useAppSelector(state => state.user.user)
    const isRoleEdited = currentUser?.role === 'admin' && user?.id !== currentUser.id

    const deleteHandler = () => {
        Alert.alert('Вы уверены?', `Вы уверены, что хотите удалить пользователя №${user?.id}?`, [
            {
                style: 'cancel',
                text: 'Нет',
                isPreferred: true
            },
            {
                style: 'destructive',
                text: 'Да',
                onPress: onDelete
            }
        ])
    }

    const submitHandler = (data: IUserUpdate) => {
        if (user?.role !== data.role && data.role === 'admin')
            Alert.alert('Вы уверены?', 'Вы уверены, что хотите назначить пользователя администратором?', [
                {
                    style: 'cancel',
                    text: 'Нет',
                    isPreferred: true,
                    onPress: () => setValue('role', 'user')
                },
                {
                    text: 'Да',
                    onPress: () => onSubmit(data)
                }
            ])
        else
            onSubmit(data)
    }

    useEffect(() => {
        if (user) {
            setValue('first_name', user.first_name)
            setValue('last_name', user.last_name)
            setValue('email', user.email)
            setValue('role', user.role)
        }
    }, [user, setValue]);

    return (
        <>
            {isLoading && <Loading overlay/>}
            <ScrollView testID="profile-screen">
                <View style={{padding: 15, paddingBottom: 0}}>
                    <Controller name="first_name" control={control} rules={{
                        required: "Обязательное поле",
                        minLength: {message: 'Минимальная длина 3 символа', value: 3}
                    }}
                                render={({field}) =>
                                    <FormBlock placeholder="Введите имя" label="Имя" type="text"
                                               autoComplete="name"
                                               value={field.value} setValue={field.onChange}
                                               errorMessage={errors.first_name?.message}/>}/>
                    <Controller name="last_name" control={control} rules={{
                        required: "Обязательное поле",
                        minLength: {message: 'Минимальная длина 6 символа', value: 3}
                    }}
                                render={({field}) =>
                                    <FormBlock placeholder="Введите фамилию" label="Фамилия" type="text"
                                               autoComplete="name-family"
                                               value={field.value} setValue={field.onChange}
                                               errorMessage={errors.last_name?.message}/>}/>
                    <Controller name="email" control={control} rules={{
                        required: "Обязательное поле",
                        minLength: {message: 'Минимальная длина 6 символа', value: 3}
                    }}
                                render={({field}) =>
                                    <FormBlock placeholder="example@example.com" label="Email" type="email"
                                               autoComplete="name-family"
                                               value={field.value} setValue={field.onChange}
                                               errorMessage={errors.email?.message}/>}/>

                    {(onDelete && isRoleEdited) && <>
                        <Controller name="role" control={control}
                                    render={({field}) =>
                                        <FormBlock placeholder="Выберите роль" label="Роль" type="select"
                                                   options={[
                                                       {label: 'Пользователь', value: 'user', color: colors.text},
                                                       {label: 'Админ', value: 'admin', color: colors.text},
                                                   ]}
                                                   autoComplete="name-family"
                                                   value={field.value} setValue={field.onChange}
                                                   errorMessage={errors.email?.message}/>}/>
                        <StyledButton onPress={deleteHandler} text="Удалить" type="delete" isFull isSmall
                                      marginBottom={20}/>
                    </>}
                    <StyledButton onPress={handleSubmit(submitHandler)} text="Сохранить" isFull isSmall
                                  marginBottom={35}/>
                </View>
                <OrderList orders={orders || []} noList/>
            </ScrollView>
        </>
    );
};

export default Profile;
