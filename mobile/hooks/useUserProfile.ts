import useUnauthorizedError from "./useUnauthorizedError";
import {useMutation, useQuery} from "@tanstack/react-query";
import {UserService} from "../services/user.service";
import Toast from "react-native-toast-message";
import {IUserUpdate} from "../models/IUser";
import {useMemo} from "react";

export const useUserProfile = (userId: number) => {
    const onAuthError = useUnauthorizedError()

    const queryData = useQuery({
        queryKey: ['get user'],
        queryFn: () => UserService.getById(+userId),
        throwOnError: (err) => {
            const isExpired = onAuthError(err)
            if (!isExpired)
                Toast.show({
                    type: 'error',
                    text1: 'Загрузка пользователя',
                    text2: 'Возникла проблема'
                })
            return false
        },
        retry: false,
    })

    const {mutateAsync: deleteAsync} = useMutation({
        mutationKey: ['delete user'],
        mutationFn: () => UserService.delete(+userId),
        onError: (err) => {
            const isExpired = onAuthError(err)
            if (!isExpired)
                Toast.show({
                    type: 'error',
                    text1: 'Удаление пользователя',
                    text2: 'Возникла проблема'
                })
        },
        onSuccess: () => {
            Toast.show({
                text1: 'Удаление пользователя',
                text2: 'Успешно'
            })
        },
    })

    const {mutateAsync: updateAsync} = useMutation({
        mutationKey: ['update user'],
        mutationFn: (data: IUserUpdate) => UserService.update({
            userId: +userId,
            data
        }),
        onError: (err) => {
            const isExpired = onAuthError(err)
            if (!isExpired)
                Toast.show({
                    type: 'error',
                    text1: 'Обновление пользователя',
                    text2: 'Возникла проблема'
                })
        },
        onSuccess: async () => {
            Toast.show({
                text1: 'Обновление пользователя',
                text2: 'Успешно'
            })
            await queryData.refetch()
        },
    })

    return useMemo(() => ({
        ...queryData, deleteAsync, updateAsync
    }), [queryData, deleteAsync, updateAsync])
}
