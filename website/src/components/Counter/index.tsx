import styles from './Counter.module.scss';
import React, {FC, useEffect, useState} from 'react';
import {TCounter} from './types';

const Counter: FC<TCounter> = ({setValue, value}) => {
    const [string, setString] = useState(value.toString())
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        if (/^\d*$/.test(val)) {
            if (+val > 10)
                setString('10');
            else
                setString(val)
        }
    }

    const resetHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        const val = e.target.value
        if (val === '' || val === '0')
            setString('1')
        else if (val[0] === '0')
            setString(val[1])
    }

    useEffect(() => {
        if (!isNaN(+string) && +string !== 0)
            setValue(+string)
    }, [string, setValue]);

    return (
        <div className={styles.counter}>
            <input type="text" value={string} onChange={onChange} onBlur={resetHandler}/>
        </div>
    );
};

export default Counter;
