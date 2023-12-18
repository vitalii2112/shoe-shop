import {FC, useState} from 'react';
import styles from './Card.module.scss';
import {TCardProps} from "./types";
import ContentLoader from "react-content-loader";
import Counter from "@/components/Counter";
import {ReactComponent as CartAdd} from "@/assets/svg/cart-add.svg";
import {ReactComponent as DoneSVG} from "@/assets/svg/done.svg";
import cn from "classnames";
import {API_URL} from "@/config/api.config";

const Card: FC<TCardProps> = ({isEdit, onClick, id, quantity, price, img, name, description, isLoading, onAdd, isCartExist}) => {
    const [itemQuantity, setItemQuantity] = useState(quantity || 1)
    const clickHandler = () => {
        if (id && name && description && price && img && onClick)
            onClick({id, name, description, price, img})
    }

    return (
        <div className={cn(styles.card, {[styles.editable]: isEdit})} onClick={clickHandler}>
            {
                isLoading ? (<ContentLoader
                        speed={2}
                        width={190}
                        height={356}
                        viewBox="0 0 190 356"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="5" y="0" rx="5" ry="5" width="180" height="250"/>
                        <rect x="5" y="318" rx="5" ry="5" width="80" height="32"/>
                        <rect x="5" y="255" rx="5" ry="5" width="180" height="25"/>
                        <rect x="5" y="285" rx="5" ry="5" width="180" height="25"/>
                        <rect x="153" y="318" rx="10" ry="10" width="32" height="32"/>
                    </ContentLoader>)
                    : (<>
                        <img className={styles.cardImg} src={`${API_URL}${img}`} alt={name}/>
                        <h5 className={styles.cardName}>{name?.toUpperCase()}</h5>
                        <h6 className={styles.cardDesc}>{description}</h6>
                        <div className={styles.cardPriceBlock}>
                            <div className={styles.price}>
                                <span>Цена:</span>
                                <b>{price?.toFixed(2)} грн.</b>
                            </div>
                            {onAdd ? <div className={styles.addBlock}>
                                {isCartExist ? <DoneSVG/> : <>
                                    <Counter value={itemQuantity} setValue={setItemQuantity}/>
                                    <CartAdd onClick={() => onAdd(itemQuantity)} className={styles.addSVG}/>
                                </>}
                            </div> : quantity && <div className={styles.quantity}>{quantity} шт.</div>}
                        </div>
                    </>)
            }
        </div>
    );
};

export default Card;
