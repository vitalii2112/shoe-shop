import {useMutation, useQuery} from "react-query";
import {toast} from "react-toastify";
import {useMemo} from "react";
import {UserService} from "@/services/user.service";
import {IUserUpdate} from "@/models/IUser";
import useUnauthorizedError from "@/hooks/useUnauthorizedError";

export const useUserProfile = (userId: number) => {
    const onAuthError = useUnauthorizedError()

    const queryData = useQuery('get user', () => UserService.getById(+userId), {
        onError: (err) => {
            const isExpired = onAuthError(err)
            if (!isExpired)
                toast.error('Возникла проблема при попытке загрузить пользователя')
        },
        retry: false,
    })

    const {mutateAsync: deleteAsync} = useMutation('delete user', () => UserService.delete(+userId),
        {
            onError: (err) => {
                const isExpired = onAuthError(err)
                if (!isExpired)
                    toast.error('Возникла проблема при попытке удалить пользователя')
            },
            onSuccess: () => {
                toast.success('Пользователь был удален')
            },
        })

    const {mutateAsync: updateAsync} = useMutation('update user', (data: IUserUpdate) => UserService.update({
            userId: +userId,
            data
        }),
        {
            onError: (err) => {
                const isExpired = onAuthError(err)
                if (!isExpired)
                    toast.error('Возникла проблема при попытке обновить пользователя')
            },
            onSuccess: async () => {
                toast.success('Пользователь был обновлен')
                await queryData.refetch()
            },
        })

    return useMemo(() => ({
        ...queryData, deleteAsync, updateAsync
    }), [queryData, deleteAsync, updateAsync])
}
