import {FC, useState} from 'react';
import styles from './Products.module.scss';
import {useProducts} from "@/components/ProductList/useProducts";
import ProductList from "@/components/ProductList";
import {IProduct, IProductCreate} from "@/models/IProduct";
import EditModal from "@/pages/Products/components/EditModal";
import confirmation from "@/components/Confirm";
import Loading from "@/components/Loading";
import cn from "classnames";

const Products: FC = () => {
    const {isLoading, data, deleteAsync, createAsync, updateAsync} = useProducts()
    const [modal, setModal] = useState<{ isOpen: boolean, item?: IProduct }>()
    const itemClickHandler = (item: IProduct) => {
        setModal({isOpen: true, item})
    }

    const addItemClickHandler = () => {
        setModal({isOpen: true})
    }

    const closeModalHandler = () => {
        setModal(undefined)
    }

    const onSubmit = async (data: IProductCreate, id?: number) => {
        let res;
        if (id)
            res = await updateAsync({id, data})
        else
            res = await createAsync(data)

        if (res)
            closeModalHandler()
    }

    const onDelete = async (id: number) => {
        const answer = await confirmation('Вы действительно хотите удалить товар?', 'Удаление товара', {okLabel: 'Да, удалить'})
        if (answer) {
            await deleteAsync(id)
            closeModalHandler()
        }
    }

    return (
        <div className={cn(styles.products, 'layout')} data-testid="products">
            {isLoading && <Loading/>}
            <div className={styles.header}>
                <h1>Товары</h1>
                <button className="btn" onClick={addItemClickHandler}>Добавить</button>
            </div>
            {!data?.length && <h3 className={styles.emptyTitle}>Список товаров пуст</h3>}
            <ProductList products={data || []} isEditable onItemClick={itemClickHandler}/>
            {modal && <EditModal {...modal} onClose={closeModalHandler} onSubmit={onSubmit} onDelete={onDelete}/>}
        </div>
    );
};

export default Products;
