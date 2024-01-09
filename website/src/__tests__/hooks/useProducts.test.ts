import {beforeEach, describe, expect, jest, test} from "@jest/globals";
import {ItemsService} from "@/services/items.service";
import {useProducts} from "@/components/ProductList/useProducts";
import {waitFor} from "@testing-library/dom";
import {renderHookWithProviders} from "@/utils/test-utils";
import {act} from "@testing-library/react";
import {toast} from "react-toastify";

jest.mock("@/services/items.service")

const mockItemService = ItemsService as jest.Mocked<typeof ItemsService>

const items = [
    {id: 1, name: 'name', img: 'img', description: 'desc', price: 10},
    {id: 2, name: 'name2', img: 'img2', description: 'desc2', price: 102},
    {id: 3, name: 'name3', img: 'img3', description: 'desc3', price: 103}
]

beforeEach(() => {
    mockItemService.getAll.mockResolvedValue(items)
})

describe('useProducts', () => {
    test('should return products list', async () => {
        const {result} = renderHookWithProviders(() => useProducts())

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
        })
        expect(result.current.data?.length).toBe(3)
    })

    test('should update product', async () => {
        mockItemService.update.mockResolvedValue(items[1])
        const mockToast = jest.spyOn(toast, 'success')
        const {result} = renderHookWithProviders(() => useProducts())

        const {id: _, ...item} = items[1]

        await act(async () => {
            await result.current.updateAsync({id: 1, data: {...item, img: undefined}})
            expect(result.current.isRefetching).toBe(true)
        })

        await waitFor(() => {
            expect(result.current.isRefetching).toBe(false)
        })
        expect(mockToast).toHaveBeenCalledTimes(1)
        expect(mockToast).toHaveBeenCalledWith('Товар был обновлен')
        expect(result.current.data?.length).toBe(3)
    })

    test('should create product', async () => {
        mockItemService.create.mockResolvedValue(items[2])
        const mockToast = jest.spyOn(toast, 'success')
        const {result} = renderHookWithProviders(() => useProducts())

        const {id: _, ...item} = items[2]

        await act(async () => {
            await result.current.createAsync({...item, img: new File([''], 'file.webp', {type: 'image/webp'})})
            expect(result.current.isRefetching).toBe(true)
        })

        await waitFor(() => {
            expect(result.current.isRefetching).toBe(false)
        })
        expect(mockToast).toHaveBeenCalledTimes(1)
        expect(mockToast).toHaveBeenCalledWith('Товар был добавлен')
        expect(result.current.data?.length).toBe(3)
    })

    test('should delete product', async () => {
        const mockToast = jest.spyOn(toast, 'success')
        const {result} = renderHookWithProviders(() => useProducts())

        await act(async () => {
            await result.current.deleteAsync(1)
            expect(result.current.isRefetching).toBe(true)
        })

        await waitFor(() => {
            expect(result.current.isRefetching).toBe(false)
        })
        expect(mockToast).toHaveBeenCalledTimes(1)
        expect(mockToast).toHaveBeenCalledWith('Товар был удален')
        expect(result.current.data?.length).toBe(3)
    })
})

