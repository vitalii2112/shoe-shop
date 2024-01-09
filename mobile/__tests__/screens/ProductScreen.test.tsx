import {describe, jest, test} from "@jest/globals";
import {renderWithProviders} from "../../utils/test-utils";
import ProductScreen from "../../screens/ProductScreen";
import {ItemsService} from "../../services/items.service";
import {act, waitFor} from "@testing-library/react-native";
import {Alert} from "react-native";
import Toast from "react-native-toast-message";
import DocumentPicker from "react-native-document-picker";

jest.mock("../../services/items.service")
jest.mock('react-native-document-picker', () => {
    return {
        pickSingle: jest.fn()
    }
})

const mockItemsService = ItemsService as jest.Mocked<typeof ItemsService>
const mockPicker = DocumentPicker as jest.Mocked<typeof DocumentPicker>

const product = {
    id: 1,
    name: 'some name',
    description: 'some description',
    img: 'img',
    price: 20
}

const mockToast = jest.spyOn(Toast, 'show')

beforeEach(() => {
    mockToast.mockReset()
})

beforeAll(() => {
    mockItemsService.getOne.mockResolvedValue(product)
})

describe('ProductScreen', () => {
    test('should render for edit', async () => {
        const {getByTestId, queryByTestId, getAllByTestId, getByText, queryByText} = renderWithProviders(<ProductScreen
            navigation={{} as any} route={{params: {productId: 1}} as any}/>)

        await waitFor(() => expect(queryByTestId('loading')).not.toBeOnTheScreen())

        const inputs = getAllByTestId('form-block-input')

        expect(getByTestId('product-image')).toBeOnTheScreen()
        expect(getByText('Сохранить')).toBeOnTheScreen()
        expect(getByText('Удалить')).toBeOnTheScreen()
        expect(queryByText('Добавить')).not.toBeOnTheScreen()
        expect(inputs.length).toBe(3)
        expect(inputs[0]).toHaveDisplayValue(product.name)
        expect(inputs[1]).toHaveDisplayValue(product.description)
        expect(inputs[2]).toHaveDisplayValue(product.price.toString())
    })
    test('should render for add', async () => {
        const {queryByTestId, getAllByTestId, getByText, queryByText} = renderWithProviders(<ProductScreen
            navigation={{} as any} route={{params: {productId: null}} as any}/>)

        await waitFor(() => expect(queryByTestId('loading')).not.toBeOnTheScreen())

        const inputs = getAllByTestId('form-block-input')

        expect(queryByTestId('product-image')).not.toBeOnTheScreen()
        expect(queryByText('Сохранить')).not.toBeOnTheScreen()
        expect(queryByText('Удалить')).not.toBeOnTheScreen()
        expect(getByText('Добавить')).toBeOnTheScreen()
        expect(inputs.length).toBe(3)
        expect(inputs[0]).toHaveDisplayValue('')
        expect(inputs[1]).toHaveDisplayValue('')
        expect(inputs[2]).toHaveDisplayValue('0')
    })

    test('should delete product', async () => {
        mockItemsService.delete.mockResolvedValue()
        const {user, queryByTestId, getByText} = renderWithProviders(<ProductScreen navigation={{} as any}
                                                                                    route={{params: {productId: 1}} as any}/>)

        await waitFor(() => expect(queryByTestId('loading')).not.toBeOnTheScreen())

        const mockAlert = jest.spyOn(Alert, 'alert');

        await user.press(getByText('Удалить'))

        expect(mockAlert).toHaveBeenCalledTimes(1)
        await act(() => {
            mockAlert.mock.calls[0][2]?.[1].onPress?.()
        })

        expect(mockItemsService.delete).toHaveBeenCalledTimes(1)
        expect(mockItemsService.delete).toHaveBeenCalledWith(1)
    })
    test('should update product', async () => {
        const editedProduct = {...product, name: product.name + '123'}
        mockItemsService.update.mockResolvedValue(editedProduct)
        const {queryByTestId, debug, user, getAllByTestId, getByText, queryByText} = renderWithProviders(<ProductScreen
            navigation={{navigate: jest.fn()} as any} route={{params: {productId: 1}} as any}/>)

        await waitFor(() => expect(queryByTestId('loading')).not.toBeOnTheScreen())

        const inputs = getAllByTestId('form-block-input')

        await user.type(inputs[0], '123')

        await user.press(getByText('Сохранить'))


        const {id, ...rest} = editedProduct
        expect(mockItemsService.update).toHaveBeenCalledTimes(1)
        expect(mockItemsService.update).toHaveBeenCalledWith({id, data: rest})
        expect(mockToast).toHaveBeenCalledTimes(1)
        expect(mockToast).toHaveBeenCalledWith({
            text1: 'Обновление товара',
            text2: 'Обновление успешно'
        })
    })

    test('should create product', async () => {
           const newProduct = {
            name: 'new product name',
            description: 'new product description',
            price: 100,
            img: {type: 'image/webp', name: 'file.webp', uri: '', size: 10, fileCopyUri: ''}
        }
        mockPicker.pickSingle.mockResolvedValue(newProduct.img)
        mockItemsService.create.mockResolvedValue({id: 2, ...newProduct, img: ''})
        const {queryByTestId, debug, user, getAllByTestId, getByText, queryByText} = renderWithProviders(<ProductScreen
            navigation={{navigate: jest.fn()} as any} route={{params: {productId: null}} as any}/>)

        await waitFor(() => expect(queryByTestId('loading')).not.toBeOnTheScreen())

        const inputs = getAllByTestId('form-block-input')

        await user.type(inputs[0], newProduct.name)
        await user.type(inputs[1], newProduct.description)
        await user.clear(inputs[2])
        await user.type(inputs[2], newProduct.price.toString())

        await user.press(getByText('Загрузить фото'))
        await user.press(getByText('Добавить'))

        expect(mockItemsService.create).toHaveBeenCalledTimes(1)
        expect(mockItemsService.create).toHaveBeenCalledWith(newProduct)
        expect(mockToast).toHaveBeenCalledTimes(1)
        expect(mockToast).toHaveBeenCalledWith({
            text1: 'Добавление товара',
            text2: 'Добавление успешно'
        })
    })

})
