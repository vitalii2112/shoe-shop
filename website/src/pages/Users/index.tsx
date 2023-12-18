import {FC, useEffect, useState} from 'react';
import styles from './Users.module.scss';
import cn from "classnames";
import Table from "@/components/Table";
import useSortField from "@/hooks/useSortField";
import {IUser} from "@/models/IUser";
import {ReactComponent as CheckedSVG} from "@/assets/svg/checkbox-checked.svg";
import {ReactComponent as UncheckedSVG} from "@/assets/svg/checkbox-unchecked.svg";
import {Link} from "react-router-dom";
import {UserService} from "@/services/user.service";
import {toast} from "react-toastify";
import Loading from "@/components/Loading";
import useUnauthorizedError from "@/hooks/useUnauthorizedError";

const Users: FC = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [sortField, setSortField] = useState<keyof IUser>()
    const sortHandler = useSortField<IUser>();
    const sortedUsers = sortHandler(users || [], sortField);

    const onAuthError = useUnauthorizedError()

    useEffect(() => {
        setIsLoading(true)
        UserService.getAll()
            .then(data => setUsers(data))
            .catch((err) => {
                const isExpired = onAuthError(err)
                if (!isExpired)
                    toast.error('Возникла проблема при попытке загрузить пользователей')
            })
            .finally(() => setIsLoading(false))
    }, [onAuthError]);
    return (
        <div className={cn(styles.users, "layout")}>
            <h1>Пользователи</h1>
            {isLoading && <Loading/>}
            <Table cb={(field) => setSortField(field)} className={styles.table}
                   headers={[{name: 'ID', field: 'id'}, {name: 'Имя', field: 'first_name'}, {
                       name: 'Фамилия',
                       field: 'last_name'
                   }, {name: 'Email', field: 'email'}, 'Админ']}>
                {sortedUsers.map(user => <Link to={`${user.id}`} key={user.id}>
                    <div>{user.id}</div>
                    <div>{user.first_name}</div>
                    <div>{user.last_name}</div>
                    <div>{user.email}</div>
                    <div className={styles.align}>{user.role === 'user' ? <UncheckedSVG/> : <CheckedSVG/>}</div>
                </Link>)}
            </Table>
        </div>
    );
};

export default Users;
