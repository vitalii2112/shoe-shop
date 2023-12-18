import {FC, useEffect, useState} from 'react';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../components/Navigation";
import {Alert, ScrollView, View} from "react-native";
import {IProduct, IProductCreate} from "../models/IProduct";
import {ItemsService} from "../services/items.service";
import Toast from "react-native-toast-message";
import Loading from "../components/Loading";
import {API_URL} from "@env";
import {Controller, SubmitHandler, useForm, useWatch} from "react-hook-form";
import FormBlock from "../components/FormBlock";
import DocumentPicker from 'react-native-document-picker'
import StyledButton from "../components/StyledButton";
import styled from "styled-components/native";
import useUnauthorizedError from "../hooks/useUnauthorizedError";


interface Props extends NativeStackScreenProps<RootStackParamList, 'Product'> {
}

const ProductImageBlock = styled.View`
    justify-content: center;
    align-items: center;
`

const ProductImage = styled.Image`
    object-fit: contain;
    border-radius: 15px;
    margin-bottom: 20px;
`

const ProductScreen: FC<Props> = ({route, navigation}) => {
    const {
        setValue,
        handleSubmit,
        control,
        setError,
        clearErrors,
        formState: {errors}
    } = useForm<IProductCreate>({defaultValues: {price: 0, name: '', description: ''}})
    const [product, setProduct] = useState<IProduct | null>(null)

    const [isLoading, setIsLoading] = useState(false)
    const onAuthError = useUnauthorizedError()

    const productImage = useWatch({
        control,
        name: 'img',
        defaultValue: product?.img || ''
    })

    const productId = route.params.productId

    useEffect(() => {
        if (productId) {
            setIsLoading(true)
            ItemsService.getOne(productId)
                .then(data => setProduct(data))
                .catch(() => {
                    Toast.show({
                        type: 'error',
                        text1: 'Загрузка товара',
                        text2: 'Возникла проблема'
                    })
                })
                .finally(() => setIsLoading(false))
        }
    }, [productId]);

    useEffect(() => {
        if (product) {
            setValue('name', product.name)
            setValue('price', product.price)
            setValue('description', product.description)
            setValue('img', product.img)
        }
    }, [product]);

    const loadImageHandler = async () => {
        try {
            const res = await DocumentPicker.pickSingle({type: 'image/*'})
            setValue('img', res)
            clearErrors('img')
        } catch (e) {
        }
    }

    const onUpdate: SubmitHandler<IProductCreate> = data => {
        if (product) {
            ItemsService.update({id: product.id, data})
                .then(res => {
                    if (res) {
                        Toast.show({
                            text1: 'Обновление товара',
                            text2: 'Обновление успешно'
                        })
                        navigation.navigate('Products')
                    } else
                        Toast.show({
                            type: 'error',
                            text1: 'Обновление товара',
                            text2: 'Возникла проблема'
                        })
                }).catch(error => {
                const isExpired = onAuthError(error)
                if (!isExpired)
                    Toast.show({
                        type: 'error',
                        text1: 'Обновление товара',
                        text2: 'Возникла проблема'
                    })
            })
        }
    }

    const onCreate: SubmitHandler<IProductCreate> = data => {
        if (!product) {
            if (!productImage) {
                Toast.show({
                    type: 'error',
                    text1: 'Добавление товара',
                    text2: 'Загрузите фото'
                })
                setError('img', {type: "required"})
                return
            }
            setIsLoading(true)
            ItemsService.create(data)
                .then(res => {
                    if (res) {
                        Toast.show({
                            text1: 'Добавление товара',
                            text2: 'Добавление успешно'
                        })
                        navigation.navigate('Products')
                    } else {
                        Toast.show({
                            type: 'error',
                            text1: 'Добавление товара',
                            text2: 'Возникла проблема'
                        })
                    }
                }).catch(error => {
                const isExpired = onAuthError(error)
                if (!isExpired)
                    Toast.show({
                        type: 'error',
                        text1: 'Добавление товара',
                        text2: 'Возникла проблема'
                    })
            }).finally(() => setIsLoading(false))
        }
    }

    const onDelete = () => {
        if (productId) {
            Alert.alert('Вы уверены?', 'Вы уверены, что хотите удалить товар?', [
                {
                    style: 'cancel',
                    text: 'Нет',
                    isPreferred: true
                },
                {
                    style: 'destructive',
                    text: 'Да',
                    onPress: () => {
                        setIsLoading(true)
                        ItemsService.delete(productId)
                            .then(() => {
                                Toast.show({
                                    text1: 'Товар',
                                    text2: 'Удаление успешно'
                                })
                                navigation.navigate('Products')
                            })
                            .catch((error) => {
                                const isExpired = onAuthError(error)
                                if (!isExpired)
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Удаление товара',
                                        text2: 'Возникла проблема'
                                    })
                            })
                            .finally(() => setIsLoading(false))
                    }
                }
            ])
        }
    }

    if (isLoading)
        return <Loading/>

    return (
        <ScrollView style={{padding: 15}} removeClippedSubviews>
            {(productImage || product?.img) && <ProductImageBlock>
                <ProductImage
                    source={{
                        uri: typeof productImage === "string" ? `${API_URL}${productImage}` : productImage.uri,
                        width: 250,
                        height: 250
                    }}/>
            </ProductImageBlock>}
            <Controller name="name" control={control} defaultValue={product?.name || ''}
                        rules={{
                            required: 'Обязательное поле',
                            minLength: {value: 3, message: 'Минимальная длина 3 символов'}
                        }}
                        render={({field}) =>
                            <FormBlock label="Название" value={field.value} setValue={field.onChange} required
                                       type="text" errorMessage={errors.name?.message}
                                       placeholder="Введите название"/>}/>
            <Controller name="description" control={control} defaultValue={product?.description || ''}
                        rules={{
                            required: 'Обязательное поле',
                            minLength: {value: 10, message: 'Минимальная длина 10 символов'}
                        }}
                        render={({field}) =>
                            <FormBlock label="Описание" value={field.value} setValue={field.onChange} required
                                       type="text" errorMessage={errors.description?.message}
                                       placeholder="Введите описание"/>}/>
            <Controller name="price" control={control} defaultValue={product?.price || 0}
                        rules={{
                            required: 'Обязательное поле',
                            min: {value: 1, message: 'Стоимость должна быть больше 0'}
                        }}
                        render={({field}) =>
                            <FormBlock label="Стоимость" value={field.value.toString()} setValue={field.onChange}
                                       required
                                       type="numeric" errorMessage={errors.price?.message}
                                       placeholder="Введите стоимость"/>}/>
            <StyledButton text="Загрузить фото" isInvalid={errors.img?.type === 'required'} type="default" onPress={loadImageHandler} isFull isSmall
                          marginBottom={20}/>
            {product ? <View style={{flexDirection: 'row', marginBottom: 30, gap: 10}}>
                <StyledButton onPress={onDelete} type="delete" text="Удалить" isSmall isHalf/>
                <StyledButton onPress={handleSubmit(onUpdate)} text="Сохранить" isSmall isHalf/>
            </View> : <StyledButton onPress={handleSubmit(onCreate)} marginBottom={30} text="Добавить" isSmall isFull/>
            }
        </ScrollView>
    );
};

export default ProductScreen;
