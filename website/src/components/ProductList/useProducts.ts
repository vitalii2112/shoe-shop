import {useMutation, useQuery} from "react-query";
import {ItemsService} from "@/services/items.service";
import {useMemo} from "react";
import {toast} from "react-toastify";
import {IProductCreate} from "@/models/IProduct";
import useUnauthorizedError from "@/hooks/useUnauthorizedError";

export const useProducts = (queryString?: string) => {
    const onAuthError = useUnauthorizedError()
    const queryData = useQuery(['products list'], () => ItemsService.getAll(queryString), {
        onError: () => {
            toast.error('Возникла проблема при попытке загрузить товары')
        },
    })

    const {mutateAsync: deleteAsync} = useMutation('delete product', (itemId: number) => ItemsService.delete(itemId),
        {
            onError: (error) => {
                const isExpired = onAuthError(error)
                if (!isExpired)
                    toast.error('Возникла проблема при попытке удалить товар')
            },
            onSuccess: async () => {
                toast.success('Товар был удален')
                await queryData.refetch()
            },
        })

    const {mutateAsync: createAsync} = useMutation('create product', (data: IProductCreate) => ItemsService.create(data),
        {
            onError: (error) => {
                const isExpired = onAuthError(error)
                if (!isExpired)
                    toast.error('Возникла проблема при попытке добавить товар')
            },
            onSuccess: async () => {
                toast.success('Товар был добавлен')
                await queryData.refetch()
            },
        })

    const {mutateAsync: updateAsync} = useMutation('update product', (data: {
            id: number,
            data: IProductCreate
        }) => ItemsService.update(data),
        {
            onError: (error) => {
                const isExpired = onAuthError(error)
                if (!isExpired)
                    toast.error('Возникла проблема при попытке обновить товар')
            },
            onSuccess: async () => {
                toast.success('Товар был обновлен')
                await queryData.refetch()
            },
        })

    const {mutateAsync: searchAsync} = useMutation('search products', () => queryData.refetch())

    return useMemo(() => ({
        ...queryData, deleteAsync, createAsync, updateAsync, searchAsync
    }), [queryData, deleteAsync, createAsync, updateAsync, searchAsync])
}
