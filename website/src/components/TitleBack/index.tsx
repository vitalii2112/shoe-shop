import {FC} from 'react';
import styles from './TitleBack.module.scss';
import {Link} from 'react-router-dom';
import {ReactComponent as BackSVG} from '@/assets/svg/back.svg';
import {TitleBackProps} from './types';
import cn from 'classnames';

const TitleBack: FC<TitleBackProps> = ({title, children, className, ...props}) => {
    return (<div className={cn(styles.title, className)} {...props}>
            <Link to=".." className={styles.titleBack} title="Вернуться назад">
                <h1>{title}</h1>
                <BackSVG/>
            </Link>
            {children}
        </div>
    );
};

export default TitleBack;
