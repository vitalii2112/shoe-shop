import {FC} from 'react';
import styles from './ProductList.module.scss';
import Card from "@/components/Card";
import {TProductProps} from "@/components/ProductList/types";

const ProductList: FC<TProductProps> = ({products, onAdd, isAddToCart, isEditable, onItemClick}) => {
    return (
        <div className={styles.productList}>
            {products.map((item, index) => item === undefined ? <Card key={index} isLoading={true}/> :
                <Card key={index} {...item} isCartExist={isAddToCart?.(item.id)} isEdit={isEditable} onClick={onItemClick}
                      onAdd={onAdd?.(item)}
                />)}
        </div>
    );
};

export default ProductList;
