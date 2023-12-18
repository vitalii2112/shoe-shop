import {FC, useEffect, useState} from 'react';
import styles from './UserProfile.module.scss';
import {TUserProfileProps} from "@/components/UserProfile/types";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IUserUpdate} from "@/models/IUser";
import FormInput from "@/components/FormInput";
import {useAppSelector} from "@/hooks/useAppSelector";
import cn from "classnames";
import {IOrder} from "@/models/IOrder";
import {OrderService} from "@/services/order.service";
import {toast} from "react-toastify";
import OrderItem from "@/pages/Orders/components/OrderItem";
import {Link} from "react-router-dom";
import useUnauthorizedError from "@/hooks/useUnauthorizedError";
import confirmation from "@/components/Confirm";

const UserProfile: FC<TUserProfileProps> = ({user, onUpdate, onDelete}) => {
    const currentUser = useAppSelector(state => state.user.user)
    const {handleSubmit, control, setValue, formState: {errors}} = useForm<IUserUpdate>()
    const [orders, setOrders] = useState<IOrder[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const isRoleEdited = currentUser?.role === 'admin' && user.id !== currentUser.id
    const onSubmit: SubmitHandler<IUserUpdate> = onUpdate

    const onAuthError = useUnauthorizedError()

    const deleteHandler = async () => {
        if (onDelete) {
            const confirm = await confirmation(`Вы действительно хотите удалить позователя ${user?.first_name} ${user?.last_name}?`, 'Удаление', {okLabel: 'Да, удалить'})
            if (confirm)
                onDelete()
        }
    }

    useEffect(() => {
        setIsLoading(true)
        OrderService.getAllUser(user.id)
            .then(data => setOrders(data))
            .catch((err) => {
                const isExpired = onAuthError(err)
                if (!isExpired)
                    toast.error('Возникла проблема при попытке загрузить заказы')
            })
            .finally(() => setIsLoading(false))

        setValue('first_name', user.first_name)
        setValue('last_name', user.last_name)
        setValue('email', user.email)
        setValue('role', user.role)

    }, [user, setValue, onAuthError]);

    return (
        <div className={styles.userProfile}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.userForm}>
                <div className={styles.formBlock}>
                    <Controller name="first_name" control={control} defaultValue={user.first_name}
                                rules={{
                                    required: 'Обязательное поле',
                                    minLength: {value: 2, message: 'Минимальная длина 2 символа'},
                                    maxLength: {value: 50, message: 'Максимальная длина 50 символов'},
                                }}
                                render={({field}) =>
                                    <FormInput value={field.value} setValue={field.onChange} label="Имя" type="text"
                                               placeholder="Введите имя"
                                               errorMessage={errors.first_name?.message} required/>}/>
                    <Controller name="last_name" control={control} defaultValue={user.last_name}
                                rules={{
                                    required: 'Обязательное поле',
                                    minLength: {value: 2, message: 'Минимальная длина 2 символа'},
                                    maxLength: {value: 50, message: 'Максимальная длина 50 символов'},
                                }}
                                render={({field}) =>
                                    <FormInput value={field.value} setValue={field.onChange} label="Фамилия" type="text"
                                               placeholder="Введите фамилию"
                                               errorMessage={errors.last_name?.message} required/>}/>
                </div>
                <div className={cn(styles.formBlock, {[styles.fill]: !isRoleEdited})}>
                    <Controller name="email" control={control} defaultValue={user.email}
                                rules={{required: 'Обязательное поле'}}
                                render={({field}) =>
                                    <FormInput value={field.value} setValue={field.onChange} label="Email" type="text"
                                               placeholder="Введите email"
                                               errorMessage={errors.email?.message} required/>}/>
                    {isRoleEdited &&
                        <Controller name="role" control={control} defaultValue={user.role}
                                    render={({field}) =>
                                        <FormInput value={field.value} setValue={field.onChange}
                                                   label="Роль" type="select"
                                                   placeholder="Выберите роль"
                                                   options={['admin', 'user']}
                                                   errorMessage={errors.role?.message}/>}/>}
                </div>
                <div className="btn__wrapper">
                    {onDelete && isRoleEdited && <button className="btn-common cancel" type="button"
                                                         onClick={deleteHandler}>Удалить</button>}
                    <button className="btn-common">Сохранить</button>
                </div>
            </form>
            <h3 className={styles.orderTitle}>{user.id !== currentUser?.id ? 'Заказы' : 'Ваши заказы'}</h3>
            {!isLoading && !orders.length && (!onDelete
                ? <div className={styles.userOrders}>
                    <img src="/img/empty-order.png" alt="Empty orders"/>
                    <p>У вас пока нет оформленных заказов</p>
                    <Link to="/" className="btn">Сделать заказ</Link>
                </div>
                : <h3 className={styles.emptyOrders}>Список заказов пуст</h3>)}
            {orders.map(order => <OrderItem key={order.id} items={order.items} id={order.id} amount={order.amount}
                                            isLoading={isLoading}/>)}
        </div>
    );
};

export default UserProfile;
