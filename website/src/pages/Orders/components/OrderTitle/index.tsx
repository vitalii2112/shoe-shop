import {FC} from 'react';
import styles from "./OrderTitle.module.scss";
import ContentLoader from "react-content-loader";
import {Link} from "react-router-dom";

type TTitleProps = {
    isLoading?: boolean
    id: number
    amount: number
    user_id?: number | null
}
const Title: FC<TTitleProps> = ({isLoading, amount, id, user_id}) => {
    return (
        <div className={styles.orderTitle}>
            <h3>{isLoading ? <ContentLoader
                speed={2}
                width={140}
                height={26}
                viewBox="0 0 140 26"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="0" y="0" rx="5" ry="5" width="140" height="26"/>
            </ContentLoader> : <>
                <span>Заказ №{id}</span>
                {user_id !== undefined && (typeof user_id === "number" ? <Link to={`/users/${user_id}`}>Клиент №{user_id}</Link> : <span className={styles.removedClient}>Клиент удален</span>)}
            </>}</h3>
            <h4>
                {isLoading ? <ContentLoader
                        speed={2}
                        width={220}
                        height={26}
                        viewBox="0 0 220 26"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb">
                        <rect x="0" y="0" rx="5" ry="5" width="220" height="26"/>
                    </ContentLoader>
                    : <>
                        <span>Сумма заказа:</span>
                        <span>{amount} грн.</span>
                    </>}
            </h4>
        </div>
    );
};

export default Title;
