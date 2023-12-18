import {FC} from 'react';
import styles from './EditModal.module.scss';
import Modal from "@/components/Modal";
import {TEditModalProps} from "@/pages/Products/components/EditModal/types";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IProductCreate} from "@/models/IProduct";
import FormInput from "@/components/FormInput";
import FormUploadInput from "@/components/FormUploadInput";

const EditModal: FC<TEditModalProps> = ({item, isOpen, onClose, onSubmit, onDelete}) => {
    const {handleSubmit, getValues, control, formState: {errors}} = useForm<IProductCreate>()
    const formHandler: SubmitHandler<IProductCreate> = (data) => onSubmit(data, item?.id)
    return (
        <Modal onCloseModal={onClose} opened={isOpen} className={styles.editModal}>
            <form onSubmit={handleSubmit(formHandler)}>
                <Controller name="name" control={control} defaultValue={item?.name || ''}
                            rules={{required: 'Обязательное поле', minLength: {value: 3, message: 'Минимальная длина 3 символов'}}}
                            render={({field}) =>
                                <FormInput label="Название" value={field.value} setValue={field.onChange} required
                                           type="text" errorMessage={errors.name?.message} placeholder="Введите название"/>}/>
                <Controller name="description" control={control} defaultValue={item?.description || ''}
                            rules={{required: 'Обязательное поле', minLength: {value: 10, message: 'Минимальная длина 10 символов'}}}
                            render={({field}) =>
                                <FormInput label="Описание" value={field.value} setValue={field.onChange} required
                                           type="text" errorMessage={errors.description?.message} placeholder="Введите описание"/>}/>
                <Controller name="price" control={control} defaultValue={item?.price || 0}
                            rules={{required: 'Обязательное поле', min: {value: 1, message: 'Стоимость должна быть больше 0'}}}
                            render={({field}) =>
                                <FormInput label="Стоимость" value={field.value} setValue={field.onChange} required
                                           type="number" errorMessage={errors.price?.message} placeholder="Введите стоимость"/>}/>

                <Controller name="img" control={control}
                            rules={{required: {value: !(getValues('img') || item?.img), message: 'Загрузите фото'}}}
                            render={({field}) =>
                                <FormUploadInput onChange={field.onChange} errorMessage={errors.img?.message}
                                                 isFileExist={!!item?.img}/>}/>

                <div className="btn__wrapper">
                    {item && <button className="btn-common cancel" type="button" onClick={() => onDelete(item.id)}>Удалить</button>}
                    <button className="btn-common">{item ? 'Сохранить' : 'Добавить'}</button>
                </div>
            </form>
        </Modal>
    );
};

export default EditModal;
