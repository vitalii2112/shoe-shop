import React, {FC, useLayoutEffect} from 'react';
import styles from './Loading.module.scss';
import {LoadingProps} from './types';
import cn from 'classnames';

const Loading: FC<LoadingProps> = ({absolute, modal, text}) => {
    useLayoutEffect(() => {
        if (!absolute && !modal)
            document.documentElement.classList.add(styles.noScroll);
        return () => {
            document.documentElement.classList.remove(styles.noScroll);
        }
    }, [absolute, modal])

    return (
        <div className={cn(styles.loading, {[styles.absolute]: absolute, [styles.modal]: modal})}>
            <div className={styles.ldsRing}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            {text && <p className={styles.text}>{text}</p>}
        </div>
    );
};

export default Loading;
